import { X, Code2, List, FileText, AlertTriangle } from 'lucide-react';
import StatusBadge from '../../components/shared/StatusBadge';
import TagBadge from '../../components/shared/TagBadge';

export default function CandidateDetail({ candidate, onClose, onApprove, onReject }) {
  if (!candidate) return null;
  const c = candidate;

  return (
    <div className="fixed inset-0 z-[200] flex justify-end" style={{ background: 'rgba(0,0,0,0.2)' }}>
      <div
        className="bg-white h-full animate-slideInLeft flex flex-col"
        style={{ width: 640, maxWidth: '90vw', boxShadow: '-4px 0 20px rgba(0,0,0,0.1)' }}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-3 border-b border-borderSoft">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-placeholder font-mono">{c.id}</span>
              <StatusBadge status={c.reviewState} />
            </div>
            <h2 className="text-sm font-semibold text-dBlue mt-0.5">{c.name}</h2>
          </div>
          <button onClick={onClose} className="p-1.5 rounded hover:bg-appleGrayHover">
            <X size={16} />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-auto">
          {/* Meta row */}
          <div className="px-5 py-3 grid grid-cols-2 gap-3 border-b border-borderSoft bg-mutedBg">
            <InfoItem label="Source" value={c.source} />
            <InfoItem label="Status" value={<StatusBadge status={c.status} />} />
            <InfoItem label="Confidence" value={`${c.confidence}%`} />
            <InfoItem label="Priority" value={c.priority} />
            <InfoItem label="Module" value={c.module} />
            <InfoItem label="Business Area" value={c.businessArea} />
          </div>

          {/* Tags */}
          <div className="px-5 py-3 border-b border-borderSoft">
            <h4 className="text-xs font-semibold text-[#4C4C4C] uppercase tracking-wide mb-2 flex items-center gap-1.5">
              Tags
            </h4>
            <div className="flex flex-wrap gap-1.5">
              {c.tags.map((t) => <TagBadge key={t} label={t} />)}
            </div>
            {c.missingTags.length > 0 && (
              <div className="mt-2 flex items-start gap-1.5">
                <AlertTriangle size={12} className="text-warning mt-0.5" />
                <span className="text-[11px] text-warning font-medium">
                  Missing mandatory: {c.missingTags.join(', ')}
                </span>
              </div>
            )}
          </div>

          {/* Steps */}
          <div className="px-5 py-3 border-b border-borderSoft">
            <h4 className="text-xs font-semibold text-[#4C4C4C] uppercase tracking-wide mb-2 flex items-center gap-1.5">
              <List size={12} /> Steps
            </h4>
            <div className="space-y-2">
              {c.steps.map((s) => (
                <div key={s.step} className="flex gap-3 text-[12px]">
                  <span className="text-placeholder font-mono w-5 text-right flex-shrink-0">{s.step}</span>
                  <div className="flex-1 min-w-0">
                    <p className="text-dBlue font-medium">{s.action}</p>
                    <div className="flex gap-4 mt-0.5">
                      <span className="text-placeholder">Expected: <span className="text-[#4C4C4C]">{s.expected}</span></span>
                      <span className="text-placeholder">Actual: <span className={s.actual === s.expected ? 'text-success' : 'text-warning'}>{s.actual}</span></span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Script */}
          <div className="px-5 py-3 border-b border-borderSoft">
            <h4 className="text-xs font-semibold text-[#4C4C4C] uppercase tracking-wide mb-2 flex items-center gap-1.5">
              <Code2 size={12} /> Generated Script
            </h4>
            <div className="flex items-center gap-2 mb-2">
              <TagBadge label={c.scriptLang} variant="neutral" />
              {c.repoAligned && <TagBadge label="Repo Aligned" variant="success" />}
              {c.postEdited && <TagBadge label="Post-Edited" variant="warning" />}
            </div>
            <pre className="text-[12px] leading-relaxed p-3 rounded-lg overflow-auto font-mono text-dBlue" style={{ background: '#f8fafc', border: '1px solid #e3e8ef', maxHeight: 280 }}>
              {c.script}
            </pre>
          </div>

          {/* Script Meta */}
          <div className="px-5 py-3">
            <h4 className="text-xs font-semibold text-[#4C4C4C] uppercase tracking-wide mb-2 flex items-center gap-1.5">
              <FileText size={12} /> Script Metadata
            </h4>
            <div className="grid grid-cols-2 gap-2 text-[12px]">
              <InfoItem label="Language" value={c.scriptLang} />
              <InfoItem label="Repo Aligned" value={c.repoAligned ? 'Yes' : 'No'} />
              <InfoItem label="Post-Edited" value={c.postEdited ? 'Yes' : 'No'} />
              <InfoItem label="Source" value={c.source} />
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3 px-5 py-3 border-t border-borderSoft">
          <button onClick={() => onApprove(c.id)} className="btn-primary flex-1">Approve</button>
          <button onClick={() => onReject(c.id)} className="btn-secondary flex-1">Reject</button>
        </div>
      </div>
    </div>
  );
}

function InfoItem({ label, value }) {
  return (
    <div>
      <span className="text-[10px] text-placeholder uppercase tracking-wide">{label}</span>
      <div className="text-[13px] text-dBlue font-medium mt-0.5">{typeof value === 'string' ? value : value}</div>
    </div>
  );
}
