const variants = {
  default: 'chip',
  success: 'text-[11px] px-2 py-0.5 rounded-lg bg-[rgba(56,142,60,0.1)] text-success border border-[rgba(56,142,60,0.2)]',
  danger: 'text-[11px] px-2 py-0.5 rounded-lg bg-[rgba(211,47,47,0.1)] text-danger border border-[rgba(211,47,47,0.2)]',
  warning: 'text-[11px] px-2 py-0.5 rounded-lg bg-[rgba(230,81,0,0.1)] text-warning border border-[rgba(230,81,0,0.2)]',
  neutral: 'text-[11px] px-2 py-0.5 rounded-lg bg-[#f1f4f7] text-[#4C4C4C] border border-borderSoft',
};

export default function TagBadge({ label, variant = 'default', onRemove }) {
  return (
    <span className={`inline-flex items-center gap-1 font-medium ${variants[variant] || variants.default}`}>
      {label}
      {onRemove && (
        <button
          onClick={(e) => { e.stopPropagation(); onRemove(); }}
          className="hover:opacity-70 leading-none text-[10px]"
        >
          ×
        </button>
      )}
    </span>
  );
}
