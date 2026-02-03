# Cookie Tool - Installation Guide

## Table of Contents

1. [macOS Installation](#macos-installation)
2. [Windows Installation](#windows-installation)
3. [Troubleshooting](#troubleshooting)
4. [Uninstalling](#uninstalling)

## macOS Installation

### Download

Download the latest `cookie-tool-{version}.dmg` file from the releases page.

### Initial Installation

1. **Open the DMG file**
   - Double-click the downloaded `.dmg` file
   - A window will open showing the Cookie Tool app

2. **Drag to Applications**
   - Drag the Cookie Tool icon to the Applications folder
   - Wait for the copy to complete

3. **Close the DMG**
   - Eject the DMG by clicking the eject button in Finder

### Opening an Unsigned App

**Important:** This app is currently unsigned (no Apple Developer certificate), so macOS will block it by default.

#### First Launch - Method 1 (Recommended)

1. **Open Applications folder**
   - Open Finder
   - Go to Applications folder

2. **Right-click (Control+Click) on Cookie Tool**
   - Right-click (or Control+Click) the Cookie Tool app
   - Select **"Open"** from the menu

3. **Click "Open" in the security dialog**
   - A dialog will appear saying the app is from an unidentified developer
   - Click **"Open"** to launch the app
   - This only needs to be done once

#### First Launch - Method 2 (System Settings)

If you double-clicked and got a security warning:

1. **Open System Settings**
   - Click Apple menu → System Settings (or System Preferences)

2. **Go to Privacy & Security**
   - Scroll down to "Privacy & Security"

3. **Find the security message**
   - Look for a message saying "Cookie Tool was blocked..."
   - Click **"Open Anyway"**

4. **Confirm**
   - Click **"Open"** in the confirmation dialog
   - Enter your password if prompted

#### First Launch - Method 3 (Command Line)

For advanced users, you can remove the quarantine flag:

```bash
# Navigate to Applications
cd /Applications

# Remove quarantine attribute
xattr -cr "Cookie Tool.app"

# Now you can open it normally
open "Cookie Tool.app"
```

### macOS Version Requirements

- **macOS 10.15 (Catalina)** or later
- Intel or Apple Silicon (M1/M2/M3) Mac

## Windows Installation

### Download

Download the latest `cookie-tool-{version}.exe` installer from the releases page.

### Initial Installation

1. **Run the installer**
   - Double-click the downloaded `.exe` file

2. **Windows SmartScreen Warning**
   - You may see a "Windows protected your PC" message
   - This appears because the app is unsigned

3. **Bypass SmartScreen**
   - Click **"More info"** link
   - Click **"Run anyway"** button

4. **Choose installation location**
   - Default: `C:\Program Files\Cookie Tool`
   - Or click "Browse" to choose a different location

5. **Complete installation**
   - Click "Install"
   - Wait for installation to complete
   - Click "Finish"

6. **Launch the app**
   - Cookie Tool will appear in your Start Menu
   - Search for "Cookie Tool" or find it in All Apps

### Windows Version Requirements

- **Windows 10** or later
- 64-bit operating system

### Windows Defender SmartScreen

If Windows Defender blocks the app:

1. **Open Windows Security**
   - Click Start → Settings → Privacy & Security → Windows Security

2. **Go to App & browser control**
   - Click "App & browser control"

3. **Find "Reputation-based protection settings"**
   - Click on this option

4. **Temporarily adjust settings (optional)**
   - You can temporarily turn off "Check apps and files"
   - Install Cookie Tool
   - Turn the setting back on

**Note:** Only do this if you trust the source of the installer.

## Verification

### Verify Installation (macOS)

After installation, verify the app is working:

```bash
# Check if app exists
ls -la "/Applications/Cookie Tool.app"

# Try to open from command line
open "/Applications/Cookie Tool.app"
```

### Verify Installation (Windows)

After installation, verify:

1. Check Start Menu for "Cookie Tool"
2. Or navigate to: `C:\Program Files\Cookie Tool\Cookie Tool.exe`
3. Double-click to launch

## Post-Installation

### First Run

When you first launch Cookie Tool:

1. The app window will open (800x900 pixels)
2. You'll see an empty configuration form
3. TLD will be pre-set to "qa.protected.net"
4. No presets or history will exist yet

### Testing the Installation

To verify everything works:

1. **Select a brand** (e.g., "totalav")
2. **Add a test cookie**
   - Name: `test`
   - Value: `123`
3. **Click "Generate URL"**
4. **Verify the URL is generated**
5. **Test "Copy to Clipboard"**
6. **Test "Open in Browser"**

If all these work, your installation is successful!

## Troubleshooting

### macOS Issues

#### "App is damaged and can't be opened"

This happens with some unsigned apps. Fix it with:

```bash
# Remove quarantine attribute
xattr -cr "/Applications/Cookie Tool.app"
```

#### "App can't be opened because Apple cannot check it for malicious software"

1. Right-click the app → Open
2. Or use System Settings → Privacy & Security → Open Anyway

#### App crashes on launch

1. Check macOS version (needs 10.15+)
2. Check crash logs:
   ```bash
   log show --predicate 'process == "Cookie Tool"' --last 5m
   ```
3. Try reinstalling

#### App won't appear in Applications

1. Verify the DMG was properly mounted
2. Manually copy the app:
   ```bash
   cp -R "/Volumes/Cookie Tool/Cookie Tool.app" /Applications/
   ```

### Windows Issues

#### "Windows protected your PC" won't go away

1. Click "More info"
2. Click "Run anyway"
3. If still blocked, check Windows Defender settings

#### Installation fails

1. Run installer as Administrator
   - Right-click installer → "Run as administrator"
2. Check antivirus isn't blocking it
3. Temporarily disable Windows Defender SmartScreen

#### App won't launch after installation

1. Check Windows version (needs Windows 10+)
2. Check Event Viewer for errors:
   - Windows Logs → Application
   - Look for "Cookie Tool" errors
3. Try reinstalling

#### Missing dependencies

If you get DLL errors:

1. Install Visual C++ Redistributable:
   - Download from Microsoft website
   - Install both x86 and x64 versions

### Common Issues (Both Platforms)

#### App takes a long time to start

- First launch can be slower (10-20 seconds)
- Subsequent launches should be faster (2-5 seconds)

#### App window is blank or white

1. Wait 10-15 seconds (might still be loading)
2. Restart the app
3. Check if hardware acceleration is causing issues

#### Cannot save presets or history

1. Check file permissions for config directory:
   - macOS: `~/Library/Application Support/cookie-tool/`
   - Windows: `%APPDATA%\cookie-tool\`
2. Ensure the app has write permissions
3. Try running with elevated permissions

## Uninstalling

### Uninstall on macOS

1. **Close the app** if it's running

2. **Delete the app**
   ```bash
   rm -rf "/Applications/Cookie Tool.app"
   ```

3. **Delete user data (optional)**
   ```bash
   rm -rf ~/Library/Application\ Support/cookie-tool/
   ```

4. **Delete preferences (optional)**
   ```bash
   rm -rf ~/Library/Preferences/com.cookietool.app.plist
   ```

### Uninstall on Windows

1. **Close the app** if it's running

2. **Use Windows Settings**
   - Settings → Apps → Installed apps
   - Find "Cookie Tool"
   - Click ⋮ (three dots) → Uninstall

3. **Or use Control Panel**
   - Control Panel → Programs → Uninstall a program
   - Select "Cookie Tool"
   - Click "Uninstall"

4. **Delete user data (optional)**
   - Navigate to: `%APPDATA%\cookie-tool\`
   - Delete the folder

## Security Considerations

### Why is the app unsigned?

Code signing requires:
- **macOS:** Apple Developer account ($99/year) + notarization
- **Windows:** Code signing certificate ($300-400/year)

This is an internal/team tool, so it's distributed unsigned.

### Is it safe to install unsigned apps?

**Only install if you trust the source:**
- ✅ Safe: From your team's official releases
- ✅ Safe: Built from source code you reviewed
- ❌ Unsafe: From unknown third parties
- ❌ Unsafe: From suspicious websites

### Best Practices

1. **Verify the source** before installing
2. **Check file integrity** if a hash is provided
3. **Scan with antivirus** if concerned
4. **Review the source code** if available
5. **Only bypass security warnings** if you trust the developer

## Updating

### macOS Update

1. Download the new DMG
2. Close the current app
3. Drag new version to Applications (replace old version)
4. Your presets and history are preserved

### Windows Update

1. Download the new installer
2. Run the installer (it will uninstall the old version automatically)
3. Your presets and history are preserved

### Preserve Data During Update

User data is stored separately from the app:
- **macOS:** `~/Library/Application Support/cookie-tool/config.json`
- **Windows:** `%APPDATA%\cookie-tool\config.json`

This data persists across updates and reinstalls.

### Backup Your Data

Before major updates, backup your presets:

**macOS:**
```bash
cp ~/Library/Application\ Support/cookie-tool/config.json ~/Desktop/cookie-tool-backup.json
```

**Windows:**
```powershell
copy %APPDATA%\cookie-tool\config.json %USERPROFILE%\Desktop\cookie-tool-backup.json
```

## Getting Help

If installation issues persist:

1. Check the [README.md](README.md) for system requirements
2. Review [docs/USER_GUIDE.md](docs/USER_GUIDE.md) for usage instructions
3. Check [docs/DEVELOPMENT.md](docs/DEVELOPMENT.md) if building from source
4. Check existing issues on the project repository
5. Contact your team administrator
6. Open a new issue with:
   - Operating system and version
   - Error messages
   - Steps you've tried
   - Screenshots if applicable

## Distribution Notes

### For Release Managers

When distributing the app:

1. **Include this installation guide**
2. **Provide installation instructions** in release notes
3. **Mention it's unsigned** to set expectations
4. **Consider creating a signed version** for wider distribution
5. **Provide SHA256 hashes** for verification

### For IT Administrators

**macOS Enterprise Deployment:**
```bash
# Remove quarantine from all installed apps
find /Applications -name "Cookie Tool.app" -exec xattr -cr {} \;

# Or use MDM to allowlist the app
# Add to approved apps in your MDM solution
```

**Windows Enterprise Deployment:**
```powershell
# Silent installation
cookie-tool-1.0.0.exe /S /D=C:\Program Files\Cookie Tool

# Or use Group Policy to allowlist
# Add to Windows Defender exclusions
```

## Signing the App (For Future Reference)

### macOS Code Signing

If you want to sign the app properly:

1. Join Apple Developer Program ($99/year)
2. Create a Developer ID Application certificate
3. Update `electron-builder.json`:
   ```json
   {
     "mac": {
       "identity": "Developer ID Application: Your Name (TEAM_ID)",
       "hardenedRuntime": true,
       "gatekeeperAssess": false,
       "entitlements": "build/entitlements.mac.plist",
       "entitlementsInherit": "build/entitlements.mac.plist"
     }
   }
   ```
4. Sign and notarize during build
5. No more security warnings!

### Windows Code Signing

If you want to sign the app properly:

1. Purchase a code signing certificate
2. Update `electron-builder.json`:
   ```json
   {
     "win": {
       "certificateFile": "path/to/certificate.pfx",
       "certificatePassword": "your-password",
       "signingHashAlgorithms": ["sha256"]
     }
   }
   ```
3. Sign during build
4. No more SmartScreen warnings!

---

**Version:** 1.0.0
**Last Updated:** 2024-02-03
**Supported:** macOS 10.15+, Windows 10+
