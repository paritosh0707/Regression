import { FileCode2, GitBranch, Clock, User, Tag } from 'lucide-react';
import StatusBadge from '../../components/shared/StatusBadge';
import TagBadge from '../../components/shared/TagBadge';
import { candidates } from '../../data/mockData';

export default function ScriptViewer({ script }) {
  if (!script) return null;

  const linkedTest = candidates.find((c) => c.id === script.testId);

  return (
    <div className="card-base p-5 space-y-4">
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-[14px] font-semibold text-dBlue">{script.name}</h3>
          <span className="text-[12px] text-placeholder font-mono">{script.repoPath}</span>
        </div>
        <TagBadge label={script.lang} variant="neutral" />
      </div>

      {/* Metadata */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-[12px]">
        <div className="flex items-center gap-2">
          <GitBranch size={12} className="text-placeholder" />
          <div>
            <span className="text-[12px] font-medium text-placeholder block">Branch</span>
            <span className="font-medium text-dBlue">{script.branch}</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Tag size={12} className="text-placeholder" />
          <div>
            <span className="text-[12px] font-medium text-placeholder block">Version</span>
            <span className="font-medium text-dBlue">{script.version}</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Clock size={12} className="text-placeholder" />
          <div>
            <span className="text-[12px] font-medium text-placeholder block">Updated</span>
            <span className="font-medium text-dBlue">{script.lastUpdated}</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <FileCode2 size={12} className="text-placeholder" />
          <div>
            <span className="text-[12px] font-medium text-placeholder block">Source</span>
            <StatusBadge status={script.source} />
          </div>
        </div>
      </div>

      {/* Code */}
      {linkedTest && (
        <div>
          <h4 className="ds-h3 mb-2">Script Content</h4>
          <pre
            className="text-[12px] leading-relaxed p-4 rounded-lg font-mono text-dBlue overflow-auto"
            style={{ background: '#f8fafc', border: '1px solid #e3e8ef', maxHeight: 320 }}
          >
            {linkedTest.script}
          </pre>
        </div>
      )}

      {/* Change History */}
      <div>
        <h4 className="ds-h3 mb-2">Change History</h4>
        <div className="space-y-2">
          {script.changeHistory.map((ch, i) => (
            <div key={i} className="flex items-start gap-3 p-2 rounded-lg hover:bg-mutedBg">
              <div className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${
                ch.type === 'Created' ? 'bg-success' : ch.type === 'Updated' ? 'bg-appleBlue' : 'bg-warning'
              }`} />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-[12px] font-medium text-dBlue">{ch.type}</span>
                  <span className="text-[12px] text-placeholder">{ch.date}</span>
                </div>
                <p className="text-[12px] text-[#4C4C4C] mt-0.5">{ch.detail}</p>
                <span className="text-[12px] text-placeholder flex items-center gap-1 mt-0.5">
                  <User size={10} /> {ch.author}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
