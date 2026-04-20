import { useState, useMemo } from 'react';
import {
  Layers, ShieldCheck, AlertTriangle, Eye, Calendar, GitBranch,
} from 'lucide-react';
import SearchBar from '../../components/shared/SearchBar';
import StatusBadge from '../../components/shared/StatusBadge';
import TagBadge from '../../components/shared/TagBadge';
import KpiCard from '../../components/shared/KpiCard';
import SuiteDetail from './SuiteDetail';
import { suites } from '../../data/mockData';

const lifecycleFilters = ['All', 'Active', 'Under Review', 'Deprecated'];

export default function SuiteManagementPage() {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('All');
  const [selectedSuite, setSelectedSuite] = useState(null);

  const filtered = useMemo(() => {
    return suites.filter((s) => {
      const matchesSearch = !search || s.name.toLowerCase().includes(search.toLowerCase()) || s.domain.toLowerCase().includes(search.toLowerCase());
      const matchesFilter = filter === 'All' || s.lifecycle === filter;
      return matchesSearch && matchesFilter;
    });
  }, [search, filter]);

  const stats = useMemo(() => ({
    active: suites.filter((s) => s.lifecycle === 'Active').length,
    totalTests: suites.reduce((acc, s) => acc + s.testCount, 0),
    avgPass: Math.round(suites.filter((s) => s.lifecycle === 'Active').reduce((acc, s) => acc + s.passRate, 0) / suites.filter((s) => s.lifecycle === 'Active').length),
    totalFlaky: suites.reduce((acc, s) => acc + s.flakyCount, 0),
  }), []);

  return (
    <div className="space-y-5 animate-fadeIn">
      <div>
        <h1 className="ds-h1">Regression Suite Management</h1>
        <p className="text-[12px] font-medium text-placeholder mt-0.5">Curate, govern, and maintain regression suites with mandatory metadata</p>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <KpiCard title="Active Suites" value={stats.active} icon={Layers} color="#007AFF" />
        <KpiCard title="Total Tests" value={stats.totalTests} icon={ShieldCheck} color="#388E3C" />
        <KpiCard title="Avg Pass Rate" value={`${stats.avgPass}%`} icon={ShieldCheck} color="#8b5cf6" />
        <KpiCard title="Flaky Tests" value={stats.totalFlaky} icon={AlertTriangle} color="#e65100" />
      </div>

      {/* Filters */}
      <div className="flex items-center gap-3 flex-wrap">
        <SearchBar value={search} onChange={setSearch} placeholder="Search suites by name or domain..." />
        <div className="flex gap-1">
          {lifecycleFilters.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-3 py-1.5 text-xs rounded-button font-medium transition-colors ${
                filter === f ? 'bg-tblue text-white' : 'text-[#4C4C4C] hover:bg-appleGrayHover'
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Suite Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {filtered.map((suite) => (
          <div
            key={suite.id}
            className="card-base card-hover p-4 cursor-pointer"
            onClick={() => setSelectedSuite(suite)}
          >
            <div className="flex items-start justify-between mb-3">
              <div>
                <span className="text-[12px] font-mono text-placeholder">{suite.id}</span>
                <h3 className="text-[14px] font-semibold text-dBlue">{suite.name}</h3>
              </div>
              <StatusBadge status={suite.lifecycle} />
            </div>

            <p className="text-[12px] text-[#4C4C4C] mb-3 line-clamp-2">{suite.purpose}</p>

            {/* Pass rate bar */}
            <div className="mb-3">
              <div className="flex items-center justify-between text-[12px] mb-1">
                <span className="text-placeholder">Pass Rate</span>
                <span className="font-semibold text-dBlue">{suite.passRate}%</span>
              </div>
              <div className="h-1.5 bg-[#f1f4f7] rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full"
                  style={{
                    width: `${suite.passRate}%`,
                    background: suite.passRate >= 90 ? '#388E3C' : suite.passRate >= 75 ? '#e65100' : '#D32F2F',
                  }}
                />
              </div>
            </div>

            {/* Tag completeness */}
            <div className="mb-3">
              <div className="flex items-center justify-between text-[12px] mb-1">
                <span className="text-placeholder">Tag Completeness</span>
                <span className={`font-semibold ${suite.tagCompleteness >= 90 ? 'text-success' : 'text-warning'}`}>{suite.tagCompleteness}%</span>
              </div>
              <div className="h-1.5 bg-[#f1f4f7] rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full"
                  style={{
                    width: `${suite.tagCompleteness}%`,
                    background: suite.tagCompleteness >= 90 ? '#388E3C' : '#e65100',
                  }}
                />
              </div>
            </div>

            {/* Stats row */}
            <div className="flex items-center gap-4 text-[12px] text-placeholder">
              <span className="flex items-center gap-1"><Layers size={11} /> {suite.testCount} tests</span>
              <span className="flex items-center gap-1"><AlertTriangle size={11} /> {suite.flakyCount} flaky</span>
              <span className="flex items-center gap-1"><Calendar size={11} /> {suite.lastModified}</span>
            </div>

            {/* Priority dist */}
            <div className="flex gap-2 mt-2">
              {Object.entries(suite.priorityDistribution).map(([k, v]) => (
                <TagBadge key={k} label={`${k}: ${v}`} variant={k === 'P1' ? 'danger' : k === 'P2' ? 'warning' : 'neutral'} />
              ))}
            </div>

            {/* Footer meta */}
            <div className="flex items-center gap-3 mt-3 pt-2 border-t border-borderSoft text-[12px] text-placeholder">
              <span>Owner: <span className="text-dBlue font-medium">{suite.owner}</span></span>
              <span>Tier: <span className="text-dBlue font-medium">{suite.executionTier}</span></span>
              {suite.linkedSchedule && (
                <span className="flex items-center gap-0.5"><Calendar size={10} /> {suite.linkedSchedule}</span>
              )}
            </div>
          </div>
        ))}
      </div>

      {selectedSuite && (
        <SuiteDetail suite={selectedSuite} onClose={() => setSelectedSuite(null)} />
      )}
    </div>
  );
}
