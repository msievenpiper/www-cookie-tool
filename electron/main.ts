import { app, BrowserWindow, ipcMain, clipboard, shell } from 'electron';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import Store from 'electron-store';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const store = new Store();

let mainWindow: BrowserWindow | null = null;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 900,
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

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
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
