# Cookie Tool - Architecture Documentation

## Overview

Cookie Tool is an Electron-based desktop application that generates cookie-setting URLs. The architecture follows a standard Electron pattern with separate main and renderer processes, combined with a modern React-based UI.

## Architecture Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                        Electron App                          │
├─────────────────────────────────────────────────────────────┤
│                                                               │
│  ┌──────────────────┐              ┌────────────────────┐   │
│  │   Main Process   │              │ Renderer Process   │   │
│  │   (Node.js)      │◄────IPC─────►│  (Chromium)       │   │
│  │                  │              │                    │   │
│  │  • Window Mgmt   │              │  • React App       │   │
│  │  • IPC Handlers  │              │  • UI Components   │   │
│  │  • File System   │              │  • State Mgmt      │   │
│  │  • Clipboard     │              │  • URL Generation  │   │
│  │  • Browser Open  │              │                    │   │
│  └────────┬─────────┘              └──────────┬─────────┘   │
│           │                                   │             │
│           │                                   │             │
│      ┌────▼────┐                         ┌───▼────┐        │
│      │electron-│                         │ React  │        │
│      │  store  │                         │ Hooks  │        │
│      └─────────┘                         └────────┘        │
│                                                               │
└─────────────────────────────────────────────────────────────┘
```

## Process Architecture

### Main Process (`electron/main.ts`)

The main process is responsible for:

1. **Application Lifecycle Management**
   - Window creation and management
   - App startup and shutdown
   - Platform-specific behaviors

2. **IPC (Inter-Process Communication) Handlers**
   - `copy-to-clipboard` - Copies text to system clipboard
   - `open-in-browser` - Opens URLs in default browser
   - `save-preset` - Saves configuration presets
   - `load-presets` - Retrieves all saved presets
   - `delete-preset` - Removes a specific preset
   - `save-to-history` - Adds URL to history
   - `load-history` - Retrieves URL history
   - `clear-history` - Clears all history

3. **Storage Management**
   - Uses `electron-store` for persistent data
   - Manages presets and history data

### Preload Script (`electron/preload.ts`)

The preload script acts as a secure bridge:

1. **Context Isolation**
   - Runs in a separate JavaScript context
   - Prevents renderer from accessing Node.js APIs directly

2. **API Exposure**
   - Exposes safe IPC methods to renderer via `contextBridge`
   - Creates the `window.electronAPI` interface

3. **Security**
   - Only exposes explicitly defined methods
   - No arbitrary code execution allowed

### Renderer Process (`src/`)

The renderer process contains the React application:

1. **UI Layer** (`components/`)
   - Reusable React components
   - Handles user input and display
   - No direct access to Node.js APIs

2. **State Management** (`hooks/`)
   - Custom hooks for business logic
   - Manages application state
   - Coordinates with Electron APIs

3. **Business Logic** (`utils/`)
   - URL encoding algorithm
   - Type definitions
   - Constants and configuration

## Component Architecture

### Component Hierarchy

```
App
├── Configuration Section
│   ├── BrandSelector
│   ├── TldSelector
│   ├── CookieList
│   │   └── CookieInput (multiple)
│   └── DestinationInput
│
└── Results Section
    ├── GeneratedUrl
    ├── PresetManager
    └── UrlHistory
```

### Component Responsibilities

#### `App.tsx`
- **Role**: Root component and layout container
- **State**: None (delegates to hooks)
- **Functions**: Coordinates between hooks and child components

#### `BrandSelector.tsx` & `TldSelector.tsx`
- **Role**: Dropdown selectors for brand and TLD
- **Props**: `value`, `onChange`
- **Data Source**: `constants.ts`

#### `CookieList.tsx`
- **Role**: Manages multiple cookie inputs
- **Functions**: Add, remove, update cookies
- **Child**: `CookieInput` components

#### `CookieInput.tsx`
- **Role**: Single cookie name/value pair input
- **Props**: `name`, `value`, `onNameChange`, `onValueChange`, `onRemove`, `canRemove`

#### `DestinationInput.tsx`
- **Role**: Optional destination URL input
- **Features**: Clear button, URL validation

#### `GeneratedUrl.tsx`
- **Role**: Display and actions for generated URL
- **Actions**: Copy to clipboard, open in browser
- **Feedback**: Visual copy confirmation

#### `PresetManager.tsx`
- **Role**: Save and manage configuration presets
- **Features**: Save, load, delete presets
- **Storage**: Via `useStorage` hook

#### `UrlHistory.tsx`
- **Role**: Display recent generated URLs
- **Features**: Copy URLs, clear history
- **Display**: Timestamps, brand/TLD info

## State Management

### Hook-Based Architecture

The app uses custom React hooks for state management:

#### `useUrlGenerator`
```typescript
{
  // State
  brand: string
  tld: string
  cookies: Cookie[]
  destination: string
  generatedUrl: string
  error: string

  // Actions
  setBrand: (brand: string) => void
  setTld: (tld: string) => void
  addCookie: () => void
  removeCookie: (index: number) => void
  updateCookie: (index, field, value) => void
  setDestination: (url: string) => void
  generateUrl: () => string | null
  loadPreset: (preset: Preset) => void
  getCurrentConfig: () => Preset
  reset: () => void
}
```

**Responsibilities:**
- Form state management
- URL generation orchestration
- Validation and error handling
- Preset loading

#### `useStorage`
```typescript
{
  // State
  presets: Record<string, Preset>
  history: HistoryEntry[]

  // Actions
  savePreset: (name, preset) => Promise<void>
  deletePreset: (name) => Promise<void>
  saveToHistory: (entry) => Promise<void>
  clearHistory: () => Promise<void>
}
```

**Responsibilities:**
- IPC communication with main process
- Preset CRUD operations
- History management
- State synchronization with storage

## Data Flow

### URL Generation Flow

```
User Input
    ↓
useUrlGenerator Hook
    ↓
Validation
    ↓
urlEncoder.generateCookieUrl()
    ↓
URL Encoding Algorithm
    ↓
Generated URL
    ↓
Display + Save to History
```

### Storage Flow

```
User Action (Save Preset)
    ↓
useStorage.savePreset()
    ↓
IPC: window.electronAPI.savePreset()
    ↓
Preload Script (contextBridge)
    ↓
IPC Handler (main process)
    ↓
electron-store.set()
    ↓
File System (config.json)
```

## URL Encoding Algorithm

Located in `src/utils/urlEncoder.ts`:

```
Input:
  - brand: string
  - tld: string
  - cookies: Cookie[]
  - destination?: string

Process:
  1. Validate cookies array is not empty
  2. Format each cookie as "n={name}&v={value}"
  3. Join cookies with commas
  4. Create payload: "c={cookies}"
  5. If destination provided:
     - Base64 encode destination
     - Append: "|d={base64Dest}"
  6. URL encode entire payload
  7. Construct final URL:
     "https://www.{brand}.{tld}/global/cookie/set/{encoded}"

Output:
  - Complete cookie-setting URL (string)
```

## Security Model

### Context Isolation

```
Renderer Process (Untrusted)
         ↓
    Preload Script (Bridge)
         ↓
   Main Process (Trusted)
```

**Key Security Features:**
1. **Context Isolation Enabled**: Renderer cannot access `require()` or Node.js APIs
2. **No Node Integration**: Renderer runs in a sandboxed environment
3. **Controlled IPC**: Only specific methods exposed via `contextBridge`
4. **No Remote Module**: All main process operations go through IPC

### IPC Security

All IPC handlers follow secure patterns:
- No arbitrary code execution
- Input validation in handlers
- Type-safe interfaces
- Scoped permissions (clipboard, file system, browser)

## Build Process

### Development Build

```
npm run dev
    ↓
Vite Dev Server (Renderer)
    ↓
TypeScript Compilation (Main/Preload)
    ↓
Electron Launch
    ↓
Hot Module Replacement (HMR)
```

### Production Build

```
npm run build
    ↓
TypeScript Compilation (All)
    ↓
Vite Build (Renderer → dist/)
    ↓
Electron Build (Main/Preload → dist-electron/)
    ↓
electron-builder (Package)
    ↓
Platform-specific Installers (release/)
```

## Storage Schema

### Presets Storage

```json
{
  "presets": {
    "My QA Config": {
      "brand": "totalav",
      "tld": "qa.protected.net",
      "cookies": [
        { "name": "test", "value": "123" }
      ],
      "destination": "https://example.com"
    }
  }
}
```

### History Storage

```json
{
  "history": [
    {
      "url": "https://www.totalav.qa.protected.net/...",
      "timestamp": 1706889600000,
      "brand": "totalav",
      "tld": "qa.protected.net"
    }
  ]
}
```

## Performance Considerations

1. **Lazy Loading**: Components load on demand
2. **Memoization**: Could be added for expensive computations
3. **Virtual Scrolling**: Not needed (max 20 history items)
4. **Build Optimization**: Vite handles code splitting and minification

## Testing Strategy

### Unit Tests (Not Yet Implemented)
- `urlEncoder.ts` - URL generation algorithm
- Individual component logic
- Hook state management

### Integration Tests (Not Yet Implemented)
- IPC communication flow
- Storage operations
- Full URL generation workflow

### E2E Tests (Not Yet Implemented)
- Complete user workflows
- Cross-platform compatibility
- Build and packaging verification

## Deployment

### macOS
- DMG installer with drag-to-Applications
- Code signing (requires Apple Developer certificate)
- Notarization (requires Apple notarization)

### Windows
- NSIS installer
- Code signing (requires certificate)
- Auto-updater support (can be added)

## Extensibility Points

### Adding New Brands
1. Update `BRANDS` array in `src/utils/constants.ts`
2. Ensure alphabetical sorting
3. No code changes required

### Adding New TLDs
1. Update `TLDS` array in `src/utils/constants.ts`
2. No code changes required

### Adding New Storage Features
1. Add IPC handler in `electron/main.ts`
2. Expose method in `electron/preload.ts`
3. Add function in `hooks/useStorage.ts`
4. Use in components

### Modifying URL Format
1. Update `generateCookieUrl()` in `src/utils/urlEncoder.ts`
2. Update tests if present
3. Update documentation

## Dependencies

### Production Dependencies
- `electron-store`: ^8.1.0 - Persistent storage
- `react`: ^18.2.0 - UI framework
- `react-dom`: ^18.2.0 - React DOM renderer

### Development Dependencies
- `electron`: ^28.0.0 - Desktop framework
- `typescript`: ^5.3.3 - Type safety
- `vite`: ^5.0.8 - Build tool
- `tailwindcss`: ^3.3.6 - CSS framework
- `electron-builder`: ^24.9.1 - Packaging tool

## File Size Considerations

- **Electron Runtime**: ~120MB
- **React Bundle**: ~200KB (minified)
- **Total App Size**: ~150MB (installed)

## Memory Usage

- **Main Process**: ~50-80MB
- **Renderer Process**: ~80-120MB
- **Total**: ~150-200MB typical usage

## Platform-Specific Notes

### macOS
- Window uses native title bar
- App stored in Applications folder
- Config in ~/Library/Application Support

### Windows
- Window uses custom title bar (can be changed)
- Installable via NSIS installer
- Config in %APPDATA%

### Linux (Not Officially Supported)
- Can be built with electron-builder
- Would need AppImage or .deb configuration
