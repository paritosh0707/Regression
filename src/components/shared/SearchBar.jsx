import { Search } from 'lucide-react';

export default function SearchBar({ value, onChange, placeholder = 'Search...' }) {
  return (
    <div className="relative">
      <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-placeholder" />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="input-field pl-9"
        style={{ borderRadius: 10, background: 'rgba(142, 142, 147, 0.08)', borderColor: 'transparent' }}
        onFocus={(e) => {
          e.target.style.borderColor = '#007AFF';
          e.target.style.boxShadow = '0 0 0 4px rgba(0, 122, 255, 0.1)';
        }}
        onBlur={(e) => {
          e.target.style.borderColor = 'transparent';
          e.target.style.boxShadow = 'none';
        }}
      />
    </div>
  );
}
