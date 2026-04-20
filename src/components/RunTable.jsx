const statusClass = {
  Running: 'bg-blue-50 text-blue-700',
  Queued: 'bg-amber-50 text-amber-700',
  Passed: 'bg-emerald-50 text-emerald-700'
};

export default function RunTable({ runs }) {
  return (
    <div className="overflow-hidden rounded-xl border border-borderSoft bg-white shadow-card">
      <table className="w-full border-collapse text-left text-sm">
        <thead className="bg-mutedBg text-xs uppercase tracking-wide text-slate-500">
          <tr>
            <th className="px-4 py-3">Suite</th>
            <th className="px-4 py-3">Environment</th>
            <th className="px-4 py-3">Trigger</th>
            <th className="px-4 py-3">Status</th>
            <th className="px-4 py-3">Progress</th>
          </tr>
        </thead>
        <tbody>
          {runs.map((run) => (
            <tr key={run.suite} className="border-t border-borderSoft">
              <td className="px-4 py-3 font-medium text-dBlue">{run.suite}</td>
              <td className="px-4 py-3 text-slate-700">{run.environment}</td>
              <td className="px-4 py-3 text-slate-700">{run.trigger}</td>
              <td className="px-4 py-3">
                <span className={`rounded-full px-2 py-1 text-xs font-semibold ${statusClass[run.status]}`}>
                  {run.status}
                </span>
              </td>
              <td className="px-4 py-3 text-slate-700">{run.progress}%</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
