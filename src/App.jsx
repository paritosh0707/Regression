import { Routes, Route, Navigate } from 'react-router-dom';
import AppShell from './components/layout/AppShell';
import DashboardPage from './pages/dashboard/DashboardPage';
import TestManagementPage from './pages/test-management/TestManagementPage';
import AgenticEnginePage from './pages/agentic-engine/AgenticEnginePage';
import SuiteManagementPage from './pages/suite-management/SuiteManagementPage';
import ScriptDataRepoPage from './pages/script-data-repo/ScriptDataRepoPage';
import ExecutionPage from './pages/execution/ExecutionPage';
import ReportingPage from './pages/reporting/ReportingPage';
import PlatformPage from './pages/platform/PlatformPage';

export default function App() {
  return (
    <Routes>
      <Route element={<AppShell />}>
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/test-management" element={<TestManagementPage />} />
        <Route path="/agentic-engine" element={<AgenticEnginePage />} />
        <Route path="/suite-management" element={<SuiteManagementPage />} />
        <Route path="/script-data-repo" element={<ScriptDataRepoPage />} />
        <Route path="/execution" element={<ExecutionPage />} />
        <Route path="/reporting" element={<ReportingPage />} />
        <Route path="/platform" element={<PlatformPage />} />
      </Route>
    </Routes>
  );
}
