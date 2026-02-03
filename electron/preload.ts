import { contextBridge, ipcRenderer } from 'electron';

contextBridge.exposeInMainWorld('electronAPI', {
  copyToClipboard: (text: string) => ipcRenderer.invoke('copy-to-clipboard', text),
  openInBrowser: (url: string) => ipcRenderer.invoke('open-in-browser', url),
  savePreset: (name: string, preset: any) => ipcRenderer.invoke('save-preset', name, preset),
  loadPresets: () => ipcRenderer.invoke('load-presets'),
  deletePreset: (name: string) => ipcRenderer.invoke('delete-preset', name),
  saveToHistory: (entry: any) => ipcRenderer.invoke('save-to-history', entry),
  loadHistory: () => ipcRenderer.invoke('load-history'),
  clearHistory: () => ipcRenderer.invoke('clear-history'),
});
