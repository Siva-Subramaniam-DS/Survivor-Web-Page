/*
 * Node script: scripts/csv-to-json.js
 * Usage: node scripts/csv-to-json.js "Information Players ( M47W - Survivor ) - Tour Rank (2025).csv"
 * Output: writes data/tournament-data.json with { parsedData: [...], tournamentInfo: [...] }
 *
 * This script is intentionally small and dependency-free. For very complex CSVs consider using 'csv-parse' or 'papaparse'.
 */
const fs = require('fs');
const path = require('path');

const inputFile = process.argv[2] || 'Information Players ( M47W - Survivor ) - Tour Rank (2025).csv';
const outDir = path.join(__dirname, '..', 'data');
const outFile = path.join(outDir, 'tournament-data.json');

function splitCSVLine(line) {
    // split on commas not inside quotes
    return line.split(/,(?=(?:[^"]*"[^"]*")*[^"]*$)/).map(f => {
        let v = f.trim();
        if (v.startsWith('"') && v.endsWith('"')) v = v.slice(1, -1);
        return v.replace(/""/g, '"');
    });
}

function parseDate(dateValue) {
    if (!dateValue) return null;
    dateValue = dateValue.trim();
    // accept D-M-YYYY or YYYY-MM-DD
    const ymd = dateValue.match(/^\d{4}-\d{2}-\d{2}$/);
    if (ymd) return dateValue;
    const dm = dateValue.match(/^(\d{1,2})-(\d{1,2})-(\d{4})$/);
    if (dm) {
        return `${dm[3]}-${String(dm[2]).padStart(2, '0')}-${String(dm[1]).padStart(2, '0')}`;
    }
    const parsed = new Date(dateValue);
    if (!isNaN(parsed.getTime())) {
        const year = parsed.getFullYear();
        const month = String(parsed.getMonth() + 1).padStart(2, '0');
        const day = String(parsed.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    }
    return null;
}

try {
    if (!fs.existsSync(inputFile)) {
        console.error('Input CSV file not found:', inputFile);
        process.exit(1);
    }

    const raw = fs.readFileSync(inputFile, 'utf8');
    const lines = raw.split(/\r?\n/).filter(l => l.trim().length > 0);
    if (lines.length === 0) {
        console.error('CSV appears empty');
        process.exit(1);
    }

    // If header row present, skip it
    const header = lines[0];
    const hasHeader = /discord name|winners stage|tour name|date/i.test(header);
    const start = hasHeader ? 1 : 0;

    const parsedData = [];
    const tournamentMap = new Map();

    for (let i = start; i < lines.length; i++) {
        const fields = splitCSVLine(lines[i]);
        // Expect at least: winnersStage, discordName, discordId, date, tourType, tourName
        if (fields.length < 6) continue;
        const winnersStage = fields[0];
        const discordName = fields[1].trim();
        const discordId = fields[2].trim();
        const date = parseDate(fields[3]) || '2025-01-01';
        const tourType = fields[4] || 'Main Tour';
        const tourName = fields[5].trim();
        if (!discordName || !winnersStage || !tourName) continue;
        const posMatch = String(winnersStage).match(/(\d+)/);
        const position = posMatch ? parseInt(posMatch[1]) : 1;

        parsedData.push({ name: discordName, position, tourType, date, tourName, discordId });

        const key = `${date}_${tourName}`;
        if (!tournamentMap.has(key)) {
            tournamentMap.set(key, { name: tourName, date, type: tourType, winners: [] });
        }
        const t = tournamentMap.get(key);
        if (!t.winners.find(w => w.name === discordName && w.position === position)) {
            t.winners.push({ name: discordName, position });
        }
    }

    const tournamentInfo = Array.from(tournamentMap.values()).sort((a, b) => new Date(a.date) - new Date(b.date));
    tournamentInfo.forEach(t => t.winners.sort((a, b) => a.position - b.position));

    if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });
    const outObj = { parsedData, tournamentInfo };
    fs.writeFileSync(outFile, JSON.stringify(outObj, null, 2), 'utf8');
    console.log('Wrote JSON file to', outFile, 'with', parsedData.length, 'entries and', tournamentInfo.length, 'tournaments');
} catch (err) {
    console.error('Error converting CSV to JSON:', err);
    process.exit(1);
}
