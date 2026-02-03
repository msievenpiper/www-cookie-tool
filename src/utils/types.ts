export interface Cookie {
  name: string;
  value: string;
}

export interface Preset {
  brand: string;
  tld: string;
  cookies: Cookie[];
  destination?: string;
}

export interface HistoryEntry {
  url: string;
  timestamp: number;
  brand: string;
  tld: string;
}

declare global {
  interface Window {
    electronAPI: {
      copyToClipboard: (text: string) => Promise<boolean>;
      openInBrowser: (url: string) => Promise<boolean>;
      savePreset: (name: string, preset: Preset) => Promise<boolean>;
      loadPresets: () => Promise<Record<string, Preset>>;
      deletePreset: (name: string) => Promise<boolean>;
      saveToHistory: (entry: HistoryEntry) => Promise<boolean>;
      loadHistory: () => Promise<HistoryEntry[]>;
      clearHistory: () => Promise<boolean>;
    };
  }
}
