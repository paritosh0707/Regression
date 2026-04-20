import { Link } from 'react-router-dom';
import {
  ClipboardCheck, Brain, Layers, FileCode2, Play, BarChart3, Settings,
  Users, CheckCircle2, AlertTriangle, Clock, TrendingUp, Activity, ShieldCheck,
} from 'lucide-react';
import KpiCard from '../../components/shared/KpiCard';
import StatusBadge from '../../components/shared/StatusBadge';
import { dashboardKpis, recentActivity, suites } from '../../data/mockData';

const modules = [
  { path: '/test-management', label: 'Test Management', desc: 'Triage & qualify candidate tests', icon: ClipboardCheck, stat: `${dashboardKpis.pendingReview} pending review`, color: '#007AFF' },
  { path: '/agentic-engine', label: 'Agentic Engine', desc: 'Validate, enrich & integrate tests', icon: Brain, stat: '14 in pipeline', color: '#8b5cf6' },
  { path: '/suite-management', label: 'Suite Management', desc: 'Curate & govern regression suites', icon: Layers, stat: `${dashboardKpis.activeSuites} active suites`, color: '#06b6d4' },
  { path: '/script-data-repo', label: 'Script & Data Repo', desc: 'Scripts, data, configs & history', icon: FileCode2, stat: '6 files updated', color: '#f59e0b' },
  { path: '/execution', label: 'Execution & Scheduling', desc: 'Run, schedule & bind CI/CD', icon: Play, stat: `${dashboardKpis.scheduledRuns} scheduled`, color: '#22c55e' },
  { path: '/reporting', label: 'Reporting & Analytics', desc: 'Health, trends & coverage', icon: BarChart3, stat: `${dashboardKpis.overallPassRate}% pass rate`, color: '#ef4444' },
  { path: '/platform', label: 'Platform & Infra', desc: 'Repos, envs, roles & audit', icon: Settings, stat: '3 repos connected', color: '#64748b' },
];

const activityIcons = {
  success: CheckCircle2,
  warning: AlertTriangle,
  info: Activity,
  neutral: Clock,
};

export default function DashboardPage() {
  return (
    <div className="space-y-6 animate-fadeIn">
      <div>
        <h1 className="text-lg font-bold text-dBlue tracking-tight">Dashboard</h1>
        <p className="text-xs text-placeholder mt-0.5">Regression Operating Layer overview</p>
      </div>

      {/* KPI Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <KpiCard title="Total Candidates" value={dashboardKpis.totalCandidates} trend={8} subtitle="from agentic runs" icon={Users} color="#007AFF" />
        <KpiCard title="Pass Rate" value={`${dashboardKpis.overallPassRate}%`} trend={2.1} subtitle="across all suites" icon={CheckCircle2} color="#22c55e" />
        <KpiCard title="Active Suites" value={dashboardKpis.activeSuites} subtitle={`${dashboardKpis.totalRegressionTests} tests total`} icon={Layers} color="#8b5cf6" />
        <KpiCard title="Flaky Tests" value={dashboardKpis.flakyTests} trend={-12} subtitle="trending down" icon={AlertTriangle} color="#f59e0b" />
      </div>

      {/* Module Cards */}
      <div>
        <h2 className="text-sm font-semibold text-dBlue mb-3">Modules</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {modules.map((m) => (
            <Link
              key={m.path}
              to={m.path}
              className="card-base card-hover p-4 flex flex-col gap-3 group"
            >
              <div className="flex items-center gap-3">
                <div
                  className="w-9 h-9 rounded-lg flex items-center justify-center transition-transform group-hover:scale-105"
                  style={{ background: `${m.color}12` }}
                >
                  <m.icon size={18} style={{ color: m.color }} />
                </div>
                <div className="min-w-0">
                  <p className="text-[13px] font-semibold text-dBlue truncate">{m.label}</p>
                  <p className="text-[11px] text-placeholder truncate">{m.desc}</p>
                </div>
              </div>
              <div className="text-[11px] font-medium text-appleBlue">{m.stat}</div>
            </Link>
          ))}
        </div>
      </div>

      {/* Bottom row: Suite Health + Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Suite Health */}
        <div className="card-base p-4">
          <h3 className="text-sm font-semibold text-dBlue mb-3 flex items-center gap-2">
            <ShieldCheck size={16} className="text-appleBlue" /> Suite Health
          </h3>
          <div className="space-y-2.5">
            {suites.slice(0, 4).map((s) => (
              <div key={s.id} className="flex items-center gap-3">
                <span className="text-[13px] font-medium text-dBlue w-40 truncate">{s.name}</span>
                <div className="flex-1 h-2 bg-[#f1f4f7] rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all"
                    style={{
                      width: `${s.passRate}%`,
                      background: s.passRate >= 90 ? '#22c55e' : s.passRate >= 75 ? '#f59e0b' : '#ef4444',
                    }}
                  />
                </div>
                <span className="text-[12px] font-semibold text-dBlue w-10 text-right">{s.passRate}%</span>
                <StatusBadge status={s.lifecycle} />
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="card-base p-4">
          <h3 className="text-sm font-semibold text-dBlue mb-3 flex items-center gap-2">
            <TrendingUp size={16} className="text-appleBlue" /> Recent Activity
          </h3>
          <div className="space-y-3">
            {recentActivity.map((a) => {
              const Icon = activityIcons[a.type] || Clock;
              return (
                <div key={a.id} className="flex items-start gap-2.5">
                  <Icon size={14} className={`mt-0.5 flex-shrink-0 ${
                    a.type === 'success' ? 'text-success' :
                    a.type === 'warning' ? 'text-warning' :
                    a.type === 'info' ? 'text-info' : 'text-placeholder'
                  }`} />
                  <div className="min-w-0">
                    <p className="text-[13px] text-dBlue leading-snug">{a.message}</p>
                    <p className="text-[11px] text-placeholder mt-0.5">{a.time}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
