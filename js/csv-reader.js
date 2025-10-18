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
            console.log('Loading CSV file:', this.filePath);
            
            // Fetch the CSV file
            const response = await fetch(this.filePath);
            if (!response.ok) {
                throw new Error(`Failed to load CSV file: ${response.statusText}`);
            }
            
            const csvText = await response.text();
            
            // Parse CSV
            this.rawData = this.parseCSV(csvText);
            
            console.log('CSV file loaded successfully. Rows:', this.rawData.length);
            
            // Parse the data
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
        const result = [];
        let currentRow = [];
        let currentField = '';
        let inQuotes = false;
        let i = 0;
        
        while (i < csvText.length) {
            const char = csvText[i];
            
            if (char === '"') {
                inQuotes = !inQuotes;
            } else if (char === ',' && !inQuotes) {
                currentRow.push(currentField.trim().replace(/"/g, ''));
                currentField = '';
            } else if (char === '\n' && !inQuotes) {
                currentRow.push(currentField.trim().replace(/"/g, ''));
                if (currentRow.length >= 6 && currentRow[0] && currentRow[1]) {
                    result.push([...currentRow]);
                }
                currentRow = [];
                currentField = '';
            } else {
                currentField += char;
            }
            i++;
        }
        
        // Add the last row if it exists
        if (currentField.trim()) {
            currentRow.push(currentField.trim().replace(/"/g, ''));
            if (currentRow.length >= 6 && currentRow[0] && currentRow[1]) {
                result.push(currentRow);
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
        const tournamentInfo = [];
        const tournamentMap = new Map();
        let currentTournamentName = '';
        let tournamentCounter = 1;

        // Expected CSV format: Winners Stage, Discord Name, Discord ID, Date, Tour Type, Tour Name
        // Skip header row
        for (let i = 1; i < this.rawData.length; i++) {
            const row = this.rawData[i];
            
            // Skip completely empty rows or rows without enough data
            if (!row || row.length < 6) continue;

            // Get data from CSV columns
            const winnersStage = row[0];
            const discordName = row[1];
            const discordId = row[2];
            const date = this.parseDate(row[3]);
            const tourType = row[4];
            const tourName = row[5];

            // Skip rows without essential data
            if (!discordName || discordName === 'Discord Name' || !winnersStage || !tourName) continue;

            // Determine position from Winners_Stage (1, 2, 3)
            let position = 1;
            if (typeof winnersStage === 'number') {
                position = winnersStage;
            } else if (typeof winnersStage === 'string') {
                const posMatch = winnersStage.match(/(\d+)/);
                if (posMatch) {
                    position = parseInt(posMatch[1]);
                }
            }

            // Use tournament name from CSV
            let tournamentName = tourName.trim();
            
            // Create tournament key for grouping
            const tournamentKey = `${date}_${tournamentName}`;
            
            if (!tournamentMap.has(tournamentKey)) {
                tournamentMap.set(tournamentKey, tournamentName);
                
                // Add to tournament info
                tournamentInfo.push({
                    name: tournamentName,
                    date: date || '2025-01-01',
                    type: tourType || 'Main Tour',
                    winners: []
                });
                
                tournamentCounter++;
            }

            // Add to serverData
            serverData.push({
                name: discordName.trim(),
                position: position,
                tourType: tourType || 'Main Tour',
                date: date || '2025-01-01',
                tourName: tournamentName,
                discordId: discordId
            });

            // Update tournament winners list
            const tournament = tournamentInfo.find(t => t.name === tournamentName);
            if (tournament) {
                const winnerInfo = {
                    name: discordName.trim(),
                    position: position
                };
                
                const existingWinner = tournament.winners.find(w => w.name === winnerInfo.name);
                if (!existingWinner) {
                    tournament.winners.push(winnerInfo);
                }
            }
        }

        this.parsedData = serverData;
        this.tournamentInfo = tournamentInfo;

        console.log('Parsed data:', serverData.length, 'entries');
        console.log('Tournament info:', tournamentInfo.length, 'tournaments');
    }

    // Parse date from CSV format (DD-MM-YYYY)
    parseDate(dateValue) {
        if (!dateValue) return null;

        try {
            // If it's a string in YYYY-MM-DD format
            if (typeof dateValue === 'string' && dateValue.match(/^\d{4}-\d{2}-\d{2}$/)) {
                return dateValue;
            }

            // Handle DD-MM-YYYY format
            if (typeof dateValue === 'string' && dateValue.match(/^\d{2}-\d{2}-\d{4}$/)) {
                const parts = dateValue.split('-');
                const day = parts[0];
                const month = parts[1];
                const year = parts[2];
                return `${year}-${month}-${day}`;
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
