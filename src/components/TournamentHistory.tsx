import React from 'react';
import { Tournament } from '../types/tournament';

interface TournamentHistoryProps {
  tournaments: Tournament[];
  currentFilter: string;
  currentPage: number;
  onPageChange: (page: number) => void;
  onFilterChange: (filter: string) => void;
}

function MonthFilters({ 
  tournaments, 
  currentFilter, 
  onFilterChange 
}: { 
  tournaments: Tournament[];
  currentFilter: string;
  onFilterChange: (filter: string) => void;
}) {
  // Generate month options based on available data
  const getAvailableMonths = () => {
    const monthSet = new Set<string>();
    tournaments.forEach(tournament => {
      if (tournament.date) {
        const date = new Date(tournament.date);
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        monthSet.add(month);
      }
    });
    
    const months = Array.from(monthSet).sort();
    return ['all', ...months];
  };

  const getMonthName = (month: string) => {
    if (month === 'all') return 'All Tournaments';
    const date = new Date(2025, parseInt(month) - 1, 1);
    return date.toLocaleString('default', { month: 'long' });
  };

  const getMonthCount = (month: string) => {
    if (month === 'all') return tournaments.length;
    
    return tournaments.filter(tournament => {
      if (!tournament.date) return false;
      const date = new Date(tournament.date);
      const tournamentMonth = (date.getMonth() + 1).toString().padStart(2, '0');
      return tournamentMonth === month;
    }).length;
  };

  const months = getAvailableMonths();

  return (
    <div className="month-filters">
      {months.map(month => {
        const count = getMonthCount(month);
        const isActive = currentFilter === month;
        const isDisabled = count === 0 && month !== 'all';
        
        return (
          <button
            key={month}
            className={`filter-btn ${isActive ? 'active' : ''} ${isDisabled ? 'disabled' : ''}`}
            onClick={() => !isDisabled && onFilterChange(month)}
            disabled={isDisabled}
          >
            {getMonthName(month)}
            {count > 0 && (
              <span className="month-count">({count})</span>
            )}
            {count === 0 && month !== 'all' && (
              <span className="month-count-zero">(0)</span>
            )}
          </button>
        );
      })}
    </div>
  );
}

export default function TournamentHistory({ 
  tournaments, 
  currentFilter, 
  currentPage, 
  onPageChange,
  onFilterChange
}: TournamentHistoryProps) {
  // Filter tournaments based on current filter
  const filteredTournaments = tournaments.filter(tournament => {
    if (currentFilter === 'all') return true;
    if (!tournament.date) return false;
    
    const date = new Date(tournament.date);
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    return month === currentFilter;
  });

  // Pagination
  const tournamentsPerPage = 20;
  const totalPages = Math.ceil(filteredTournaments.length / tournamentsPerPage);
  const startIndex = (currentPage - 1) * tournamentsPerPage;
  const paginatedTournaments = filteredTournaments.slice(startIndex, startIndex + tournamentsPerPage);

  return (
    <section className="tournament-section">
      <h2 className="section-header">TOURNAMENT HISTORY</h2>
      
      <MonthFilters 
        tournaments={tournaments}
        currentFilter={currentFilter}
        onFilterChange={(filter) => {
          onFilterChange(filter);
          onPageChange(1); // Reset to first page when filter changes
        }}
      />
      
      <div className="tournament-list">
        {paginatedTournaments.length === 0 && (
          <div className="loading">No tournaments found</div>
        )}
        
        {paginatedTournaments.map((tournament, index) => (
          <div className="tournament-card" key={`${tournament.date}-${tournament.name}-${index}`}>
            <div className="tournament-meta">
              <strong>{tournament.tourName || 'Tournament'}</strong>
              <span>{tournament.date}</span>
              {tournament.tourType && (
                <span className="tour-type">{tournament.tourType}</span>
              )}
            </div>
            <div className="winner-item">
              <div className="winner-position">#{tournament.position}</div>
              <div className="winner-name">{tournament.name}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="pagination">
          <button 
            className="pagination-btn"
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <span className="pagination-info">
            Page {currentPage} of {totalPages}
          </span>
          <button 
            className="pagination-btn"
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      )}
    </section>
  );
}
