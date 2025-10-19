import React from 'react';
import { Tournament } from '../types/tournament';

interface MonthFiltersProps {
  tournaments: Tournament[];
  currentFilter: string;
  onFilterChange: (filter: string) => void;
}

const MonthFilters: React.FC<MonthFiltersProps> = ({
  tournaments,
  currentFilter,
  onFilterChange
}) => {
  // Count unique tournaments per month
  const getMonthCounts = () => {
    const monthTournaments = new Map<string, Set<string>>();
    
    tournaments.forEach(entry => {
      const [month] = entry.date.split('-');
      const paddedMonth = month.padStart(2, '0');
      const key = entry.date;
      
      if (!monthTournaments.has(paddedMonth)) {
        monthTournaments.set(paddedMonth, new Set());
      }
      monthTournaments.get(paddedMonth)?.add(key);
    });

    const counts: { [key: string]: number } = {};
    monthTournaments.forEach((tournaments, month) => {
      counts[month] = tournaments.size;
    });

    return counts;
  };

  const months = [
    { value: 'all', label: 'All Tournaments' },
    { value: '01', label: 'January' },
    { value: '02', label: 'February' },
    { value: '03', label: 'March' },
    { value: '04', label: 'April' },
    { value: '05', label: 'May' },
    { value: '06', label: 'June' },
    { value: '07', label: 'July' },
    { value: '08', label: 'August' },
    { value: '09', label: 'September' },
    { value: '10', label: 'October' },
    { value: '11', label: 'November' },
    { value: '12', label: 'December' }
  ];

  const monthCounts = getMonthCounts();
  const totalTournaments = new Set(tournaments.map(t => t.date)).size;

  return (
    <div className="month-filters">
      {months.map(month => {
        const count = month.value === 'all' ? totalTournaments : (monthCounts[month.value] || 0);
        const isDisabled = month.value !== 'all' && count === 0;
        
        return (
          <button
            key={month.value}
            className={`filter-btn ${currentFilter === month.value ? 'active' : ''} ${isDisabled ? 'disabled' : ''}`}
            onClick={() => !isDisabled && onFilterChange(month.value)}
            disabled={isDisabled}
            data-month={month.value}
          >
            {month.label} {' '}
            {count > 0 ? (
              <span className="month-count">({count})</span>
            ) : (
              <span className="month-count-zero">(0)</span>
            )}
          </button>
        );
      })}
    </div>
  );
};

export default MonthFilters;