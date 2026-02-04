import { useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { HistoryEntry } from '../utils/types';

interface UrlHistoryProps {
  history: HistoryEntry[];
  onClear: () => void;
}

export function UrlHistory({ history, onClear }: UrlHistoryProps) {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [qrCodeIndex, setQrCodeIndex] = useState<number | null>(null);

  const handleCopy = async (url: string, index: number) => {
    await window.electronAPI.copyToClipboard(url);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const handleOpen = async (url: string) => {
    await window.electronAPI.openInBrowser(url);
  };

  const handleShowQRCode = (index: number) => {
    setQrCodeIndex(index);
  };

  const handleCloseQRCode = () => {
    setQrCodeIndex(null);
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
              <div className="flex gap-2 flex-wrap">
                <button
                  onClick={() => handleCopy(entry.url, index)}
                  className="px-3 py-1 bg-blue-500 text-white text-sm rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {copiedIndex === index ? 'Copied!' : 'Copy'}
                </button>
                <button
                  onClick={() => handleOpen(entry.url)}
                  className="px-3 py-1 bg-purple-500 text-white text-sm rounded-md hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  Open in Browser
                </button>
                <button
                  onClick={() => handleShowQRCode(index)}
                  className="px-3 py-1 bg-green-500 text-white text-sm rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                  Show QR Code
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-sm text-gray-500">No URLs generated yet</p>
      )}

      {/* QR Code Modal */}
      {qrCodeIndex !== null && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          onClick={handleCloseQRCode}
        >
          <div
            className="bg-white p-8 rounded-lg shadow-xl max-w-md"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-800">Scan QR Code</h3>
              <button
                onClick={handleCloseQRCode}
                className="text-gray-500 hover:text-gray-700 text-2xl leading-none"
              >
                &times;
              </button>
            </div>
            <div className="flex justify-center mb-4">
              <QRCodeSVG
                value={history[qrCodeIndex].url}
                size={256}
                level="M"
                includeMargin={true}
              />
            </div>
            <p className="text-sm text-gray-600 text-center mb-2">
              Scan this QR code with your mobile device to open the URL
            </p>
            <p className="text-xs text-gray-500 text-center">
              {history[qrCodeIndex].brand}.{history[qrCodeIndex].tld}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
