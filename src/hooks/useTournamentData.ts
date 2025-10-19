import { useState, useEffect } from 'react';
import { Tournament, TournamentData } from '../types/tournament';

const TOURNAMENT_DATA_PATH = '/data/tournament-data.json';
const CSV_FILE_PATH = '/data/Information Players ( M47W - Survivor ) - Tour Rank (2025).csv';
const CLEAN_JSON_PATH = '/data/tournament-data-clean.json';

// Date normalization function
const normalizeDate = (dateStr: string): string => {
  if (!dateStr) return '';
  
  try {
    // Handle different date formats: "01-04-2025", "2-2-2025", etc.
    const parts = dateStr.split('-');
    if (parts.length === 3) {
      const month = parts[0].padStart(2, '0');
      const day = parts[1].padStart(2, '0');
      const year = parts[2];
      return `${year}-${month}-${day}`;
    }
    return dateStr;
  } catch (error) {
    console.warn('Error normalizing date:', dateStr, error);
    return dateStr;
  }
};

// CSV Parser function
const parseCSV = (csvText: string): Tournament[] => {
  const tournaments: Tournament[] = [];
  
  try {
    // Split by lines and process
    const lines = csvText.split('\n');
    let currentLine = '';
    let inQuotes = false;
    
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      
      // Skip empty lines
      if (!line.trim()) continue;
      
      // Skip header row
      if (i === 0) continue;
      
      currentLine += line;
      
      // Check if we're inside quotes
      const quoteCount = (currentLine.match(/"/g) || []).length;
      inQuotes = quoteCount % 2 === 1;
      
      // If we're not in quotes and line ends with comma or is complete, process it
      if (!inQuotes && (currentLine.endsWith(',') || currentLine.trim().length > 0)) {
        // Parse the complete line
        const fields = parseCSVLine(currentLine.trim());
        
        if (fields && fields.length >= 6) {
          const tournament: Tournament = {
            position: parseInt(fields[0]) || 1,
            name: fields[1]?.trim() || '',
            date: normalizeDate(fields[3]?.trim() || ''),
            tourName: fields[5]?.trim() || '',
            tourType: fields[4]?.trim() || ''
          };
          
          // Only add if we have essential data
          if (tournament.name && tournament.date) {
            tournaments.push(tournament);
          }
        }
        
        currentLine = '';
      }
    }
    
    // Process any remaining line
    if (currentLine.trim()) {
      const fields = parseCSVLine(currentLine.trim());
      if (fields && fields.length >= 6) {
        const tournament: Tournament = {
          position: parseInt(fields[0]) || 1,
          name: fields[1]?.trim() || '',
          date: normalizeDate(fields[3]?.trim() || ''),
          tourName: fields[5]?.trim() || '',
          tourType: fields[4]?.trim() || ''
        };
        
        if (tournament.name && tournament.date) {
          tournaments.push(tournament);
        }
      }
    }
    
  } catch (error) {
    console.error('Error parsing CSV:', error);
  }
  
  return tournaments;
};

// Helper function to parse a single CSV line
const parseCSVLine = (line: string): string[] => {
  const fields: string[] = [];
  let currentField = '';
  let inQuotes = false;
  
  for (let i = 0; i < line.length; i++) {
    const char = line[i];
    
    if (char === '"') {
      inQuotes = !inQuotes;
    } else if (char === ',' && !inQuotes) {
      fields.push(currentField.trim());
      currentField = '';
    } else {
      currentField += char;
    }
  }
  
  // Add the last field
  fields.push(currentField.trim());
  
  return fields;
};

export const useTournamentData = () => {
  const [tournaments, setTournaments] = useState<Tournament[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadTournamentData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        let tournamentData: Tournament[] = [];

        // Try CSV file first (primary source)
        try {
          const csvRes = await fetch(CSV_FILE_PATH);
          if (csvRes.ok) {
            const csvText = await csvRes.text();
            tournamentData = parseCSV(csvText);
            console.log(`Loaded ${tournamentData.length} tournaments from CSV`);
          }
        } catch (csvError) {
          console.log('CSV file not available, trying other sources...');
        }

        // Try clean JSON if CSV failed
        if (tournamentData.length === 0) {
          try {
            const cleanRes = await fetch(CLEAN_JSON_PATH);
            if (cleanRes.ok) {
              const cleanData = await cleanRes.json();
              if (Array.isArray(cleanData) && cleanData.length > 0) {
                tournamentData = cleanData;
                console.log(`Loaded ${tournamentData.length} tournaments from clean JSON`);
              }
            }
          } catch (cleanJsonError) {
            console.log('Clean JSON not available, trying other sources...');
          }
        }

        // Try structured JSON if clean JSON failed
        if (tournamentData.length === 0) {
          try {
            const res = await fetch(TOURNAMENT_DATA_PATH);
            if (res.ok) {
              const json: TournamentData = await res.json();
              // Convert JSON month/week structure to flat array
              for (const [monthYear, weeks] of Object.entries(json)) {
                for (const [week, entries] of Object.entries(weeks)) {
                  if (Array.isArray(entries)) {
                    tournamentData.push(...entries);
                  }
                }
              }
              console.log(`Loaded ${tournamentData.length} tournaments from structured JSON`);
            }
          } catch (structuredError) {
            console.log('Structured JSON also failed');
          }
        }

        // If still no data, create some sample data for demonstration
        if (tournamentData.length === 0) {
          console.log('No data found, creating sample data');
          tournamentData = [
            {
              date: "2025-10-19",
              name: "ShadowStrike",
              position: 1,
              tourName: "October Championship",
              tourType: "Main Tournament"
            },
            {
              date: "2025-10-19",
              name: "CyberPhoenix",
              position: 2,
              tourName: "October Championship",
              tourType: "Main Tournament"
            },
            {
              date: "2025-10-12",
              name: "NeonWarrior",
              position: 1,
              tourName: "October Week 2",
              tourType: "Weekly Tournament"
            },
            {
              date: "2025-10-05",
              name: "QuantumBlade",
              position: 1,
              tourName: "October Week 1",
              tourType: "Weekly Tournament"
            }
          ];
        }

        // Sort tournaments by date (newest first)
        tournamentData.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

        setTournaments(tournamentData);
        setLoading(false);
      } catch (error) {
        console.error('Error loading tournament data:', error);
        setError(error instanceof Error ? error.message : 'Failed to load tournament data');
        setLoading(false);
      }
    };

    loadTournamentData();
  }, []);

  return { tournaments, loading, error };
};

export default useTournamentData;