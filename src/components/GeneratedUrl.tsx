import { useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';

interface GeneratedUrlProps {
  url: string;
}

export function GeneratedUrl({ url }: GeneratedUrlProps) {
  const [copied, setCopied] = useState(false);
  const [showQRCode, setShowQRCode] = useState(false);

  const handleCopy = async () => {
    await window.electronAPI.copyToClipboard(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleOpen = async () => {
    await window.electronAPI.openInBrowser(url);
  };

  const handleShowQRCode = () => {
    setShowQRCode(true);
  };

  const handleCloseQRCode = () => {
    setShowQRCode(false);
  };

  if (!url) {
    return null;
  }

  return (
    <div className="mb-6">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Generated URL
      </label>
      <div className="p-3 bg-gray-100 border border-gray-300 rounded-md mb-2 break-all">
        {url}
      </div>
      <div className="flex gap-2">
        <button
          onClick={handleCopy}
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {copied ? 'Copied!' : 'Copy to Clipboard'}
        </button>
        <button
          onClick={handleOpen}
          className="px-4 py-2 bg-purple-500 text-white rounded-md hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-500"
        >
          Open in Browser
        </button>
        <button
          onClick={handleShowQRCode}
          className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
        >
          Show QR Code
        </button>
      </div>

      {/* QR Code Modal */}
      {showQRCode && (
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
                value={url}
                size={256}
                level="M"
                includeMargin={true}
              />
            </div>
            <p className="text-sm text-gray-600 text-center">
              Scan this QR code with your mobile device to open the URL
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
