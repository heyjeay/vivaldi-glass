# Vivaldi Liquid Glass Theme

A beautiful dark-themed liquid glass morphism UI for Vivaldi browser with smooth animations and modern design.

## Features

- ✨ Liquid glass morphism effect on tabs
- 🌙 Dark theme by default
- 🎨 Modern Inter font
- 🎬 Smooth tab switch animations
- 🔊 Audio indicator hidden (favicon stays visible)
- 🚫 Vivaldi theme system disabled (no conflicts)
- 📱 Auto-hiding address bar and status bar

## Installation

### Step 1: Enable Custom CSS in Vivaldi

1. Open Vivaldi browser
2. Go to **Settings** (or press `F2`)
3. Navigate to **Appearance** → **Themes**
4. Scroll down to find **Custom CSS** section
5. Click **"Add Custom CSS"** or enable **"Allow CSS modifications"**

### Step 2: Install the CSS File

1. Copy the `style.css` file to a permanent location (recommended: `C:\Users\YourUsername\Documents\Vivaldi-glass\style.css`)
2. In Vivaldi Settings → Appearance → Themes → Custom CSS:
   - Click **"Add CSS File"** or **"Browse"**
   - Navigate to and select `style.css`
   - The file path should appear in the custom CSS list

### Step 3: Install the JavaScript File

1. Navigate to your Vivaldi installation directory:
   ```
   C:\Users\YourUsername\AppData\Local\Vivaldi\Application\[VERSION]\resources\vivaldi\
   ```
   (Replace `[VERSION]` with your current Vivaldi version number)

2. Copy `custom.js` to this directory:
   ```
   C:\Users\YourUsername\AppData\Local\Vivaldi\Application\[VERSION]\resources\vivaldi\custom.js
   ```

3. Edit `window.html` in the same directory and ensure it includes:
   ```html
   <script src="custom.js"></script>
   ```
   (This should already be in the file if you've been following along)

### Step 4: Restart Vivaldi

1. Close all Vivaldi windows completely
2. Reopen Vivaldi
3. The liquid glass theme should now be active!

## File Structure

```
Vivaldi-glass/
├── style.css          # Main CSS theme file
├── README.md          # This file
└── custom.js          # JavaScript for auto-hide features (copy to Vivaldi directory)
```

## Customization

### Change Font

Replace the font import (around line 240):

```css
@import url("https://fonts.googleapis.com/css2?family=YourFont:wght@300;400;500;600;700;800&display=swap");
```

And update the font-family (around line 248):

```css
font-family: "YourFont", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif !important;
```

## Troubleshooting

### Theme Not Applying

1. **Check CSS is enabled**: Settings → Appearance → Themes → Custom CSS should show your file
2. **Check file path**: Ensure the CSS file path is correct and accessible
3. **Clear cache**: Close Vivaldi completely and reopen
4. **Check console**: Press `F12` → Console tab to check for errors

### JavaScript Not Working

1. **Check file location**: `custom.js` must be in `resources\vivaldi\` directory
2. **Check window.html**: Ensure `<script src="custom.js"></script>` is present
3. **Check console**: Press `F12` → Console tab for JavaScript errors
4. **File permissions**: Ensure Vivaldi has read access to the file

## Features Explained

### Auto-Hide Address Bar
- Hides automatically when not in use
- Shows on header hover
- Stays visible when typing or focused

### Auto-Hide Status Bar
- Hides automatically
- Shows when address bar is visible
- Smooth slide animations

### Liquid Glass Effect
- Glassmorphism with backdrop blur
- Multiple layered shadows for depth
- Smooth transitions between states

### Audio Tab Handling
- Audio icon completely hidden
- Favicon stays visible (no replacement)
- No animations on audible tabs (prevents glitching)

## Notes

- **Vivaldi Updates**: After Vivaldi updates, you may need to re-copy `custom.js` to the new version directory
- **Backup**: Keep backups of your custom files
- **Performance**: The theme uses hardware acceleration for smooth performance

## Support

If you encounter issues:
1. Check the browser console (F12) for errors
2. Verify all file paths are correct
3. Ensure Vivaldi has proper file permissions
4. Try disabling other custom CSS or extensions

**For Support Join my Discord:** [https://discord.gg/xm3HKSDDJq](https://discord.gg/xm3HKSDDJq)

## License

Free to use and modify for personal use.

---

**Enjoy your beautiful liquid glass Vivaldi theme! 🎨✨**

