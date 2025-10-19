# M47W Survivor Tournament Hub

A modern React-based web application for tracking M47W Survivor tournaments and champions.

## Features

- Tournament History Display with Filtering
- Champions Gallery with Rankings
- Monthly Tournament Filters
- Real-time Statistics
- Responsive Design
- Custom Animations and Effects

## Prerequisites

- Node.js (version 16 or higher)
- npm (comes with Node.js)

## Quick Start

1. Navigate to the webapp directory:
```bash
cd webapp
```

2. Install dependencies:
```bash
npm install --legacy-peer-deps
```

3. Start the development server:
```bash
npm run dev
```

The dev server runs at http://localhost:5173 by default.

## Build for Production

```bash
npm run build
```

## Project Structure

```
webapp/
├── public/              # Static assets
│   ├── assets/         # Images and icons
│   ├── Fonts/         # Custom fonts
│   ├── Icons/         # UI icons
│   └── data/          # Tournament data files
├── src/
│   ├── components/    # React components
│   │   ├── Header.tsx
│   │   ├── ChampionsGrid.tsx
│   │   ├── MonthFilters.tsx
│   │   └── TournamentHistory.tsx
│   ├── hooks/        # Custom React hooks
│   │   └── useTournamentData.ts
│   ├── types/        # TypeScript type definitions
│   │   └── tournament.ts
│   └── styles.css    # Global styles
└── package.json      # Project configuration
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint for code quality

## Data Format

Tournament data should be structured as follows in `/public/data/tournament-data.json`:

```json
{
  "2025": {
    "week1": [
      {
        "date": "MM-DD-YYYY",
        "tourName": "Tournament Name",
        "tourType": "Main Tour/Parallel Tour",
        "name": "Player Name",
        "position": 1
      }
    ]
  }
}
```

## Styling

The application uses custom CSS with:
- Responsive design for all screen sizes
- Custom animations and transitions
- Themed color variables
- Font-face declarations for custom fonts

## Development Notes

- Uses TypeScript for type safety
- React hooks for state management
- Vite for fast development and building
- CSS modules for scoped styling
- ESLint for code quality

## License

This project is private and proprietary. All rights reserved.
