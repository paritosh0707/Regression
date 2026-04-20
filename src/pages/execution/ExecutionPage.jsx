import { useState } from 'react';
import {
  Play, Clock, GitBranch, Activity, CheckCircle2, XCircle, Calendar,
} from 'lucide-react';
import Tabs from '../../components/shared/Tabs';
import KpiCard from '../../components/shared/KpiCard';
import LiveRunMonitor from './LiveRunMonitor';
import ScheduleManager from './ScheduleManager';
import { liveRuns, schedules, cicdPipelines, suites } from '../../data/mockData';

const tabs = [
  { key: 'setup', label: 'Execution Setup' },
  { key: 'live', label: 'Live Runs', count: liveRuns.filter((r) => r.status === 'Running').length },
  { key: 'schedules', label: 'Schedules & Pipelines' },
];

export default function ExecutionPage() {
  const [activeTab, setActiveTab] = useState('setup');
  const [selectedSuite, setSelectedSuite] = useState('');
  const [selectedEnv, setSelectedEnv] = useState('QA');
  const [selectedBranch, setSelectedBranch] = useState('main');
  const [runMode, setRunMode] = useState('suite');

  const totalRuns = liveRuns.length;
  const activeRuns = liveRuns.filter((r) => r.status === 'Running').length;
  const activeSchedules = schedules.filter((s) => s.status === 'Active').length;

  return (
    <div className="space-y-5 animate-fadeIn">
      <div>
        <h1 className="ds-h1">Execution & Scheduling</h1>
        <p className="text-[12px] font-medium text-placeholder mt-0.5">Run, schedule, and bind regression to CI/CD pipelines</p>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <KpiCard title="Active Runs" value={activeRuns} icon={Activity} color="#007AFF" />
        <KpiCard title="Total Runs" value={totalRuns} icon={Play} color="#388E3C" />
        <KpiCard title="Active Schedules" value={activeSchedules} icon={Calendar} color="#8b5cf6" />
        <KpiCard title="CI/CD Pipelines" value={cicdPipelines.length} icon={GitBranch} color="#e65100" />
      </div>

      <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />

      {/* Execution Setup */}
      {activeTab === 'setup' && (
        <div className="card-base p-6 max-w-2xl">
          <h3 className="ds-h2 mb-4">New Execution</h3>

          {/* Run mode */}
          <div className="mb-4">
            <label className="text-[12px] font-medium text-placeholder block mb-1.5">Run By</label>
            <div className="flex gap-1">
              {['suite', 'tag', 'branch'].map((m) => (
                <button
                  key={m}
                  onClick={() => setRunMode(m)}
                  className={`px-3 py-1.5 text-xs rounded-button font-medium capitalize transition-colors ${
                    runMode === m ? 'bg-tblue text-white' : 'text-[#4C4C4C] hover:bg-appleGrayHover border border-borderSoft'
                  }`}
                >
                  {m}
                </button>
              ))}
            </div>
          </div>

          {/* Suite selector */}
          <div className="mb-4">
            <label className="text-[12px] font-medium text-placeholder block mb-1.5">
              {runMode === 'suite' ? 'Select Suite' : runMode === 'tag' ? 'Enter Tag' : 'Enter Branch'}
            </label>
            {runMode === 'suite' ? (
              <select
                value={selectedSuite}
                onChange={(e) => setSelectedSuite(e.target.value)}
                className="input-field"
              >
                <option value="">Choose a suite...</option>
                {suites.filter((s) => s.lifecycle === 'Active').map((s) => (
                  <option key={s.id} value={s.id}>{s.name}</option>
                ))}
              </select>
            ) : (
              <input
                type="text"
                className="input-field"
                placeholder={runMode === 'tag' ? 'e.g. smoke, auth' : 'e.g. main, develop'}
                value={selectedBranch}
                onChange={(e) => setSelectedBranch(e.target.value)}
              />
            )}
          </div>

          {/* Environment */}
          <div className="mb-4">
            <label className="text-[12px] font-medium text-placeholder block mb-1.5">Environment</label>
            <select
              value={selectedEnv}
              onChange={(e) => setSelectedEnv(e.target.value)}
              className="input-field"
            >
              <option value="QA">QA</option>
              <option value="Staging">Staging</option>
              <option value="Pre-Prod">Pre-Prod</option>
            </select>
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-2">
            <button className="btn-primary flex items-center gap-2">
              <Play size={14} /> Run Now
            </button>
            <button className="btn-secondary flex items-center gap-2">
              <Clock size={14} /> Schedule
            </button>
          </div>
        </div>
      )}

      {/* Live Runs */}
      {activeTab === 'live' && (
        <LiveRunMonitor runs={liveRuns} />
      )}

      {/* Schedules & Pipelines */}
      {activeTab === 'schedules' && (
        <ScheduleManager schedules={schedules} pipelines={cicdPipelines} />
      )}
    </div>
  );
}
