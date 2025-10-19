import React, { useState } from 'react';
import TournamentHistory from './components/TournamentHistory';
import Header from './components/Header';
import ChampionsGrid from './components/ChampionsGrid';
import PremiumRewards from './components/PremiumRewards';
import TournamentRegistration from './components/TournamentRegistration';
import { useTournamentData } from './hooks/useTournamentData';
import './styles.css';

export default function App() {
  const { tournaments, loading, error } = useTournamentData();
  const [currentFilter, setCurrentFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);

  // Calculate stats for header
  const stats = {
    activePlayers: 11210, // Hardcoded as per original
    totalTournaments: new Set(tournaments.map(t => t.date)).size,
    totalChampions: new Set(tournaments.filter(t => t.position === 1).map(t => t.name)).size
  };

  if (loading) {
    return (
      <div className="loading">
        <div className="spinner"></div>
        <p>Loading tournament data...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="loading">
        <p>Error loading tournament data: {error}</p>
        <button onClick={() => window.location.reload()} className="refresh-btn">
          <span className="btn-icon">🔄</span>
          RETRY
        </button>
      </div>
    );
  }

  return (
    <div className="app">
      <Header stats={stats} />
      <PremiumRewards />
      <TournamentRegistration />
      
      <main className="container">
        <section className="champions-section">
          <h2 className="section-header">CHAMPIONS GALLERY</h2>
          <ChampionsGrid tournaments={tournaments} />
        </section>

        <section className="tournament-section">
          <div className="last-updated">
            <div className="label">Last Updated</div>
            <div className="timestamp" id="lastUpdated">
              {new Date().toLocaleString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit'
              })}
            </div>
            <div className="refresh-indicator">
              <div className="pulse"></div>
              Auto-refreshing every 5 minutes
            </div>
          </div>

          <TournamentHistory
            tournaments={tournaments}
            currentFilter={currentFilter}
            currentPage={currentPage}
            onPageChange={(page) => {
              setCurrentPage(page);
            }}
            onFilterChange={(filter) => {
              setCurrentFilter(filter);
              setCurrentPage(1);
            }}
          />
        </section>
      </main>

      <footer>
        <div className="footer-content">
          &copy; {new Date().getFullYear()} M47W Survivor Tournament Hub
        </div>
        <div className="footer-links">
          <a href="https://discord.com/channels/1050414982417887283/1073623824786001930" target="_blank" rel="noopener noreferrer">About</a>
          <a href="https://discord.com/channels/1050414982417887283/1055458382833778719" target="_blank" rel="noopener noreferrer">Rules</a>
          <a href="https://discord.com/channels/1050414982417887283/1246124680889241741" target="_blank" rel="noopener noreferrer">Support</a>
        </div>
      </footer>
    </div>
  );
}
