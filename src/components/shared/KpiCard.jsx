import { TrendingUp, TrendingDown } from 'lucide-react';

export default function KpiCard({ title, value, subtitle, trend, trendLabel, icon: Icon, color = '#043365' }) {
  const isPositive = trend === undefined || trend >= 0;

  return (
    <div className="bg-white rounded-lg border border-borderSoft shadow-statCard card-hover p-4 flex flex-col gap-2 animate-fadeIn">
      <div className="flex items-center justify-between">
        <span className="ds-caption text-[#4C4C4C]">{title}</span>
        {Icon && (
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center"
            style={{ background: `${color}10` }}
          >
            <Icon size={16} style={{ color }} />
          </div>
        )}
      </div>
      <div className="flex items-end gap-2">
        <span className="text-2xl font-bold text-dBlue">{value}</span>
        {trend !== undefined && (
          <span className={`flex items-center gap-0.5 text-xs font-medium mb-0.5 ${isPositive ? 'text-success' : 'text-danger'}`}>
            {isPositive ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
            {Math.abs(trend)}%
          </span>
        )}
      </div>
      {(subtitle || trendLabel) && (
        <span className="text-[12px] font-medium text-placeholder">{subtitle || trendLabel}</span>
      )}
    </div>
  );
}
