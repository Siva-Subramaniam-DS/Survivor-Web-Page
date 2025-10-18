# 🎮 M47W - SurvivoR Tournament Hub

A modern, dynamic tournament webpage featuring all your custom fonts, icons, avatars, and real-time data integration.

## 🚀 Quick Start - Choose Your Version

You have **TWO versions** of the webpage to choose from:

### Option 1: Simple Version (Recommended for Easy Setup)
**File:** `index-simple.html`

✅ **Best for:** Quick setup, manual data updates  
✅ **No API keys needed**  
✅ **Easy to update**

**How to use:**
1. Rename `index-simple.html` to `index.html` (or just open it directly)
2. Edit `server-data.js` with your tournament data
3. Open in browser - Done!

**To update data:**
- Just edit `server-data.js` and refresh the page

### Option 2: Google Sheets Version
**File:** `index.html` (current)

✅ **Best for:** Live data updates from Google Sheets  
✅ **Automatic synchronization**  
✅ **No file editing needed after setup**

**How to use:**
1. Follow the instructions in `SETUP_GUIDE.md`
2. Get a Google Sheets API key
3. Configure the API key in `index.html`
4. Data automatically loads from your spreadsheet

---

## 📁 What's Included

```
📦 Survivor Web page/
├── 🌐 index.html               (Google Sheets version)
├── 🌐 index-simple.html        (Simple local data version)
├── 📊 server-data.js           (Edit your tournament data here)
├── 📖 README.md                (This file)
├── 📖 SETUP_GUIDE.md          (Detailed setup instructions)
├── 🖼️ logo.gif
├── 📁 Fonts/                   (All custom fonts)
│   ├── Capture It
│   ├── DS Digital
│   ├── Drone Attack
│   ├── Militaria
│   ├── Special Forces
│   └── Revamped
├── 📁 Icons/                   (Premium offers & rank badges)
├── 📁 Avatars/                 (Player avatars)
└── 📁 Templates/               (Background images)
```

---

## ✨ Features

### 🎨 Visual Features
- **6 Custom Fonts** perfectly integrated
- **Animated Statistics** in header
- **Premium Offers Section** with all your icons
- **Champions Gallery** with player avatars
- **Live Leaderboard** with rankings
- **Smooth Animations** and hover effects
- **Fully Responsive** design (mobile, tablet, desktop)

### 📊 Data Features
- Dynamic data loading
- Automatic win rate calculations
- Auto-sorted leaderboards
- Top champions display
- Real-time statistics

---

## 🎯 Quick Edit Guide

### For Simple Version Users:

**Edit `server-data.js`:**

```javascript
const serverData = [
    { name: 'Player Name', wins: 24, losses: 6 },
    { name: 'Another Player', wins: 21, losses: 9 },
    // Add more players here...
];
```

That's it! Just refresh your browser to see changes.

### For Google Sheets Users:

Your Google Sheet should look like this:

| Name | Wins | Losses |
|------|------|--------|
| Player1 | 24 | 6 |
| Player2 | 21 | 9 |
| ... | ... | ... |

Changes in your Google Sheet will appear when users refresh the page.

---

## 🔧 Customization

### Change Colors
Edit the CSS in the `<style>` section of your HTML file:
- Purple theme: `#8b5cf6`, `#a855f7`
- Gold accents: `#fbbf24`

### Change Fonts
All fonts are already loaded! They're used in:
- **Drone Attack**: Main title
- **Special Forces**: Section headers
- **Militaria**: Champion names
- **Capture It**: Offer titles
- **Revamped**: Stats labels
- **DS Digital**: Digital counters

### Add More Players
- **Simple version**: Edit `server-data.js`
- **Google Sheets version**: Add rows to your spreadsheet

### Change Avatar Matching
Edit the `avatarFiles` object in your HTML file to match player names with specific avatars.

---

## 🌐 How to Host Online

### Free Hosting Options:

1. **GitHub Pages** (Free)
   - Upload all files to a GitHub repository
   - Enable GitHub Pages in settings
   - Your site will be at: `username.github.io/repo-name`

2. **Netlify** (Free)
   - Drag and drop your folder to netlify.com
   - Get instant hosting with HTTPS
   - Auto-deploy on file changes

3. **Vercel** (Free)
   - Connect to GitHub or upload directly
   - Automatic deployments
   - Fast CDN hosting

### Files to Upload:
- Your HTML file (index.html or index-simple.html)
- server-data.js (if using simple version)
- logo.gif
- All folders: Fonts/, Icons/, Avatars/, Templates/

---

## 📱 Browser Compatibility

✅ Chrome / Edge (Recommended)  
✅ Firefox  
✅ Safari  
✅ Mobile browsers

---

## 🎮 Your Spreadsheet

Your Google Sheet URL:
`https://docs.google.com/spreadsheets/d/1DJ9x-UDhx9WY1T9JhuNcoWnrFwH-x3WqG6Ek2yBZi94/edit`

Make sure it has columns: **Name**, **Wins**, **Losses**

---

## 🐛 Troubleshooting

**Data not showing?**
- Check browser console (F12) for errors
- Verify `server-data.js` is in the same folder
- Ensure file names match exactly

**Images not loading?**
- Check folder names (case-sensitive on some servers)
- Verify image file paths are correct
- Check if files exist in Avatars/, Icons/, Templates/ folders

**Fonts not working?**
- Make sure Fonts/ folder is uploaded
- Check browser console for font loading errors
- Try refreshing the page (Ctrl+F5)

---

## 🎯 Next Steps

1. **Choose your version** (simple or Google Sheets)
2. **Add your data** (edit server-data.js or spreadsheet)
3. **Test locally** (open HTML file in browser)
4. **Customize** (optional: change colors, text, etc.)
5. **Deploy online** (upload to hosting service)

---

## 💡 Tips

- Use the simple version first to see everything working
- Switch to Google Sheets version later if you want live updates
- Keep your data file backed up
- Update regularly to keep players engaged
- Share the link in your Discord server!

---

## 📞 Support

Need help? Check:
1. `SETUP_GUIDE.md` for detailed instructions
2. Browser console (F12) for error messages
3. Verify all files and folders are in place

---

**Made with ⚡ for the M47W SurvivoR Discord Community**

*Last Updated: October 18, 2025*

