import React from 'react';
import { Stats } from '../types/tournament';

interface HeaderProps {
  stats: Stats;
}

export default function Header({ stats }: HeaderProps) {
  return (
    <header className="header">
      <div className="header-content">
        <div className="logo-container">
          <a href="https://discord.gg/gJaqHCjt46" target="_blank" rel="noopener noreferrer" className="logo-link">
            <img src="/assets/images/logo.gif" alt="M47W Survivor Logo" className="logo" onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.style.display = 'none';
            }} />
            <div className="logo-fallback">🎯</div>
          </a>
        </div>
        
        <h1 className="main-title">M47W - SurvivoR</h1>
        
        <div className="tagline">
          <img src="/assets/images/icons/Survivor hero.png" alt="Sword Icon" className="tagline-icon" onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.style.display = 'none';
          }} />
          <span className="tagline-text">ELITE TOURNAMENT HUB</span>
          <img src="/assets/images/icons/Screenshot_2024-09-13_073231-removebg-preview.png" alt="Shield Icon" className="tagline-icon" onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.style.display = 'none';
          }} />
        </div>
        
        <div className="stats-bar">
          <div className="stat-item">
            <span className="stat-label">Active Players</span>
            <span id="activePlayers" className="stat-value">{stats.activePlayers.toLocaleString()}</span>
          </div>
          <div className="stat-item">
            <span className="stat-label">Total Tournaments</span>
            <span id="totalTournaments" className="stat-value">{stats.totalTournaments}</span>
          </div>
          <div className="stat-item">
            <span className="stat-label">Champions</span>
            <span id="totalChampions" className="stat-value">{stats.totalChampions}</span>
          </div>
        </div>
      </div>
    </header>
  );
}
