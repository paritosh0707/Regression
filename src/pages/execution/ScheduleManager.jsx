import { Calendar, Clock, Play, Pause, GitBranch, CheckCircle2, XCircle } from 'lucide-react';
import StatusBadge from '../../components/shared/StatusBadge';
import DataTable from '../../components/shared/DataTable';
import TagBadge from '../../components/shared/TagBadge';

export default function ScheduleManager({ schedules, pipelines }) {
  const scheduleColumns = [
    { key: 'name', label: 'Schedule', render: (v) => <span className="font-medium text-dBlue">{v}</span> },
    { key: 'suite', label: 'Suite', render: (v) => <span className="text-[13px]">{v}</span> },
    { key: 'frequency', label: 'Frequency', render: (v) => <span className="text-[12px] text-[#4C4C4C]">{v}</span> },
    { key: 'environment', label: 'Env', render: (v) => <TagBadge label={v} variant="neutral" /> },
    { key: 'lastResult', label: 'Last Result', render: (v) => <StatusBadge status={v} /> },
    { key: 'nextRun', label: 'Next Run', render: (v) => <span className="text-[12px] text-[#4C4C4C]">{v}</span> },
    { key: 'owner', label: 'Owner', render: (v) => <span className="text-[12px]">{v}</span> },
    { key: 'status', label: 'Status', render: (v) => <StatusBadge status={v} /> },
  ];

  return (
    <div className="space-y-5">
      {/* Schedules */}
      <div>
        <h3 className="ds-h2 mb-3 flex items-center gap-2">
          <Calendar size={16} className="text-appleBlue" /> Schedules
        </h3>
        <DataTable columns={scheduleColumns} data={schedules} />
      </div>

      {/* CI/CD Pipelines */}
      <div>
        <h3 className="ds-h2 mb-3 flex items-center gap-2">
          <GitBranch size={16} className="text-appleBlue" /> CI/CD Pipeline Bindings
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {pipelines.map((pl) => (
            <div key={pl.id} className="card-base card-hover p-4">
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-[13px] font-semibold text-dBlue">{pl.name}</h4>
                <StatusBadge status={pl.status} />
              </div>
              <div className="space-y-1.5 text-[12px]">
                <div className="flex justify-between">
                  <span className="text-placeholder">Provider</span>
                  <span className="text-dBlue font-medium">{pl.provider}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-placeholder">Trigger</span>
                  <span className="text-dBlue">{pl.trigger}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-placeholder">Suite</span>
                  <span className="text-dBlue">{pl.suite}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-placeholder">Last Run</span>
                  <div className="flex items-center gap-1.5">
                    <span className="text-dBlue">{pl.lastRun}</span>
                    <StatusBadge status={pl.result} />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
