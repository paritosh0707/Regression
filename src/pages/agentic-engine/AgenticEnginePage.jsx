import { useState } from 'react';
import {
  AlertTriangle, Copy, Shuffle, Wrench, ShieldAlert, FileCode2,
  ArrowRight, Activity,
} from 'lucide-react';
import PipelineView from './PipelineView';
import IntegrationSummary from './IntegrationSummary';
import KpiCard from '../../components/shared/KpiCard';
import Tabs from '../../components/shared/Tabs';
import { integrationSummary, maintenanceEngine } from '../../data/mockData';

const tabs = [
  { key: 'pipeline', label: 'Integration Pipeline' },
  { key: 'maintenance', label: 'Maintenance Engine' },
  { key: 'summary', label: 'Integration Summary' },
];

export default function AgenticEnginePage() {
  const [activeTab, setActiveTab] = useState('pipeline');
  const me = maintenanceEngine;

  return (
    <div className="space-y-5 animate-fadeIn">
      <div>
        <h1 className="text-lg font-bold text-dBlue tracking-tight">Agentic Regression Engine</h1>
        <p className="text-xs text-placeholder mt-0.5">Validate, enrich, and integrate approved candidates into governed regression assets</p>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <KpiCard title="In Pipeline" value={integrationSummary.totalSelected} icon={Activity} color="#007AFF" />
        <KpiCard title="Newly Added" value={integrationSummary.newlyAdded} icon={ArrowRight} color="#22c55e" />
        <KpiCard title="Duplicates Found" value={me.duplicateCandidates} icon={Copy} color="#ef4444" />
        <KpiCard title="Files Touched" value={me.repoFilesTouched} icon={FileCode2} color="#f59e0b" />
      </div>

      <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />

      {/* Tab Content */}
      {activeTab === 'pipeline' && (
        <div className="space-y-4">
          <PipelineView currentStep={5} />
          <div className="card-base p-5">
            <h3 className="text-xs font-semibold text-[#4C4C4C] uppercase tracking-wide mb-3">Pipeline Status</h3>
            <p className="text-sm text-dBlue">
              Currently processing <strong>{integrationSummary.totalSelected} tests</strong> through the integration pipeline.
              Steps 1–5 are complete. Data/Config mapping is in progress.
            </p>
            <div className="mt-3 flex gap-2">
              <button className="btn-primary text-xs">Continue Processing</button>
              <button className="btn-secondary text-xs">Pause Pipeline</button>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'maintenance' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* Impact Panel */}
          <div className="card-base p-5 space-y-4">
            <h3 className="text-xs font-semibold text-[#4C4C4C] uppercase tracking-wide">Regression Estate Impact</h3>
            <div className="space-y-3">
              <ImpactRow icon={ShieldAlert} label="Existing Tests Affected" value={me.affectedExisting} color="#ef4444" />
              <ImpactRow icon={AlertTriangle} label="Obsolete Tests" value={me.obsoleteTests} color="#f59e0b" />
              <ImpactRow icon={Copy} label="Duplicate Candidates" value={me.duplicateCandidates} color="#8b5cf6" />
              <ImpactRow icon={Shuffle} label="Similar Scenarios" value={me.similarScenarios} color="#06b6d4" />
              <ImpactRow icon={Wrench} label="Repo Files Touched" value={me.repoFilesTouched} color="#3b82f6" />
            </div>
            <div className="pt-3 border-t border-borderSoft">
              <span className="text-[11px] text-placeholder">Suite Composition Impact</span>
              <p className="text-sm font-medium text-dBlue mt-0.5">{me.suiteCompositionImpact}</p>
            </div>
          </div>

          {/* Signals Panel */}
          <div className="space-y-4">
            <div className="card-base p-5">
              <h3 className="text-xs font-semibold text-[#4C4C4C] uppercase tracking-wide mb-3">Flakiness Indicators</h3>
              <div className="space-y-2">
                {me.flakinessIndicators.map((f, i) => (
                  <div key={i} className="flex items-start gap-2 text-[13px]">
                    <AlertTriangle size={12} className="text-warning mt-0.5 flex-shrink-0" />
                    <span className="text-dBlue">{f}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="card-base p-5">
              <h3 className="text-xs font-semibold text-[#4C4C4C] uppercase tracking-wide mb-3">Coverage Tag Changes</h3>
              <div className="space-y-2">
                {me.coverageTagChanges.map((c, i) => (
                  <div key={i} className="flex items-center gap-2 text-[13px]">
                    <ArrowRight size={12} className="text-success flex-shrink-0" />
                    <span className="text-dBlue">{c}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'summary' && (
        <IntegrationSummary summary={integrationSummary} />
      )}
    </div>
  );
}

function ImpactRow({ icon: Icon, label, value, color }) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2.5">
        <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: `${color}12` }}>
          <Icon size={13} style={{ color }} />
        </div>
        <span className="text-[13px] text-dBlue">{label}</span>
      </div>
      <span className="text-sm font-bold text-dBlue">{value}</span>
    </div>
  );
}
