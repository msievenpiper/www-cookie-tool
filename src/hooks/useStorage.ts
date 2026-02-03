import { useState, useEffect } from 'react';
import { Preset, HistoryEntry } from '../utils/types';

export function useStorage() {
  const [presets, setPresets] = useState<Record<string, Preset>>({});
  const [history, setHistory] = useState<HistoryEntry[]>([]);

  useEffect(() => {
    loadPresetsFromStore();
    loadHistoryFromStore();
  }, []);

  const loadPresetsFromStore = async () => {
    const loadedPresets = await window.electronAPI.loadPresets();
    setPresets(loadedPresets);
  };

  const loadHistoryFromStore = async () => {
    const loadedHistory = await window.electronAPI.loadHistory();
    setHistory(loadedHistory);
  };

  const savePreset = async (name: string, preset: Preset) => {
    await window.electronAPI.savePreset(name, preset);
    await loadPresetsFromStore();
  };

  const deletePreset = async (name: string) => {
    await window.electronAPI.deletePreset(name);
    await loadPresetsFromStore();
  };

  const saveToHistory = async (entry: HistoryEntry) => {
    await window.electronAPI.saveToHistory(entry);
    await loadHistoryFromStore();
  };

  const clearHistory = async () => {
    await window.electronAPI.clearHistory();
    setHistory([]);
  };

  return {
    presets,
    history,
    savePreset,
    deletePreset,
    saveToHistory,
    clearHistory,
  };
}
