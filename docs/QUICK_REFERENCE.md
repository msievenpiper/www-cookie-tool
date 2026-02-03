# Cookie Tool - Quick Reference

## Quick Commands

```bash
npm install          # Install dependencies
npm run dev          # Start development mode
npm run build        # Build for all platforms
npm run build:mac    # Build for macOS
npm run build:win    # Build for Windows
```

## URL Format

```
https://www.{brand}.{tld}/global/cookie/set/{encoded}
```

**Encoded format:**
- Single cookie: `c=n={name}&v={value}`
- Multiple cookies: `c=n={name1}&v={value1},n={name2}&v={value2}`
- With destination: `c={cookies}|d={base64Dest}`
- Then URL encode the entire string

## Supported Brands (13)

```
pcprotect          speedycleaner      totaladblock
totalav            totalbrowser       totalcleaner
totaldrive         totalpassword      totalvpn
totalwebshield     ultraantivirus     ultravpn
scanguard
```

## Supported TLDs (3)

```
qa.protected.net   (default - QA environment)
xyz                (XYZ domain)
com                (Production)
```

## Example URLs

### Single Cookie
**Input:**
- Brand: totalav
- TLD: qa.protected.net
- Cookie: name=user_id, value=12345

**Output:**
```
https://www.totalav.qa.protected.net/global/cookie/set/c%3Dn%3Duser_id%26v%3D12345
```

### Multiple Cookies
**Input:**
- Brand: pcprotect
- TLD: xyz
- Cookies:
  - name=session, value=abc123
  - name=lang, value=en

**Output:**
```
https://www.pcprotect.xyz/global/cookie/set/c%3Dn%3Dsession%26v%3Dabc123%2Cn%3Dlang%26v%3Den
```

### With Destination
**Input:**
- Brand: totalav
- TLD: com
- Cookie: name=user_id, value=12345
- Destination: https://www.example.com

**Output:**
```
https://www.totalav.com/global/cookie/set/c%3Dn%3Duser_id%26v%3D12345%7Cd%3DaHR0cHM6Ly93d3cuZXhhbXBsZS5jb20%3D
```

## File Structure

```
www-cookie-tool/
├── electron/
│   ├── main.ts              # Main process
│   └── preload.ts           # IPC bridge
├── src/
│   ├── components/          # UI components (8 files)
│   ├── hooks/              # Custom hooks (2 files)
│   ├── utils/              # Utilities (3 files)
│   ├── App.tsx             # Root component
│   ├── main.tsx            # Entry point
│   └── index.css           # Styles
├── package.json
├── tsconfig.json
├── vite.config.ts
└── electron-builder.json
```

## Key Components

| Component | Purpose |
|-----------|---------|
| `BrandSelector` | Brand dropdown |
| `TldSelector` | TLD dropdown |
| `CookieList` | Manage cookies |
| `CookieInput` | Single cookie row |
| `DestinationInput` | Destination URL |
| `GeneratedUrl` | Display & actions |
| `PresetManager` | Save/load presets |
| `UrlHistory` | Recent URLs |

## Key Hooks

| Hook | Purpose |
|------|---------|
| `useUrlGenerator` | Form state & URL generation |
| `useStorage` | Presets & history storage |

## Key Utilities

| File | Purpose |
|------|---------|
| `urlEncoder.ts` | URL generation algorithm |
| `constants.ts` | Brands & TLDs |
| `types.ts` | TypeScript interfaces |

## IPC Methods

```typescript
window.electronAPI.copyToClipboard(text: string)
window.electronAPI.openInBrowser(url: string)
window.electronAPI.savePreset(name: string, preset: Preset)
window.electronAPI.loadPresets()
window.electronAPI.deletePreset(name: string)
window.electronAPI.saveToHistory(entry: HistoryEntry)
window.electronAPI.loadHistory()
window.electronAPI.clearHistory()
```

## TypeScript Interfaces

```typescript
interface Cookie {
  name: string;
  value: string;
}

interface Preset {
  brand: string;
  tld: string;
  cookies: Cookie[];
  destination?: string;
}

interface HistoryEntry {
  url: string;
  timestamp: number;
  brand: string;
  tld: string;
}
```

## Storage Locations

- **macOS:** `~/Library/Application Support/cookie-tool/config.json`
- **Windows:** `%APPDATA%\cookie-tool\config.json`
- **Linux:** `~/.config/cookie-tool/config.json`

## Storage Schema

```json
{
  "presets": {
    "Preset Name": {
      "brand": "totalav",
      "tld": "qa.protected.net",
      "cookies": [
        { "name": "test", "value": "123" }
      ],
      "destination": "https://example.com"
    }
  },
  "history": [
    {
      "url": "https://...",
      "timestamp": 1706889600000,
      "brand": "totalav",
      "tld": "qa.protected.net"
    }
  ]
}
```

## Common Issues & Fixes

| Issue | Solution |
|-------|----------|
| App won't start | `rm -rf node_modules && npm install` |
| Build fails | Check TypeScript errors: `tsc --noEmit` |
| Changes not reflected | Restart dev server |
| Clipboard not working | Restart app |
| Presets not saving | Check file permissions |

## Development Workflow

1. **Start dev mode:** `npm run dev`
2. **Make changes** in `src/` or `electron/`
3. **Test thoroughly** in the app
4. **Verify build:** `npm run build:mac` or `npm run build:win`
5. **Commit changes** with descriptive message

## Code Style

```typescript
// Component pattern
interface ComponentProps {
  value: string;
  onChange: (value: string) => void;
}

export function Component({ value, onChange }: ComponentProps) {
  return <div className="mb-4">{/* JSX */}</div>;
}

// Hook pattern
export function useCustomHook() {
  const [state, setState] = useState(initial);

  const method = () => {
    // Logic
  };

  return { state, setState, method };
}

// Utility pattern
export function utilityFunction(param: string): string {
  // Pure logic
  return result;
}
```

## Tailwind Class Order

```typescript
// Layout → Spacing → Sizing → Typography → Colors → Effects → Interactive
<button className="flex items-center px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:ring-2">
```

## Testing Checklist

- [ ] Brand selector works
- [ ] TLD selector works
- [ ] Cookie add/remove works
- [ ] URL generation works
- [ ] Copy to clipboard works
- [ ] Open in browser works
- [ ] Presets save/load/delete work
- [ ] History saves and displays
- [ ] Error messages display
- [ ] UI is responsive

## Debugging Tips

**Renderer process:**
```typescript
console.log('Debug:', variable);
console.table(arrayOfObjects);
```

**Main process:**
```typescript
// Logs appear in terminal
console.log('Main:', data);
```

**IPC debugging:**
```typescript
// Log both sides
console.log('Calling IPC:', arg);
const result = await window.electronAPI.method(arg);
console.log('IPC result:', result);
```

## Build Outputs

- **Development:** App opens with DevTools
- **Production (macOS):** `release/{version}/cookie-tool-{version}.dmg`
- **Production (Windows):** `release/{version}/cookie-tool-{version}.exe`

## Documentation

- `README.md` - Overview and quick start
- `USER_GUIDE.md` - Comprehensive user guide
- `ARCHITECTURE.md` - System architecture details
- `DEVELOPMENT.md` - Developer guide
- `CONTRIBUTING.md` - Contribution guidelines
- `QUICK_REFERENCE.md` - This file

## Useful Links

- [Electron Docs](https://www.electronjs.org/docs)
- [React Docs](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Vite Docs](https://vitejs.dev)
- [TailwindCSS Docs](https://tailwindcss.com/docs)

## Version Info

- **App Version:** 1.0.0
- **Node:** 18+
- **Electron:** 28
- **React:** 18
- **TypeScript:** 5
- **Vite:** 5

---

**Need more details?** Check the full documentation files listed above.
