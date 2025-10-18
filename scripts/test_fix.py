import json

# Load and test the fixed tournament grouping
with open('tournament-data-clean.json', 'r') as f:
    data = json.load(f)

# Simulate the new grouping logic
tournamentMap = {}

for entry in data:
    tourName = entry['tourName'] or ''
    tourType = entry['tourType'] or 'Main Tour'
    dateKey = entry['date']
    
    if dateKey not in tournamentMap:
        tournamentMap[dateKey] = {
            'date': entry['date'],
            'tourName': tourName,
            'tourType': tourType,
            'winners': []
        }
    
    # If this entry has a tournament name and the current one is empty, update it
    currentTournament = tournamentMap[dateKey]
    if tourName and tourName.strip() != '' and (not currentTournament['tourName'] or currentTournament['tourName'].strip() == ''):
        currentTournament['tourName'] = tourName
        currentTournament['tourType'] = tourType
    
    currentTournament['winners'].append({
        'name': entry['name'],
        'position': entry['position']
    })

# Sort winners by position
for tournament in tournamentMap.values():
    tournament['winners'].sort(key=lambda x: x['position'])

# Check October tournaments
oct_tours = {k: v for k, v in tournamentMap.items() if k.startswith('10-')}

print(f"October tournaments after fix: {len(oct_tours)}")
print("\nFixed tournament details:")
for date, tournament in oct_tours.items():
    print(f"\nDate: {date}")
    print(f"Name: '{tournament['tourName']}'")
    print(f"Type: {tournament['tourType']}")
    print("Winners:")
    for winner in tournament['winners']:
        print(f"  Position {winner['position']}: {winner['name']}")
