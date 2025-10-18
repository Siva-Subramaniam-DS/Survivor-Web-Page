# 🚀 M47W SurvivoR Web Page - Setup Guide

## 📊 Connecting Your Google Sheets Data

Your webpage is now ready to dynamically load data from your Google Sheets! Follow these steps to connect it:

### Step 1: Make Your Google Sheet Public

1. Open your Google Sheet: https://docs.google.com/spreadsheets/d/1DJ9x-UDhx9WY1T9JhuNcoWnrFwH-x3WqG6Ek2yBZi94/edit
2. Click **File** → **Share** → **Publish to web**
3. Choose the specific sheet you want to share (or entire document)
4. Click **Publish**

### Step 2: Get a Google Sheets API Key (Optional but Recommended)

#### Method A: Using Google Cloud Console (For API Access)

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable the **Google Sheets API**:
   - Click on "Enable APIs and Services"
   - Search for "Google Sheets API"
   - Click "Enable"
4. Create credentials:
   - Click "Create Credentials" → "API Key"
   - Copy your API key
   - **IMPORTANT**: Restrict your API key:
     - Click on your API key name
     - Under "API restrictions", select "Restrict key"
     - Check only "Google Sheets API"
     - Under "Website restrictions", add your domain

5. Open `index.html` and replace `'YOUR_API_KEY'` with your actual API key:
   ```javascript
   const API_KEY = 'YOUR_ACTUAL_API_KEY_HERE';
   ```

#### Method B: Simple Public Access (No API Key)

If you want quick setup without an API key, you can use a published CSV export:

1. In your Google Sheet, click **File** → **Download** → **CSV**
2. Create a JSON file with your data manually
3. Or use the fallback data that's already built into the page

### Step 3: Configure Sheet Structure

Your Google Sheet should have the following columns (in any order):

| Name | Wins | Losses |
|------|------|--------|
| Player1 | 24 | 6 |
| Player2 | 21 | 9 |
| ... | ... | ... |

The script will automatically detect these columns by their headers.

### Step 4: Update Sheet Name in Code

If your sheet tab is named something other than "Sheet1":

1. Open `index.html`
2. Find this line:
   ```javascript
   const SHEET_NAME = 'Sheet1';
   ```
3. Change it to your actual sheet name (you can see this at the bottom of your Google Sheet)

### Step 5: Test Your Setup

1. Open `index.html` in a web browser
2. You should see:
   - Loading spinners appear
   - Data populates from your Google Sheet
   - Stats update in the header
   - Champions gallery fills with top players
   - Leaderboard shows all players sorted by wins

### 📝 Google Sheet Data Format

#### Minimum Required Columns:
- **Name**: Player name (text)
- **Wins**: Number of tournament wins (number)
- **Losses**: Number of losses (number)

#### Optional Columns:
You can add more columns for future features:
- **Avatar**: Custom avatar URL
- **Rank**: Player rank
- **Points**: Total points
- **Prize**: Total prize money won

### 🎨 Avatar Mapping

The webpage automatically tries to match player names with available avatars in the `Avatars/` folder. 

If you want to manually assign avatars, you can edit the avatar mapping in the HTML file:

```javascript
const avatarMapping = {
    'PlayerName': 'Avatars/AvatarPortrait_xxx_Widget.png',
    'default': 'Avatars/AvatarPortrait_ModernMarine_Widget.png'
};
```

### 🔄 Refreshing Data

The webpage includes a "REFRESH DATA" button that reloads data from your Google Sheet. Users can click this to see updated tournament results without reloading the page.

### 🛠️ Troubleshooting

#### Data Not Loading?
1. Check browser console (F12) for errors
2. Verify your Google Sheet is public/published
3. Verify API key is correct (if using one)
4. Check sheet name matches the code
5. Verify column headers match (Name, Wins, Losses)

#### Using Fallback Data?
If you see the message "Using fallback data", it means:
- API key is not configured (still says 'YOUR_API_KEY')
- The page will use sample data instead

This is fine for testing! The page will work perfectly with the built-in sample data.

### 🚀 Going Live

When you're ready to publish your webpage:

1. **For free hosting options:**
   - [GitHub Pages](https://pages.github.com/) (Free)
   - [Netlify](https://www.netlify.com/) (Free tier available)
   - [Vercel](https://vercel.com/) (Free tier available)

2. Upload all your files:
   - `index.html`
   - `logo.gif`
   - `Fonts/` folder
   - `Icons/` folder
   - `Avatars/` folder
   - `Templates/` folder

3. If using an API key, remember to restrict it to your domain!

### 📊 Alternative: Direct Sheet Embedding

If you prefer to embed the actual Google Sheet instead:

1. Publish your sheet to web
2. Get the embed code
3. You can create a separate page that shows the raw sheet data

---

## 🎮 Features Overview

Your webpage now includes:

✅ **Dynamic Data Loading** from Google Sheets  
✅ **All Custom Fonts** loaded and styled  
✅ **Premium Offer Cards** with all your icons  
✅ **Champions Gallery** with player avatars  
✅ **Live Tournament Leaderboard** with rankings  
✅ **Animated Statistics** in header  
✅ **Responsive Design** for mobile devices  
✅ **Smooth Animations** and hover effects  
✅ **Refresh Button** to update data  

## 💡 Tips

- Update your Google Sheet regularly - changes will reflect when users refresh
- The page uses fallback data if Google Sheets connection fails
- All fonts and assets are properly integrated
- The design is fully responsive for mobile, tablet, and desktop

---

**Need Help?** Check the browser console (F12 → Console tab) for any error messages.

**Ready to customize more?** All styles are in the `<style>` section of index.html - feel free to adjust colors, fonts, and layouts!

