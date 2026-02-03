import { TLDS } from '../utils/constants';

interface TldSelectorProps {
  value: string;
  onChange: (tld: string) => void;
}

export function TldSelector({ value, onChange }: TldSelectorProps) {
  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        TLD
      </label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        {TLDS.map((tld) => (
          <option key={tld} value={tld}>
            {tld}
          </option>
        ))}
      </select>
    </div>
  );
}
