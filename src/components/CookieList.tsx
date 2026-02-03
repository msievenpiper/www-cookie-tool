import { Cookie } from '../utils/types';
import { CookieInput } from './CookieInput';

interface CookieListProps {
  cookies: Cookie[];
  onAdd: () => void;
  onRemove: (index: number) => void;
  onUpdate: (index: number, field: 'name' | 'value', value: string) => void;
}

export function CookieList({ cookies, onAdd, onRemove, onUpdate }: CookieListProps) {
  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Cookies
      </label>
      <div className="space-y-2">
        {cookies.map((cookie, index) => (
          <CookieInput
            key={index}
            name={cookie.name}
            value={cookie.value}
            onNameChange={(name) => onUpdate(index, 'name', name)}
            onValueChange={(value) => onUpdate(index, 'value', value)}
            onRemove={() => onRemove(index)}
            canRemove={cookies.length > 1}
          />
        ))}
      </div>
      <button
        onClick={onAdd}
        className="mt-2 px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
      >
        Add Cookie
      </button>
    </div>
  );
}
