const variants = {
  default: 'chip',
  success: 'text-[11px] px-2 py-0.5 rounded-md bg-[rgba(34,197,94,0.1)] text-success border border-[rgba(34,197,94,0.2)]',
  danger: 'text-[11px] px-2 py-0.5 rounded-md bg-[rgba(239,68,68,0.1)] text-danger border border-[rgba(239,68,68,0.2)]',
  warning: 'text-[11px] px-2 py-0.5 rounded-md bg-[rgba(245,158,11,0.1)] text-warning border border-[rgba(245,158,11,0.2)]',
  neutral: 'text-[11px] px-2 py-0.5 rounded-md bg-[#f1f4f7] text-[#4C4C4C] border border-borderSoft',
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
