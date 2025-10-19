export interface Tournament {
  date: string;
  name: string;
  tourName?: string;
  tour_name?: string;
  tourType?: string;
  tour_type?: string;
  position: number;
}

export interface TournamentData {
  [monthYear: string]: {
    [week: string]: Tournament[];
  };
}

export interface ChampionData {
  name: string;
  totalTournaments: number;
  firstPlace: number;
  secondPlace: number;
  thirdPlace: number;
  fourthPlace: number;
}

export interface Stats {
  activePlayers: number;
  totalTournaments: number;
  totalChampions: number;
}

export interface TournamentFilters {
  currentFilter: string;
  currentPage: number;
}