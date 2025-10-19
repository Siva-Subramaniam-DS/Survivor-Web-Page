import React from 'react';

interface RewardItem {
  id: string;
  icon: string;
  title: string;
  description: string;
}

const PremiumRewards: React.FC = () => {
  const rewards: RewardItem[] = [
    {
      id: 'gold-package',
      icon: '/assets/images/prizes/goldOffer_6.png',
      title: 'GOLD PACKAGE',
      description: 'Boost your in-game currency instantly'
    },
    {
      id: 'artcoin-bundle',
      icon: '/assets/images/prizes/artcoinOffer_6.png',
      title: 'ARTCOIN BUNDLE',
      description: 'Special currency for unique items'
    },
    {
      id: 'upgrade-points',
      icon: '/assets/images/prizes/upgradeoffer_3.png',
      title: 'UPGRADE POINTS',
      description: 'Level up faster with bonus points'
    },
    {
      id: 'premium-30',
      icon: '/assets/images/prizes/premium_7d.png',
      title: '30 DAY PREMIUM',
      description: 'Trial the premium experience'
    },
    {
      id: 'legend-status',
      icon: '/assets/images/titles/Legend.png',
      title: 'LEGEND STATUS',
      description: 'Join the elite legendary ranks'
    },
    {
      id: 'hero-status',
      icon: '/assets/images/titles/Hero.png',
      title: 'HERO STATUS',
      description: 'Join the elite Heros ranks'
    },
    {
      id: 'gacha-prize',
      icon: '/assets/images/prizes/ny24_rare_lootbox_ticket.png',
      title: 'GACHA PRIZE',
      description: 'Win the chance to get a random prize'
    }
  ];

  return (
    <section className="premium-rewards-section">
      <div className="premium-rewards-container">
        <div className="section-header">
          <img src="/assets/images/icons/Survivor hero.png" alt="Warrior Icon" className="header-icon" onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.style.display = 'none';
          }} />
          <h2 className="section-title">PREMIUM REWARDS</h2>
          <img src="/assets/images/icons/Screenshot_2024-09-13_073231-removebg-preview.png" alt="Swords Icon" className="header-icon" onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.style.display = 'none';
          }} />
        </div>
        
        <div className="rewards-grid">
          {rewards.map((reward) => (
            <div key={reward.id} className="reward-card">
              <div className="reward-icon">
                <img 
                  src={reward.icon} 
                  alt={reward.title}
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                  }}
                />
              </div>
              <div className="reward-content">
                <h3 className="reward-title">{reward.title}</h3>
                <p className="reward-description">{reward.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PremiumRewards;
