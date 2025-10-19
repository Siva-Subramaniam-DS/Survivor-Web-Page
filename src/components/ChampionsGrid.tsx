import React from 'react';
import { Tournament, ChampionData } from '../types/tournament';

interface ChampionsGridProps {
  tournaments: Tournament[];
}

const ChampionsGrid: React.FC<ChampionsGridProps> = ({ tournaments }) => {
  // Calculate champion statistics
  const calculateChampionStats = (data: Tournament[]): ChampionData[] => {
    const playerStats: { [key: string]: ChampionData } = {};
    
    data.forEach(entry => {
      const playerName = entry.name;
      
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
      
      playerStats[playerName].totalTournaments++;
      
      switch (entry.position) {
        case 1:
          playerStats[playerName].firstPlace++;
          break;
        case 2:
          playerStats[playerName].secondPlace++;
          break;
        case 3:
          playerStats[playerName].thirdPlace++;
          break;
        case 4:
          playerStats[playerName].fourthPlace++;
          break;
      }
    });

    return Object.values(playerStats)
      .filter(player => player.firstPlace > 0)
      .sort((a, b) => {
        if (b.firstPlace !== a.firstPlace) {
          return b.firstPlace - a.firstPlace;
        }
        return b.totalTournaments - a.totalTournaments;
      })
      .slice(0, 10);
  };

  const getUnitIcon = (rank: number): string => {
    // Use actual unit icons based on rank
    const unitIcons = [
      '/assets/images/units/Carrier.png',      // #1 - Carrier (highest)
      '/assets/images/units/Battleship.png',   // #2 - Battleship
      '/assets/images/units/AssaultCarrier.png', // #3 - Assault Carrier
      '/assets/images/units/Cruiser.png',      // #4 - Cruiser
      '/assets/images/units/Cruiser.png',      // #5 - Cruiser
      '/assets/images/units/Destroyer.png',    // #6-10 - Destroyer
      '/assets/images/units/Destroyer.png',
      '/assets/images/units/Destroyer.png',
      '/assets/images/units/Destroyer.png',
      '/assets/images/units/Destroyer.png'
    ];
    return unitIcons[Math.min(rank, unitIcons.length - 1)];
  };

  const getAvatarForPlayer = (name: string): string => {
    // Use actual avatar images based on player name
    const avatars = [
      '/assets/images/avatars/AvatarPortrait_ModernMarine_Widget.png',
      '/assets/images/avatars/AvatarPortrait_Centurion_Widget.png',
      '/assets/images/avatars/AvatarPortrait_Cuirassier_Widget.png',
      '/assets/images/avatars/AvatarPortrait_AliceRichardson_Widget.png',
      '/assets/images/avatars/AvatarPortrait_AmandaGarciaLee_Widget.png',
      '/assets/images/avatars/AvatarPortrait_BeardyTrickster_Widget.png',
      '/assets/images/avatars/AvatarPortrait_CesarMeyer_Widget.png',
      '/assets/images/avatars/AvatarPortrait_ChristopherLee_Widget.png',
      '/assets/images/avatars/AvatarPortrait_ChuanlinFu_Widget.png',
      '/assets/images/avatars/AvatarPortrait_CommanderBar_lay_Widget.png',
      '/assets/images/avatars/AvatarPortrait_DameofHearts_Widget.png',
      '/assets/images/avatars/AvatarPortrait_GodofFortuneLNY24_Widget.png',
      '/assets/images/avatars/AvatarPortrait_HambiCoal_Widget.png',
      '/assets/images/avatars/AvatarPortrait_HarmonyKeeperLNY24_Widget.png',
      '/assets/images/avatars/AvatarPortrait_JamesWhite_Widget.png',
      '/assets/images/avatars/AvatarPortrait_Jinjoo_Widget.png',
      '/assets/images/avatars/AvatarPortrait_JoHa_sano_Widget.png',
      '/assets/images/avatars/AvatarPortrait_KorKoreto_Widget.png',
      '/assets/images/avatars/AvatarPortrait_LadySenna_Widget.png',
      '/assets/images/avatars/AvatarPortrait_LeeKyungSoo_Widget.png',
      '/assets/images/avatars/AvatarPortrait_LongFei_Widget.png',
      '/assets/images/avatars/AvatarPortrait_MinjiKang_Widget.png',
      '/assets/images/avatars/AvatarPotrait_SakuraGirl_Widget.png'
    ];
    const hash = name.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return avatars[hash % avatars.length];
  };

  const champions = calculateChampionStats(tournaments);

  if (champions.length === 0) {
    return (
      <div className="champions-grid empty">
        <h3>No champions data available</h3>
        <p>Win data will appear here</p>
      </div>
    );
  }

  return (
    <div className="champions-grid">
      {champions.map((champion, index) => {
        const winsText = champion.firstPlace === 1 ? '1 Win' : `${champion.firstPlace} Wins`;
        const placements = [];
        
        if (champion.firstPlace > 0) placements.push(`🥇${champion.firstPlace}`);
        if (champion.secondPlace > 0) placements.push(`🥈${champion.secondPlace}`);
        if (champion.thirdPlace > 0) placements.push(`🥉${champion.thirdPlace}`);
        if (champion.fourthPlace > 0) placements.push(`4️⃣${champion.fourthPlace}`);
        
        return (
          <div key={champion.name} className="champion-card">
            <div className="champion-rank">
              <img 
                src={getUnitIcon(index)} 
                alt={`Rank ${index + 1} Unit`}
                className="rank-unit-icon"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                }}
              />
              <span className="rank-number">#{index + 1}</span>
            </div>
            <div className="champion-avatar">
              <img 
                src={getAvatarForPlayer(champion.name)}
                alt={champion.name}
                className="avatar-image"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = '/assets/images/avatars/AvatarPortrait_ModernMarine_Widget.png';
                }}
              />
            </div>
            <p className="champion-name">{champion.name}</p>
            <div className="champion-stats">🏆 {winsText}</div>
            <div className="champion-stats">{placements.join(' ')}</div>
            <div className="champion-stats">{champion.totalTournaments} Total Tournaments</div>
          </div>
        );
      })}
    </div>
  );
};

export default ChampionsGrid;