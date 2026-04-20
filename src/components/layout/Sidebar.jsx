import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  ClipboardCheck,
  Brain,
  Layers,
  FileCode2,
  Play,
  BarChart3,
  Settings,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';

const navItems = [
  { path: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { path: '/test-management', label: 'Test Management', icon: ClipboardCheck },
  { path: '/agentic-engine', label: 'Agentic Engine', icon: Brain },
  { path: '/suite-management', label: 'Suite Management', icon: Layers },
  { path: '/script-data-repo', label: 'Script & Data Repo', icon: FileCode2 },
  { path: '/execution', label: 'Execution & Scheduling', icon: Play },
  { path: '/reporting', label: 'Reporting & Analytics', icon: BarChart3 },
  { path: '/platform', label: 'Platform & Infra', icon: Settings },
];

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside
      className="h-full flex flex-col border-r transition-all duration-200 ease-in-out flex-shrink-0"
      style={{
        width: collapsed ? 56 : 240,
        background: '#FAFAFA',
        borderColor: '#CDD6E0',
      }}
    >
      <div className="flex items-center justify-between px-3 py-3 border-b border-sidebarBorder">
        {!collapsed && (
          <span className="text-sm font-semibold text-tblue tracking-tight truncate">
            Regression
          </span>
        )}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="p-1 rounded hover:bg-appleGrayHover transition-colors"
        >
          {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
        </button>
      </div>

      <nav className="flex-1 py-2 overflow-y-auto">
        {navItems.map(({ path, label, icon: Icon }) => (
          <NavLink
            key={path}
            to={path}
            className={({ isActive }) =>
              `flex items-center gap-3 mx-2 my-0.5 px-2 py-2 rounded-lg text-[13px] font-medium transition-all duration-150 ${
                isActive
                  ? 'bg-[#E2E2E2] text-tblue font-semibold'
                  : 'text-[#4C4C4C] hover:bg-appleGrayHover'
              }`
            }
            title={label}
          >
            <Icon size={18} className="flex-shrink-0" />
            {!collapsed && <span className="truncate">{label}</span>}
          </NavLink>
        ))}
      </nav>

      <div className="px-3 py-3 border-t border-sidebarBorder">
        {!collapsed && (
          <span className="text-[11px] text-placeholder">v0.1.0</span>
        )}
      </div>
    </aside>
  );
}
