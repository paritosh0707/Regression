export default function Tabs({ tabs, activeTab, onChange }) {
  return (
    <div className="flex border-b border-borderSoft">
      {tabs.map((tab) => {
        const isActive = activeTab === tab.key;
        return (
          <button
            key={tab.key}
            onClick={() => onChange(tab.key)}
            className={`px-4 py-2.5 text-sm font-medium transition-colors relative ${
              isActive
                ? 'text-appleBlue font-semibold'
                : 'text-[#4C4C4C] hover:bg-[rgba(0,122,255,0.05)]'
            }`}
          >
            {tab.label}
            {tab.count !== undefined && (
              <span className="ml-1.5 text-[11px] text-placeholder">({tab.count})</span>
            )}
            {isActive && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-appleBlue rounded-t" />
            )}
          </button>
        );
      })}
    </div>
  );
}
