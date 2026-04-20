export default function ModuleCard({ module }) {
  return (
    <article className="rounded-xl border border-borderSoft bg-white p-5 shadow-card">
      <h3 className="text-lg font-bold text-dBlue">{module.title}</h3>
      <p className="mt-1 text-sm text-slate-600">{module.purpose}</p>
      <ul className="mt-4 list-disc space-y-1 pl-5 text-sm text-slate-700">
        {module.items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </article>
  );
}
