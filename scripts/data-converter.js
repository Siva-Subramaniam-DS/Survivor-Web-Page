const fs = require('fs');
const csv = require('csv-parse');

// Read the Data.txt file
const inputFile = '../Data.txt';
const outputFile = '../data/tournament-data.json';

// Function to parse date into month and week
function getMonthWeek(dateStr) {
    const date = new Date(dateStr);
    const month = date.toLocaleString('default', { month: 'long' });
    const year = date.getFullYear();
    const weekNum = Math.ceil(date.getDate() / 7);
    return {
        monthYear: `${month} ${year}`,
        week: `Week ${weekNum}`
    };
}

// Read and parse the data
let data = fs.readFileSync(inputFile, 'utf-8');
let lines = data.split('\n').filter(line => line.trim());

// Skip header
lines = lines.slice(1);

// Initialize result object
let result = {};

// Process each line
lines.forEach(line => {
    const fields = line.split('\t');
    if (fields.length >= 6) {
        const position = parseInt(fields[0]);
        const name = fields[1].trim();
        const date = fields[3].trim();
        const tourType = fields[4].trim().replace(/\n/g, '').replace(/"/g, '').trim();
        const tourName = fields[5].trim();

        // Get month and week
        const { monthYear, week } = getMonthWeek(date);

        // Initialize month if not exists
        if (!result[monthYear]) {
            result[monthYear] = {};
        }

        // Initialize week if not exists
        if (!result[monthYear][week]) {
            result[monthYear][week] = [];
        }

        // Add tournament entry
        if (tourName && tourType) {
            result[monthYear][week].push({
                position,
                name,
                tour_type: tourType,
                tour_name: tourName,
                date
            });
        }
    }
});

// Create data directory if it doesn't exist
if (!fs.existsSync('../data')) {
    fs.mkdirSync('../data');
}

// Write the result to JSON file
fs.writeFileSync(outputFile, JSON.stringify(result, null, 2));
console.log(`Data has been converted and saved to ${outputFile}`);