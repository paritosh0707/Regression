export const kpis = [
  { label: 'Candidate Tests', value: 248, delta: '+24 this week' },
  { label: 'Regression Ready', value: 176, delta: '71% qualified' },
  { label: 'Scheduled Suites', value: 37, delta: '12 active pipelines' },
  { label: 'Overall Health', value: '86%', delta: '+4% vs last sprint' }
];

export const modules = [
  {
    id: 'tm',
    title: 'Test Management',
    purpose: 'Triage and qualify agent-generated candidates before they enter regression.',
    items: [
      'Candidate inventory with confidence score',
      'Generated script preview + edits',
      'Mandatory tag completion and priority assignment',
      'Approval workflow with reviewer state'
    ]
  },
  {
    id: 'engine',
    title: 'Agentic Regression Engine',
    purpose: 'Validate, enrich, de-duplicate, and map approved tests into governed assets.',
    items: [
      'Metadata and structure validation',
      'Repo path and branch mapping',
      'Maintenance impact analysis and duplicate detection',
      'Integration summary with key changes'
    ]
  },
  {
    id: 'suite',
    title: 'Regression Suite Management',
    purpose: 'Organize tests into governed suites with execution semantics.',
    items: [
      'Suite composition and hierarchy',
      'Priority/risk/tier editing',
      'Mandatory tag gates',
      'Ownership and lifecycle controls'
    ]
  },
  {
    id: 'repo',
    title: 'Script & Data Repository',
    purpose: 'Trace script, data, config, and change history in one auditable place.',
    items: [
      'Script version + repository linkage',
      'Data and environment config dependencies',
      'Branch/commit references and diff summary',
      'History view for regression asset drift'
    ]
  },
  {
    id: 'exec',
    title: 'Execution & Scheduling',
    purpose: 'Run suites manually or automatically via scheduler and CI/CD triggers.',
    items: [
      'Run by suite/tag/branch/build',
      'Live run progress + queue monitoring',
      'Recurring schedules and blackout windows',
      'Pipeline triggers and release gates'
    ]
  },
  {
    id: 'analytics',
    title: 'Reporting & Analytics',
    purpose: 'Measure regression health, drift, failures, and operational efficiency.',
    items: [
      'Pass/fail + flaky trend analytics',
      'Coverage by module/tag/priority',
      'Failure reason and drift diagnostics',
      'Agentic acceptance + maintenance metrics'
    ]
  },
  {
    id: 'platform',
    title: 'Platform & Infrastructure',
    purpose: 'Secure, govern, and integrate repositories, environments, and access.',
    items: [
      'Repo and environment registry',
      'RBAC, branch rules, and audit logs',
      'Secrets and connector configuration',
      'Notifications and compliance controls'
    ]
  }
];

export const journey = [
  'Candidate discovery from agentic execution',
  'Qualification with metadata + script review',
  'Validation and repository-aware integration',
  'Traceability across script/data/config assets',
  'Suite governance and prioritization',
  'On-demand, scheduled, and CI/CD execution',
  'Health, coverage, and drift analytics',
  'Feedback loop for maintenance and evolution'
];

export const runs = [
  { suite: 'Release-Gate Core', environment: 'staging', trigger: 'CI pipeline', status: 'Running', progress: 64 },
  { suite: 'Nightly Full Regression', environment: 'qa', trigger: 'Scheduled', status: 'Queued', progress: 0 },
  { suite: 'Smoke - Payments', environment: 'uat', trigger: 'Manual', status: 'Passed', progress: 100 }
];
