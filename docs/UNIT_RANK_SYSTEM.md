# Unit Material Rank System

## 🚢 Overview

The leaderboard and Hall of Champions now use **unit materials** from the game as rank icons instead of generic badges. Each rank tier is represented by a different naval unit, reflecting military hierarchy.

---

## 📊 Rank Icon Hierarchy

### Hall of Champions (Top 10)
| Rank | Unit Icon | Unit Type | Description |
|------|-----------|-----------|-------------|
| **#1** | ![Carrier](Units/Carrier.png) | **Carrier** | Highest rank - The ultimate champion |
| **#2** | ![Battleship](Units/Battleship.png) | **Battleship** | Second place - Heavy firepower |
| **#3** | ![AssaultCarrier](Units/AssaultCarrier.png) | **Assault Carrier** | Third place - Elite assault vessel |
| **#4-5** | ![Cruiser](Units/Cruiser.png) | **Cruiser** | Top tier - Versatile warship |
| **#6-10** | ![Destroyer](Units/Destroyer.png) | **Destroyer** | Elite tier - Fast attack vessel |

---

### Leaderboard (Full Rankings)
| Rank Range | Unit Icon | Unit Type | Description |
|------------|-----------|-----------|-------------|
| **#1** | ![Carrier](Units/Carrier.png) | **Carrier** | Supreme commander |
| **#2** | ![Battleship](Units/Battleship.png) | **Battleship** | Vice admiral |
| **#3** | ![AssaultCarrier](Units/AssaultCarrier.png) | **Assault Carrier** | Rear admiral |
| **#4-5** | ![Cruiser](Units/Cruiser.png) | **Cruiser** | Captain |
| **#6-10** | ![Destroyer](Units/Destroyer.png) | **Destroyer** | Commander |
| **#11-20** | ![Frigate](Units/Frigate.png) | **Frigate** | Lieutenant |
| **#21+** | ![Corvette](Units/Corvette.png) | **Corvette** | Ensign |

---

## 🎨 Visual Features

### Hall of Champions
- **Rank Badge** (top-left corner of card):
  - Shows unit icon + rank number
  - Gold gradient background
  - Icon size: 20px × 20px
  - Drop shadow effect for depth

### Leaderboard Table
- **Rank Column**:
  - Unit icon + rank number
  - Icon size: 35px × 35px
  - Hover effect: scales to 1.2x
  - Drop shadow for emphasis

---

## 🎯 Design Philosophy

The unit hierarchy reflects the power and prestige of each vessel:

1. **Carrier** - The most powerful naval unit, representing the top player
2. **Battleship** - Heavy artillery and armor, second in command
3. **AssaultCarrier** - Specialized strike capability, elite third
4. **Cruiser** - Balanced and versatile, top tier players
5. **Destroyer** - Fast and effective, elite players
6. **Frigate** - Capable vessels, experienced players
7. **Corvette** - Entry-level warships, skilled players

---

## 🔧 Technical Implementation

### JavaScript
```javascript
// Rank assignment logic
if (index === 0) {
    rankIcon = 'Units/Carrier.png';
} else if (index === 1) {
    rankIcon = 'Units/Battleship.png';
} else if (index === 2) {
    rankIcon = 'Units/AssaultCarrier.png';
} else if (index < 5) {
    rankIcon = 'Units/Cruiser.png';
} else if (index < 10) {
    rankIcon = 'Units/Destroyer.png';
} else if (index < 20) {
    rankIcon = 'Units/Frigate.png';
} else {
    rankIcon = 'Units/Corvette.png';
}
```

### CSS Styling
```css
/* Hall of Champions rank badge */
.rank-unit-icon {
    width: 20px;
    height: 20px;
    object-fit: contain;
    filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.5));
}

/* Leaderboard rank badge */
.rank-badge {
    width: 35px;
    height: 35px;
    object-fit: contain;
    filter: drop-shadow(0 2px 6px rgba(0, 0, 0, 0.5));
    transition: transform 0.3s ease;
}

.rank-badge:hover {
    transform: scale(1.2);
}
```

---

## 📦 Available Unit Icons

The following unit icons are available in the `Units/` folder:

- ✅ `Carrier.png`
- ✅ `Battleship.png`
- ✅ `AssaultCarrier.png`
- ✅ `Cruiser.png`
- ✅ `Destroyer.png`
- ✅ `Frigate.png`
- ✅ `Corvette.png`
- `Submarine.png`
- `Ekranoplan.png`
- `Tank.png`
- `LAV.png`
- `Island.png`
- `Unknown.png`

---

## 🎮 Game Integration

These unit materials directly reflect the naval units from the game, creating a cohesive visual experience between the tournament hub and actual gameplay.

Players can immediately recognize their rank tier by the unit icon, making the ranking system intuitive and thematically appropriate.

---

## 🔄 Future Enhancements

Possible improvements:
- Animated unit icons on hover
- Special effects for top 3 ranks
- Unit rarity indicators (common, rare, legendary)
- Seasonal unit icon variants
- Achievement badges using other unit types

---

Generated: 2025
Feature: Unit Material Rank Icons
Status: ✅ Active

