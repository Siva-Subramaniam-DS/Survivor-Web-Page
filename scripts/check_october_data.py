import json

# Load and check October tournament data
with open('tournament-data-clean.json', 'r') as f:
    data = json.load(f)

# Find October tournaments
oct_tours = [e for e in data if e['date'].startswith('10-')]

print(f"Total October tournaments: {len(oct_tours)}")
print("\nOctober tournament details:")
for i, tour in enumerate(oct_tours[:20]):
    print(f"{i+1}. Date: {tour['date']}, Name: '{tour['tourName']}', Position: {tour['position']}, Player: {tour['name']}")

# Group by tournament
print("\nGrouped by tournament:")
tournaments = {}
for tour in oct_tours:
    key = f"{tour['date']}_{tour['tourName']}"
    if key not in tournaments:
        tournaments[key] = []
    tournaments[key].append(tour)

for key, entries in tournaments.items():
    print(f"\nTournament: {key}")
    for entry in sorted(entries, key=lambda x: x['position']):
        print(f"  Position {entry['position']}: {entry['name']}")
