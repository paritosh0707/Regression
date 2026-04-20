import {
  LineChart, Line, AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,
} from 'recharts';

const chartColors = {
  passed: '#22c55e',
  failed: '#ef4444',
  flaky: '#f59e0b',
  primary: '#007AFF',
  secondary: '#8b5cf6',
};

export function PassFailTrendChart({ data }) {
  return (
    <div className="card-base p-5">
      <h3 className="text-xs font-semibold text-[#4C4C4C] uppercase tracking-wide mb-4">Pass / Fail Trend</h3>
      <ResponsiveContainer width="100%" height={260}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f1f4f7" />
          <XAxis dataKey="date" tick={{ fontSize: 11 }} stroke="#8E8E93" />
          <YAxis tick={{ fontSize: 11 }} stroke="#8E8E93" />
          <Tooltip contentStyle={{ borderRadius: 8, border: '1px solid #e3e8ef', fontSize: 12 }} />
          <Legend wrapperStyle={{ fontSize: 11 }} />
          <Line type="monotone" dataKey="passed" stroke={chartColors.passed} strokeWidth={2} dot={{ r: 3 }} />
          <Line type="monotone" dataKey="failed" stroke={chartColors.failed} strokeWidth={2} dot={{ r: 3 }} />
          <Line type="monotone" dataKey="flaky" stroke={chartColors.flaky} strokeWidth={2} dot={{ r: 3 }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export function FlakyTrendChart({ data }) {
  return (
    <div className="card-base p-5">
      <h3 className="text-xs font-semibold text-[#4C4C4C] uppercase tracking-wide mb-4">Flaky Test Trend</h3>
      <ResponsiveContainer width="100%" height={260}>
        <AreaChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f1f4f7" />
          <XAxis dataKey="date" tick={{ fontSize: 11 }} stroke="#8E8E93" />
          <YAxis tick={{ fontSize: 11 }} stroke="#8E8E93" />
          <Tooltip contentStyle={{ borderRadius: 8, border: '1px solid #e3e8ef', fontSize: 12 }} />
          <Area type="monotone" dataKey="flaky" stroke={chartColors.flaky} fill="rgba(245, 158, 11, 0.15)" strokeWidth={2} />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

export function FailureBreakdownChart({ data }) {
  return (
    <div className="card-base p-5">
      <h3 className="text-xs font-semibold text-[#4C4C4C] uppercase tracking-wide mb-4">Failure Breakdown</h3>
      <ResponsiveContainer width="100%" height={260}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={55}
            outerRadius={90}
            paddingAngle={3}
            dataKey="value"
          >
            {data.map((entry, i) => (
              <Cell key={i} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip contentStyle={{ borderRadius: 8, border: '1px solid #e3e8ef', fontSize: 12 }} />
          <Legend wrapperStyle={{ fontSize: 11 }} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

export function ExecutionDurationChart({ data }) {
  return (
    <div className="card-base p-5">
      <h3 className="text-xs font-semibold text-[#4C4C4C] uppercase tracking-wide mb-4">Execution Duration (min)</h3>
      <ResponsiveContainer width="100%" height={260}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f1f4f7" />
          <XAxis dataKey="date" tick={{ fontSize: 11 }} stroke="#8E8E93" />
          <YAxis tick={{ fontSize: 11 }} stroke="#8E8E93" />
          <Tooltip contentStyle={{ borderRadius: 8, border: '1px solid #e3e8ef', fontSize: 12 }} />
          <Bar dataKey="minutes" fill={chartColors.primary} radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export function TagCoverageChart({ data }) {
  return (
    <div className="card-base p-5">
      <h3 className="text-xs font-semibold text-[#4C4C4C] uppercase tracking-wide mb-4">Tag Coverage</h3>
      <ResponsiveContainer width="100%" height={260}>
        <BarChart data={data} layout="vertical">
          <CartesianGrid strokeDasharray="3 3" stroke="#f1f4f7" />
          <XAxis type="number" domain={[0, 100]} tick={{ fontSize: 11 }} stroke="#8E8E93" />
          <YAxis type="category" dataKey="tag" tick={{ fontSize: 11 }} stroke="#8E8E93" width={60} />
          <Tooltip contentStyle={{ borderRadius: 8, border: '1px solid #e3e8ef', fontSize: 12 }} />
          <Bar dataKey="covered" fill={chartColors.primary} radius={[0, 4, 4, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export function SuiteHealthGrid({ data }) {
  return (
    <div className="card-base p-5">
      <h3 className="text-xs font-semibold text-[#4C4C4C] uppercase tracking-wide mb-4">Suite Health Map</h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
        {data.map((s) => (
          <div
            key={s.suite}
            className="p-3 rounded-lg border border-borderSoft text-center"
            style={{
              background: s.health >= 90
                ? 'rgba(34, 197, 94, 0.08)'
                : s.health >= 75
                  ? 'rgba(245, 158, 11, 0.08)'
                  : 'rgba(239, 68, 68, 0.08)',
            }}
          >
            <span className="text-2xl font-bold" style={{
              color: s.health >= 90 ? '#22c55e' : s.health >= 75 ? '#f59e0b' : '#ef4444',
            }}>
              {s.health}%
            </span>
            <p className="text-[11px] font-medium text-dBlue mt-1">{s.suite}</p>
            <p className="text-[10px] text-placeholder">{s.tests} tests</p>
            {s.trend !== 0 && (
              <span className={`text-[10px] font-medium ${s.trend > 0 ? 'text-success' : 'text-danger'}`}>
                {s.trend > 0 ? '+' : ''}{s.trend}%
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export function ConfidenceDistributionChart({ data }) {
  const colors = ['#22c55e', '#3b82f6', '#f59e0b', '#ef4444', '#8b5cf6'];
  return (
    <div className="card-base p-5">
      <h3 className="text-xs font-semibold text-[#4C4C4C] uppercase tracking-wide mb-4">Agent Confidence Distribution</h3>
      <ResponsiveContainer width="100%" height={220}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f1f4f7" />
          <XAxis dataKey="range" tick={{ fontSize: 11 }} stroke="#8E8E93" />
          <YAxis tick={{ fontSize: 11 }} stroke="#8E8E93" />
          <Tooltip contentStyle={{ borderRadius: 8, border: '1px solid #e3e8ef', fontSize: 12 }} />
          <Bar dataKey="count" radius={[4, 4, 0, 0]}>
            {data.map((_, i) => (
              <Cell key={i} fill={colors[i % colors.length]} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
