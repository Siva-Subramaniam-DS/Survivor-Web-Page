import React from 'react';
import { Stats } from '../types/tournament';

interface HeaderProps {
  stats: Stats;
}

export default function Header({ stats }: HeaderProps) {
  return (
    <div className="header">
      <div className="header-content">
        <div className="header-top">
          <div className="center-logo">
            <img src="/assets/images/logo.gif" alt="Logo" className="center-logo-img" />
          </div>
          <h1 className="main-title">M47W - SurvivoR</h1>
          <div className="tagline">
            <img src="/assets/images/icons/Survivor hero.png" alt="Icon" className="tagline-icon" />
            <span className="tagline-text">SKULL TOURNAMENT HUB</span>
            <img src="/assets/images/icons/Screenshot_2024-09-13_073231-removebg-preview.png" alt="Icon" className="tagline-icon" />
          </div>
        </div>
        
        <div className="header-bottom">
          <div className="stats-bar">
            <div className="stat-item">
              <span className="stat-label">ACTIVE PLAYERS</span>
              <span id="activePlayers" className="stat-value">{stats.activePlayers.toLocaleString()}</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">TOTAL TOURNAMENTS</span>
              <span id="totalTournaments" className="stat-value">{stats.totalTournaments}</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">CHAMPIONS</span>
              <span id="totalChampions" className="stat-value">{stats.totalChampions}</span>
            </div>
          </div>
          </div>
        </div>
      </div>
    );
  }
