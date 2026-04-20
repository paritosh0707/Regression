import { Bell, Search, User } from 'lucide-react';

export default function Header() {
  return (
    <header
      className="glass-header flex items-center justify-between px-6 z-[100]"
      style={{ height: 45 }}
    >
      <div className="flex items-center gap-3">
        <span className="text-base font-bold text-dBlue tracking-tight">
          IntelliQA
        </span>
        <span className="text-xs text-placeholder font-medium">
          Regression Operating Layer
        </span>
      </div>

      <div className="flex items-center gap-3">
        <div className="relative">
          <Search size={14} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-placeholder" />
          <input
            type="text"
            placeholder="Search..."
            className="pl-8 pr-3 py-1.5 text-xs rounded-searchbar border-0 transition-all duration-200"
            style={{
              background: 'rgba(142, 142, 147, 0.08)',
              width: 200,
            }}
            onFocus={(e) => {
              e.target.style.boxShadow = '0 0 0 4px rgba(0, 122, 255, 0.1)';
              e.target.style.borderColor = '#007AFF';
            }}
            onBlur={(e) => {
              e.target.style.boxShadow = 'none';
              e.target.style.borderColor = 'transparent';
            }}
          />
        </div>

        <button className="p-1.5 rounded-lg hover:bg-appleGrayHover transition-colors relative">
          <Bell size={16} className="text-[#4C4C4C]" />
          <span className="absolute top-0.5 right-0.5 w-2 h-2 rounded-full bg-danger" />
        </button>

        <div className="w-7 h-7 rounded-full bg-tblue flex items-center justify-center">
          <User size={14} className="text-white" />
        </div>
      </div>
    </header>
  );
}
