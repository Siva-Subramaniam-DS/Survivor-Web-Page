// Simple CSV Reader for Tournament Data
class CSVDataReader {
    constructor(filePath) {
        this.filePath = filePath;
        this.rawData = null;
        this.parsedData = null;
        this.tournamentInfo = null;
    }

    // Load and parse CSV file
    async loadCSVFile() {
        try {
            // Return cached parsed data if already loaded
            if (this.parsedData && this.parsedData.length > 0) {
                console.log('CSV already loaded, returning cached data');
                return this.parsedData;
            }

            console.log('Loading CSV file:', this.filePath);

            // Fetch the CSV file
            const response = await fetch(this.filePath);
            if (!response.ok) {
                throw new Error(`Failed to load CSV file: ${response.statusText}`);
            }

            const csvText = await response.text();

            // Parse CSV (faster approach, handles CRLF and quoted commas)
            this.rawData = this.parseCSV(csvText);

            console.log('CSV file loaded successfully. Rows:', this.rawData.length);

            // Parse the data into structured objects
            this.parseData();

            return this.parsedData;

        } catch (error) {
            console.error('Error loading CSV file:', error);
            // Fallback to server-data.js if CSV loading fails
            console.log('Falling back to server-data.js');
            return this.useFallbackData();
        }
    }

    // Parse CSV text into array of arrays (handles multi-line fields)
    parseCSV(csvText) {
        // Split into lines (handles both LF and CRLF)
        const lines = csvText.split(/\r?\n/);
        const result = [];

        for (let i = 0; i < lines.length; i++) {
            const line = lines[i].trim();
            if (!line) continue; // skip empty lines

            // Split on commas that are not inside quotes
            // This regex splits on commas followed by an even number of quotes (i.e. not inside quoted fields)
            const fields = line.split(/,(?=(?:[^"]*"[^\"]*")*[^\"]*$)/).map(f => {
                // Remove surrounding quotes and unescape double-quotes
                let v = f.trim();
                if (v.startsWith('"') && v.endsWith('"')) {
                    v = v.slice(1, -1);
                }
                v = v.replace(/""/g, '"');
                return v;
            });

            // Only include rows that have at least a couple of columns (guard against malformed rows)
            if (fields.length >= 2 && fields.some(c => c !== '')) {
                result.push(fields);
            }
        }

        return result;
    }

    // Parse raw CSV data into structured format
    parseData() {
        if (!this.rawData || this.rawData.length === 0) {
            console.error('No raw data to parse');
            return;
        }

        const serverData = [];
        const tournamentMap = new Map();

        // Determine if first row is a header (simple heuristic)
        let startIndex = 0;
        const headerRow = this.rawData[0];
        if (headerRow && headerRow.some && headerRow.some(h => /discord name|winners stage|tour name|date/i.test(h))) {
            startIndex = 1; // skip header
        }

        // Expected CSV format (columns may vary slightly): Winners Stage, Discord Name, Discord ID, Date, Tour Type, Tour Name
        for (let i = startIndex; i < this.rawData.length; i++) {
            const row = this.rawData[i];
            if (!row || row.length < 2) continue;

            const winnersStage = row[0] || '';
            const discordName = (row[1] || '').trim();
            const discordId = row[2] || '';
            const rawDate = row[3] || '';
            const tourType = row[4] || 'Main Tour';
            const tourName = (row[5] || '').trim();

            // Basic validation
            if (!discordName || discordName.toLowerCase() === 'discord name' || !winnersStage || !tourName) continue;

            // Determine position (1/2/3)
            let position = 1;
            if (typeof winnersStage === 'number') {
                position = winnersStage;
            } else if (typeof winnersStage === 'string') {
                const posMatch = winnersStage.match(/(\d+)/);
                if (posMatch) {
                    position = parseInt(posMatch[1]);
                }
            }

            const date = this.parseDate(rawDate) || '2025-01-01';
            const tournamentName = tourName;

            // Add to serverData list
            serverData.push({
                name: discordName,
                position: position,
                tourType: tourType,
                date: date,
                tourName: tournamentName,
                discordId: discordId
            });

            // Group into tournamentMap using date + tourName as key (preserves separate tournaments with same name)
            const tournamentKey = `${date}_${tournamentName}`;
            if (!tournamentMap.has(tournamentKey)) {
                tournamentMap.set(tournamentKey, {
                    name: tournamentName,
                    date: date,
                    type: tourType,
                    winners: []
                });
            }

            const tournamentObj = tournamentMap.get(tournamentKey);
            // Avoid duplicate winners within the same tournament
            if (!tournamentObj.winners.find(w => w.name === discordName && w.position === position)) {
                tournamentObj.winners.push({ name: discordName, position: position });
            }
        }

        // Finalize parsed data and tournament info
        this.parsedData = serverData;
        this.tournamentInfo = Array.from(tournamentMap.values());

        // Sort tournaments by date ascending (older first); UI later sorts for display
        this.tournamentInfo.sort((a, b) => new Date(a.date) - new Date(b.date));
        this.tournamentInfo.forEach(t => t.winners.sort((a, b) => a.position - b.position));

        console.log('Parsed data:', serverData.length, 'entries');
        console.log('Tournament info:', this.tournamentInfo.length, 'tournaments');
    }

    // Parse date from CSV format (DD-MM-YYYY)
    parseDate(dateValue) {
        if (!dateValue) return null;

        try {
            // If it's a string in YYYY-MM-DD format
            if (typeof dateValue === 'string' && dateValue.match(/^\d{4}-\d{2}-\d{2}$/)) {
                return dateValue;
            }

            // Handle D-M-YYYY or DD-MM-YYYY formats (accept single-digit day/month)
            if (typeof dateValue === 'string') {
                const dmMatch = dateValue.match(/^(\d{1,2})-(\d{1,2})-(\d{4})$/);
                if (dmMatch) {
                    const day = String(dmMatch[1]).padStart(2, '0');
                    const month = String(dmMatch[2]).padStart(2, '0');
                    const year = dmMatch[3];
                    return `${year}-${month}-${day}`;
                }
            }

            // Try to parse as string
            const parsed = new Date(dateValue);
            if (!isNaN(parsed.getTime())) {
                const year = parsed.getFullYear();
                const month = String(parsed.getMonth() + 1).padStart(2, '0');
                const day = String(parsed.getDate()).padStart(2, '0');
                return `${year}-${month}-${day}`;
            }

            return null;
        } catch (error) {
            console.error('Error parsing date:', dateValue, error);
            return null;
        }
    }

    // Filter data by month
    filterByMonth(month) {
        if (!this.parsedData) return [];
        
        if (month === 'all') {
            return this.parsedData;
        }

        return this.parsedData.filter(entry => {
            const entryMonth = entry.date.split('-')[1];
            return entryMonth === month;
        });
    }

    // Get tournament info
    getTournamentInfo() {
        return this.tournamentInfo || [];
    }

    // Get parsed data
    getData() {
        return this.parsedData || [];
    }

    // Use fallback data from server-data.js
    useFallbackData() {
        console.log('Using fallback data from server-data.js');
        
        if (typeof serverData !== 'undefined') {
            this.parsedData = serverData;
        } else {
            this.parsedData = [];
        }

        if (typeof tournamentInfo !== 'undefined') {
            this.tournamentInfo = tournamentInfo;
        } else {
            this.tournamentInfo = [];
        }

        return this.parsedData;
    }

    // Get statistics
    getStatistics() {
        if (!this.parsedData) return null;

        const uniquePlayers = [...new Set(this.parsedData.map(p => p.name))];
        const totalTournaments = this.tournamentInfo ? this.tournamentInfo.length : 0;
        const totalPodiums = this.parsedData.length;
        const champions = [...new Set(this.parsedData.filter(p => p.position === 1).map(p => p.name))];

        return {
            activePlayers: uniquePlayers.length,
            totalTournaments: totalTournaments,
            totalPodiums: totalPodiums,
            totalChampions: champions.length
        };
    }
}

// Export for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = CSVDataReader;
}
