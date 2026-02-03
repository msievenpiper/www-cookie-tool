interface CookieInputProps {
  name: string;
  value: string;
  onNameChange: (name: string) => void;
  onValueChange: (value: string) => void;
  onRemove: () => void;
  canRemove: boolean;
}

export function CookieInput({
  name,
  value,
  onNameChange,
  onValueChange,
  onRemove,
  canRemove,
}: CookieInputProps) {
  return (
    <div className="flex gap-2 mb-2">
      <input
        type="text"
        placeholder="Cookie name"
        value={name}
        onChange={(e) => onNameChange(e.target.value)}
        className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <input
        type="text"
        placeholder="Cookie value"
        value={value}
        onChange={(e) => onValueChange(e.target.value)}
        className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      {canRemove && (
        <button
          onClick={onRemove}
          className="px-3 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
        >
          Remove
        </button>
      )}
    </div>
  );
}
