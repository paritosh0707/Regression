import {
  Plus, RefreshCw, XCircle, Tag, Database, GitBranch, FileText,
  FolderOpen, Check, ArrowRight,
} from 'lucide-react';
import StatusBadge from '../../components/shared/StatusBadge';
import TagBadge from '../../components/shared/TagBadge';

const fileActionColors = {
  Created: 'text-success',
  Updated: 'text-appleBlue',
  Unchanged: 'text-placeholder',
};

export default function IntegrationSummary({ summary }) {
  const s = summary;

  return (
    <div className="space-y-4">
      {/* Stats grid */}
      <div className="card-base p-5">
        <h3 className="ds-h3 mb-4">Integration Summary</h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <StatBlock icon={Check} label="Total Selected" value={s.totalSelected} color="#043365" />
          <StatBlock icon={Plus} label="Newly Added" value={s.newlyAdded} color="#388E3C" />
          <StatBlock icon={RefreshCw} label="Revised" value={s.revisedMappings} color="#007AFF" />
          <StatBlock icon={XCircle} label="Duplicates Skipped" value={s.duplicatesSkipped} color="#D32F2F" />
          <StatBlock icon={ArrowRight} label="Priorities Updated" value={s.prioritiesUpdated} color="#e65100" />
          <StatBlock icon={Tag} label="Tags Auto-Completed" value={s.tagsAutoCompleted} color="#8b5cf6" />
          <StatBlock icon={Database} label="Data/Config Linked" value={s.dataConfigLinked} color="#06b6d4" />
          <StatBlock icon={GitBranch} label="Suites Impacted" value={s.suitesImpacted.length} color="#ec4899" />
        </div>
      </div>

      {/* Repo info */}
      <div className="card-base p-5">
        <h3 className="ds-h3 mb-3 flex items-center gap-1.5">
          <GitBranch size={12} /> Repository Details
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-[13px]">
          <div>
            <span className="text-[12px] font-medium text-placeholder uppercase block">Repo</span>
            <span className="font-medium text-dBlue">{s.targetRepo}</span>
          </div>
          <div>
            <span className="text-[12px] font-medium text-placeholder uppercase block">Branch</span>
            <span className="font-medium text-dBlue">{s.targetBranch}</span>
          </div>
          <div>
            <span className="text-[12px] font-medium text-placeholder uppercase block">Path</span>
            <span className="font-medium text-dBlue font-mono text-xs">{s.targetPath}</span>
          </div>
          <div>
            <span className="text-[12px] font-medium text-placeholder uppercase block">Commit</span>
            <span className="font-medium text-appleBlue font-mono text-xs">{s.commitRef}</span>
          </div>
        </div>

        <div className="mt-3">
          <span className="text-[12px] font-medium text-placeholder uppercase block mb-1">Impacted Suites</span>
          <div className="flex gap-1.5">
            {s.suitesImpacted.map((suite) => <TagBadge key={suite} label={suite} />)}
          </div>
        </div>
      </div>

      {/* File changes */}
      <div className="card-base p-5">
        <h3 className="ds-h3 mb-3 flex items-center gap-1.5">
          <FolderOpen size={12} /> File Changes
        </h3>
        <div className="space-y-1.5">
          {s.fileChanges.map((fc, i) => (
            <div key={i} className="flex items-center gap-3 py-1.5 px-3 rounded-lg hover:bg-mutedBg transition-colors">
              <FileText size={14} className={fileActionColors[fc.action] || 'text-placeholder'} />
              <span className="text-[12px] font-mono text-dBlue flex-1">{fc.file}</span>
              <StatusBadge status={fc.action} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function StatBlock({ icon: Icon, label, value, color }) {
  return (
    <div className="flex items-center gap-3">
      <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: `${color}12` }}>
        <Icon size={14} style={{ color }} />
      </div>
      <div>
        <span className="text-lg font-bold text-dBlue">{value}</span>
        <span className="text-[12px] font-medium text-placeholder block leading-tight">{label}</span>
      </div>
    </div>
  );
}
