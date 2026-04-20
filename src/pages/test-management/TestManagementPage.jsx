import { useState, useMemo } from 'react';
import {
  CheckCircle2, XCircle, AlertTriangle, Filter, Eye,
} from 'lucide-react';
import SearchBar from '../../components/shared/SearchBar';
import DataTable from '../../components/shared/DataTable';
import StatusBadge from '../../components/shared/StatusBadge';
import TagBadge from '../../components/shared/TagBadge';
import KpiCard from '../../components/shared/KpiCard';
import CandidateDetail from './CandidateDetail';
import { candidates as initialCandidates } from '../../data/mockData';

const reviewFilters = ['All', 'New', 'In Review', 'Approved', 'Rejected'];

export default function TestManagementPage() {
  const [candidates, setCandidates] = useState(initialCandidates);
  const [search, setSearch] = useState('');
  const [reviewFilter, setReviewFilter] = useState('All');
  const [selectedCandidate, setSelectedCandidate] = useState(null);

  const filtered = useMemo(() => {
    return candidates.filter((c) => {
      const matchesSearch = !search ||
        c.name.toLowerCase().includes(search.toLowerCase()) ||
        c.id.toLowerCase().includes(search.toLowerCase()) ||
        c.module.toLowerCase().includes(search.toLowerCase());
      const matchesFilter = reviewFilter === 'All' || c.reviewState === reviewFilter;
      return matchesSearch && matchesFilter;
    });
  }, [candidates, search, reviewFilter]);

  const stats = useMemo(() => ({
    total: candidates.length,
    approved: candidates.filter((c) => c.reviewState === 'Approved').length,
    pending: candidates.filter((c) => c.reviewState === 'New' || c.reviewState === 'In Review').length,
    missingTags: candidates.filter((c) => c.missingTags.length > 0).length,
  }), [candidates]);

  const handleApprove = (id) => {
    setCandidates((prev) => prev.map((c) => c.id === id ? { ...c, reviewState: 'Approved' } : c));
    setSelectedCandidate(null);
  };

  const handleReject = (id) => {
    setCandidates((prev) => prev.map((c) => c.id === id ? { ...c, reviewState: 'Rejected' } : c));
    setSelectedCandidate(null);
  };

  const columns = [
    { key: 'id', label: 'ID', render: (v) => <span className="font-mono text-xs text-placeholder">{v}</span> },
    { key: 'name', label: 'Test Name', render: (v) => <span className="font-medium text-dBlue">{v}</span> },
    { key: 'source', label: 'Source', render: (v) => <TagBadge label={v} variant="neutral" /> },
    { key: 'status', label: 'Status', render: (v) => <StatusBadge status={v} /> },
    {
      key: 'confidence', label: 'Confidence',
      render: (v) => (
        <div className="flex items-center gap-2">
          <div className="w-12 h-1.5 bg-[#f1f4f7] rounded-full overflow-hidden">
            <div className="h-full rounded-full" style={{ width: `${v}%`, background: v >= 85 ? '#22c55e' : v >= 70 ? '#f59e0b' : '#ef4444' }} />
          </div>
          <span className="text-xs font-medium">{v}%</span>
        </div>
      ),
    },
    { key: 'priority', label: 'Priority', render: (v) => <span className={`text-xs font-bold ${v === 'P1' ? 'text-danger' : v === 'P2' ? 'text-warning' : 'text-placeholder'}`}>{v}</span> },
    { key: 'reviewState', label: 'Review', render: (v) => <StatusBadge status={v} /> },
    {
      key: 'tags', label: 'Tags', sortable: false,
      render: (tags, row) => (
        <div className="flex items-center gap-1 flex-wrap">
          {tags.slice(0, 2).map((t) => <TagBadge key={t} label={t} />)}
          {tags.length > 2 && <span className="text-[10px] text-placeholder">+{tags.length - 2}</span>}
          {row.missingTags.length > 0 && <AlertTriangle size={12} className="text-warning" />}
        </div>
      ),
    },
    {
      key: 'actions', label: '', sortable: false,
      render: (_, row) => (
        <button
          onClick={(e) => { e.stopPropagation(); setSelectedCandidate(row); }}
          className="p-1 rounded hover:bg-appleGrayHover transition-colors"
          title="View details"
        >
          <Eye size={14} className="text-appleBlue" />
        </button>
      ),
    },
  ];

  return (
    <div className="space-y-5 animate-fadeIn">
      <div>
        <h1 className="text-lg font-bold text-dBlue tracking-tight">Test Management</h1>
        <p className="text-xs text-placeholder mt-0.5">Triage and qualify candidate tests from agentic execution</p>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <KpiCard title="Total Candidates" value={stats.total} icon={Filter} color="#007AFF" />
        <KpiCard title="Approved" value={stats.approved} icon={CheckCircle2} color="#22c55e" />
        <KpiCard title="Pending Review" value={stats.pending} icon={Eye} color="#f59e0b" />
        <KpiCard title="Missing Tags" value={stats.missingTags} icon={AlertTriangle} color="#ef4444" />
      </div>

      {/* Filters */}
      <div className="flex items-center gap-3 flex-wrap">
        <SearchBar value={search} onChange={setSearch} placeholder="Search tests by name, ID, or module..." />
        <div className="flex items-center gap-1">
          {reviewFilters.map((f) => (
            <button
              key={f}
              onClick={() => setReviewFilter(f)}
              className={`px-3 py-1.5 text-xs rounded-button font-medium transition-colors ${
                reviewFilter === f
                  ? 'bg-tblue text-white'
                  : 'text-[#4C4C4C] hover:bg-appleGrayHover'
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <DataTable
        columns={columns}
        data={filtered}
        onRowClick={(row) => setSelectedCandidate(row)}
        emptyMessage="No candidates match your filters"
      />

      {/* Detail Panel */}
      {selectedCandidate && (
        <CandidateDetail
          candidate={selectedCandidate}
          onClose={() => setSelectedCandidate(null)}
          onApprove={handleApprove}
          onReject={handleReject}
        />
      )}
    </div>
  );
}
