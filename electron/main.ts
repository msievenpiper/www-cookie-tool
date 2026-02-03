import { app, BrowserWindow, ipcMain, clipboard, shell, Tray, Menu, nativeImage } from 'electron';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import Store from 'electron-store';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const store = new Store();

let mainWindow: BrowserWindow | null = null;
let tray: Tray | null = null;

// Extend app object to track quit state
declare module 'electron' {
  interface App {
    isQuitting?: boolean;
  }
}

function createWindow() {
  const iconPath = process.env.VITE_DEV_SERVER_URL
    ? join(__dirname, '../build/icon.png')
    : undefined; // In production, electron-builder handles the icon

  mainWindow = new BrowserWindow({
    width: 800,
    height: 900,
    icon: iconPath,
    webPreferences: {
      preload: join(__dirname, 'preload.cjs'),
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: false,
    },
  });

  if (process.env.VITE_DEV_SERVER_URL) {
    mainWindow.loadURL(process.env.VITE_DEV_SERVER_URL);
    mainWindow.webContents.openDevTools();
  } else {
    mainWindow.loadFile(join(__dirname, '../dist/index.html'));
  }

  // On macOS, minimize to tray instead of closing
  mainWindow.on('close', (event) => {
    if (process.platform === 'darwin' && !app.isQuitting) {
      event.preventDefault();
      mainWindow?.hide();
    }
  });

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

function createTray() {
  // Determine the correct icon path based on environment
  const iconPath = process.env.VITE_DEV_SERVER_URL
    ? join(__dirname, '../resources/trayTemplate.png')
    : join(process.resourcesPath, 'resources/trayTemplate.png');

  console.log('Loading tray icon from:', iconPath);

  // Create native image and mark as template for macOS
  const icon = nativeImage.createFromPath(iconPath);

  console.log('Icon loaded, isEmpty:', icon.isEmpty());

  if (process.platform === 'darwin') {
    icon.setTemplateImage(true);
  }

  tray = new Tray(icon);
  tray.setToolTip('Cookie Tool');

  console.log('Tray created successfully');

  const contextMenu = Menu.buildFromTemplate([
    {
      label: 'Show App',
      click: () => {
        if (mainWindow === null) {
          createWindow();
        } else {
          mainWindow.show();
        }
      },
    },
    { type: 'separator' },
    {
      label: 'Quit',
      click: () => {
        app.isQuitting = true;
        app.quit();
      },
    },
  ]);

  tray.setContextMenu(contextMenu);

  // Show window on tray icon click (mainly for Windows/Linux)
  tray.on('click', () => {
    if (mainWindow === null) {
      createWindow();
    } else if (mainWindow.isVisible()) {
      mainWindow.hide();
    } else {
      mainWindow.show();
    }
  });
}

app.whenReady().then(() => {
  createWindow();
  createTray();
});

app.on('window-all-closed', () => {
  // Keep app running in tray even when all windows are closed
  // Users can quit from the tray menu
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});

// IPC Handlers
ipcMain.handle('copy-to-clipboard', (_event, text: string) => {
  clipboard.writeText(text);
  return true;
});

ipcMain.handle('open-in-browser', (_event, url: string) => {
  shell.openExternal(url);
  return true;
});

ipcMain.handle('save-preset', (_event, name: string, preset: any) => {
  const presets = store.get('presets', {}) as Record<string, any>;
  presets[name] = preset;
  store.set('presets', presets);
  return true;
});

ipcMain.handle('load-presets', () => {
  return store.get('presets', {});
});

ipcMain.handle('delete-preset', (_event, name: string) => {
  const presets = store.get('presets', {}) as Record<string, any>;
  delete presets[name];
  store.set('presets', presets);
  return true;
});

ipcMain.handle('save-to-history', (_event, entry: any) => {
  const history = store.get('history', []) as any[];
  history.unshift(entry);
  // Keep only last 20 entries
  if (history.length > 20) {
    history.splice(20);
  }
  store.set('history', history);
  return true;
});

ipcMain.handle('load-history', () => {
  return store.get('history', []);
});

ipcMain.handle('clear-history', () => {
  store.set('history', []);
  return true;
});
