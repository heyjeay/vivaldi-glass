
![vivaldi_rQJHNm6T6h](https://github.com/user-attachments/assets/afcb54cb-3244-4248-960c-3e3877ab60f1)

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

## Quick Reference: Vivaldi Installation Directories

**Windows:**
- `%LOCALAPPDATA%\Vivaldi\Application\[VERSION]\resources\vivaldi\`
- Or: `C:\Users\YourUsername\AppData\Local\Vivaldi\Application\[VERSION]\resources\vivaldi\`

**macOS:**
- `/Applications/Vivaldi.app/Contents/Resources/vivaldi/`
- Or (Homebrew): `/opt/homebrew/Caskroom/vivaldi/[VERSION]/Vivaldi.app/Contents/Resources/vivaldi/`

**Linux:**
- `/opt/vivaldi/resources/vivaldi/`
- Or: `/usr/lib/vivaldi/resources/vivaldi/`
- Or: `~/.local/share/vivaldi/resources/vivaldi/`

*To find your Vivaldi version, type `vivaldi://about` in the address bar.*

## Installation

### Step 1: Enable Custom CSS in Vivaldi Flags

**Important:** This must be done first before any other steps!

1. Open Vivaldi browser
2. In the address bar, type: `vivaldi://flags`
3. Press Enter to open the Vivaldi flags page
4. Search for **"Allow CSS modifications"** or **"CSS modifications"**
5. **Enable this flag** (set it to "Enabled")
6. Restart Vivaldi when prompted
7. This allows Vivaldi to load and apply custom CSS files

### Step 2: Enable Transparency in Vivaldi

1. Open Vivaldi browser
2. Go to **Settings**
3. Navigate to **Appearance** → **Themes**
4. Click **"Edit"** on your current theme (or create a new theme)
5. In the theme editor, enable **"Transparent Tab Bar"**
6. Save the theme

### Step 3: Add the CSS File

1. Copy the `style.css` file to a permanent location:
   - **Windows**: `C:\Users\YourUsername\Documents\Vivaldi-glass\style.css`
   - **macOS**: `~/Documents/Vivaldi-glass/style.css`
   - **Linux**: `~/Documents/Vivaldi-glass/style.css` or `~/vivaldi-glass/style.css`

2. In **Settings** → **Appearance** → **Themes** → **Custom CSS**:
   - Click **"Add CSS File"** or **"Browse"**
   - Navigate to and select `style.css`
   - The file path should appear in the custom CSS list

### Step 4: Install the JavaScript File

1. Navigate to your Vivaldi installation directory (replace `[VERSION]` with your current Vivaldi version number):

   **Windows:**
   ```
   C:\Users\YourUsername\AppData\Local\Vivaldi\Application\[VERSION]\resources\vivaldi\
   ```
   *Tip: Press `Win + R`, type `%LOCALAPPDATA%\Vivaldi\Application`, and press Enter*

   **macOS:**
   ```
   /Applications/Vivaldi.app/Contents/Resources/vivaldi/
   ```
   *Or if installed via Homebrew:*
   ```
   /opt/homebrew/Caskroom/vivaldi/[VERSION]/Vivaldi.app/Contents/Resources/vivaldi/
   ```

   **Linux:**
   ```
   /opt/vivaldi/resources/vivaldi/
   ```
   *Or if installed via package manager, it may be:*
   ```
   /usr/lib/vivaldi/resources/vivaldi/
   ```
   *Or:*
   ```
   ~/.local/share/vivaldi/resources/vivaldi/
   ```

2. Copy `custom.js` to this directory:
   - The file should be at: `[VIVALDI_DIR]/resources/vivaldi/custom.js`

3. Edit `window.html` in the same directory and ensure it includes:
   ```html
   <script src="custom.js"></script>
   ```
   (This should already be in the file if you've been following along)

**Note for macOS/Linux users:** You may need administrator/sudo permissions to edit files in the Vivaldi installation directory. On macOS, you might need to right-click Vivaldi.app → Show Package Contents to access the Resources folder.

### Step 5: Restart Vivaldi

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

1. **Check file location**: `custom.js` must be in `resources/vivaldi/` directory (use `/` for Mac/Linux, `\` for Windows)
2. **Check window.html**: Ensure `<script src="custom.js"></script>` is present
3. **Check console**: Press `F12` (or `Cmd+Option+I` on Mac) → Console tab for JavaScript errors
4. **File permissions**: 
   - **Windows**: Ensure Vivaldi has read access to the file
   - **macOS/Linux**: You may need to use `sudo` or change file permissions with `chmod`

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
- **macOS/Linux Permissions**: You may need administrator permissions to edit files in the Vivaldi installation directory
- **Finding Vivaldi Version**: Check `vivaldi://about` in the address bar to see your Vivaldi version number

## Support

If you encounter issues:
1. Check the browser console (`F12` on Windows/Linux, `Cmd+Option+I` on Mac) for errors
2. Verify all file paths are correct for your operating system
3. Ensure Vivaldi has proper file permissions (may need `sudo` on macOS/Linux)
4. Try disabling other custom CSS or extensions
5. Check that "Transparent Tab Bar" is enabled in theme settings

**For Support Join my Discord:** [https://discord.gg/xm3HKSDDJq](https://discord.gg/xm3HKSDDJq)

## License

Free to use and modify for personal use.

---

**Enjoy your beautiful liquid glass Vivaldi theme! 🎨✨**

