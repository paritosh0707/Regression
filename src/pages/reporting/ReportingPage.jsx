import {
  ShieldCheck, TrendingUp, AlertTriangle, Target,
  Bot, CheckCircle2, XCircle, Tag,
} from 'lucide-react';
import KpiCard from '../../components/shared/KpiCard';
import {
  PassFailTrendChart,
  FlakyTrendChart,
  FailureBreakdownChart,
  ExecutionDurationChart,
  TagCoverageChart,
  SuiteHealthGrid,
  ConfidenceDistributionChart,
} from './ChartWidgets';
import {
  passFailTrend,
  failureBreakdown,
  suiteHealthMap,
  tagCoverage,
  executionDurationTrend,
  agentAnalytics,
  dashboardKpis,
} from '../../data/mockData';

export default function ReportingPage() {
  const aa = agentAnalytics;

  return (
    <div className="space-y-5 animate-fadeIn">
      <div>
        <h1 className="text-lg font-bold text-dBlue tracking-tight">Reporting & Analytics</h1>
        <p className="text-xs text-placeholder mt-0.5">Health, trends, coverage, and agent intelligence metrics</p>
      </div>

      {/* KPI Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <KpiCard title="Health Score" value={`${dashboardKpis.coverageScore}%`} trend={3} icon={ShieldCheck} color="#22c55e" />
        <KpiCard title="Pass Rate" value={`${dashboardKpis.overallPassRate}%`} trend={2.1} icon={TrendingUp} color="#007AFF" />
        <KpiCard title="Flaky Rate" value={`${Math.round((dashboardKpis.flakyTests / dashboardKpis.totalRegressionTests) * 100)}%`} trend={-12} icon={AlertTriangle} color="#f59e0b" />
        <KpiCard title="Coverage Score" value={`${dashboardKpis.coverageScore}%`} icon={Target} color="#8b5cf6" />
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <PassFailTrendChart data={passFailTrend} />
        <FailureBreakdownChart data={failureBreakdown} />
      </div>

      {/* Suite Health */}
      <SuiteHealthGrid data={suiteHealthMap} />

      {/* Charts Row 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <FlakyTrendChart data={passFailTrend} />
        <ExecutionDurationChart data={executionDurationTrend} />
      </div>

      {/* Tag Coverage */}
      <TagCoverageChart data={tagCoverage} />

      {/* Agent Analytics */}
      <div className="card-base p-5">
        <h3 className="text-sm font-semibold text-dBlue mb-4 flex items-center gap-2">
          <Bot size={16} className="text-appleBlue" /> Agent Analytics
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
          <AgentStat icon={Bot} label="Generated" value={aa.generated} color="#007AFF" />
          <AgentStat icon={CheckCircle2} label="Accepted" value={aa.accepted} color="#22c55e" />
          <AgentStat icon={XCircle} label="Rejected" value={aa.rejected} color="#ef4444" />
          <AgentStat icon={Tag} label="Auto-Tag Acceptance" value={`${aa.autoTagAcceptance}%`} color="#8b5cf6" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <ConfidenceDistributionChart data={aa.confidenceDistribution} />
          <div className="card-base p-5 space-y-4">
            <h4 className="text-xs font-semibold text-[#4C4C4C] uppercase tracking-wide">Agent Performance</h4>
            <MetricBar label="Acceptance Rate" value={Math.round((aa.accepted / aa.generated) * 100)} />
            <MetricBar label="Auto-Tag Acceptance" value={aa.autoTagAcceptance} />
            <MetricBar label="Maintenance Interventions" value={aa.maintenanceInterventions} max={aa.generated} />
            <div className="pt-2 border-t border-borderSoft">
              <div className="flex justify-between text-[12px]">
                <span className="text-placeholder">Duplicates Removed</span>
                <span className="font-bold text-dBlue">{aa.duplicatesRemoved}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function AgentStat({ icon: Icon, label, value, color }) {
  return (
    <div className="flex items-center gap-3">
      <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ background: `${color}12` }}>
        <Icon size={16} style={{ color }} />
      </div>
      <div>
        <span className="text-xl font-bold text-dBlue">{value}</span>
        <span className="text-[10px] text-placeholder block">{label}</span>
      </div>
    </div>
  );
}

function MetricBar({ label, value, max = 100 }) {
  const pct = max > 0 ? Math.round((value / max) * 100) : 0;
  return (
    <div>
      <div className="flex justify-between text-[12px] mb-1">
        <span className="text-[#4C4C4C]">{label}</span>
        <span className="font-semibold text-dBlue">{typeof value === 'number' && max === 100 ? `${value}%` : `${pct}%`}</span>
      </div>
      <div className="h-1.5 bg-[#f1f4f7] rounded-full overflow-hidden">
        <div
          className="h-full rounded-full"
          style={{ width: `${pct}%`, background: pct >= 75 ? '#22c55e' : pct >= 50 ? '#f59e0b' : '#ef4444' }}
        />
      </div>
    </div>
  );
}
