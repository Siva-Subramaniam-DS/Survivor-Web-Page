// Excel Reader Module for Tournament Data
// This module reads data from the Excel file and provides filtering capabilities

class ExcelDataReader {
    constructor(filePath) {
        this.filePath = filePath;
        this.rawData = null;
        this.parsedData = null;
        this.tournamentInfo = null;
    }

    // Load and parse Excel file
    async loadExcelFile() {
        try {
            console.log('Loading Excel file:', this.filePath);
            
            // Fetch the Excel file
            const response = await fetch(this.filePath);
            if (!response.ok) {
                throw new Error(`Failed to load Excel file: ${response.statusText}`);
            }
            
            const arrayBuffer = await response.arrayBuffer();
            
            // Parse using SheetJS (xlsx library)
            const workbook = XLSX.read(arrayBuffer, { type: 'array' });
            
            // Get the first sheet (Tour Rank 2025)
            const firstSheetName = workbook.SheetNames[0];
            const worksheet = workbook.Sheets[firstSheetName];
            
            // Convert to JSON
            this.rawData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
            
            console.log('Excel file loaded successfully. Rows:', this.rawData.length);
            
            // Parse the data
            this.parseData();
            
            return this.parsedData;
            
        } catch (error) {
            console.error('Error loading Excel file:', error);
            // Fallback to server-data.js if Excel loading fails
            console.log('Falling back to server-data.js');
            return this.useFallbackData();
        }
    }

    // Parse raw Excel data into structured format
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

        // Expected columns from image: Winners_Stage | Discord Name | Discord ID | Date | Tour Type
        // The tournament names appear to be in merged cells or separate rows
        
        for (let i = 0; i < this.rawData.length; i++) {
            const row = this.rawData[i];
            
            // Skip completely empty rows
            if (!row || row.length === 0) continue;

            // Check if this row contains a tournament name (usually in column 4 or spans multiple columns)
            // Tournament names like "The Japanese Duo", "Aerial Supremacy : RF TYPHOON", etc.
            if (row[4] && typeof row[4] === 'string' && row[4].length > 10 &&
                !row[1] && !row[2] && !row[3]) {
                // This appears to be a tournament name row
                currentTournamentName = row[4].trim();
                continue;
            }

            // Check if we have player data (Winners_Stage, Discord Name, Discord ID, Date, Tour Type)
            const winnersStage = row[0];
            const discordName = row[1];
            const discordId = row[2];
            const date = this.parseDate(row[3]);
            const tourType = row[4];

            // Skip header row and rows without essential data
            if (!discordName || discordName === 'Discord Name' || !winnersStage) continue;

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

            // Use current tournament name or create a generic one
            let tournamentName = currentTournamentName || `Tournament ${tournamentCounter}`;
            
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
                
                if (!currentTournamentName) {
                    tournamentCounter++;
                }
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
                // Add winner with position info
                const winnerInfo = {
                    name: discordName.trim(),
                    position: position
                };
                
                // Check if player already exists in winners list
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
        console.log('Sample tournaments:', tournamentInfo.slice(0, 3));
    }

    // Parse date from Excel format
    parseDate(dateValue) {
        if (!dateValue) return null;

        try {
            // If it's a string in YYYY-MM-DD format
            if (typeof dateValue === 'string' && dateValue.match(/^\d{4}-\d{2}-\d{2}$/)) {
                return dateValue;
            }

            // If it's an Excel date number
            if (typeof dateValue === 'number') {
                const excelDate = XLSX.SSF.parse_date_code(dateValue);
                const year = excelDate.y;
                const month = String(excelDate.m).padStart(2, '0');
                const day = String(excelDate.d).padStart(2, '0');
                return `${year}-${month}-${day}`;
            }

            // If it's a Date object
            if (dateValue instanceof Date) {
                const year = dateValue.getFullYear();
                const month = String(dateValue.getMonth() + 1).padStart(2, '0');
                const day = String(dateValue.getDate()).padStart(2, '0');
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

    // Filter tournament info by month
    filterTournamentInfoByMonth(month) {
        if (!this.tournamentInfo) return [];
        
        if (month === 'all') {
            return this.tournamentInfo;
        }

        return this.tournamentInfo.filter(tournament => {
            const tournamentMonth = tournament.date.split('-')[1];
            return tournamentMonth === month;
        });
    }

    // Filter by tour type
    filterByTourType(tourType) {
        if (!this.parsedData) return [];
        
        if (tourType === 'all') {
            return this.parsedData;
        }

        return this.parsedData.filter(entry => entry.tourType === tourType);
    }

    // Filter by date range
    filterByDateRange(startDate, endDate) {
        if (!this.parsedData) return [];

        return this.parsedData.filter(entry => {
            const entryDate = new Date(entry.date);
            const start = new Date(startDate);
            const end = new Date(endDate);
            return entryDate >= start && entryDate <= end;
        });
    }

    // Filter by year
    filterByYear(year) {
        if (!this.parsedData) return [];

        return this.parsedData.filter(entry => {
            const entryYear = entry.date.split('-')[0];
            return entryYear === String(year);
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
    module.exports = ExcelDataReader;
}