import { useState } from 'react';
import { FileCode2, Database, Clock, GitBranch, FolderOpen } from 'lucide-react';
import Tabs from '../../components/shared/Tabs';
import KpiCard from '../../components/shared/KpiCard';
import ScriptViewer from './ScriptViewer';
import DataConfigPanel from './DataConfigPanel';
import { scripts, dataAssets } from '../../data/mockData';

const tabs = [
  { key: 'scripts', label: 'Script View', count: scripts.length },
  { key: 'data', label: 'Data & Config View', count: dataAssets.length },
  { key: 'history', label: 'History / Changes' },
];

export default function ScriptDataRepoPage() {
  const [activeTab, setActiveTab] = useState('scripts');
  const [selectedScript, setSelectedScript] = useState(scripts[0]);

  const allChanges = scripts
    .flatMap((s) => s.changeHistory.map((ch) => ({ ...ch, script: s.name, repoPath: s.repoPath })))
    .sort((a, b) => b.date.localeCompare(a.date));

  return (
    <div className="space-y-5 animate-fadeIn">
      <div>
        <h1 className="text-lg font-bold text-dBlue tracking-tight">Script & Data Repository</h1>
        <p className="text-xs text-placeholder mt-0.5">Traceable code, data, config, and change history for regression assets</p>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <KpiCard title="Scripts" value={scripts.length} icon={FileCode2} color="#007AFF" />
        <KpiCard title="Data Assets" value={dataAssets.length} icon={Database} color="#22c55e" />
        <KpiCard title="Repos" value={2} icon={GitBranch} color="#8b5cf6" />
        <KpiCard title="Recent Changes" value={allChanges.length} icon={Clock} color="#f59e0b" />
      </div>

      <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />

      {activeTab === 'scripts' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
          {/* File tree */}
          <div className="lg:col-span-3 card-base p-3">
            <h4 className="text-xs font-semibold text-[#4C4C4C] uppercase tracking-wide mb-2 flex items-center gap-1.5">
              <FolderOpen size={12} /> Files
            </h4>
            <div className="space-y-0.5">
              {scripts.map((s) => (
                <button
                  key={s.id}
                  onClick={() => setSelectedScript(s)}
                  className={`w-full text-left px-2.5 py-2 rounded-lg text-[12px] transition-colors ${
                    selectedScript?.id === s.id
                      ? 'bg-[rgba(0,122,255,0.1)] text-appleBlue font-medium'
                      : 'text-[#4C4C4C] hover:bg-mutedBg'
                  }`}
                >
                  <span className="flex items-center gap-1.5">
                    <FileCode2 size={12} />
                    <span className="truncate">{s.name}</span>
                  </span>
                  <span className="text-[10px] text-placeholder block mt-0.5 truncate pl-[18px]">{s.repoPath}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Script viewer */}
          <div className="lg:col-span-9">
            <ScriptViewer script={selectedScript} />
          </div>
        </div>
      )}

      {activeTab === 'data' && (
        <DataConfigPanel dataAssets={dataAssets} />
      )}

      {activeTab === 'history' && (
        <div className="card-base p-5">
          <h3 className="text-xs font-semibold text-[#4C4C4C] uppercase tracking-wide mb-4">All Changes</h3>
          <div className="space-y-3">
            {allChanges.map((ch, i) => (
              <div key={i} className="flex items-start gap-3 p-3 rounded-lg hover:bg-mutedBg transition-colors border-b border-borderSoft last:border-0">
                <div className={`w-2.5 h-2.5 rounded-full mt-1 flex-shrink-0 ${
                  ch.type === 'Created' ? 'bg-success' : ch.type === 'Updated' ? 'bg-appleBlue' : 'bg-warning'
                }`} />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-[13px] font-medium text-dBlue">{ch.type}</span>
                    <span className="text-[11px] font-mono text-appleBlue">{ch.script}</span>
                    <span className="text-[11px] text-placeholder">{ch.date}</span>
                  </div>
                  <p className="text-[12px] text-[#4C4C4C] mt-0.5">{ch.detail}</p>
                  <div className="flex items-center gap-2 mt-1 text-[11px] text-placeholder">
                    <span>by {ch.author}</span>
                    <span className="font-mono">{ch.repoPath}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
