const statusStyles = {
  pass: 'status-pass',
  passed: 'status-pass',
  success: 'status-pass',
  active: 'status-pass',
  approved: 'status-pass',
  complete: 'status-pass',
  connected: 'status-pass',
  healthy: 'status-pass',
  fail: 'status-fail',
  failed: 'status-fail',
  error: 'status-fail',
  rejected: 'status-fail',
  critical: 'status-fail',
  unhealthy: 'status-fail',
  disconnected: 'status-fail',
  running: 'status-running',
  'in review': 'status-running',
  'in_review': 'status-running',
  'in progress': 'status-running',
  'in_progress': 'status-running',
  pending: 'status-pending',
  new: 'status-pending',
  warning: 'status-pending',
  draft: 'status-pending',
  paused: 'status-pending',
  flaky: 'status-pending',
  skipped: 'status-pending',
  deprecated: 'status-pending',
};

export default function StatusBadge({ status, className = '' }) {
  const key = (status || '').toLowerCase();
  const style = statusStyles[key] || 'status-pending';

  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded-lg text-[11px] font-semibold capitalize ${style} ${className}`}>
      {status}
    </span>
  );
}
