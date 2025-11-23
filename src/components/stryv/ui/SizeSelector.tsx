'use client';

interface SizeSelectorProps {
  sizes: string[];
  selected: string;
  onChange: (size: string) => void;
}

const SizeSelector = ({ sizes, selected, onChange }: SizeSelectorProps) => {
  return (
    <div className="space-y-3">
      <label className="text-sm font-bold uppercase tracking-wide text-zinc-900">
        Size
      </label>
      <div className="flex gap-2 flex-wrap">
        {sizes.map(size => (
          <button
            key={size}
            onClick={() => onChange(size)}
            className={`px-6 py-3 border-2 font-bold uppercase tracking-wide text-sm transition ${
              selected === size
                ? 'border-black bg-black text-white'
                : 'border-zinc-300 bg-white text-zinc-900 hover:border-zinc-500'
            }`}
            aria-label={`Select size ${size}`}
            aria-pressed={selected === size}
          >
            {size}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SizeSelector;

