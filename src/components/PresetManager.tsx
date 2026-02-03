import { useState } from 'react';
import { Preset } from '../utils/types';

interface PresetManagerProps {
  presets: Record<string, Preset>;
  onSave: (name: string, preset: Preset) => void;
  onLoad: (preset: Preset) => void;
  onDelete: (name: string) => void;
  getCurrentConfig: () => Preset;
}

export function PresetManager({
  presets,
  onSave,
  onLoad,
  onDelete,
  getCurrentConfig,
}: PresetManagerProps) {
  const [presetName, setPresetName] = useState('');
  const [showSaveInput, setShowSaveInput] = useState(false);

  const handleSave = () => {
    if (presetName.trim()) {
      onSave(presetName.trim(), getCurrentConfig());
      setPresetName('');
      setShowSaveInput(false);
    }
  };

  const presetNames = Object.keys(presets).sort();

  return (
    <div className="mb-6">
      <h3 className="text-sm font-medium text-gray-700 mb-2">Presets</h3>

      {!showSaveInput ? (
        <button
          onClick={() => setShowSaveInput(true)}
          className="mb-3 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Save Current Config
        </button>
      ) : (
        <div className="mb-3 flex gap-2">
          <input
            type="text"
            placeholder="Preset name"
            value={presetName}
            onChange={(e) => setPresetName(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSave()}
            className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            autoFocus
          />
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            Save
          </button>
          <button
            onClick={() => {
              setShowSaveInput(false);
              setPresetName('');
            }}
            className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500"
          >
            Cancel
          </button>
        </div>
      )}

      {presetNames.length > 0 ? (
        <div className="space-y-2">
          {presetNames.map((name) => (
            <div
              key={name}
              className="flex items-center justify-between p-2 bg-gray-50 border border-gray-200 rounded-md"
            >
              <span className="flex-1">{name}</span>
              <div className="flex gap-2">
                <button
                  onClick={() => onLoad(presets[name])}
                  className="px-3 py-1 bg-blue-500 text-white text-sm rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  Load
                </button>
                <button
                  onClick={() => onDelete(name)}
                  className="px-3 py-1 bg-red-500 text-white text-sm rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-sm text-gray-500">No presets saved yet</p>
      )}
    </div>
  );
}
