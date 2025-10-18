// Global variables
let currentFilter = 'all';
let allTournaments = [];
let csvReader = null;

// Pagination variables
let currentTournamentPage = 1;
let currentLeaderboardPage = 1;
const ITEMS_PER_PAGE = 10;

// CSV File Configuration
const CSV_FILE_PATH = 'Information Players ( M47W - Survivor ) - Tour Rank (2025).csv';
const USE_CSV_FILE = true; // Set to true to read from CSV, false to use server-data.js

// All available avatars
const allAvatars = [
    'Avatars/AvatarPortrait_AliceRichardson_Widget.png',
    'Avatars/AvatarPortrait_AmandaGarciaLee_Widget.png',
    'Avatars/AvatarPortrait_BeardyTrickster_Widget.png',
    'Avatars/AvatarPortrait_Centurion_Widget.png',
    'Avatars/AvatarPortrait_CesarMeyer_Widget.png',
    'Avatars/AvatarPortrait_ChristopherLee_Widget.png',
    'Avatars/AvatarPortrait_ChuanlinFu_Widget.png',
    'Avatars/AvatarPortrait_CommanderBar_lay_Widget.png',
    'Avatars/AvatarPortrait_Cuirassier_Widget.png',
    'Avatars/AvatarPortrait_DameofHearts_Widget.png',
    'Avatars/AvatarPortrait_GodofFortuneLNY24_Widget.png',
    'Avatars/AvatarPortrait_GoldHunt_legendary_Widget.png',
    'Avatars/AvatarPortrait_GoldHunt_epic_Widget.png',
    'Avatars/AvatarPortrait_GoldHunt_rare_Widget.png',
    'Avatars/AvatarPortrait_HambiCoal_Widget.png',
    'Avatars/AvatarPortrait_HarmonyKeeperLNY24_Widget.png',
    'Avatars/AvatarPortrait_JamesWhite_Widget.png',
    'Avatars/AvatarPortrait_Jinjoo_Widget.png',
    'Avatars/AvatarPortrait_JoHa_sano_Widget.png',
    'Avatars/AvatarPortrait_KorKoreto_Widget.png',
    'Avatars/AvatarPortrait_LadySenna_Widget.png',
    'Avatars/AvatarPortrait_LeeKyungSoo_Widget.png',
    'Avatars/AvatarPortrait_LongFei_Widget.png',
    'Avatars/AvatarPortrait_MinjiKang_Widget.png',
    'Avatars/AvatarPortrait_ModernMarine_Widget.png',
    'Avatars/AvatarPotrait_SakuraGirl_Widget.png'
];

// Player-specific avatar mapping (for known players)
const playerAvatars = {
    'alice': 'Avatars/AvatarPortrait_AliceRichardson_Widget.png',
    'commander': 'Avatars/AvatarPortrait_CommanderBar_lay_Widget.png',
    'centurion': 'Avatars/AvatarPortrait_Centurion_Widget.png',
    'senna': 'Avatars/AvatarPortrait_LadySenna_Widget.png',
    'marine': 'Avatars/AvatarPortrait_ModernMarine_Widget.png',
    'dame': 'Avatars/AvatarPortrait_DameofHearts_Widget.png',
    'fortune': 'Avatars/AvatarPortrait_GodofFortuneLNY24_Widget.png',
    'beardy': 'Avatars/AvatarPortrait_BeardyTrickster_Widget.png',
    'cuirassier': 'Avatars/AvatarPortrait_Cuirassier_Widget.png',
    'lee': 'Avatars/AvatarPortrait_LeeKyungSoo_Widget.png',
    'jinjoo': 'Avatars/AvatarPortrait_Jinjoo_Widget.png',
    'sakura': 'Avatars/AvatarPotrait_SakuraGirl_Widget.png',
    'amanda': 'Avatars/AvatarPortrait_AmandaGarciaLee_Widget.png',
    'cesar': 'Avatars/AvatarPortrait_CesarMeyer_Widget.png',
    'christopher': 'Avatars/AvatarPortrait_ChristopherLee_Widget.png',
    'chuanlin': 'Avatars/AvatarPortrait_ChuanlinFu_Widget.png',
    'hambi': 'Avatars/AvatarPortrait_HambiCoal_Widget.png',
    'harmony': 'Avatars/AvatarPortrait_HarmonyKeeperLNY24_Widget.png',
    'james': 'Avatars/AvatarPortrait_JamesWhite_Widget.png',
    'joha': 'Avatars/AvatarPortrait_JoHa_sano_Widget.png',
    'kor': 'Avatars/AvatarPortrait_KorKoreto_Widget.png',
    'longfei': 'Avatars/AvatarPortrait_LongFei_Widget.png',
    'minji': 'Avatars/AvatarPortrait_MinjiKang_Widget.png'
};

// Track used avatars to ensure variety
let usedAvatars = new Set();

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

// Populate champions grid
function populateChampions(data) {
    const grid = document.getElementById('championsGrid');
    
    // Reset used avatars for fresh variety
    usedAvatars.clear();
    
    // Calculate tournament participation and podium finishes per player
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
        
        // Award points based on position (1st = 3 points, 2nd = 2 points, 3rd = 1 point)
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
    
    // Sort by total points (1st place = 3 points, 2nd = 2 points, 3rd = 1 point)
    const topChampions = Object.values(playerStats).sort((a, b) => b.totalPoints - a.totalPoints).slice(0, 12);
    
    grid.innerHTML = topChampions.map(player => {
        const avatar = getAvatarForPlayer(player.name);
        const podiumText = `${player.firstPlace}🏆 ${player.secondPlace}🥈 ${player.thirdPlace}🥉`;
        return `
            <div class="champion-card">
                <img src="${avatar}" alt="${player.name}" class="champion-avatar" 
                     onerror="this.src='${defaultAvatar}'">
                <p class="champion-name">${player.name}</p>
                <div class="champion-stats">${podiumText}</div>
                <div class="champion-stats">${player.totalPoints} pts • ${player.tournaments} tours</div>
            </div>
        `;
    }).join('');
}

// Populate tournament history with filtering and pagination
function populateTournamentHistory(filter = 'all', page = 1) {
    const container = document.getElementById('tournamentHistory');
    
    // Get tournament info from CSV reader if available, otherwise from global variable
    let tournamentData = [];
    if (csvReader && csvReader.getTournamentInfo()) {
        tournamentData = csvReader.getTournamentInfo();
    } else if (typeof tournamentInfo !== 'undefined' && tournamentInfo.length > 0) {
        tournamentData = tournamentInfo;
    }
    
    if (tournamentData.length > 0) {
        allTournaments = tournamentData;
        
        // Filter tournaments by month
        let filteredTournaments = tournamentData;
        if (filter !== 'all') {
            filteredTournaments = tournamentData.filter(tournament => {
                const tournamentMonth = tournament.date.split('-')[1];
                return tournamentMonth === filter;
            });
        }
        
        if (filteredTournaments.length === 0) {
            container.innerHTML = `
                <div style="grid-column: 1 / -1; text-align: center; padding: 40px; color: #94a3b8;">
                    <h3>No tournaments found for this month</h3>
                    <p>Try selecting a different month or "All Months"</p>
                </div>
            `;
            return;
        }
        
        // Sort by date (newest first)
        filteredTournaments.sort((a, b) => new Date(b.date) - new Date(a.date));
        
        // Calculate pagination
        const totalPages = Math.ceil(filteredTournaments.length / ITEMS_PER_PAGE);
        const startIndex = (page - 1) * ITEMS_PER_PAGE;
        const endIndex = startIndex + ITEMS_PER_PAGE;
        const paginatedTournaments = filteredTournaments.slice(startIndex, endIndex);
        
        // Generate tournament cards
        const tournamentCards = paginatedTournaments.map(tournament => {
            const typeClass = tournament.type.toLowerCase().replace(' ', '');
            const typeShort = tournament.type.split(' ')[0];
            const tournamentDate = new Date(tournament.date);
            const monthName = tournamentDate.toLocaleDateString('en-US', { month: 'long' });
            const day = tournamentDate.getDate();
            const year = tournamentDate.getFullYear();
            
            return `
                <div class="tournament-card" data-month="${tournament.date.split('-')[1]}">
                    <h3 class="tournament-title">${tournament.name}</h3>
                    <div class="tournament-meta">
                        <span class="tournament-date">${monthName} ${day}, ${year}</span>
                        <span class="tournament-type ${typeClass}">${typeShort}</span>
                    </div>
                    <div class="winners-list">
                        ${tournament.winners.map((winner, index) => {
                            const winnerName = typeof winner === 'string' ? winner : winner.name;
                            const position = typeof winner === 'object' && winner.position ? winner.position : index + 1;
                            return `
                                <div class="winner-item">
                                    <div class="winner-position">#${position}</div>
                                    <div class="winner-name">${winnerName}</div>
                                </div>
                            `;
                        }).join('')}
                    </div>
                </div>
            `;
        }).join('');
        
        // Generate pagination controls
        const paginationControls = generatePaginationControls(page, totalPages, 'tournament');
        
        // Combine tournament cards and pagination
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
        const rankIcon = globalIndex < 3 ? 'Titles/Legend.png' : 
                        globalIndex < 5 ? 'Titles/Hero.png' : 
                        'Titles/Hero.png';
        
        const podiumFinishes = player.firstPlace + player.secondPlace + player.thirdPlace;
        const podiumRate = player.tournaments > 0 ? ((podiumFinishes / player.tournaments) * 100).toFixed(1) + '%' : '0%';
        
        return `
            <tr>
                <td>
                    <img src="${rankIcon}" alt="Rank ${globalIndex + 1}" class="rank-badge">
                    #${globalIndex + 1}
                </td>
                <td>${player.name}</td>
                <td>${player.totalPoints}</td>
                <td>${player.tournaments}</td>
                <td>${podiumRate}</td>
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
                        <th>TOTAL POINTS</th>
                        <th>TOURNAMENTS</th>
                        <th>PODIUM RATE</th>
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
    let stats;
    
    // Try to get stats from CSV reader if available
    if (csvReader && csvReader.getStatistics()) {
        stats = csvReader.getStatistics();
    } else {
        // Calculate stats manually
        const uniquePlayers = [...new Set(data.map(p => p.name))];
        const totalTournaments = [...new Set(data.map(p => p.tourName))].length;
        const totalPodiums = data.length; // Each entry is a podium finish (1st, 2nd, or 3rd)
        const champions = [...new Set(data.filter(p => p.position === 1).map(p => p.name))];
        
        stats = {
            activePlayers: uniquePlayers.length,
            totalTournaments: totalTournaments,
            totalPodiums: totalPodiums,
            totalChampions: champions.length
        };
    }
    
    animateValue('activePlayers', 0, stats.activePlayers, 2000);
    animateValue('totalTournaments', 0, stats.totalTournaments, 2000);
    animateValue('totalPodiums', 0, stats.totalPodiums, 2000);
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

// Setup month filter functionality
function setupMonthFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    
    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
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

// Load data from CSV file or fallback to local data
async function loadTournamentData() {
    try {
        console.log('Loading tournament data...');
        
        // Try to load from CSV file first if USE_CSV_FILE is true
        if (USE_CSV_FILE) {
            console.log('Attempting to load from CSV file:', CSV_FILE_PATH);
            
            if (!csvReader) {
                csvReader = new CSVDataReader(CSV_FILE_PATH);
            }
            
            const csvData = await csvReader.loadCSVFile();
            if (csvData && csvData.length > 0) {
                console.log('Successfully loaded CSV data:', csvData.length, 'entries');
                return csvData;
            }
        }
        
        // Fallback to local serverData if available
        if (typeof serverData !== 'undefined' && serverData.length > 0) {
            console.log('Using fallback data from server-data.js:', serverData.length, 'entries');
            return serverData;
        }
        
        // If no data found anywhere
        console.log('No tournament data found. Please check your CSV file or server-data.js');
        return [];
        
    } catch (error) {
        console.error('Error loading data:', error);
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
        populateTournamentHistory(currentFilter);
        populateLeaderboard(data);
        updateStats(data);
        updateLastUpdatedTime();
        
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

// Add scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

document.querySelectorAll('.animate-in').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(50px)';
    el.style.transition = 'all 0.8s ease-out';
    observer.observe(el);
});

// Initialize on page load
window.addEventListener('load', () => {
    console.log('Page loaded, initializing...');
    
    // Wait a bit for server-data.js to load
    setTimeout(() => {
        loadData();
        setupMonthFilters();
        setupAutoRefresh();
    }, 100);
});

