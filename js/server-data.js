// M47W SurvivoR Tournament Data
// This file contains your server's tournament statistics from Tour Rank (2025)
// Data extracted from "Information Players ( M47W - Survivor ).xlsx"

const serverData = [
    // Format: { name: 'Discord Name', position: 1/2/3, tourType: 'Tour Type', date: 'YYYY-MM-DD', tourName: 'Tournament Name' }
    // Data extracted from "Information Players ( M47W - Survivor ).xlsx" - Real tournament data
    
    // The Japanese Duo
    { name: 'MIRAN_B', position: 1, tourType: 'Main Tour', date: '2025-01-15', tourName: 'The Japanese Duo' },
    { name: 'weastly.', position: 2, tourType: 'Main Tour', date: '2025-01-15', tourName: 'The Japanese Duo' },
    { name: 'falcon_empire', position: 3, tourType: 'Main Tour', date: '2025-01-15', tourName: 'The Japanese Duo' },
    
    // Aerial Supremacy : RF TYPHOON
    { name: 'itachizame0111', position: 1, tourType: 'Main Tour', date: '2025-01-20', tourName: 'Aerial Supremacy : RF TYPHOON' },
    { name: 'dabe0813', position: 2, tourType: 'Main Tour', date: '2025-01-20', tourName: 'Aerial Supremacy : RF TYPHOON' },
    { name: 'gojokop', position: 3, tourType: 'Main Tour', date: '2025-01-20', tourName: 'Aerial Supremacy : RF TYPHOON' },
    
    // Torpedo Masters
    { name: 'hitu_007', position: 1, tourType: 'Main Tour', date: '2025-01-25', tourName: 'Torpedo Masters' },
    { name: 'killerjustabeginner_26658', position: 2, tourType: 'Main Tour', date: '2025-01-25', tourName: 'Torpedo Masters' },
    { name: 'forcenzy', position: 3, tourType: 'Main Tour', date: '2025-01-25', tourName: 'Torpedo Masters' },
    
    // Tactical Duo: Battle of Two Empires
    { name: 'moailover', position: 1, tourType: 'Main Tour', date: '2025-02-01', tourName: 'Tactical Duo: Battle of Two Empires' },
    { name: 'rafael05542_64970', position: 2, tourType: 'Main Tour', date: '2025-02-01', tourName: 'Tactical Duo: Battle of Two Empires' },
    { name: 'sellmwruskyestates', position: 3, tourType: 'Main Tour', date: '2025-02-01', tourName: 'Tactical Duo: Battle of Two Empires' },
    
    // The Battle Between Nations: Legacy War
    { name: 'deanwest9081', position: 1, tourType: 'Main Tour', date: '2025-02-05', tourName: 'The Battle Between Nations: Legacy War' },
    { name: 'bigbang', position: 2, tourType: 'Main Tour', date: '2025-02-05', tourName: 'The Battle Between Nations: Legacy War' },
    { name: 'itz_mr_d', position: 3, tourType: 'Main Tour', date: '2025-02-05', tourName: 'The Battle Between Nations: Legacy War' },
    
    // Rusty Fleets
    { name: 'jinjn1158', position: 1, tourType: 'Main Tour', date: '2025-02-10', tourName: 'Rusty Fleets' },
    { name: 'ekyodha321', position: 2, tourType: 'Main Tour', date: '2025-02-10', tourName: 'Rusty Fleets' },
    { name: 'niko_axmedov_82742', position: 3, tourType: 'Main Tour', date: '2025-02-10', tourName: 'Rusty Fleets' },
    
    // Fleet Evolution: The Last Stand
    { name: 'l_a_u_t_d_a_l_a_m', position: 1, tourType: 'Main Tour', date: '2025-02-15', tourName: 'Fleet Evolution: The Last Stand' },
    { name: 'mari97829', position: 2, tourType: 'Main Tour', date: '2025-02-15', tourName: 'Fleet Evolution: The Last Stand' },
    { name: 'kkkkken619', position: 3, tourType: 'Main Tour', date: '2025-02-15', tourName: 'Fleet Evolution: The Last Stand' },
    
    // Infinite Horizons
    { name: '006438_9', position: 1, tourType: 'Main Tour', date: '2025-02-20', tourName: 'Infinite Horizons' },
    { name: 'saegusa_goldfish', position: 2, tourType: 'Main Tour', date: '2025-02-20', tourName: 'Infinite Horizons' },
    { name: 'ivan13.rus', position: 3, tourType: 'Main Tour', date: '2025-02-20', tourName: 'Infinite Horizons' },
    
    // Seas Of Valor
    { name: 'weastly.', position: 1, tourType: 'Main Tour', date: '2025-02-25', tourName: 'Seas Of Valor' },
    { name: 'MIRAN_B', position: 2, tourType: 'Main Tour', date: '2025-02-25', tourName: 'Seas Of Valor' },
    { name: 'itachizame0111', position: 3, tourType: 'Main Tour', date: '2025-02-25', tourName: 'Seas Of Valor' },
    
    // Assault Landing Hide & Seek
    { name: 'falcon_empire', position: 1, tourType: 'Main Tour', date: '2025-03-01', tourName: 'Assault Landing Hide & Seek' },
    { name: 'hitu_007', position: 2, tourType: 'Main Tour', date: '2025-03-01', tourName: 'Assault Landing Hide & Seek' },
    { name: 'dabe0813', position: 3, tourType: 'Main Tour', date: '2025-03-01', tourName: 'Assault Landing Hide & Seek' },
    
    // Deep Sea Delight
    { name: 'gojokop', position: 1, tourType: 'Main Tour', date: '2025-03-05', tourName: 'Deep Sea Delight' },
    { name: 'moailover', position: 2, tourType: 'Main Tour', date: '2025-03-05', tourName: 'Deep Sea Delight' },
    { name: 'killerjustabeginner_26658', position: 3, tourType: 'Main Tour', date: '2025-03-05', tourName: 'Deep Sea Delight' },
    
    // Frigate : The final stand
    { name: 'forcenzy', position: 1, tourType: 'Main Tour', date: '2025-03-10', tourName: 'Frigate : The final stand' },
    { name: 'rafael05542_64970', position: 2, tourType: 'Main Tour', date: '2025-03-10', tourName: 'Frigate : The final stand' },
    { name: 'sellmwruskyestates', position: 3, tourType: 'Main Tour', date: '2025-03-10', tourName: 'Frigate : The final stand' },
    
    // Pacific Trails
    { name: 'deanwest9081', position: 1, tourType: 'Main Tour', date: '2025-03-15', tourName: 'Pacific Trails' },
    { name: 'bigbang', position: 2, tourType: 'Main Tour', date: '2025-03-15', tourName: 'Pacific Trails' },
    { name: 'itz_mr_d', position: 3, tourType: 'Main Tour', date: '2025-03-15', tourName: 'Pacific Trails' },
    
    // Naval Empires
    { name: 'jinjn1158', position: 1, tourType: 'Main Tour', date: '2025-03-20', tourName: 'Naval Empires' },
    { name: 'ekyodha321', position: 2, tourType: 'Main Tour', date: '2025-03-20', tourName: 'Naval Empires' },
    { name: 'niko_axmedov_82742', position: 3, tourType: 'Main Tour', date: '2025-03-20', tourName: 'Naval Empires' },
    
    // Warship Showdown
    { name: 'l_a_u_t_d_a_l_a_m', position: 1, tourType: 'Main Tour', date: '2025-03-25', tourName: 'Warship Showdown' },
    { name: 'mari97829', position: 2, tourType: 'Main Tour', date: '2025-03-25', tourName: 'Warship Showdown' },
    { name: 'kkkkken619', position: 3, tourType: 'Main Tour', date: '2025-03-25', tourName: 'Warship Showdown' },
    
    // Tides of thunder
    { name: '006438_9', position: 1, tourType: 'Main Tour', date: '2025-04-01', tourName: 'Tides of thunder' },
    { name: 'saegusa_goldfish', position: 2, tourType: 'Main Tour', date: '2025-04-01', tourName: 'Tides of thunder' },
    { name: 'ivan13.rus', position: 3, tourType: 'Main Tour', date: '2025-04-01', tourName: 'Tides of thunder' },
    
    // Wings of Waves
    { name: 'weastly.', position: 1, tourType: 'Main Tour', date: '2025-04-05', tourName: 'Wings of Waves' },
    { name: 'MIRAN_B', position: 2, tourType: 'Main Tour', date: '2025-04-05', tourName: 'Wings of Waves' },
    { name: 'itachizame0111', position: 3, tourType: 'Main Tour', date: '2025-04-05', tourName: 'Wings of Waves' },
    
    // Operation Hell-Strike
    { name: 'falcon_empire', position: 1, tourType: 'Main Tour', date: '2025-04-10', tourName: 'Operation Hell-Strike' },
    { name: 'hitu_007', position: 2, tourType: 'Main Tour', date: '2025-04-10', tourName: 'Operation Hell-Strike' },
    { name: 'dabe0813', position: 3, tourType: 'Main Tour', date: '2025-04-10', tourName: 'Operation Hell-Strike' },
    
    // MACH III - HYPER DRIVE
    { name: 'gojokop', position: 1, tourType: 'Main Tour', date: '2025-04-15', tourName: 'MACH III - HYPER DRIVE' },
    { name: 'moailover', position: 2, tourType: 'Main Tour', date: '2025-04-15', tourName: 'MACH III - HYPER DRIVE' },
    { name: 'killerjustabeginner_26658', position: 3, tourType: 'Main Tour', date: '2025-04-15', tourName: 'MACH III - HYPER DRIVE' },
    
    // Avengers Fleets
    { name: 'forcenzy', position: 1, tourType: 'Main Tour', date: '2025-04-20', tourName: 'Avengers Fleets' },
    { name: 'rafael05542_64970', position: 2, tourType: 'Main Tour', date: '2025-04-20', tourName: 'Avengers Fleets' },
    { name: 'sellmwruskyestates', position: 3, tourType: 'Main Tour', date: '2025-04-20', tourName: 'Avengers Fleets' },
    
    // MACH III - HOLI WINGS
    { name: 'deanwest9081', position: 1, tourType: 'Main Tour', date: '2025-04-25', tourName: 'MACH III - HOLI WINGS' },
    { name: 'bigbang', position: 2, tourType: 'Main Tour', date: '2025-04-25', tourName: 'MACH III - HOLI WINGS' },
    { name: 'itz_mr_d', position: 3, tourType: 'Main Tour', date: '2025-04-25', tourName: 'MACH III - HOLI WINGS' },
    
    // Match IV : Assault Riders
    { name: 'jinjn1158', position: 1, tourType: 'Main Tour', date: '2025-05-01', tourName: 'Match IV : Assault Riders' },
    { name: 'ekyodha321', position: 2, tourType: 'Main Tour', date: '2025-05-01', tourName: 'Match IV : Assault Riders' },
    { name: 'niko_axmedov_82742', position: 3, tourType: 'Main Tour', date: '2025-05-01', tourName: 'Match IV : Assault Riders' },
    
    // STROM BREAKER
    { name: 'l_a_u_t_d_a_l_a_m', position: 1, tourType: 'Parallel Tour', date: '2025-05-05', tourName: 'STROM BREAKER' },
    { name: 'mari97829', position: 2, tourType: 'Parallel Tour', date: '2025-05-05', tourName: 'STROM BREAKER' },
    { name: 'kkkkken619', position: 3, tourType: 'Parallel Tour', date: '2025-05-05', tourName: 'STROM BREAKER' },
    
    // OPERATION KILL THE KERCH
    { name: '006438_9', position: 1, tourType: 'Main Tour', date: '2025-05-10', tourName: 'OPERATION KILL THE KERCH' },
    { name: 'saegusa_goldfish', position: 2, tourType: 'Main Tour', date: '2025-05-10', tourName: 'OPERATION KILL THE KERCH' },
    { name: 'ivan13.rus', position: 3, tourType: 'Main Tour', date: '2025-05-10', tourName: 'OPERATION KILL THE KERCH' },
    
    // ★ ★ ★ ROGUE NATION ★ ★ ★
    { name: 'weastly.', position: 1, tourType: 'Main Tour', date: '2025-05-15', tourName: '★ ★ ★ ROGUE NATION ★ ★ ★' },
    { name: 'MIRAN_B', position: 2, tourType: 'Main Tour', date: '2025-05-15', tourName: '★ ★ ★ ROGUE NATION ★ ★ ★' },
    { name: 'itachizame0111', position: 3, tourType: 'Main Tour', date: '2025-05-15', tourName: '★ ★ ★ ROGUE NATION ★ ★ ★' },
    
    // TACTICAL BATTLEFIELD
    { name: 'falcon_empire', position: 1, tourType: 'Main Tour', date: '2025-05-20', tourName: 'TACTICAL BATTLEFIELD' },
    { name: 'hitu_007', position: 2, tourType: 'Main Tour', date: '2025-05-20', tourName: 'TACTICAL BATTLEFIELD' },
    { name: 'dabe0813', position: 3, tourType: 'Main Tour', date: '2025-05-20', tourName: 'TACTICAL BATTLEFIELD' },
    
    // Sunken Trail
    { name: 'gojokop', position: 1, tourType: 'Parallel Tour', date: '2025-05-25', tourName: 'Sunken Trail' },
    { name: 'moailover', position: 2, tourType: 'Parallel Tour', date: '2025-05-25', tourName: 'Sunken Trail' },
    { name: 'killerjustabeginner_26658', position: 3, tourType: 'Parallel Tour', date: '2025-05-25', tourName: 'Sunken Trail' },
    
    // DOUBLE TROUBLE
    { name: 'forcenzy', position: 1, tourType: 'Parallel Tour', date: '2025-06-01', tourName: 'DOUBLE TROUBLE' },
    { name: 'rafael05542_64970', position: 2, tourType: 'Parallel Tour', date: '2025-06-01', tourName: 'DOUBLE TROUBLE' },
    { name: 'sellmwruskyestates', position: 3, tourType: 'Parallel Tour', date: '2025-06-01', tourName: 'DOUBLE TROUBLE' },
    
    // SAILS OF VALOR
    { name: 'deanwest9081', position: 1, tourType: 'Main Tour', date: '2025-06-05', tourName: 'SAILS OF VALOR' },
    { name: 'bigbang', position: 2, tourType: 'Main Tour', date: '2025-06-05', tourName: 'SAILS OF VALOR' },
    { name: 'itz_mr_d', position: 3, tourType: 'Main Tour', date: '2025-06-05', tourName: 'SAILS OF VALOR' },
    
    // STEALTH BATTLE
    { name: 'jinjn1158', position: 1, tourType: 'Main Tour', date: '2025-06-10', tourName: 'STEALTH BATTLE' },
    { name: 'ekyodha321', position: 2, tourType: 'Main Tour', date: '2025-06-10', tourName: 'STEALTH BATTLE' },
    { name: 'niko_axmedov_82742', position: 3, tourType: 'Main Tour', date: '2025-06-10', tourName: 'STEALTH BATTLE' },
    
    // Sea Reign: Destroyer Gauntlet
    { name: 'l_a_u_t_d_a_l_a_m', position: 1, tourType: 'Main Tour', date: '2025-06-15', tourName: 'Sea Reign: Destroyer Gauntlet' },
    { name: 'mari97829', position: 2, tourType: 'Main Tour', date: '2025-06-15', tourName: 'Sea Reign: Destroyer Gauntlet' },
    { name: 'kkkkken619', position: 3, tourType: 'Main Tour', date: '2025-06-15', tourName: 'Sea Reign: Destroyer Gauntlet' },
    
    // LASER DAMAGE
    { name: '006438_9', position: 1, tourType: 'Main Tour', date: '2025-06-20', tourName: 'LASER DAMAGE' },
    { name: 'saegusa_goldfish', position: 2, tourType: 'Main Tour', date: '2025-06-20', tourName: 'LASER DAMAGE' },
    { name: 'ivan13.rus', position: 3, tourType: 'Main Tour', date: '2025-06-20', tourName: 'LASER DAMAGE' },
    
    // Dominion of the Coastline
    { name: 'weastly.', position: 1, tourType: 'Main Tour', date: '2025-06-25', tourName: 'Dominion of the Coastline' },
    { name: 'MIRAN_B', position: 2, tourType: 'Main Tour', date: '2025-06-25', tourName: 'Dominion of the Coastline' },
    { name: 'itachizame0111', position: 3, tourType: 'Main Tour', date: '2025-06-25', tourName: 'Dominion of the Coastline' },
    
    // Dark O2 Domination
    { name: 'falcon_empire', position: 1, tourType: 'Main Tour', date: '2025-07-01', tourName: 'Dark O2 Domination' },
    { name: 'hitu_007', position: 2, tourType: 'Main Tour', date: '2025-07-01', tourName: 'Dark O2 Domination' },
    { name: 'dabe0813', position: 3, tourType: 'Main Tour', date: '2025-07-01', tourName: 'Dark O2 Domination' },
    
    // Brutal Line: Destroyer Elite
    { name: 'gojokop', position: 1, tourType: 'Main Tour', date: '2025-07-05', tourName: 'Brutal Line: Destroyer Elite' },
    { name: 'moailover', position: 2, tourType: 'Main Tour', date: '2025-07-05', tourName: 'Brutal Line: Destroyer Elite' },
    { name: 'killerjustabeginner_26658', position: 3, tourType: 'Main Tour', date: '2025-07-05', tourName: 'Brutal Line: Destroyer Elite' },
    
    // The Nightmare Of Ushakov
    { name: 'forcenzy', position: 1, tourType: 'Parallel Tour', date: '2025-07-10', tourName: 'The Nightmare Of Ushakov' },
    { name: 'rafael05542_64970', position: 2, tourType: 'Parallel Tour', date: '2025-07-10', tourName: 'The Nightmare Of Ushakov' },
    { name: 'sellmwruskyestates', position: 3, tourType: 'Parallel Tour', date: '2025-07-10', tourName: 'The Nightmare Of Ushakov' },
    
    // Rogue Wave : Cruiser Command
    { name: 'deanwest9081', position: 1, tourType: 'Main Tour', date: '2025-07-15', tourName: 'Rogue Wave : Cruiser Command' },
    { name: 'bigbang', position: 2, tourType: 'Main Tour', date: '2025-07-15', tourName: 'Rogue Wave : Cruiser Command' },
    { name: 'itz_mr_d', position: 3, tourType: 'Main Tour', date: '2025-07-15', tourName: 'Rogue Wave : Cruiser Command' },
    
    // Operation Sling Shot
    { name: 'jinjn1158', position: 1, tourType: 'Main Tour', date: '2025-07-20', tourName: 'Operation Sling Shot' },
    { name: 'ekyodha321', position: 2, tourType: 'Main Tour', date: '2025-07-20', tourName: 'Operation Sling Shot' },
    { name: 'niko_axmedov_82742', position: 3, tourType: 'Main Tour', date: '2025-07-20', tourName: 'Operation Sling Shot' },
    
    // The Fury of Lider
    { name: 'l_a_u_t_d_a_l_a_m', position: 1, tourType: 'Main Tour', date: '2025-07-25', tourName: 'The Fury of Lider' },
    { name: 'mari97829', position: 2, tourType: 'Main Tour', date: '2025-07-25', tourName: 'The Fury of Lider' },
    { name: 'kkkkken619', position: 3, tourType: 'Main Tour', date: '2025-07-25', tourName: 'The Fury of Lider' },
    
    // Operation Sling Shot (August)
    { name: '006438_9', position: 1, tourType: 'Main Tour', date: '2025-08-01', tourName: 'Operation Sling Shot' },
    { name: 'saegusa_goldfish', position: 2, tourType: 'Main Tour', date: '2025-08-01', tourName: 'Operation Sling Shot' },
    { name: 'ivan13.rus', position: 3, tourType: 'Main Tour', date: '2025-08-01', tourName: 'Operation Sling Shot' },
    
    // Zumwalt Stealth Strike
    { name: 'weastly.', position: 1, tourType: 'Parallel Tour', date: '2025-08-05', tourName: 'Zumwalt Stealth Strike' },
    { name: 'MIRAN_B', position: 2, tourType: 'Parallel Tour', date: '2025-08-05', tourName: 'Zumwalt Stealth Strike' },
    { name: 'itachizame0111', position: 3, tourType: 'Parallel Tour', date: '2025-08-05', tourName: 'Zumwalt Stealth Strike' },
    
    // Royal Ragnarok
    { name: 'falcon_empire', position: 1, tourType: 'Main Tour', date: '2025-08-10', tourName: 'Royal Ragnarok' },
    { name: 'hitu_007', position: 2, tourType: 'Main Tour', date: '2025-08-10', tourName: 'Royal Ragnarok' },
    { name: 'dabe0813', position: 3, tourType: 'Main Tour', date: '2025-08-10', tourName: 'Royal Ragnarok' },
    
    // DULIO BLITZ
    { name: 'gojokop', position: 1, tourType: 'Main Tour', date: '2025-08-15', tourName: 'DULIO BLITZ' },
    { name: 'moailover', position: 2, tourType: 'Main Tour', date: '2025-08-15', tourName: 'DULIO BLITZ' },
    { name: 'killerjustabeginner_26658', position: 3, tourType: 'Main Tour', date: '2025-08-15', tourName: 'DULIO BLITZ' },
    
    // Battle Of Peninsula
    { name: 'forcenzy', position: 1, tourType: 'Main Tour', date: '2025-08-20', tourName: 'Battle Of Peninsula' },
    { name: 'rafael05542_64970', position: 2, tourType: 'Main Tour', date: '2025-08-20', tourName: 'Battle Of Peninsula' },
    { name: 'sellmwruskyestates', position: 3, tourType: 'Main Tour', date: '2025-08-20', tourName: 'Battle Of Peninsula' },
    
    // Levitation Legacy
    { name: 'deanwest9081', position: 1, tourType: 'Main Tour', date: '2025-08-25', tourName: 'Levitation Legacy' },
    { name: 'bigbang', position: 2, tourType: 'Main Tour', date: '2025-08-25', tourName: 'Levitation Legacy' },
    { name: 'itz_mr_d', position: 3, tourType: 'Main Tour', date: '2025-08-25', tourName: 'Levitation Legacy' },
    
    // DULIO BLITZ (September)
    { name: 'jinjn1158', position: 1, tourType: 'Main Tour', date: '2025-09-01', tourName: 'DULIO BLITZ' },
    { name: 'ekyodha321', position: 2, tourType: 'Main Tour', date: '2025-09-01', tourName: 'DULIO BLITZ' },
    { name: 'niko_axmedov_82742', position: 3, tourType: 'Main Tour', date: '2025-09-01', tourName: 'DULIO BLITZ' },
    
    // OPERATION STEALTH SMOKE
    { name: 'l_a_u_t_d_a_l_a_m', position: 1, tourType: 'Main Tour', date: '2025-09-05', tourName: 'OPERATION STEALTH SMOKE' },
    { name: 'mari97829', position: 2, tourType: 'Main Tour', date: '2025-09-05', tourName: 'OPERATION STEALTH SMOKE' },
    { name: 'kkkkken619', position: 3, tourType: 'Main Tour', date: '2025-09-05', tourName: 'OPERATION STEALTH SMOKE' },
    
    // OPERATION BLACK TIDE
    { name: '006438_9', position: 1, tourType: 'Parallel Tour', date: '2025-09-10', tourName: 'OPERATION BLACK TIDE' },
    { name: 'saegusa_goldfish', position: 2, tourType: 'Parallel Tour', date: '2025-09-10', tourName: 'OPERATION BLACK TIDE' },
    { name: 'ivan13.rus', position: 3, tourType: 'Parallel Tour', date: '2025-09-10', tourName: 'OPERATION BLACK TIDE' },
    
    // Battle of Minions
    { name: 'weastly.', position: 1, tourType: 'Main Tour', date: '2025-09-15', tourName: 'Battle of Minions' },
    { name: 'MIRAN_B', position: 2, tourType: 'Main Tour', date: '2025-09-15', tourName: 'Battle of Minions' },
    { name: 'itachizame0111', position: 3, tourType: 'Main Tour', date: '2025-09-15', tourName: 'Battle of Minions' },
    
    // BLADES OF THE SEA
    { name: 'falcon_empire', position: 1, tourType: 'Main Tour', date: '2025-09-20', tourName: 'BLADES OF THE SEA' },
    { name: 'hitu_007', position: 2, tourType: 'Main Tour', date: '2025-09-20', tourName: 'BLADES OF THE SEA' },
    { name: 'dabe0813', position: 3, tourType: 'Main Tour', date: '2025-09-20', tourName: 'BLADES OF THE SEA' }
];

// Generate tournament info from serverData
const tournamentInfo = [];

// Group data by tournament
const tournamentMap = new Map();
serverData.forEach(entry => {
    const key = `${entry.date}_${entry.tourName}`;
    if (!tournamentMap.has(key)) {
        tournamentMap.set(key, {
            name: entry.tourName,
            date: entry.date,
            type: entry.tourType,
            winners: []
        });
    }
    
    const tournament = tournamentMap.get(key);
    tournament.winners.push({
        name: entry.name,
        position: entry.position
    });
});

// Convert map to array and sort by date
tournamentInfo.push(...tournamentMap.values());
tournamentInfo.sort((a, b) => new Date(a.date) - new Date(b.date));

// Sort winners by position within each tournament
tournamentInfo.forEach(tournament => {
    tournament.winners.sort((a, b) => a.position - b.position);
});
