import { useState } from 'react';
import { X, GripVertical, AlertTriangle, Tag, Check, Clock } from 'lucide-react';
import StatusBadge from '../../components/shared/StatusBadge';
import TagBadge from '../../components/shared/TagBadge';
import { candidates } from '../../data/mockData';

const mandatoryTagDefs = ['module', 'execution_tier', 'risk_category', 'env_compat', 'data_dependency', 'release_relevance'];

export default function SuiteDetail({ suite, onClose }) {
  if (!suite) return null;

  const suiteTests = candidates.filter((c) => suite.tests.includes(c.id));
  const [editingPriority, setEditingPriority] = useState(null);

  return (
    <div className="fixed inset-0 z-[200] flex justify-end" style={{ background: 'rgba(0,0,0,0.2)' }}>
      <div
        className="bg-white h-full animate-slideInLeft flex flex-col"
        style={{ width: 720, maxWidth: '90vw', boxShadow: '-4px 0 20px rgba(0,0,0,0.1)' }}
      >
        {/* Header */}
        <div className="px-5 py-3 border-b border-borderSoft">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-xs text-placeholder font-mono">{suite.id}</span>
              <h2 className="text-sm font-semibold text-dBlue">{suite.name}</h2>
            </div>
            <button onClick={onClose} className="p-1.5 rounded hover:bg-appleGrayHover">
              <X size={16} />
            </button>
          </div>
        </div>

        {/* Suite Meta */}
        <div className="px-5 py-3 grid grid-cols-3 gap-3 border-b border-borderSoft bg-mutedBg text-[12px]">
          <MetaItem label="Domain" value={suite.domain} />
          <MetaItem label="Execution Tier" value={suite.executionTier} />
          <MetaItem label="Owner" value={suite.owner} />
          <MetaItem label="Lifecycle" value={<StatusBadge status={suite.lifecycle} />} />
          <MetaItem label="Test Count" value={suite.testCount} />
          <MetaItem label="Pass Rate" value={`${suite.passRate}%`} />
          <MetaItem label="Flaky" value={suite.flakyCount} />
          <MetaItem label="Tag Completeness" value={`${suite.tagCompleteness}%`} />
          <MetaItem label="Environments" value={suite.environments.join(', ')} />
        </div>

        {/* Purpose */}
        <div className="px-5 py-2 border-b border-borderSoft">
          <span className="text-[10px] text-placeholder uppercase">Purpose</span>
          <p className="text-[13px] text-dBlue">{suite.purpose}</p>
        </div>

        {/* Priority distribution */}
        <div className="px-5 py-2 border-b border-borderSoft">
          <span className="text-[10px] text-placeholder uppercase mb-1 block">Priority Distribution</span>
          <div className="flex gap-3">
            {Object.entries(suite.priorityDistribution).map(([k, v]) => (
              <div key={k} className="flex items-center gap-1">
                <span className={`text-xs font-bold ${k === 'P1' ? 'text-danger' : k === 'P2' ? 'text-warning' : 'text-placeholder'}`}>{k}</span>
                <span className="text-xs text-dBlue">{v}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Tests in Suite */}
        <div className="flex-1 overflow-auto px-5 py-3">
          <h4 className="text-xs font-semibold text-[#4C4C4C] uppercase tracking-wide mb-3">
            Tests in Suite ({suiteTests.length})
          </h4>
          <div className="space-y-2">
            {suiteTests.map((test) => {
              const missingMandatory = mandatoryTagDefs.filter((t) => !test.tags.includes(t) && test.missingTags.includes(t));
              return (
                <div key={test.id} className="flex items-center gap-3 p-2.5 rounded-lg border border-borderSoft hover:bg-mutedBg transition-colors">
                  <GripVertical size={14} className="text-placeholder cursor-grab" />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-[11px] font-mono text-placeholder">{test.id}</span>
                      <span className="text-[13px] font-medium text-dBlue truncate">{test.name}</span>
                    </div>
                    <div className="flex items-center gap-2 mt-1">
                      {test.tags.slice(0, 3).map((t) => <TagBadge key={t} label={t} />)}
                      {test.missingTags.length > 0 && (
                        <span className="flex items-center gap-0.5 text-[10px] text-warning">
                          <AlertTriangle size={10} /> {test.missingTags.length} missing
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`text-xs font-bold ${test.priority === 'P1' ? 'text-danger' : test.priority === 'P2' ? 'text-warning' : 'text-placeholder'}`}>
                      {test.priority}
                    </span>
                    <StatusBadge status={test.status} />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Mandatory tag enforcement */}
          <div className="mt-5">
            <h4 className="text-xs font-semibold text-[#4C4C4C] uppercase tracking-wide mb-3 flex items-center gap-1.5">
              <Tag size={12} /> Mandatory Tag Compliance
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {mandatoryTagDefs.map((tag) => {
                const testsWithTag = suiteTests.filter((t) => t.tags.includes(tag));
                const pct = suiteTests.length ? Math.round((testsWithTag.length / suiteTests.length) * 100) : 0;
                const isComplete = pct === 100;
                return (
                  <div key={tag} className={`flex items-center gap-2 p-2 rounded-lg border ${isComplete ? 'border-success/30 bg-[rgba(34,197,94,0.05)]' : 'border-warning/30 bg-[rgba(245,158,11,0.05)]'}`}>
                    {isComplete ? <Check size={12} className="text-success" /> : <Clock size={12} className="text-warning" />}
                    <div className="min-w-0">
                      <span className="text-[11px] font-medium text-dBlue block truncate">{tag}</span>
                      <span className={`text-[10px] ${isComplete ? 'text-success' : 'text-warning'}`}>{pct}% complete</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function MetaItem({ label, value }) {
  return (
    <div>
      <span className="text-[10px] text-placeholder uppercase">{label}</span>
      <div className="text-[13px] text-dBlue font-medium mt-0.5">{typeof value === 'string' || typeof value === 'number' ? value : value}</div>
    </div>
  );
}
