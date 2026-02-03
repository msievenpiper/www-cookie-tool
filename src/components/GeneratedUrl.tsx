import { useState } from 'react';

interface GeneratedUrlProps {
  url: string;
}

export function GeneratedUrl({ url }: GeneratedUrlProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await window.electronAPI.copyToClipboard(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleOpen = async () => {
    await window.electronAPI.openInBrowser(url);
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
      </div>
    </div>
  );
}
