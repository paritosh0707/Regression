import { useState } from 'react';
import {
  GitBranch, Globe, Users, Shield, Bell, ClipboardList,
  ChevronDown, ChevronUp, CheckCircle2, XCircle, AlertTriangle,
  Settings, ExternalLink,
} from 'lucide-react';
import StatusBadge from '../../components/shared/StatusBadge';
import TagBadge from '../../components/shared/TagBadge';
import DataTable from '../../components/shared/DataTable';
import { platformConfig } from '../../data/mockData';

const sections = [
  { key: 'repos', label: 'Repository Connections', icon: GitBranch, color: '#007AFF' },
  { key: 'envs', label: 'Environment Registry', icon: Globe, color: '#22c55e' },
  { key: 'roles', label: 'Role Management', icon: Users, color: '#8b5cf6' },
  { key: 'notifications', label: 'Notifications', icon: Bell, color: '#f59e0b' },
  { key: 'audit', label: 'Audit Log', icon: ClipboardList, color: '#06b6d4' },
];

export default function PlatformPage() {
  const [expanded, setExpanded] = useState({ repos: true, envs: true, roles: false, notifications: false, audit: true });

  const toggle = (key) => setExpanded((prev) => ({ ...prev, [key]: !prev[key] }));

  return (
    <div className="space-y-5 animate-fadeIn">
      <div>
        <h1 className="text-lg font-bold text-dBlue tracking-tight">Platform & Infrastructure</h1>
        <p className="text-xs text-placeholder mt-0.5">Admin governance, connections, roles, and auditability</p>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
        {sections.map((s) => (
          <button
            key={s.key}
            onClick={() => toggle(s.key)}
            className="card-base card-hover p-3 text-left"
          >
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: `${s.color}12` }}>
                <s.icon size={14} style={{ color: s.color }} />
              </div>
              <span className="text-[12px] font-semibold text-dBlue">{s.label}</span>
            </div>
          </button>
        ))}
      </div>

      {/* Repository Connections */}
      <CollapsibleSection
        title="Repository Connections"
        icon={GitBranch}
        color="#007AFF"
        expanded={expanded.repos}
        onToggle={() => toggle('repos')}
      >
        <div className="space-y-2">
          {platformConfig.repositories.map((repo) => (
            <div key={repo.id} className="flex items-center gap-4 p-3 rounded-lg border border-borderSoft hover:bg-mutedBg transition-colors">
              <GitBranch size={16} className="text-appleBlue flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-[13px] font-medium text-dBlue">{repo.name}</span>
                  <StatusBadge status={repo.status} />
                </div>
                <span className="text-[11px] text-placeholder">
                  {repo.provider} &bull; Branch: {repo.branch} &bull; Last sync: {repo.lastSync}
                </span>
              </div>
              <button className="text-[11px] text-appleBlue hover:underline flex items-center gap-0.5">
                <ExternalLink size={10} /> Open
              </button>
            </div>
          ))}
        </div>
      </CollapsibleSection>

      {/* Environment Registry */}
      <CollapsibleSection
        title="Environment Registry"
        icon={Globe}
        color="#22c55e"
        expanded={expanded.envs}
        onToggle={() => toggle('envs')}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {platformConfig.environments.map((env) => (
            <div key={env.id} className="p-3 rounded-lg border border-borderSoft">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className="text-[13px] font-semibold text-dBlue">{env.name}</span>
                  <StatusBadge status={env.status} />
                </div>
                <StatusBadge status={env.healthCheck} />
              </div>
              <span className="text-[12px] text-placeholder font-mono">{env.url}</span>
            </div>
          ))}
        </div>
      </CollapsibleSection>

      {/* Role Management */}
      <CollapsibleSection
        title="Role Management"
        icon={Users}
        color="#8b5cf6"
        expanded={expanded.roles}
        onToggle={() => toggle('roles')}
      >
        <div className="space-y-2">
          {platformConfig.roles.map((role) => (
            <div key={role.id} className="p-3 rounded-lg border border-borderSoft">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Shield size={14} className="text-[#8b5cf6]" />
                  <span className="text-[13px] font-semibold text-dBlue">{role.name}</span>
                </div>
                <span className="text-[12px] text-placeholder">{role.users} users</span>
              </div>
              <div className="flex flex-wrap gap-1">
                {role.permissions.map((p) => (
                  <TagBadge key={p} label={p} variant="neutral" />
                ))}
              </div>
            </div>
          ))}
        </div>
      </CollapsibleSection>

      {/* Notifications */}
      <CollapsibleSection
        title="Notifications"
        icon={Bell}
        color="#f59e0b"
        expanded={expanded.notifications}
        onToggle={() => toggle('notifications')}
      >
        <div className="space-y-2">
          {platformConfig.notifications.map((n) => (
            <div key={n.id} className="flex items-center gap-4 p-3 rounded-lg border border-borderSoft">
              <Bell size={14} className="text-warning flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <span className="text-[13px] font-medium text-dBlue">{n.event}</span>
                <div className="text-[11px] text-placeholder">
                  {n.channel} &bull; Recipients: {n.recipients}
                </div>
              </div>
              <StatusBadge status={n.status} />
            </div>
          ))}
        </div>
      </CollapsibleSection>

      {/* Audit Log */}
      <CollapsibleSection
        title="Audit Log"
        icon={ClipboardList}
        color="#06b6d4"
        expanded={expanded.audit}
        onToggle={() => toggle('audit')}
      >
        <div className="space-y-1">
          {platformConfig.auditLog.map((entry) => (
            <div key={entry.id} className="flex items-start gap-3 py-2.5 border-b border-borderSoft last:border-0">
              <div className="w-1.5 h-1.5 rounded-full bg-appleBlue mt-2 flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="text-[13px] text-dBlue">{entry.action}</p>
                <div className="flex items-center gap-3 text-[11px] text-placeholder mt-0.5">
                  <span>{entry.timestamp}</span>
                  <span>{entry.user}</span>
                  <TagBadge label={entry.module} variant="neutral" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </CollapsibleSection>
    </div>
  );
}

function CollapsibleSection({ title, icon: Icon, color, expanded, onToggle, children }) {
  return (
    <div className="card-base overflow-hidden">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between px-5 py-3 hover:bg-mutedBg transition-colors"
      >
        <div className="flex items-center gap-2">
          <Icon size={16} style={{ color }} />
          <span className="text-sm font-semibold text-dBlue">{title}</span>
        </div>
        {expanded ? <ChevronUp size={16} className="text-placeholder" /> : <ChevronDown size={16} className="text-placeholder" />}
      </button>
      {expanded && (
        <div className="px-5 pb-4 animate-slideDown">
          {children}
        </div>
      )}
    </div>
  );
}
