# Cookie Tool - Development Guide

## Quick Start

```bash
# Install dependencies
npm install

# Run in development mode
npm run dev

# Build for production
npm run build

# Build for specific platform
npm run build:mac   # macOS
npm run build:win   # Windows
```

## Development Environment

### Required Tools

- **Node.js**: 18.x or higher
- **npm**: 9.x or higher
- **Git**: Latest version
- **Code Editor**: VS Code recommended

### VS Code Setup

#### Recommended Extensions

Install these extensions for the best development experience:

```json
{
  "recommendations": [
    "dbaeumer.vscode-eslint",
    "esbenp.prettier-vscode",
    "bradlc.vscode-tailwindcss",
    "ms-vscode.vscode-typescript-next"
  ]
}
```

#### VS Code Settings

Create `.vscode/settings.json`:

```json
{
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "typescript.tsdk": "node_modules/typescript/lib",
  "tailwindCSS.experimental.classRegex": [
    ["className\\s*=\\s*['\"`]([^'\"`]*)['\"`]"]
  ]
}
```

## Project Architecture

### Technology Stack

- **Electron 28**: Desktop application framework
- **React 18**: UI library
- **TypeScript 5**: Type-safe JavaScript
- **Vite 5**: Build tool and dev server
- **TailwindCSS 3**: Utility-first CSS framework
- **electron-store 8**: Persistent storage

### Directory Structure

```
www-cookie-tool/
├── electron/           # Electron main and preload
│   ├── main.ts        # Main process (Node.js)
│   └── preload.ts     # Preload script (secure bridge)
├── src/               # React application
│   ├── components/    # UI components
│   ├── hooks/        # Custom React hooks
│   ├── utils/        # Utilities and helpers
│   ├── App.tsx       # Root component
│   ├── main.tsx      # React entry point
│   └── index.css     # Global styles
├── dist/             # Vite build output (renderer)
├── dist-electron/    # Electron build output (main/preload)
└── release/          # electron-builder output
```

## Development Workflow

### Starting Development

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start dev server:**
   ```bash
   npm run dev
   ```

   This will:
   - Start Vite dev server on http://localhost:5173
   - Compile Electron main and preload scripts
   - Launch Electron app with DevTools open
   - Enable hot module replacement (HMR)

3. **Make changes:**
   - Edit files in `src/` or `electron/`
   - Renderer changes reload automatically
   - Main process changes require app restart

### Development Scripts

```bash
# Development mode with hot reload
npm run dev

# Build for production (all platforms)
npm run build

# Build for macOS only
npm run build:mac

# Build for Windows only
npm run build:win

# Preview production build (renderer only)
npm run preview
```

## Code Organization

### Component Structure

Each component follows this pattern:

```typescript
// src/components/ExampleComponent.tsx

import { useState } from 'react';
import { SomeType } from '../utils/types';

interface ExampleComponentProps {
  value: string;
  onChange: (value: string) => void;
}

export function ExampleComponent({ value, onChange }: ExampleComponentProps) {
  const [localState, setLocalState] = useState('');

  const handleSomething = () => {
    // Logic here
  };

  return (
    <div className="mb-4">
      {/* JSX here */}
    </div>
  );
}
```

### Hook Structure

Custom hooks follow this pattern:

```typescript
// src/hooks/useExample.ts

import { useState, useEffect } from 'react';

export function useExample() {
  const [state, setState] = useState(initialValue);

  useEffect(() => {
    // Side effects here
  }, [dependencies]);

  const method = () => {
    // Logic here
  };

  return {
    state,
    setState,
    method,
  };
}
```

### Utility Structure

Utilities are pure functions:

```typescript
// src/utils/example.ts

/**
 * Description of what this function does
 * @param param1 - Description
 * @param param2 - Description
 * @returns Description of return value
 */
export function utilityFunction(param1: string, param2: number): string {
  // Pure logic here
  return result;
}
```

## Electron Development

### Main Process (`electron/main.ts`)

The main process handles:
- Window creation and management
- IPC communication
- File system access
- Native OS integration

**Key patterns:**

```typescript
// Window creation
function createWindow() {
  const window = new BrowserWindow({
    width: 800,
    height: 900,
    webPreferences: {
      preload: join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false,
    },
  });
}

// IPC handler
ipcMain.handle('handler-name', async (_event, arg) => {
  // Logic here
  return result;
});
```

### Preload Script (`electron/preload.ts`)

The preload script exposes safe IPC methods:

```typescript
import { contextBridge, ipcRenderer } from 'electron';

contextBridge.exposeInMainWorld('electronAPI', {
  methodName: (arg: string) => ipcRenderer.invoke('handler-name', arg),
});
```

### IPC Communication

**From Renderer to Main:**

```typescript
// In component
const result = await window.electronAPI.methodName(argument);
```

**IPC Flow:**
```
Component → window.electronAPI → preload.ts → ipcMain.handle → Main Process
```

## React Development

### State Management

The app uses React hooks for state management:

**Local component state:**
```typescript
const [value, setValue] = useState('');
```

**Shared state via hooks:**
```typescript
const { state, actions } = useUrlGenerator();
```

**Persistent state:**
```typescript
const { presets, savePreset } = useStorage();
```

### Component Communication

**Parent to Child (Props):**
```typescript
<ChildComponent value={value} onChange={handleChange} />
```

**Child to Parent (Callbacks):**
```typescript
function ChildComponent({ onChange }: Props) {
  const handleClick = () => {
    onChange(newValue);
  };
}
```

### Effect Patterns

**Run once on mount:**
```typescript
useEffect(() => {
  loadInitialData();
}, []);
```

**Run when dependencies change:**
```typescript
useEffect(() => {
  updateSomething(dependency);
}, [dependency]);
```

**Cleanup:**
```typescript
useEffect(() => {
  const timer = setInterval(() => {}, 1000);
  return () => clearInterval(timer);
}, []);
```

## Styling with Tailwind

### Class Organization

Order Tailwind classes consistently:

1. Layout (display, position)
2. Spacing (margin, padding)
3. Sizing (width, height)
4. Typography (font, text)
5. Colors (background, text, border)
6. Effects (shadow, opacity)
7. Interactive (hover, focus)

**Example:**
```typescript
<button className="flex items-center px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500">
  Click Me
</button>
```

### Common Patterns

**Container:**
```typescript
<div className="max-w-6xl mx-auto p-6">
```

**Card:**
```typescript
<div className="bg-white p-6 rounded-lg shadow-md">
```

**Input:**
```typescript
<input className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
```

**Button:**
```typescript
<button className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
```

## TypeScript Guidelines

### Type Definitions

**Define interfaces for objects:**
```typescript
interface Cookie {
  name: string;
  value: string;
}
```

**Use type for unions:**
```typescript
type Status = 'idle' | 'loading' | 'success' | 'error';
```

**Function signatures:**
```typescript
function processData(input: string): number {
  return parseInt(input, 10);
}
```

**Generic components:**
```typescript
interface ListProps<T> {
  items: T[];
  renderItem: (item: T) => JSX.Element;
}

function List<T>({ items, renderItem }: ListProps<T>) {
  return <div>{items.map(renderItem)}</div>;
}
```

### Type Safety

**Avoid `any`:**
```typescript
// Bad
function process(data: any) { }

// Good
function process(data: unknown) {
  if (typeof data === 'string') {
    // Handle string
  }
}
```

**Use type guards:**
```typescript
function isString(value: unknown): value is string {
  return typeof value === 'string';
}
```

**Exhaustive checking:**
```typescript
type Status = 'idle' | 'loading' | 'success';

function handleStatus(status: Status) {
  switch (status) {
    case 'idle':
      return 'Not started';
    case 'loading':
      return 'In progress';
    case 'success':
      return 'Complete';
    default:
      const _exhaustive: never = status;
      return _exhaustive;
  }
}
```

## Debugging

### Debugging Renderer Process

1. **Open DevTools:**
   - In development: Automatically opens
   - Manually: View → Toggle Developer Tools

2. **Use React DevTools:**
   - Install React DevTools browser extension
   - Available in Electron DevTools

3. **Console logging:**
   ```typescript
   console.log('Debug info:', variable);
   console.table(arrayOfObjects);
   console.error('Error:', error);
   ```

### Debugging Main Process

1. **Console logging in main.ts:**
   ```typescript
   console.log('Main process:', data);
   ```

2. **View logs:**
   - Output appears in the terminal running `npm run dev`

3. **VS Code debugging:**
   Create `.vscode/launch.json`:
   ```json
   {
     "version": "0.2.0",
     "configurations": [
       {
         "name": "Debug Main Process",
         "type": "node",
         "request": "launch",
         "cwd": "${workspaceFolder}",
         "runtimeExecutable": "${workspaceFolder}/node_modules/.bin/electron",
         "args": ["."],
         "outputCapture": "std"
       }
     ]
   }
   ```

### Debugging IPC

Log both sides of IPC communication:

**In component:**
```typescript
console.log('Calling IPC:', argument);
const result = await window.electronAPI.method(argument);
console.log('IPC result:', result);
```

**In main process:**
```typescript
ipcMain.handle('method', async (_event, arg) => {
  console.log('IPC received:', arg);
  const result = processData(arg);
  console.log('IPC returning:', result);
  return result;
});
```

## Building and Packaging

### Development Build

```bash
npm run dev
```
- Uses Vite dev server
- Hot module replacement enabled
- Source maps included
- DevTools open by default

### Production Build

```bash
npm run build
```

**Build process:**
1. TypeScript compilation (`tsc`)
2. Vite build (renderer → `dist/`)
3. Electron build (main/preload → `dist-electron/`)
4. electron-builder packaging → `release/`

### Platform-Specific Builds

**macOS:**
```bash
npm run build:mac
```
Output: `release/{version}/cookie-tool-{version}.dmg`

**Windows:**
```bash
npm run build:win
```
Output: `release/{version}/cookie-tool-{version}.exe`

### Build Configuration

**electron-builder.json:**
```json
{
  "appId": "com.cookietool.app",
  "productName": "Cookie Tool",
  "directories": {
    "output": "release/${version}"
  },
  "files": ["dist", "dist-electron"],
  "mac": {
    "target": ["dmg", "zip"]
  },
  "win": {
    "target": ["nsis"]
  }
}
```

## Testing

### Manual Testing Checklist

Before committing changes, test:

- [ ] All form inputs work correctly
- [ ] URL generation produces correct output
- [ ] Copy to clipboard functions
- [ ] Open in browser functions
- [ ] Presets save and load
- [ ] History tracks URLs
- [ ] Error messages display properly
- [ ] UI is responsive
- [ ] No console errors

### Testing Different Scenarios

**Test with edge cases:**
- Empty cookie values
- Special characters in cookies
- Very long cookie values
- Multiple cookies (10+)
- Long destination URLs
- Invalid destination URLs

**Test persistence:**
1. Create presets
2. Close app
3. Reopen app
4. Verify presets are still there

## Performance

### Optimization Tips

**React optimization:**
- Use `React.memo()` for expensive components
- Avoid inline function definitions in render
- Use `useMemo()` for expensive calculations
- Use `useCallback()` for callback props

**Bundle size:**
- Check bundle size: `npm run build`
- Avoid importing entire libraries
- Use tree-shaking compatible imports

**Electron optimization:**
- Keep renderer process lightweight
- Move heavy operations to main process
- Use IPC efficiently (batch operations)

## Common Issues

### Issue: App won't start

**Solutions:**
```bash
# Clear build artifacts
rm -rf dist dist-electron

# Reinstall dependencies
rm -rf node_modules
npm install

# Try again
npm run dev
```

### Issue: Changes not reflected

**Solutions:**
- Renderer changes: Should auto-reload
- Main process changes: Restart app (Cmd/Ctrl+R)
- If stuck: Stop dev server and restart

### Issue: TypeScript errors

**Solutions:**
- Check tsconfig.json is valid
- Verify all imports are correct
- Run `tsc --noEmit` to check types
- Clear TypeScript cache: `rm -rf node_modules/.cache`

### Issue: Build fails

**Solutions:**
- Check all dependencies installed: `npm install`
- Verify no TypeScript errors: `tsc --noEmit`
- Check electron-builder.json syntax
- Review build logs for specific errors

## Additional Resources

### Documentation

- [Electron Documentation](https://www.electronjs.org/docs)
- [React Documentation](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Vite Documentation](https://vitejs.dev)
- [TailwindCSS Documentation](https://tailwindcss.com/docs)

### Tools

- [React DevTools](https://react.dev/learn/react-developer-tools)
- [Electron DevTools](https://www.electronjs.org/docs/latest/tutorial/devtools-extension)
- [VS Code](https://code.visualstudio.com)

## Getting Help

If you encounter issues:

1. Check this guide first
2. Review ARCHITECTURE.md for system details
3. Check existing GitHub issues
4. Open a new issue with details

---

**Happy Coding!** 🚀
