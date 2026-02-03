interface DestinationInputProps {
  value: string;
  onChange: (value: string) => void;
}

export function DestinationInput({ value, onChange }: DestinationInputProps) {
  const handleClear = () => {
    onChange('');
  };

  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Destination URL (Optional)
      </label>
      <div className="flex gap-2">
        <input
          type="url"
          placeholder="https://example.com"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {value && (
          <button
            onClick={handleClear}
            className="px-3 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500"
          >
            Clear
          </button>
        )}
      </div>
    </div>
  );
}
