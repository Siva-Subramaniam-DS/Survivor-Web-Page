import csv
import json
from collections import defaultdict
from datetime import datetime

def parse_csv_tournament_data(csv_file_path):
    """
    Parse tournament CSV data and count wins per player
    """
    player_stats = defaultdict(lambda: {
        'name': '',
        'total_tournaments': 0,
        'first_place': 0,
        'second_place': 0,
        'third_place': 0,
        'fourth_place': 0,
        'tournaments': []
    })
    
    all_entries = []
    
    with open(csv_file_path, 'r', encoding='utf-8') as file:
        # Read all lines to handle multi-line fields
        content = file.read()
        
        # Replace newlines within quoted fields
        lines = []
        current_line = ""
        in_quotes = False
        
        for char in content:
            if char == '"':
                in_quotes = not in_quotes
            
            if char == '\n' and not in_quotes:
                if current_line.strip():
                    lines.append(current_line)
                current_line = ""
            else:
                if char == '\n' and in_quotes:
                    current_line += " "  # Replace newline with space inside quotes
                else:
                    current_line += char
        
        if current_line.strip():
            lines.append(current_line)
    
    # Parse CSV manually
    header = lines[0].split(',')
    print(f"Header: {header}")
    print(f"Total lines: {len(lines)}")
    
    for i, line in enumerate(lines[1:], start=2):
        parts = []
        current_part = ""
        in_quotes = False
        
        for char in line:
            if char == '"':
                in_quotes = not in_quotes
            elif char == ',' and not in_quotes:
                parts.append(current_part.strip().strip('"'))
                current_part = ""
            else:
                current_part += char
        
        parts.append(current_part.strip().strip('"'))
        
        if len(parts) < 4:
            continue
        
        winners_stage = parts[0].strip()
        discord_name = parts[1].strip()
        discord_id = parts[2].strip()
        date_str = parts[3].strip()
        tour_type = parts[4].strip() if len(parts) > 4 else "Main Tour"
        tour_name = parts[5].strip() if len(parts) > 5 else ""
        
        # Skip header or invalid rows
        if not winners_stage or winners_stage.lower() == 'winners stage' or not discord_name:
            continue
        
        # Parse position
        try:
            position = int(winners_stage)
        except:
            continue
        
        # Parse date
        try:
            if '-' in date_str:
                date_parts = date_str.split('-')
                if len(date_parts) == 3:
                    day = date_parts[0].zfill(2)
                    month = date_parts[1].zfill(2)
                    year = date_parts[2]
                    formatted_date = f"{day}-{month}-{year}"
                else:
                    formatted_date = date_str
            else:
                formatted_date = date_str
        except:
            formatted_date = date_str
        
        # Store entry
        entry = {
            'name': discord_name,
            'position': position,
            'date': formatted_date,
            'tourType': tour_type,
            'tourName': tour_name,
            'discordId': discord_id
        }
        all_entries.append(entry)
        
        # Update player stats
        player_stats[discord_name]['name'] = discord_name
        player_stats[discord_name]['total_tournaments'] += 1
        player_stats[discord_name]['tournaments'].append({
            'position': position,
            'date': formatted_date,
            'tour_name': tour_name
        })
        
        if position == 1:
            player_stats[discord_name]['first_place'] += 1
        elif position == 2:
            player_stats[discord_name]['second_place'] += 1
        elif position == 3:
            player_stats[discord_name]['third_place'] += 1
        elif position == 4:
            player_stats[discord_name]['fourth_place'] += 1
    
    return player_stats, all_entries

def generate_report(player_stats):
    """Generate a report of top players"""
    # Sort by first place wins
    sorted_by_wins = sorted(
        player_stats.items(),
        key=lambda x: (x[1]['first_place'], x[1]['total_tournaments']),
        reverse=True
    )
    
    print("\n" + "="*80)
    print("TOP PLAYERS BY FIRST PLACE WINS (2025)")
    print("="*80)
    
    for rank, (player_name, stats) in enumerate(sorted_by_wins[:20], 1):
        print(f"\n#{rank:2d} {player_name}")
        print(f"     🥇 1st Place: {stats['first_place']:2d} wins")
        print(f"     🥈 2nd Place: {stats['second_place']:2d}")
        print(f"     🥉 3rd Place: {stats['third_place']:2d}")
        print(f"     4️⃣  4th Place: {stats['fourth_place']:2d}")
        print(f"     📊 Total Tournaments: {stats['total_tournaments']:2d}")

def save_json_data(all_entries, output_file):
    """Save parsed data as JSON"""
    with open(output_file, 'w', encoding='utf-8') as f:
        json.dump(all_entries, f, indent=2, ensure_ascii=False)
    print(f"\n✅ Data saved to {output_file}")

if __name__ == "__main__":
    csv_file = "Information Players ( M47W - Survivor ) - Tour Rank (2025).csv"
    
    print("Parsing CSV file...")
    player_stats, all_entries = parse_csv_tournament_data(csv_file)
    
    print(f"\n✅ Parsed {len(all_entries)} tournament entries")
    print(f"✅ Found {len(player_stats)} unique players")
    
    # Check specific players
    print("\n" + "="*80)
    print("CHECKING SPECIFIC PLAYERS")
    print("="*80)
    
    for player_name in ['acr0ses', 'nata7933', 'nata']:
        if player_name in player_stats:
            stats = player_stats[player_name]
            print(f"\n{player_name}:")
            print(f"  🥇 1st Place: {stats['first_place']} wins")
            print(f"  🥈 2nd Place: {stats['second_place']}")
            print(f"  🥉 3rd Place: {stats['third_place']}")
            print(f"  4️⃣  4th Place: {stats['fourth_place']}")
            print(f"  📊 Total: {stats['total_tournaments']} tournaments")
    
    # Generate full report
    generate_report(player_stats)
    
    # Save clean JSON data
    save_json_data(all_entries, "tournament-data-clean.json")

