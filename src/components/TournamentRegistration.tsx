import React from 'react';

interface TournamentCard {
  id: string;
  title: string;
  description: string;
  icon: string;
  link: string;
}

const TournamentRegistration: React.FC = () => {
  const tournaments: TournamentCard[] = [
    {
      id: 'saturday',
      title: 'SATURDAY TOURNAMENT',
      description: 'Join the weekend battles',
      icon: '/assets/images/icons/Survivor hero.png',
      link: 'https://discord.com/channels/1050414982417887283/1210456226505170964'
    },
    {
      id: 'sunday',
      title: 'SUNDAY TOURNAMENT',
      description: 'End the week with victory',
      icon: '/assets/images/icons/Survivor hero.png',
      link: 'https://discord.com/channels/1050414982417887283/1051428633106972762'
    }
  ];

  const handleTournamentClick = (link: string) => {
    window.open(link, '_blank', 'noopener,noreferrer');
  };

  return (
    <section className="tournament-registration-section">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">TOURNAMENT REGISTRATION</h2>
        </div>
        
        <div className="tournament-cards">
          {tournaments.map((tournament) => (
            <div 
              key={tournament.id} 
              className="tournament-card"
              onClick={() => handleTournamentClick(tournament.link)}
            >
              <div className="tournament-icon">
                <img 
                  src={tournament.icon} 
                  alt={tournament.title}
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                  }}
                />
              </div>
              <div className="tournament-content">
                <h3 className="tournament-title">{tournament.title}</h3>
                <p className="tournament-description">{tournament.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TournamentRegistration;
