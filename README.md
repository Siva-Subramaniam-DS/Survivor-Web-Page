# 🎮 M47W - SurvivoR Tournament Hub

A modern, dynamic tournament webpage featuring custom fonts, icons, avatars, and real-time data integration.

## 📁 Project Structure

```
📦 Survivor Web page/
├── 🌐 index.html                    # Main webpage
├── 🖼️ logo.gif                      # Server logo
├── 📊 Information Players.xlsx      # Tournament data source
├── 📁 css/                          # Stylesheets
│   └── styles.css
├── 📁 js/                           # JavaScript files
│   ├── script.js                    # Main application logic
│   ├── server-data.js              # Tournament data
│   └── excel-reader.js             # Excel file parser
├── 📁 docs/                         # Documentation
│   ├── README.md                    # This file
│   └── SETUP_GUIDE.md              # Setup instructions
├── 📁 src/                          # Source files
│   └── m47w_survivor_webpage.tsx   # React component (alternative)
├── 📁 Fonts/                        # Custom fonts
│   ├── capture_it/
│   ├── ds_digital/
│   ├── revamped/
│   └── top_secret_kb/
├── 📁 Avatars/                      # Player avatars
├── 📁 Prize/                        # Prize/reward icons
├── 📁 Titles/                       # Rank badges
├── 📁 Templates/                    # Background images
└── 📁 Units/                        # Unit icons
```

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
- Month-based filtering

## 🚀 Quick Start

1. **Open the webpage**: Simply open `index.html` in your web browser
2. **Update data**: Edit `js/server-data.js` with your tournament information
3. **Customize**: Modify colors, fonts, and content as needed

## 🎯 Updating Tournament Data

Edit [`js/server-data.js`](../js/server-data.js):

```javascript
const serverData = [
    { 
        name: 'Player Name', 
        position: 1, 
        tourType: 'Main Tour', 
        date: '2025-01-15', 
        tourName: 'Tournament Name' 
    },
    // Add more entries...
];
```

## 🔧 Customization

### Change Colors
Edit the CSS in [`css/styles.css`](../css/styles.css):
- Purple theme: `#8b5cf6`, `#a855f7`
- Gold accents: `#fbbf24`

### Change Fonts
All fonts are loaded from the `Fonts/` directory and used throughout the page:
- **Capture It**: Offer titles
- **DS Digital**: Digital counters
- **Revamped**: Stats labels
- **Top Secret**: Special headers

### Add More Players
Edit [`js/server-data.js`](../js/server-data.js) and add new entries to the array.

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
- `index.html`
- All folders: `css/`, `js/`, `Fonts/`, `Avatars/`, `Prize/`, `Templates/`, `Titles/`, `Units/`
- `logo.gif`

## 📱 Browser Compatibility

✅ Chrome / Edge (Recommended)  
✅ Firefox  
✅ Safari  
✅ Mobile browsers

## 🐛 Troubleshooting

**Data not showing?**
- Check browser console (F12) for errors
- Verify [`js/server-data.js`](../js/server-data.js) exists
- Ensure file paths are correct

**Images not loading?**
- Check folder names (case-sensitive on some servers)
- Verify image file paths in HTML
- Ensure all asset folders are uploaded

**Fonts not working?**
- Make sure `Fonts/` folder is uploaded
- Check browser console for font loading errors
- Try refreshing the page (Ctrl+F5)

## 💡 Tips

- Keep your data file backed up
- Update regularly to keep players engaged
- Test locally before deploying
- Join our Discord server: https://discord.gg/zWz23JMmcZ
- Share the tournament webpage with your community!

## 📞 Support

Need help? Check:
1. [`docs/SETUP_GUIDE.md`](SETUP_GUIDE.md) for detailed instructions
2. Browser console (F12) for error messages
3. Verify all files and folders are in place

---

## 🎮 Join Our Community

**Discord Server**: https://discord.gg/zWz23JMmcZ

**Made with ⚡ for the M47W SurvivoR Discord Community**

*Last Updated: October 18, 2025*