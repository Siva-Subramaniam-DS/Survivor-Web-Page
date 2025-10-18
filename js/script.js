// Global variables
let currentFilter = 'all';
let allTournaments = [];
let csvReader = null;
let csvData = []; // Store CSV parsed data

// Pagination variables
let currentTournamentPage = 1;
let currentLeaderboardPage = 1;
const ITEMS_PER_PAGE = 10;

// Data Configuration
const TOURNAMENT_DATA_PATH = 'data/tournament-data.json';
const CSV_FILE_PATH = 'data/Information Players ( M47W - Survivor ) - Tour Rank (2025).csv';
const CLEAN_JSON_PATH = 'data/tournament-data-clean.json';
const USE_CSV_FILE = true; // Set to true to use CSV, false to use JSON only

// All available avatars
const allAvatars = [
    'assets/images/avatars/AvatarPortrait_AliceRichardson_Widget.png',
    'assets/images/avatars/AvatarPortrait_AmandaGarciaLee_Widget.png',
    'assets/images/avatars/AvatarPortrait_BeardyTrickster_Widget.png',
    'assets/images/avatars/AvatarPortrait_Centurion_Widget.png',
    'assets/images/avatars/AvatarPortrait_CesarMeyer_Widget.png',
    'assets/images/avatars/AvatarPortrait_ChristopherLee_Widget.png',
    'assets/images/avatars/AvatarPortrait_ChuanlinFu_Widget.png',
    'assets/images/avatars/AvatarPortrait_CommanderBar_lay_Widget.png',
    'assets/images/avatars/AvatarPortrait_Cuirassier_Widget.png',
    'assets/images/avatars/AvatarPortrait_DameofHearts_Widget.png',
    'assets/images/avatars/AvatarPortrait_GodofFortuneLNY24_Widget.png',
    'assets/images/avatars/AvatarPortrait_GoldHunt_legendary_Widget.png',
    'assets/images/avatars/AvatarPortrait_GoldHunt_epic_Widget.png',
    'assets/images/avatars/AvatarPortrait_GoldHunt_rare_Widget.png',
    'assets/images/avatars/AvatarPortrait_HambiCoal_Widget.png',
    'assets/images/avatars/AvatarPortrait_HarmonyKeeperLNY24_Widget.png',
    'assets/images/avatars/AvatarPortrait_JamesWhite_Widget.png',
    'assets/images/avatars/AvatarPortrait_Jinjoo_Widget.png',
    'assets/images/avatars/AvatarPortrait_JoHa_sano_Widget.png',
    'assets/images/avatars/AvatarPortrait_KorKoreto_Widget.png',
    'assets/images/avatars/AvatarPortrait_LadySenna_Widget.png',
    'assets/images/avatars/AvatarPortrait_LeeKyungSoo_Widget.png',
    'assets/images/avatars/AvatarPortrait_LongFei_Widget.png',
    'assets/images/avatars/AvatarPortrait_MinjiKang_Widget.png',
    'assets/images/avatars/AvatarPortrait_ModernMarine_Widget.png',
    'assets/images/avatars/AvatarPotrait_SakuraGirl_Widget.png'
];

// Player-specific avatar mapping (for known players)
const playerAvatars = {
    'alice': 'assets/images/avatars/AvatarPortrait_AliceRichardson_Widget.png',
    'commander': 'assets/images/avatars/AvatarPortrait_CommanderBar_lay_Widget.png',
    'centurion': 'assets/images/avatars/AvatarPortrait_Centurion_Widget.png',
    'senna': 'assets/images/avatars/AvatarPortrait_LadySenna_Widget.png',
    'marine': 'assets/images/avatars/AvatarPortrait_ModernMarine_Widget.png',
    'dame': 'assets/images/avatars/AvatarPortrait_DameofHearts_Widget.png',
    'fortune': 'assets/images/avatars/AvatarPortrait_GodofFortuneLNY24_Widget.png',
    'beardy': 'assets/images/avatars/AvatarPortrait_BeardyTrickster_Widget.png',
    'cuirassier': 'assets/images/avatars/AvatarPortrait_Cuirassier_Widget.png',
    'lee': 'assets/images/avatars/AvatarPortrait_LeeKyungSoo_Widget.png',
    'jinjoo': 'assets/images/avatars/AvatarPortrait_Jinjoo_Widget.png',
    'sakura': 'assets/images/avatars/AvatarPotrait_SakuraGirl_Widget.png',
    'amanda': 'assets/images/avatars/AvatarPortrait_AmandaGarciaLee_Widget.png',
    'cesar': 'assets/images/avatars/AvatarPortrait_CesarMeyer_Widget.png',
    'christopher': 'assets/images/avatars/AvatarPortrait_ChristopherLee_Widget.png',
    'chuanlin': 'assets/images/avatars/AvatarPortrait_ChuanlinFu_Widget.png',
    'hambi': 'assets/images/avatars/AvatarPortrait_HambiCoal_Widget.png',
    'harmony': 'assets/images/avatars/AvatarPortrait_HarmonyKeeperLNY24_Widget.png',
    'james': 'assets/images/avatars/AvatarPortrait_JamesWhite_Widget.png',
    'joha': 'assets/images/avatars/AvatarPortrait_JoHa_sano_Widget.png',
    'kor': 'assets/images/avatars/AvatarPortrait_KorKoreto_Widget.png',
    'longfei': 'assets/images/avatars/AvatarPortrait_LongFei_Widget.png',
    'minji': 'assets/images/avatars/AvatarPortrait_MinjiKang_Widget.png'
};

// Track used avatars to ensure variety
let usedAvatars = new Set();

// Parse date from MM-DD-YYYY format (US format)
function parseDate(dateStr) {
    const [month, day, year] = dateStr.split('-');
    return new Date(year, parseInt(month) - 1, parseInt(day));
}

// Get avatar for player with variety
function getAvatarForPlayer(name) {
    const cleanName = name.toLowerCase().replace(/\s+/g, '');
    
    // First check if player has a specific avatar
    for (let key in playerAvatars) {
        if (cleanName.includes(key) || key.includes(cleanName)) {
            return playerAvatars[key];
        }
    }
    
    // If no specific avatar, assign one that hasn't been used recently
    const availableAvatars = allAvatars.filter(avatar => !usedAvatars.has(avatar));
    
    if (availableAvatars.length === 0) {
        // Reset if all avatars have been used
        usedAvatars.clear();
        return allAvatars[Math.floor(Math.random() * allAvatars.length)];
    }
    
    // Pick a random avatar from available ones
    const selectedAvatar = availableAvatars[Math.floor(Math.random() * availableAvatars.length)];
    usedAvatars.add(selectedAvatar);
    
    return selectedAvatar;
}

// Populate champions grid - Top 10 players by FIRST PLACE WINS for 2025
function populateChampions(data) {
    const grid = document.getElementById('championsGrid');
    
    // Reset used avatars for fresh variety
    usedAvatars.clear();
    
    console.log('Populating champions with data entries:', data.length);
    
    // Count wins and tournament participations per player
    const playerStats = {};
    data.forEach(entry => {
        const playerName = entry.name;
        const position = parseInt(entry.position);
        
        if (!playerStats[playerName]) {
            playerStats[playerName] = {
                name: playerName,
                totalTournaments: 0,
                firstPlace: 0,
                secondPlace: 0,
                thirdPlace: 0,
                fourthPlace: 0
            };
        }
        
        // Count total tournaments participated
        playerStats[playerName].totalTournaments++;
        
        // Count by position
        if (position === 1) {
            playerStats[playerName].firstPlace++;
        } else if (position === 2) {
            playerStats[playerName].secondPlace++;
        } else if (position === 3) {
            playerStats[playerName].thirdPlace++;
        } else if (position === 4) {
            playerStats[playerName].fourthPlace++;
        }
    });
    
    console.log('Player stats calculated:', Object.keys(playerStats).length, 'players');
    
    // Sort by FIRST PLACE WINS (primary), then total tournaments (secondary)
    const topPlayers = Object.values(playerStats)
        .filter(player => player.firstPlace > 0) // Only show players with at least 1 win
        .sort((a, b) => {
            if (b.firstPlace !== a.firstPlace) {
                return b.firstPlace - a.firstPlace; // Sort by wins first
            }
            return b.totalTournaments - a.totalTournaments; // Then by total tournaments
        })
        .slice(0, 10);
    
    console.log('Top 10 winners:', topPlayers.map(p => `${p.name}: ${p.firstPlace} wins`));
    
    if (topPlayers.length === 0) {
        grid.innerHTML = `
            <div style="grid-column: 1 / -1; text-align: center; padding: 40px; color: #94a3b8;">
                <h3>No champions data available</h3>
                <p>Win data will appear here</p>
            </div>
        `;
        return;
    }
    
    grid.innerHTML = topPlayers.map((player, index) => {
        const avatar = getAvatarForPlayer(player.name);
        const rankDisplay = index + 1;
        const winsText = player.firstPlace === 1 ? '1 Win' : `${player.firstPlace} Wins`;
        
        // Get unit icon based on rank
        let rankUnitIcon;
        if (index === 0) {
            rankUnitIcon = 'assets/images/units/Carrier.png'; // Rank 1
        } else if (index === 1) {
            rankUnitIcon = 'assets/images/units/Battleship.png'; // Rank 2
        } else if (index === 2) {
            rankUnitIcon = 'assets/images/units/AssaultCarrier.png'; // Rank 3
        } else if (index < 5) {
            rankUnitIcon = 'assets/images/units/Cruiser.png'; // Rank 4-5
        } else if (index < 10) {
            rankUnitIcon = 'assets/images/units/Destroyer.png'; // Rank 6-10
        } else {
            rankUnitIcon = 'assets/images/units/Frigate.png'; // Rank 11+
        }
        
        // Build placement breakdown
        const placements = [];
        if (player.firstPlace > 0) placements.push(`🥇${player.firstPlace}`);
        if (player.secondPlace > 0) placements.push(`🥈${player.secondPlace}`);
        if (player.thirdPlace > 0) placements.push(`🥉${player.thirdPlace}`);
        if (player.fourthPlace > 0) placements.push(`4️⃣${player.fourthPlace}`);
        const placementText = placements.join(' ');
        
        return `
            <div class="champion-card">
                <div class="champion-rank">
                    <img src="${rankUnitIcon}" alt="Rank ${rankDisplay}" class="rank-unit-icon">
                    #${rankDisplay}
                </div>
                <img src="${avatar}" alt="${player.name}" class="champion-avatar" 
                     onerror="this.src='assets/images/avatars/AvatarPortrait_ModernMarine_Widget.png'">
                <p class="champion-name">${player.name}</p>
                <div class="champion-stats">🏆 ${winsText}</div>
                <div class="champion-stats">${placementText}</div>
                <div class="champion-stats">${player.totalTournaments} Total Tournaments</div>
            </div>
        `;
    }).join('');
}

// Populate tournament history with conditional pagination
function populateTournamentHistory(filter = 'all', page = 1) {
    const container = document.getElementById('tournamentHistory');
    
    // Get tournament info from JSON data
    let tournamentData = [];
    if (allTournaments && allTournaments.length > 0) {
        tournamentData = allTournaments;
    }
    
    if (tournamentData.length > 0) {
        // Group tournaments by date and name to get unique tournaments
        const tournamentMap = new Map();
        
        tournamentData.forEach(entry => {
            const tourName = entry.tourName || entry.tour_name || '';
            const tourType = entry.tourType || entry.tour_type || 'Main Tour';
            
            // Use date as the primary key, and find the best tournament name for this date
            const dateKey = entry.date;
            
            if (!tournamentMap.has(dateKey)) {
                tournamentMap.set(dateKey, {
                    date: entry.date,
                    tourName: tourName, // Will be updated if we find a better name
                    tourType: tourType,
                    winners: []
                });
            }
            
            // If this entry has a tournament name and the current one is empty, update it
            const currentTournament = tournamentMap.get(dateKey);
            if (tourName && tourName.trim() !== '' && (!currentTournament.tourName || currentTournament.tourName.trim() === '')) {
                currentTournament.tourName = tourName;
                currentTournament.tourType = tourType;
            }
            
            currentTournament.winners.push({
                name: entry.name,
                position: entry.position
            });
        });
        
        // Convert map to array and sort winners by position
        let uniqueTournaments = Array.from(tournamentMap.values()).map(tournament => {
            tournament.winners.sort((a, b) => a.position - b.position);
            return tournament;
        });
        
        // Filter tournaments by month
        let filteredTournaments = uniqueTournaments;
        if (filter !== 'all') {
            filteredTournaments = uniqueTournaments.filter(tournament => {
                // Date format is MM-DD-YYYY (US format)
                const [month, day, year] = tournament.date.split('-');
                const paddedMonth = month.padStart(2, '0');
                return paddedMonth === filter;
            });
        }
        
        if (filteredTournaments.length === 0) {
            container.innerHTML = `
                <div style="grid-column: 1 / -1; text-align: center; padding: 40px; color: #94a3b8;">
                    <h3>No tournaments found for this month</h3>
                    <p>Try selecting a different month or "All Tournaments"</p>
                </div>
            `;
            return;
        }
        
        // Sort by date (newest first)
        filteredTournaments.sort((a, b) => {
            const dateA = parseDate(a.date);
            const dateB = parseDate(b.date);
            return dateB - dateA;
        });
        
        // Apply pagination only for "All Tournaments"
        let tournamentsToShow = filteredTournaments;
        let totalPages = 1;
        
        if (filter === 'all') {
            // Pagination for "All Tournaments" - 6 tournaments per page
            totalPages = Math.ceil(filteredTournaments.length / 6);
            const startIndex = (page - 1) * 6;
            const endIndex = startIndex + 6;
            tournamentsToShow = filteredTournaments.slice(startIndex, endIndex);
        }
        
        // Generate tournament cards
        const tournamentCards = tournamentsToShow.map(tournament => {
            const typeClass = tournament.tourType.toLowerCase().replace(/\s+/g, '-');
            const typeShort = tournament.tourType.split(' ')[0];
            // Date format is MM-DD-YYYY (US format)
            const [month, day, year] = tournament.date.split('-');
            const tournamentDate = new Date(year, month - 1, day);
            const monthName = tournamentDate.toLocaleDateString('en-US', { month: 'long' });
            
            // Build winners list (top 3)
            const winnersList = tournament.winners.slice(0, 3).map(winner => {
                const medals = ['🥇', '🥈', '🥉'];
                return `
                    <div class="winner-item">
                        <div class="winner-position">${medals[winner.position - 1] || `#${winner.position}`}</div>
                        <div class="winner-name">${winner.name}</div>
                    </div>
                `;
            }).join('');
            
            return `
                <div class="tournament-card" data-month="${month.padStart(2, '0')}">
                    <h3 class="tournament-title">${tournament.tourName || `Tournament ${monthName} ${parseInt(day)}`}</h3>
                    <div class="tournament-meta">
                        <span class="tournament-date">${monthName} ${parseInt(day)}, ${year}</span>
                        <span class="tournament-type ${typeClass}">${typeShort}</span>
                    </div>
                    <div class="winners-list">
                        ${winnersList}
                    </div>
                </div>
            `;
        }).join('');
        
        // Add pagination controls only for "All Tournaments"
        let paginationControls = '';
        if (filter === 'all' && totalPages > 1) {
            paginationControls = generatePaginationControls(page, totalPages, 'tournament');
        }
        
        // Display tournament cards with conditional pagination
        container.innerHTML = tournamentCards + paginationControls;
        
    } else {
        container.innerHTML = `
            <div style="grid-column: 1 / -1; text-align: center; padding: 40px; color: #94a3b8;">
                <h3>No tournament data available</h3>
                <p>Make sure server-data.js is loaded correctly</p>
            </div>
        `;
    }
}

// Generate pagination controls
function generatePaginationControls(currentPage, totalPages, type) {
    if (totalPages <= 1) return '';
    
    let controls = '<div class="pagination-container">';
    
    // Previous button
    if (currentPage > 1) {
        controls += `<button class="pagination-btn" onclick="changePage('${type}', ${currentPage - 1})">← Previous</button>`;
    }
    
    // Page numbers
    const startPage = Math.max(1, currentPage - 2);
    const endPage = Math.min(totalPages, currentPage + 2);
    
    if (startPage > 1) {
        controls += `<button class="pagination-btn" onclick="changePage('${type}', 1)">1</button>`;
        if (startPage > 2) {
            controls += '<span class="pagination-ellipsis">...</span>';
        }
    }
    
    for (let i = startPage; i <= endPage; i++) {
        const activeClass = i === currentPage ? 'active' : '';
        controls += `<button class="pagination-btn ${activeClass}" onclick="changePage('${type}', ${i})">${i}</button>`;
    }
    
    if (endPage < totalPages) {
        if (endPage < totalPages - 1) {
            controls += '<span class="pagination-ellipsis">...</span>';
        }
        controls += `<button class="pagination-btn" onclick="changePage('${type}', ${totalPages})">${totalPages}</button>`;
    }
    
    // Next button
    if (currentPage < totalPages) {
        controls += `<button class="pagination-btn" onclick="changePage('${type}', ${currentPage + 1})">Next →</button>`;
    }
    
    controls += '</div>';
    return controls;
}

// Change page function
function changePage(type, page) {
    if (type === 'tournament') {
        currentTournamentPage = page;
        populateTournamentHistory(currentFilter, page);
    } else if (type === 'leaderboard') {
        currentLeaderboardPage = page;
        populateLeaderboard(null, page);
    }
}

// Populate leaderboard table with pagination
function populateLeaderboard(data, page = 1) {
    const tbody = document.getElementById('leaderboardBody');
    
    // Calculate tournament stats per player
    const playerStats = {};
    data.forEach(entry => {
        if (!playerStats[entry.name]) {
            playerStats[entry.name] = { 
                name: entry.name, 
                tournaments: 0, 
                firstPlace: 0, 
                secondPlace: 0, 
                thirdPlace: 0,
                totalPoints: 0
            };
        }
        playerStats[entry.name].tournaments++;
        
        // Award points based on position
        if (entry.position === 1) {
            playerStats[entry.name].firstPlace++;
            playerStats[entry.name].totalPoints += 3;
        } else if (entry.position === 2) {
            playerStats[entry.name].secondPlace++;
            playerStats[entry.name].totalPoints += 2;
        } else if (entry.position === 3) {
            playerStats[entry.name].thirdPlace++;
            playerStats[entry.name].totalPoints += 1;
        }
    });
    
    // Sort by total points (tournament ranking system)
    const sortedData = Object.values(playerStats).sort((a, b) => b.totalPoints - a.totalPoints);
    
    // Calculate pagination
    const totalPages = Math.ceil(sortedData.length / ITEMS_PER_PAGE);
    const startIndex = (page - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    const paginatedData = sortedData.slice(startIndex, endIndex);
    
    // Generate table rows
    const tableRows = paginatedData.map((player, index) => {
        const globalIndex = startIndex + index; // Global rank
        
        // Use unit materials as rank icons based on rank
        let rankIcon;
        if (globalIndex === 0) {
            rankIcon = 'assets/images/units/Carrier.png'; // Rank 1 - Carrier (highest)
        } else if (globalIndex === 1) {
            rankIcon = 'assets/images/units/Battleship.png'; // Rank 2 - Battleship
        } else if (globalIndex === 2) {
            rankIcon = 'assets/images/units/AssaultCarrier.png'; // Rank 3 - AssaultCarrier
        } else if (globalIndex < 5) {
            rankIcon = 'assets/images/units/Cruiser.png'; // Rank 4-5 - Cruiser
        } else if (globalIndex < 10) {
            rankIcon = 'assets/images/units/Destroyer.png'; // Rank 6-10 - Destroyer
        } else if (globalIndex < 20) {
            rankIcon = 'assets/images/units/Frigate.png'; // Rank 11-20 - Frigate
        } else {
            rankIcon = 'assets/images/units/Corvette.png'; // Rank 21+ - Corvette
        }
        
        return `
            <tr>
                <td>
                    <img src="${rankIcon}" alt="Rank ${globalIndex + 1}" class="rank-badge">
                    #${globalIndex + 1}
                </td>
                <td>${player.name}</td>
                <td>${player.tournaments}</td>
            </tr>
        `;
    }).join('');
    
    // Generate pagination controls
    const paginationControls = generatePaginationControls(page, totalPages, 'leaderboard');
    
    // Update the table container to include pagination
    const tableContainer = document.querySelector('.tournament-table-container');
    if (tableContainer) {
        tableContainer.innerHTML = `
            <table class="tournament-table">
                <thead>
                    <tr>
                        <th>RANK</th>
                        <th>DISCORD NAME</th>
                        <th>TOURNAMENTS</th>
                    </tr>
                </thead>
                <tbody id="leaderboardBody">
                    ${tableRows}
                </tbody>
            </table>
            ${paginationControls}
        `;
    } else {
        tbody.innerHTML = tableRows;
    }
}

// Update stats in header
function updateStats(data) {
    // Calculate stats
    // Group unique tournaments by date + name
    const uniqueTournaments = new Set();
    data.forEach(entry => {
        const tourName = entry.tourName || entry.tour_name || 'Tournament';
        const key = `${entry.date}_${tourName}`;
        uniqueTournaments.add(key);
    });
    
    const stats = {
        activePlayers: 11210, // Hardcoded as requested
        totalTournaments: uniqueTournaments.size, // Count unique tournaments
        totalChampions: [...new Set(data.filter(p => p.position === 1).map(p => p.name))].length // Count unique winners
    };
    
    animateValue('activePlayers', 0, stats.activePlayers, 2000);
    animateValue('totalTournaments', 0, stats.totalTournaments, 2000);
    animateValue('totalChampions', 0, stats.totalChampions, 2000);
}

// Animate counter values
function animateValue(elementId, start, end, duration) {
    const element = document.getElementById(elementId);
    if (!element) return;
    
    let startTimestamp = null;
    
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        const value = Math.floor(progress * (end - start) + start);
        element.textContent = value;
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
}

// Update month filter buttons with tournament counts
function updateMonthFilterCounts() {
    if (!allTournaments || allTournaments.length === 0) return;
    
    // Count unique tournaments per month
    const monthCounts = {};
    const monthTournaments = new Map();
    
    allTournaments.forEach(entry => {
        // Date format is MM-DD-YYYY (US format)
        const [month, day, year] = entry.date.split('-');
        const paddedMonth = month.padStart(2, '0');
        
        // Use date as key (not date + name) to avoid splitting tournaments
        const key = entry.date;
        
        if (!monthTournaments.has(paddedMonth)) {
            monthTournaments.set(paddedMonth, new Set());
        }
        monthTournaments.get(paddedMonth).add(key);
    });
    
    // Convert to counts
    monthTournaments.forEach((tournaments, month) => {
        monthCounts[month] = tournaments.size;
    });
    
    // Update button text with counts
    const filterButtons = document.querySelectorAll('.filter-btn');
    filterButtons.forEach(btn => {
        const month = btn.getAttribute('data-month');
        if (month === 'all') {
            const totalTournaments = new Set(allTournaments.map(e => e.date)).size;
            btn.innerHTML = `All Tournaments <span class="month-count">(${totalTournaments})</span>`;
        } else {
            const count = monthCounts[month] || 0;
            const monthName = btn.textContent.split('(')[0].trim(); // Preserve original name
            
            if (count > 0) {
                btn.innerHTML = `${monthName} <span class="month-count">(${count})</span>`;
                btn.disabled = false;
                btn.classList.remove('disabled');
            } else {
                btn.innerHTML = `${monthName} <span class="month-count-zero">(0)</span>`;
                btn.disabled = true;
                btn.classList.add('disabled');
            }
        }
    });
}

// Setup month filter functionality
function setupMonthFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    
    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            // Don't allow clicking disabled buttons
            if (btn.disabled) return;
            
            // Remove active class from all buttons
            filterButtons.forEach(b => b.classList.remove('active'));
            
            // Add active class to clicked button
            btn.classList.add('active');
            
            // Get the month filter value
            const month = btn.getAttribute('data-month');
            currentFilter = month;
            currentTournamentPage = 1; // Reset to first page when changing filter
            
            // Update tournament display
            populateTournamentHistory(month, 1);
            
            // Update last updated timestamp
            updateLastUpdatedTime();
        });
    });
}

// Update last updated timestamp
function updateLastUpdatedTime() {
    const timestampElement = document.getElementById('lastUpdated');
    if (!timestampElement) return;
    
    const now = new Date();
    const timeString = now.toLocaleString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    });
    timestampElement.textContent = timeString;
}

// Auto-refresh functionality
function setupAutoRefresh() {
    // Update timestamp every 30 seconds
    setInterval(updateLastUpdatedTime, 30000);
    
    // Refresh data every 5 minutes (300000 ms)
    setInterval(() => {
        console.log('Auto-refreshing tournament data...');
        loadData();
        updateLastUpdatedTime();
    }, 300000);
}

// Load tournament data from CSV or JSON
async function loadTournamentData() {
    const loadingEl = document.querySelector('.loading');
    if (loadingEl) loadingEl.style.display = 'flex';

    try {
        let tournaments = [];
        
        // Priority 1: Try clean JSON file (Python-parsed, most reliable)
        try {
            console.log('Attempting to load clean JSON:', CLEAN_JSON_PATH);
            const cleanRes = await fetch(CLEAN_JSON_PATH);
            
            if (cleanRes.ok) {
                const cleanData = await cleanRes.json();
                if (Array.isArray(cleanData) && cleanData.length > 0) {
                    console.log('✅ Clean JSON loaded successfully:', cleanData.length, 'entries');
                    tournaments = cleanData;
                    csvData = cleanData;
                }
            }
        } catch (cleanJsonError) {
            console.log('Clean JSON not available, trying other sources...');
        }
        
        // Priority 2: Try loading from CSV file if enabled and clean JSON didn't work
        if (tournaments.length === 0 && USE_CSV_FILE) {
            try {
                console.log('Loading data from CSV:', CSV_FILE_PATH);
                
                // Initialize CSV reader if not already done
                if (!csvReader) {
                    csvReader = new CSVDataReader(CSV_FILE_PATH);
                }
                
                // Load CSV data
                const csvParsedData = await csvReader.loadCSVFile();
                
                if (csvParsedData && csvParsedData.length > 0) {
                    console.log('CSV loaded successfully:', csvParsedData.length, 'entries');
                    tournaments = csvParsedData;
                    csvData = csvParsedData; // Store globally
                }
            } catch (csvError) {
                console.error('CSV loading failed, trying JSON fallback:', csvError);
            }
        }
        
        // Priority 3: Try structured JSON from data folder
        if (tournaments.length === 0) {
            console.log('Attempting to fetch tournament data from JSON:', TOURNAMENT_DATA_PATH);
            try {
                const res = await fetch(TOURNAMENT_DATA_PATH);
                
                if (res.ok) {
                    const json = await res.json();
                    // Convert JSON month/week structure to flat array
                    for (const [monthYear, weeks] of Object.entries(json)) {
                        for (const [week, entries] of Object.entries(weeks)) {
                            if (Array.isArray(entries)) {
                                tournaments.push(...entries);
                            }
                        }
                    }
                    console.log('Loaded tournament data from JSON:', tournaments.length, 'entries');
                }
            } catch (jsonError) {
                console.error('JSON loading also failed:', jsonError);
            }
        }
        
        if (tournaments.length === 0) {
            throw new Error('No data could be loaded from any source (Clean JSON, CSV, or JSON)');
        }

        // Store the tournaments globally
        allTournaments = tournaments;
        
        if (loadingEl) loadingEl.style.display = 'none';
        return tournaments;
    } catch (error) {
        console.error('Error loading tournament data:', error);
        if (loadingEl) {
            loadingEl.innerHTML = `
                <p>Error loading tournament data. Please try refreshing the page.</p>
                <button onclick="refreshData()" class="refresh-btn">
                    <span class="btn-icon">🔄</span>
                    RETRY
                </button>
            `;
        }
        return [];
    }
}

// Excel to JSON converter helper function
function convertExcelDataToJson() {
    // This function would be used if we had an Excel parser
    // For now, we'll use the manual data in server-data.js
    console.log('Excel file conversion would happen here');
    console.log('Currently using manual data from server-data.js');
    return null;
}

// Load all data
async function loadData() {
    try {
        const data = await loadTournamentData();
        
        if (data.length === 0) {
            console.error('No tournament data found!');
            return;
        }
        
        console.log('Loading data:', data.length, 'tournament entries');
        
        populateChampions(data);
        populateTournamentHistory(currentFilter, currentTournamentPage);
        // populateLeaderboard(data); // Removed - no leaderboard section in HTML
        updateStats(data);
        updateLastUpdatedTime();
        updateMonthFilterCounts(); // Update month filter buttons with counts
        
    } catch (error) {
        console.error('Error loading data:', error);
    }
}

// Refresh data function (called by refresh button)
function refreshData() {
    console.log('Manual refresh triggered...');
    loadData();
    updateLastUpdatedTime();
    // Show refresh feedback
    const refreshBtn = document.querySelector('button[onclick="refreshData()"]');
    if (refreshBtn) {
        const originalText = refreshBtn.textContent;
        refreshBtn.textContent = '✅ UPDATED';
        refreshBtn.style.background = 'linear-gradient(135deg, #10b981, #059669)';

        setTimeout(() => {
            refreshBtn.textContent = originalText;
            refreshBtn.style.background = 'linear-gradient(135deg, #10b981, #059669)';
        }, 2000);
    }
}

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('Initializing tournament hub...');
    setupMonthFilters();
    setupAutoRefresh();
});
