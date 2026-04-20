import { CheckCircle2, XCircle, Loader2, Clock } from 'lucide-react';
import StatusBadge from '../../components/shared/StatusBadge';

const statusIcon = {
  Passed: <CheckCircle2 size={14} className="text-success" />,
  Failed: <XCircle size={14} className="text-danger" />,
  Running: <Loader2 size={14} className="text-info animate-spin" />,
  Pending: <Clock size={14} className="text-warning" />,
};

export default function LiveRunMonitor({ runs }) {
  return (
    <div className="space-y-4">
      {runs.map((run) => (
        <div key={run.id} className="card-base p-5">
          <div className="flex items-start justify-between mb-3">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[12px] font-mono text-placeholder">{run.id}</span>
                <StatusBadge status={run.status} />
              </div>
              <h3 className="text-[14px] font-semibold text-dBlue mt-0.5">{run.suite}</h3>
            </div>
            <div className="text-right text-[12px] text-placeholder">
              <div>Environment: <span className="text-dBlue font-medium">{run.environment}</span></div>
              <div>Branch: <span className="text-dBlue font-medium font-mono">{run.branch}</span></div>
              <div>Triggered: <span className="text-dBlue font-medium">{run.triggeredBy}</span></div>
            </div>
          </div>

          {/* Progress bar */}
          <div className="mb-3">
            <div className="flex items-center justify-between text-[12px] mb-1">
              <span className="text-placeholder">Progress</span>
              <span className="font-semibold text-dBlue">{run.progress}%</span>
            </div>
            <div className="h-2 bg-[#f1f4f7] rounded-full overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-500"
                style={{
                  width: `${run.progress}%`,
                  background: run.status === 'Completed'
                    ? (run.failed > 0 ? '#e65100' : '#388E3C')
                    : '#007AFF',
                }}
              />
            </div>
          </div>

          {/* Stats */}
          <div className="flex items-center gap-4 text-[12px] mb-3">
            <span className="flex items-center gap-1"><CheckCircle2 size={12} className="text-success" /> {run.passed} passed</span>
            <span className="flex items-center gap-1"><XCircle size={12} className="text-danger" /> {run.failed} failed</span>
            <span className="flex items-center gap-1"><Loader2 size={12} className="text-info" /> {run.running} running</span>
            <span className="flex items-center gap-1"><Clock size={12} className="text-warning" /> {run.pending} pending</span>
            <span className="text-placeholder">of {run.total} total</span>
          </div>

          {/* Test results (if available) */}
          {run.testResults.length > 0 && (
            <div className="border-t border-borderSoft pt-3">
              <h4 className="ds-h3 mb-2">Test Results</h4>
              <div className="space-y-1.5">
                {run.testResults.map((tr) => (
                  <div key={tr.testId} className="flex items-center gap-3 py-1.5 px-2 rounded-lg hover:bg-mutedBg">
                    {statusIcon[tr.status]}
                    <span className="text-[12px] font-mono text-placeholder w-14">{tr.testId}</span>
                    <span className="text-[12px] text-dBlue flex-1">{tr.name}</span>
                    <span className="text-[12px] text-placeholder">{tr.duration}</span>
                    {tr.error && (
                      <span className="text-[12px] text-danger max-w-[200px] truncate">{tr.error}</span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="text-[12px] text-placeholder mt-2">Started: {run.startedAt}</div>
        </div>
      ))}
    </div>
  );
}
