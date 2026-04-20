export default function KpiCard({ label, value, delta }) {
  return (
    <div className="rounded-xl border border-borderSoft bg-white p-4 shadow-card">
      <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">{label}</p>
      <p className="mt-2 text-3xl font-bold text-dBlue">{value}</p>
      <p className="mt-2 text-xs text-slate-500">{delta}</p>
    </div>
  );
}
