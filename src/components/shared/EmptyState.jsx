import { Inbox } from 'lucide-react';

export default function EmptyState({ title = 'No data', description, icon: Icon = Inbox }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center animate-fadeIn">
      <div className="w-12 h-12 rounded-2xl bg-mutedBg flex items-center justify-center mb-3">
        <Icon size={24} className="text-placeholder" />
      </div>
      <p className="text-sm font-medium text-dBlue">{title}</p>
      {description && <p className="text-xs text-placeholder mt-1 max-w-xs">{description}</p>}
    </div>
  );
}
