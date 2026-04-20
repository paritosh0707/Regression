import KpiCard from './components/KpiCard';
import ModuleCard from './components/ModuleCard';
import RunTable from './components/RunTable';
import { journey, kpis, modules, runs } from './data/mockData';

export default function App() {
  return (
    <div className="min-h-screen bg-[#f5f5f7]">
      <header className="sticky top-0 z-10 border-b border-white/20 bg-white/80 px-8 py-4 backdrop-blur-md">
        <p className="text-xs uppercase tracking-[0.2em] text-slate-500">IntelliQA</p>
        <h1 className="mt-1 text-2xl font-bold text-dBlue">Governed Regression Operating Layer</h1>
      </header>

      <main className="mx-auto max-w-7xl space-y-8 px-6 py-8">
        <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {kpis.map((kpi) => (
            <KpiCard key={kpi.label} {...kpi} />
          ))}
        </section>

        <section className="rounded-xl border border-borderSoft bg-white p-6 shadow-card">
          <h2 className="text-xl font-bold text-dBlue">End-to-end lifecycle</h2>
          <ol className="mt-4 grid gap-3 md:grid-cols-2">
            {journey.map((step, index) => (
              <li key={step} className="rounded-lg border border-borderSoft bg-mutedBg px-4 py-3 text-sm text-slate-700">
                <span className="mr-2 font-bold text-tblue">{index + 1}.</span>
                {step}
              </li>
            ))}
          </ol>
        </section>

        <section>
          <h2 className="mb-4 text-xl font-bold text-dBlue">Seven sub-modules</h2>
          <div className="grid gap-4 lg:grid-cols-2">
            {modules.map((module) => (
              <ModuleCard key={module.id} module={module} />
            ))}
          </div>
        </section>

        <section>
          <h2 className="mb-4 text-xl font-bold text-dBlue">Execution snapshot (mock API)</h2>
          <RunTable runs={runs} />
        </section>
      </main>
    </div>
  );
}
