// ─── Test Management: Candidate Tests ────────────────────────────────────────
export const candidates = [
  {
    id: 'TC-001', name: 'Login with valid credentials', source: 'Generated', status: 'Passed',
    confidence: 92, priority: 'P1', reviewState: 'Approved',
    tags: ['auth', 'smoke', 'login'], missingTags: [],
    module: 'Authentication', businessArea: 'User Access',
    steps: [
      { step: 1, action: 'Navigate to /login', expected: 'Login page loads', actual: 'Login page loaded' },
      { step: 2, action: 'Enter valid email', expected: 'Email accepted', actual: 'Email accepted' },
      { step: 3, action: 'Enter valid password', expected: 'Password accepted', actual: 'Password accepted' },
      { step: 4, action: 'Click Sign In', expected: 'Redirect to dashboard', actual: 'Redirected to dashboard' },
    ],
    script: `describe('Login', () => {\n  it('should login with valid credentials', () => {\n    cy.visit('/login');\n    cy.get('#email').type('user@test.com');\n    cy.get('#password').type('Pass123!');\n    cy.get('button[type=submit]').click();\n    cy.url().should('include', '/dashboard');\n  });\n});`,
    scriptLang: 'Cypress', repoAligned: true, postEdited: false,
  },
  {
    id: 'TC-002', name: 'Registration with duplicate email', source: 'Generated', status: 'Failed',
    confidence: 78, priority: 'P2', reviewState: 'In Review',
    tags: ['auth', 'registration'], missingTags: ['risk_category', 'env_compat'],
    module: 'Authentication', businessArea: 'User Access',
    steps: [
      { step: 1, action: 'Navigate to /register', expected: 'Registration form loads', actual: 'Form loaded' },
      { step: 2, action: 'Enter existing email', expected: 'Error shown', actual: 'No error shown' },
    ],
    script: `describe('Registration', () => {\n  it('should reject duplicate email', () => {\n    cy.visit('/register');\n    cy.get('#email').type('existing@test.com');\n    cy.get('#name').type('Test User');\n    cy.get('button[type=submit]').click();\n    cy.get('.error-msg').should('contain', 'already exists');\n  });\n});`,
    scriptLang: 'Cypress', repoAligned: false, postEdited: false,
  },
  {
    id: 'TC-003', name: 'Add item to cart', source: 'Generated', status: 'Passed',
    confidence: 95, priority: 'P1', reviewState: 'Approved',
    tags: ['cart', 'smoke', 'e2e'], missingTags: [],
    module: 'Shopping Cart', businessArea: 'E-Commerce',
    steps: [
      { step: 1, action: 'Navigate to product page', expected: 'Product displayed', actual: 'Product displayed' },
      { step: 2, action: 'Click Add to Cart', expected: 'Item in cart, count = 1', actual: 'Cart count = 1' },
    ],
    script: `test('Add to cart', async ({ page }) => {\n  await page.goto('/products/1');\n  await page.click('[data-testid=add-to-cart]');\n  await expect(page.locator('.cart-count')).toHaveText('1');\n});`,
    scriptLang: 'Playwright', repoAligned: true, postEdited: true,
  },
  {
    id: 'TC-004', name: 'Checkout with expired card', source: 'Edited', status: 'Passed',
    confidence: 88, priority: 'P2', reviewState: 'New',
    tags: ['payments'], missingTags: ['execution_tier', 'data_dependency'],
    module: 'Payments', businessArea: 'E-Commerce',
    steps: [
      { step: 1, action: 'Go to checkout', expected: 'Checkout page', actual: 'Checkout loaded' },
      { step: 2, action: 'Enter expired card', expected: 'Error: card expired', actual: 'Error shown correctly' },
    ],
    script: `describe('Checkout', () => {\n  it('rejects expired card', () => {\n    cy.visit('/checkout');\n    cy.get('#card-number').type('4111111111111111');\n    cy.get('#expiry').type('01/20');\n    cy.get('#cvv').type('123');\n    cy.get('.pay-btn').click();\n    cy.get('.error').should('contain', 'expired');\n  });\n});`,
    scriptLang: 'Cypress', repoAligned: true, postEdited: true,
  },
  {
    id: 'TC-005', name: 'Search returns relevant results', source: 'Generated', status: 'Passed',
    confidence: 91, priority: 'P2', reviewState: 'Approved',
    tags: ['search', 'functional'], missingTags: [],
    module: 'Search', businessArea: 'Discovery',
    steps: [
      { step: 1, action: 'Enter search term "laptop"', expected: 'Results contain laptop', actual: 'Results relevant' },
    ],
    script: `test('search results', async ({ page }) => {\n  await page.goto('/search?q=laptop');\n  const results = page.locator('.result-item');\n  await expect(results).toHaveCount.greaterThan(0);\n});`,
    scriptLang: 'Playwright', repoAligned: true, postEdited: false,
  },
  {
    id: 'TC-006', name: 'Profile update saves correctly', source: 'Generated', status: 'Failed',
    confidence: 65, priority: 'P3', reviewState: 'Rejected',
    tags: ['profile'], missingTags: ['risk_category'],
    module: 'User Profile', businessArea: 'User Access',
    steps: [
      { step: 1, action: 'Go to profile settings', expected: 'Profile page loads', actual: 'Page loaded' },
      { step: 2, action: 'Change display name', expected: 'Name saved', actual: 'Timeout error' },
    ],
    script: `describe('Profile', () => {\n  it('should save name change', () => {\n    cy.visit('/profile');\n    cy.get('#name').clear().type('New Name');\n    cy.get('.save-btn').click();\n    cy.get('.toast').should('contain', 'saved');\n  });\n});`,
    scriptLang: 'Cypress', repoAligned: false, postEdited: false,
  },
  {
    id: 'TC-007', name: 'Password reset email sent', source: 'Generated', status: 'Passed',
    confidence: 89, priority: 'P1', reviewState: 'In Review',
    tags: ['auth', 'email'], missingTags: ['env_compat'],
    module: 'Authentication', businessArea: 'User Access',
    steps: [
      { step: 1, action: 'Click forgot password', expected: 'Reset form shown', actual: 'Form shown' },
      { step: 2, action: 'Enter email and submit', expected: 'Confirmation message', actual: 'Email sent confirmation' },
    ],
    script: `describe('Password Reset', () => {\n  it('sends reset email', () => {\n    cy.visit('/forgot-password');\n    cy.get('#email').type('user@test.com');\n    cy.get('.submit-btn').click();\n    cy.get('.success-msg').should('be.visible');\n  });\n});`,
    scriptLang: 'Cypress', repoAligned: true, postEdited: false,
  },
  {
    id: 'TC-008', name: 'Admin can delete user', source: 'Reused', status: 'Passed',
    confidence: 94, priority: 'P2', reviewState: 'Approved',
    tags: ['admin', 'user-mgmt', 'rbac'], missingTags: [],
    module: 'Admin', businessArea: 'Administration',
    steps: [
      { step: 1, action: 'Login as admin', expected: 'Admin dashboard', actual: 'Dashboard loaded' },
      { step: 2, action: 'Delete target user', expected: 'User removed', actual: 'User deleted' },
    ],
    script: `test('admin delete user', async ({ page }) => {\n  await page.goto('/admin/users');\n  await page.click('[data-user="target"] .delete-btn');\n  await page.click('.confirm-delete');\n  await expect(page.locator('[data-user="target"]')).toHaveCount(0);\n});`,
    scriptLang: 'Playwright', repoAligned: true, postEdited: false,
  },
  {
    id: 'TC-009', name: 'Order history pagination', source: 'Generated', status: 'Passed',
    confidence: 82, priority: 'P3', reviewState: 'New',
    tags: ['orders', 'pagination'], missingTags: ['execution_tier'],
    module: 'Orders', businessArea: 'E-Commerce',
    steps: [
      { step: 1, action: 'Navigate to orders', expected: 'Order list with 10 items', actual: '10 items shown' },
      { step: 2, action: 'Click page 2', expected: 'Next 10 items', actual: 'Page 2 loaded' },
    ],
    script: `describe('Order History', () => {\n  it('paginates orders', () => {\n    cy.visit('/orders');\n    cy.get('.order-row').should('have.length', 10);\n    cy.get('.pagination .page-2').click();\n    cy.get('.order-row').should('have.length', 10);\n  });\n});`,
    scriptLang: 'Cypress', repoAligned: false, postEdited: false,
  },
  {
    id: 'TC-010', name: 'Inventory low-stock alert', source: 'Generated', status: 'Passed',
    confidence: 87, priority: 'P2', reviewState: 'Approved',
    tags: ['inventory', 'alerts', 'notification'], missingTags: [],
    module: 'Inventory', businessArea: 'Operations',
    steps: [
      { step: 1, action: 'Set stock to 2', expected: 'Low-stock badge appears', actual: 'Badge shown' },
    ],
    script: `test('low stock alert', async ({ page }) => {\n  await page.goto('/admin/inventory/SKU-001');\n  await page.fill('#stock', '2');\n  await page.click('.save');\n  await expect(page.locator('.low-stock-badge')).toBeVisible();\n});`,
    scriptLang: 'Playwright', repoAligned: true, postEdited: false,
  },
];

// ─── Regression Suites ──────────────────────────────────────────────────────
export const suites = [
  {
    id: 'RS-001', name: 'Core Smoke Suite', purpose: 'Critical path validation for every deploy',
    domain: 'Cross-functional', executionTier: 'Smoke', owner: 'Jane Chen',
    lifecycle: 'Active', testCount: 24, passRate: 96, flakyCount: 1,
    tagCompleteness: 92, priorityDistribution: { P1: 12, P2: 8, P3: 4 },
    environments: ['QA', 'Staging'], linkedSchedule: 'Nightly Smoke',
    linkedPipeline: 'deploy-prod', lastModified: '2026-04-18',
    tests: ['TC-001', 'TC-003', 'TC-005', 'TC-008', 'TC-010'],
  },
  {
    id: 'RS-002', name: 'Authentication Suite', purpose: 'All auth flows including SSO and MFA',
    domain: 'Authentication', executionTier: 'Full', owner: 'Raj Patel',
    lifecycle: 'Active', testCount: 18, passRate: 89, flakyCount: 3,
    tagCompleteness: 78, priorityDistribution: { P1: 8, P2: 6, P3: 4 },
    environments: ['QA', 'Staging', 'Pre-Prod'], linkedSchedule: 'Weekly Full',
    linkedPipeline: 'auth-service-deploy', lastModified: '2026-04-17',
    tests: ['TC-001', 'TC-002', 'TC-006', 'TC-007'],
  },
  {
    id: 'RS-003', name: 'E-Commerce Checkout', purpose: 'End-to-end purchase flow validation',
    domain: 'E-Commerce', executionTier: 'Release', owner: 'Maria Santos',
    lifecycle: 'Active', testCount: 32, passRate: 91, flakyCount: 2,
    tagCompleteness: 85, priorityDistribution: { P1: 14, P2: 12, P3: 6 },
    environments: ['QA', 'Staging'], linkedSchedule: 'Pre-release',
    linkedPipeline: 'ecom-deploy', lastModified: '2026-04-19',
    tests: ['TC-003', 'TC-004', 'TC-009'],
  },
  {
    id: 'RS-004', name: 'Admin & RBAC Suite', purpose: 'Role-based access and admin functions',
    domain: 'Administration', executionTier: 'Nightly', owner: 'Li Wei',
    lifecycle: 'Under Review', testCount: 15, passRate: 100, flakyCount: 0,
    tagCompleteness: 100, priorityDistribution: { P1: 5, P2: 7, P3: 3 },
    environments: ['QA'], linkedSchedule: 'Nightly Full',
    linkedPipeline: null, lastModified: '2026-04-15',
    tests: ['TC-008'],
  },
  {
    id: 'RS-005', name: 'Legacy Payments (Deprecated)', purpose: 'Old payment gateway tests',
    domain: 'Payments', executionTier: 'Full', owner: 'Raj Patel',
    lifecycle: 'Deprecated', testCount: 8, passRate: 62, flakyCount: 4,
    tagCompleteness: 45, priorityDistribution: { P1: 2, P2: 3, P3: 3 },
    environments: ['QA'], linkedSchedule: null,
    linkedPipeline: null, lastModified: '2026-03-10',
    tests: ['TC-004'],
  },
];

// ─── Script & Data Repository ───────────────────────────────────────────────
export const scripts = [
  {
    id: 'SCR-001', testId: 'TC-001', name: 'login.spec.cy.js', lang: 'Cypress',
    repoPath: 'tests/e2e/auth/login.spec.cy.js', branch: 'main',
    version: 'v3.2', lastUpdated: '2026-04-18', source: 'Generated',
    changeHistory: [
      { date: '2026-04-18', author: 'Agent', type: 'Updated', detail: 'Added MFA step handling' },
      { date: '2026-04-10', author: 'Agent', type: 'Created', detail: 'Initial generation from flow recording' },
    ],
  },
  {
    id: 'SCR-002', testId: 'TC-003', name: 'cart.spec.ts', lang: 'Playwright',
    repoPath: 'tests/e2e/cart/cart.spec.ts', branch: 'main',
    version: 'v2.1', lastUpdated: '2026-04-17', source: 'Edited',
    changeHistory: [
      { date: '2026-04-17', author: 'Jane Chen', type: 'Edited', detail: 'Fixed selector for new cart UI' },
      { date: '2026-04-05', author: 'Agent', type: 'Created', detail: 'Generated from user-flow capture' },
    ],
  },
  {
    id: 'SCR-003', testId: 'TC-004', name: 'checkout-expired.spec.cy.js', lang: 'Cypress',
    repoPath: 'tests/e2e/payments/checkout-expired.spec.cy.js', branch: 'develop',
    version: 'v1.0', lastUpdated: '2026-04-12', source: 'Generated',
    changeHistory: [
      { date: '2026-04-12', author: 'Agent', type: 'Created', detail: 'Generated from edge-case scenario' },
    ],
  },
];

export const dataAssets = [
  {
    id: 'DA-001', name: 'auth_credentials.json', type: 'Test Data',
    environment: 'QA', scope: 'Shared', linkedTests: ['TC-001', 'TC-002', 'TC-007'],
    variables: [
      { key: 'valid_email', value: 'user@test.com', env: 'QA' },
      { key: 'valid_password', value: '***', env: 'QA' },
      { key: 'valid_email', value: 'user@staging.com', env: 'Staging' },
    ],
  },
  {
    id: 'DA-002', name: 'cart_products.json', type: 'Test Data',
    environment: 'All', scope: 'Local', linkedTests: ['TC-003'],
    variables: [
      { key: 'product_id', value: 'PROD-001', env: 'All' },
      { key: 'quantity', value: '1', env: 'All' },
    ],
  },
  {
    id: 'DA-003', name: 'payment_cards.csv', type: 'Test Data',
    environment: 'QA', scope: 'Shared', linkedTests: ['TC-004'],
    variables: [
      { key: 'expired_card', value: '4111...1111', env: 'QA' },
      { key: 'expiry_date', value: '01/20', env: 'QA' },
    ],
  },
  {
    id: 'DA-004', name: 'env.staging.json', type: 'Config',
    environment: 'Staging', scope: 'Shared', linkedTests: ['TC-001', 'TC-003'],
    variables: [
      { key: 'base_url', value: 'https://staging.app.com', env: 'Staging' },
      { key: 'api_url', value: 'https://api.staging.app.com', env: 'Staging' },
      { key: 'timeout', value: '30000', env: 'Staging' },
    ],
  },
];

// ─── Execution & Scheduling ─────────────────────────────────────────────────
export const liveRuns = [
  {
    id: 'RUN-101', suite: 'Core Smoke Suite', environment: 'QA', startedAt: '2026-04-20 09:00',
    status: 'Running', progress: 67, total: 24, passed: 14, failed: 1, running: 2, pending: 7,
    triggeredBy: 'Schedule', branch: 'main',
    testResults: [
      { testId: 'TC-001', name: 'Login with valid credentials', status: 'Passed', duration: '2.3s' },
      { testId: 'TC-003', name: 'Add item to cart', status: 'Passed', duration: '3.1s' },
      { testId: 'TC-005', name: 'Search returns relevant results', status: 'Failed', duration: '5.8s', error: 'Timeout waiting for results' },
      { testId: 'TC-008', name: 'Admin can delete user', status: 'Running', duration: '—' },
      { testId: 'TC-010', name: 'Inventory low-stock alert', status: 'Running', duration: '—' },
    ],
  },
  {
    id: 'RUN-100', suite: 'Authentication Suite', environment: 'Staging', startedAt: '2026-04-20 08:30',
    status: 'Completed', progress: 100, total: 18, passed: 16, failed: 2, running: 0, pending: 0,
    triggeredBy: 'Manual', branch: 'develop',
    testResults: [],
  },
  {
    id: 'RUN-099', suite: 'E-Commerce Checkout', environment: 'QA', startedAt: '2026-04-19 22:00',
    status: 'Completed', progress: 100, total: 32, passed: 29, failed: 3, running: 0, pending: 0,
    triggeredBy: 'CI/CD', branch: 'release/2.5',
    testResults: [],
  },
];

export const schedules = [
  {
    id: 'SCH-001', name: 'Nightly Smoke', suite: 'Core Smoke Suite', frequency: 'Daily at 22:00 UTC',
    environment: 'QA', lastRun: '2026-04-19 22:00', lastResult: 'Passed', nextRun: '2026-04-20 22:00',
    owner: 'Jane Chen', status: 'Active', pipeline: null,
  },
  {
    id: 'SCH-002', name: 'Weekly Full Regression', suite: 'Authentication Suite', frequency: 'Every Sunday 02:00 UTC',
    environment: 'Staging', lastRun: '2026-04-13 02:00', lastResult: 'Failed', nextRun: '2026-04-20 02:00',
    owner: 'Raj Patel', status: 'Active', pipeline: 'auth-service-deploy',
  },
  {
    id: 'SCH-003', name: 'Pre-release Checkout', suite: 'E-Commerce Checkout', frequency: 'On release branch push',
    environment: 'Staging', lastRun: '2026-04-19 14:00', lastResult: 'Passed', nextRun: 'On trigger',
    owner: 'Maria Santos', status: 'Active', pipeline: 'ecom-deploy',
  },
  {
    id: 'SCH-004', name: 'Nightly Full', suite: 'Admin & RBAC Suite', frequency: 'Daily at 01:00 UTC',
    environment: 'QA', lastRun: '2026-04-19 01:00', lastResult: 'Passed', nextRun: '2026-04-20 01:00',
    owner: 'Li Wei', status: 'Paused', pipeline: null,
  },
];

export const cicdPipelines = [
  { id: 'PL-001', name: 'deploy-prod', provider: 'GitHub Actions', trigger: 'On merge to main', suite: 'Core Smoke Suite', status: 'Connected', lastRun: '2026-04-19', result: 'Passed' },
  { id: 'PL-002', name: 'auth-service-deploy', provider: 'Azure DevOps', trigger: 'On PR to main', suite: 'Authentication Suite', status: 'Connected', lastRun: '2026-04-18', result: 'Failed' },
  { id: 'PL-003', name: 'ecom-deploy', provider: 'GitHub Actions', trigger: 'On release tag', suite: 'E-Commerce Checkout', status: 'Connected', lastRun: '2026-04-19', result: 'Passed' },
];

// ─── Agentic Engine ─────────────────────────────────────────────────────────
export const integrationSummary = {
  totalSelected: 14,
  newlyAdded: 11,
  revisedMappings: 2,
  duplicatesSkipped: 1,
  prioritiesUpdated: 4,
  tagsAutoCompleted: 9,
  dataConfigLinked: 3,
  targetRepo: 'org/regression-tests',
  targetBranch: 'main',
  targetPath: 'tests/e2e/',
  commitRef: 'a3f2c9d',
  suitesImpacted: ['Core Smoke Suite', 'Authentication Suite'],
  fileChanges: [
    { file: 'tests/e2e/auth/login.spec.cy.js', action: 'Updated' },
    { file: 'tests/e2e/auth/register.spec.cy.js', action: 'Created' },
    { file: 'tests/e2e/cart/cart.spec.ts', action: 'Unchanged' },
    { file: 'tests/e2e/payments/checkout-expired.spec.cy.js', action: 'Created' },
    { file: 'fixtures/auth_credentials.json', action: 'Updated' },
    { file: 'config/env.staging.json', action: 'Updated' },
  ],
};

export const maintenanceEngine = {
  affectedExisting: 3,
  obsoleteTests: 1,
  duplicateCandidates: 1,
  similarScenarios: 2,
  suiteCompositionImpact: '+11 tests across 2 suites',
  flakinessIndicators: ['TC-002 has unstable selector', 'TC-006 timeout in CI'],
  coverageTagChanges: ['auth coverage: 78% → 89%', 'payments coverage: 45% → 62%'],
  repoFilesTouched: 6,
};

// ─── Reporting & Analytics ──────────────────────────────────────────────────
export const passFailTrend = [
  { date: 'Apr 1', passed: 145, failed: 12, flaky: 4, total: 161 },
  { date: 'Apr 3', passed: 148, failed: 10, flaky: 5, total: 163 },
  { date: 'Apr 5', passed: 150, failed: 8, flaky: 3, total: 161 },
  { date: 'Apr 7', passed: 152, failed: 11, flaky: 6, total: 169 },
  { date: 'Apr 9', passed: 155, failed: 7, flaky: 4, total: 166 },
  { date: 'Apr 11', passed: 158, failed: 9, flaky: 3, total: 170 },
  { date: 'Apr 13', passed: 160, failed: 6, flaky: 5, total: 171 },
  { date: 'Apr 15', passed: 162, failed: 8, flaky: 2, total: 172 },
  { date: 'Apr 17', passed: 165, failed: 5, flaky: 4, total: 174 },
  { date: 'Apr 19', passed: 168, failed: 4, flaky: 3, total: 175 },
];

export const failureBreakdown = [
  { name: 'Timeout', value: 35, color: '#ef4444' },
  { name: 'Assertion', value: 28, color: '#f59e0b' },
  { name: 'Element Not Found', value: 18, color: '#3b82f6' },
  { name: 'Network Error', value: 12, color: '#8b5cf6' },
  { name: 'Data Mismatch', value: 7, color: '#06b6d4' },
];

export const suiteHealthMap = [
  { suite: 'Core Smoke', health: 96, tests: 24, trend: 2 },
  { suite: 'Auth Suite', health: 89, tests: 18, trend: -3 },
  { suite: 'E-Commerce', health: 91, tests: 32, trend: 1 },
  { suite: 'Admin RBAC', health: 100, tests: 15, trend: 0 },
  { suite: 'Legacy Payments', health: 62, tests: 8, trend: -5 },
];

export const tagCoverage = [
  { tag: 'auth', covered: 89, total: 100 },
  { tag: 'smoke', covered: 95, total: 100 },
  { tag: 'e2e', covered: 72, total: 100 },
  { tag: 'payments', covered: 62, total: 100 },
  { tag: 'admin', covered: 100, total: 100 },
  { tag: 'search', covered: 55, total: 100 },
  { tag: 'orders', covered: 40, total: 100 },
];

export const executionDurationTrend = [
  { date: 'Apr 1', minutes: 42 },
  { date: 'Apr 5', minutes: 38 },
  { date: 'Apr 9', minutes: 45 },
  { date: 'Apr 13', minutes: 35 },
  { date: 'Apr 17', minutes: 40 },
  { date: 'Apr 19', minutes: 37 },
];

export const agentAnalytics = {
  generated: 48, accepted: 38, rejected: 10,
  confidenceDistribution: [
    { range: '90-100', count: 15 },
    { range: '80-89', count: 14 },
    { range: '70-79', count: 11 },
    { range: '60-69', count: 5 },
    { range: '<60', count: 3 },
  ],
  autoTagAcceptance: 82,
  maintenanceInterventions: 12,
  duplicatesRemoved: 6,
};

// ─── Platform & Infrastructure ──────────────────────────────────────────────
export const platformConfig = {
  repositories: [
    { id: 'REPO-001', name: 'org/regression-tests', provider: 'GitHub', branch: 'main', status: 'Connected', lastSync: '2026-04-20 08:00' },
    { id: 'REPO-002', name: 'org/api-tests', provider: 'GitHub', branch: 'develop', status: 'Connected', lastSync: '2026-04-19 22:00' },
    { id: 'REPO-003', name: 'org/legacy-tests', provider: 'Bitbucket', branch: 'master', status: 'Disconnected', lastSync: '2026-03-15' },
  ],
  environments: [
    { id: 'ENV-001', name: 'QA', url: 'https://qa.app.com', status: 'Active', healthCheck: 'Healthy' },
    { id: 'ENV-002', name: 'Staging', url: 'https://staging.app.com', status: 'Active', healthCheck: 'Healthy' },
    { id: 'ENV-003', name: 'Pre-Prod', url: 'https://preprod.app.com', status: 'Active', healthCheck: 'Warning' },
    { id: 'ENV-004', name: 'Demo', url: 'https://demo.app.com', status: 'Inactive', healthCheck: 'Unknown' },
  ],
  roles: [
    { id: 'ROLE-001', name: 'QA Lead', users: 3, permissions: ['manage_suites', 'approve_tests', 'run_execution', 'view_reports'] },
    { id: 'ROLE-002', name: 'QA Engineer', users: 8, permissions: ['review_tests', 'edit_tags', 'run_execution', 'view_reports'] },
    { id: 'ROLE-003', name: 'Viewer', users: 12, permissions: ['view_reports'] },
    { id: 'ROLE-004', name: 'Admin', users: 2, permissions: ['all'] },
  ],
  auditLog: [
    { id: 'AUD-001', timestamp: '2026-04-20 09:15', user: 'Jane Chen', action: 'Approved TC-001 for regression', module: 'Test Management' },
    { id: 'AUD-002', timestamp: '2026-04-20 09:10', user: 'System', action: 'Nightly Smoke schedule triggered', module: 'Execution' },
    { id: 'AUD-003', timestamp: '2026-04-19 18:00', user: 'Raj Patel', action: 'Updated Auth Suite priorities', module: 'Suite Management' },
    { id: 'AUD-004', timestamp: '2026-04-19 15:30', user: 'Maria Santos', action: 'Connected ecom-deploy pipeline', module: 'Platform' },
    { id: 'AUD-005', timestamp: '2026-04-19 14:00', user: 'System', action: 'Pre-release Checkout triggered by CI/CD', module: 'Execution' },
    { id: 'AUD-006', timestamp: '2026-04-18 22:00', user: 'System', action: 'Nightly Smoke completed — 23/24 passed', module: 'Execution' },
  ],
  notifications: [
    { id: 'NOT-001', channel: 'Email', event: 'Suite run failed', recipients: 'QA Leads', status: 'Active' },
    { id: 'NOT-002', channel: 'Slack', event: 'New candidates available', recipients: '#qa-regression', status: 'Active' },
    { id: 'NOT-003', channel: 'Webhook', event: 'CI/CD gate result', recipients: 'Pipeline callback', status: 'Active' },
  ],
};

// ─── Dashboard summary KPIs ─────────────────────────────────────────────────
export const dashboardKpis = {
  totalCandidates: 48,
  pendingReview: 12,
  activeSuites: 4,
  overallPassRate: 93.2,
  scheduledRuns: 3,
  flakyTests: 8,
  totalRegressionTests: 97,
  coverageScore: 81,
};

export const recentActivity = [
  { id: 1, message: 'Core Smoke Suite run completed — 23/24 passed', time: '2 hours ago', type: 'success' },
  { id: 2, message: '5 new candidate tests from agentic execution', time: '3 hours ago', type: 'info' },
  { id: 3, message: 'Auth Suite flaky test TC-002 flagged', time: '5 hours ago', type: 'warning' },
  { id: 4, message: 'Pre-release checkout triggered by CI/CD', time: '6 hours ago', type: 'info' },
  { id: 5, message: 'Raj Patel updated Auth Suite priorities', time: '1 day ago', type: 'neutral' },
  { id: 6, message: 'Legacy Payments suite deprecated', time: '1 day ago', type: 'warning' },
];
