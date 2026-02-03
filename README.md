# Cookie Tool

A desktop application for generating cookie-setting URLs across multiple brands and TLDs. Built with Electron, React, and TypeScript.

## Features

- Generate cookie-setting URLs for 13 different brands
- Support for 3 TLDs (qa.protected.net, xyz, com)
- Add multiple cookies with name/value pairs
- Optional destination URL (base64 encoded)
- Save and load configuration presets
- URL history (last 20 generated URLs)
- Copy to clipboard functionality
- Open URLs directly in browser
- Clean, modern UI with TailwindCSS
- Cross-platform support (macOS and Windows)

## Installation

### For Developers

```bash
npm install
```

### For End Users

If you've received a built version (DMG for macOS or EXE for Windows):

**⚠️ Important: This app is unsigned**

Since the app doesn't have a code signing certificate, you'll see security warnings on first launch.

**macOS Users:**
- Right-click the app → Select "Open" → Click "Open" in the dialog
- Or: System Settings → Privacy & Security → Click "Open Anyway"

**Windows Users:**
- Click "More info" → Click "Run anyway"

📖 **Detailed installation instructions:** See [INSTALLATION.md](INSTALLATION.md) for step-by-step guides with screenshots and troubleshooting.

## Development

Run the app in development mode with hot reload:

```bash
npm run dev
```

This will:
1. Start the Vite development server
2. Build the Electron main and preload scripts
3. Launch the Electron app with DevTools open

## Building

### Build for macOS

```bash
npm run build:mac
```

This creates a `.dmg` installer and `.zip` archive in `release/{version}/`

### Build for Windows

```bash
npm run build:win
```

This creates an NSIS installer in `release/{version}/`

### Build for both platforms

```bash
npm run build
```

## Quick Start Guide

### Generating a Cookie URL

1. **Select a brand** from the dropdown (e.g., totalav, scanguard)
2. **Select a TLD** (defaults to qa.protected.net)
3. **Add cookies**:
   - Enter cookie name and value
   - Click "Add Cookie" to add more cookies
   - Use "Remove" to delete a cookie
4. **Add destination URL** (optional):
   - Enter a full URL (e.g., https://www.google.com)
   - This will be base64 encoded in the final URL
5. **Click "Generate URL"**
6. **Use the generated URL**:
   - Click "Copy to Clipboard" to copy the URL
   - Click "Open in Browser" to test it immediately

### Example Usage

**Simple cookie setting:**
- Brand: totalav
- TLD: qa.protected.net
- Cookie: name=user_id, value=12345

**Generated URL:**
```
https://www.totalav.qa.protected.net/global/cookie/set/c%3Dn%3Duser_id%26v%3D12345
```

**Multiple cookies with destination:**
- Brand: pcprotect
- TLD: xyz
- Cookies:
  - name=session, value=abc123
  - name=lang, value=en
- Destination: https://www.example.com

**Generated URL:**
```
https://www.pcprotect.xyz/global/cookie/set/c%3Dn%3Dsession%26v%3Dabc123%2Cn%3Dlang%26v%3Den%7Cd%3DaHR0cHM6Ly93d3cuZXhhbXBsZS5jb20%3D
```

## URL Format

Generated URLs follow this format:

```
https://www.{brand}.{tld}/global/cookie/set/{encoded}
```

Where `{encoded}` is a URL-encoded string containing:
- `c={cookies}` - Comma-separated list of `n={name}&v={value}` pairs
- `d={base64Dest}` - Base64-encoded destination URL (optional)

**Format breakdown:**
- Each cookie is formatted as `n={name}&v={value}`
- Multiple cookies are separated by commas
- The destination (if provided) is base64 encoded and appended with `|d={base64}`
- The entire string is then URL-encoded

## Supported Brands

The following 13 brands are supported (alphabetically sorted):

- pcprotect
- scanguard
- speedycleaner
- totaladblock
- totalav
- totalbrowser
- totalcleaner
- totaldrive
- totalpassword
- totalvpn
- totalwebshield
- ultraantivirus
- ultravpn

## Supported TLDs

- **qa.protected.net** (default) - QA environment
- **xyz** - XYZ domain
- **com** - Production domain

## Managing Presets

Presets allow you to save frequently used configurations for quick access.

### Save a Preset

1. Configure your brand, TLD, cookies, and destination
2. Click "Save Current Config"
3. Enter a descriptive name for the preset
4. Click "Save"

### Load a Preset

1. Find the preset in the "Presets" section
2. Click "Load" next to the preset name
3. The form will be populated with the saved configuration

### Delete a Preset

1. Click "Delete" next to the preset name
2. The preset will be permanently removed

## URL History

The app automatically tracks the last 20 generated URLs. Each history entry shows:

- **Timestamp** - When the URL was generated
- **Brand and TLD** - Configuration used
- **Full URL** - The complete generated URL
- **Copy button** - Quick access to copy the URL

Click "Clear History" to remove all history entries.

## Project Structure

```
www-cookie-tool/
├── electron/
│   ├── main.ts              # Main process (window management, IPC)
│   └── preload.ts           # Preload script (secure IPC bridge)
├── src/
│   ├── components/          # React UI components
│   │   ├── BrandSelector.tsx       # Brand dropdown selector
│   │   ├── TldSelector.tsx         # TLD dropdown selector
│   │   ├── CookieInput.tsx         # Single cookie input row
│   │   ├── CookieList.tsx          # Cookie list manager
│   │   ├── DestinationInput.tsx    # Optional destination URL input
│   │   ├── GeneratedUrl.tsx        # URL display and actions
│   │   ├── PresetManager.tsx       # Preset save/load/delete
│   │   └── UrlHistory.tsx          # Recent URLs list
│   ├── hooks/
│   │   ├── useStorage.ts           # Electron store integration
│   │   └── useUrlGenerator.ts      # URL generation state and logic
│   ├── utils/
│   │   ├── constants.ts            # Brand and TLD lists
│   │   ├── types.ts                # TypeScript interfaces
│   │   └── urlEncoder.ts           # Cookie URL encoding algorithm
│   ├── App.tsx                     # Main app component
│   ├── main.tsx                    # React entry point
│   └── index.css                   # Global styles (Tailwind)
├── package.json                    # Dependencies and scripts
├── tsconfig.json                   # TypeScript configuration
├── vite.config.ts                  # Vite build configuration
├── electron-builder.json           # App packaging configuration
├── tailwind.config.js              # Tailwind CSS configuration
└── postcss.config.js               # PostCSS configuration
```

## Technology Stack

- **Electron 28** - Desktop app framework
- **React 18** - UI framework
- **TypeScript 5** - Type safety and developer experience
- **Vite 5** - Fast build tooling and hot module replacement
- **TailwindCSS 3** - Utility-first CSS framework
- **electron-store 8** - Persistent storage for presets and history
- **electron-builder 24** - Cross-platform packaging and distribution

## Data Storage

The app uses `electron-store` to persist:
- **Presets** - Saved brand/TLD/cookie configurations
- **History** - Last 20 generated URLs with timestamps

Data is stored in platform-specific locations:
- **macOS**: `~/Library/Application Support/cookie-tool/config.json`
- **Windows**: `%APPDATA%\cookie-tool\config.json`
- **Linux**: `~/.config/cookie-tool/config.json`

## Keyboard Shortcuts

While the app doesn't currently implement custom keyboard shortcuts, you can use standard shortcuts:

- **Cmd/Ctrl + C** - Copy (when text is selected)
- **Cmd/Ctrl + V** - Paste
- **Cmd/Ctrl + A** - Select all
- **Tab** - Navigate between fields
- **Enter** - Submit forms

## Troubleshooting

### App won't start in development mode

1. Ensure all dependencies are installed: `npm install`
2. Check for Node.js version compatibility (requires Node 18+)
3. Try cleaning build files: `rm -rf dist dist-electron node_modules && npm install`

### URL generation fails

1. Verify at least one cookie has both name and value
2. Check that a brand is selected
3. If using destination URL, ensure it's a valid URL format (including `https://`)

### Presets not saving

1. Check that the preset name is not empty
2. Ensure the app has write permissions to the config directory
3. Try clearing and re-saving the preset

### Copy to clipboard not working

This feature requires Electron's clipboard API, which should work automatically. If issues persist:
1. Restart the app
2. Check OS clipboard permissions
3. Try manually selecting and copying the URL text

## Security Considerations

- The app uses Electron's `contextIsolation` for security
- IPC communication is restricted through the preload script
- No arbitrary code execution is allowed in the renderer process
- All external URLs are opened in the user's default browser (not in the app)

## Contributing

To contribute to this project:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly in development mode
5. Submit a pull request

## Known Limitations

- No support for Linux builds (can be added via electron-builder config)
- History limited to 20 entries
- No export functionality for presets or history
- No URL validation on the backend (assumes valid input)

## Future Enhancements

Potential features for future versions:
- Export/import presets as JSON files
- Search and filter in URL history
- URL validation and preview before generation
- Batch URL generation from CSV
- Custom keyboard shortcuts
- Dark mode theme
- URL analytics and statistics

## License

MIT

## Documentation

Additional documentation is available:

- **[INSTALLATION.md](INSTALLATION.md)** - Detailed installation guide for end users, including how to open unsigned apps
- **[docs/USER_GUIDE.md](docs/USER_GUIDE.md)** - Comprehensive user guide with examples and workflows
- **[docs/ARCHITECTURE.md](docs/ARCHITECTURE.md)** - System architecture and technical details
- **[docs/DEVELOPMENT.md](docs/DEVELOPMENT.md)** - Developer setup and workflow guide
- **[docs/CONTRIBUTING.md](docs/CONTRIBUTING.md)** - Guidelines for contributing to the project
- **[docs/QUICK_REFERENCE.md](docs/QUICK_REFERENCE.md)** - Quick reference for commands and patterns

## Support

For issues, questions, or feature requests, please open an issue on the project repository.
