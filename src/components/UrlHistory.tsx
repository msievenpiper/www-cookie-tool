import { useState } from 'react';
import { HistoryEntry } from '../utils/types';

interface UrlHistoryProps {
  history: HistoryEntry[];
  onClear: () => void;
}

export function UrlHistory({ history, onClear }: UrlHistoryProps) {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const handleCopy = async (url: string, index: number) => {
    await window.electronAPI.copyToClipboard(url);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const formatTimestamp = (timestamp: number) => {
    return new Date(timestamp).toLocaleString();
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-sm font-medium text-gray-700">Recent URLs</h3>
        {history.length > 0 && (
          <button
            onClick={onClear}
            className="px-3 py-1 bg-red-500 text-white text-sm rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
          >
            Clear History
          </button>
        )}
      </div>

      {history.length > 0 ? (
        <div className="space-y-2 max-h-96 overflow-y-auto">
          {history.map((entry, index) => (
            <div
              key={index}
              className="p-3 bg-gray-50 border border-gray-200 rounded-md"
            >
              <div className="text-xs text-gray-500 mb-1">
                {formatTimestamp(entry.timestamp)} - {entry.brand}.{entry.tld}
              </div>
              <div className="text-sm break-all mb-2">{entry.url}</div>
              <button
                onClick={() => handleCopy(entry.url, index)}
                className="px-3 py-1 bg-blue-500 text-white text-sm rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {copiedIndex === index ? 'Copied!' : 'Copy'}
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-sm text-gray-500">No URLs generated yet</p>
      )}
    </div>
  );
}
