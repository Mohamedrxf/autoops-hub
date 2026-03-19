export const kpiData = [
  { label: 'Tasks Created', value: '1,284', trend: '+12%', trendUp: true, color: 'primary' as const },
  { label: 'Tasks Completed', value: '942', trend: '+8%', trendUp: true, color: 'success' as const },
  { label: 'Active Workflows', value: '18', trend: 'Stable', trendUp: true, color: 'primary' as const },
  { label: 'Escalations', value: '3', trend: '-24%', trendUp: false, color: 'warning' as const },
];

export const agents = [
  { id: 0, name: 'Decision Agent', icon: 'brain', log: 'Extracting intent from transcript...' },
  { id: 1, name: 'Task Agent', icon: 'file', log: 'Generating 5 atomic tasks...' },
  { id: 2, name: 'Assignment Agent', icon: 'user', log: 'Matching tasks to team skillsets...' },
  { id: 3, name: 'Monitoring Agent', icon: 'monitor', log: 'Setting up tracking hooks...' },
  { id: 4, name: 'Escalation Agent', icon: 'alert', log: 'Defining delay thresholds...' },
];

export interface Task {
  id: number;
  name: string;
  owner: string;
  priority: 'High' | 'Medium' | 'Low';
  deadline: string;
  status: 'Pending' | 'In Progress' | 'Completed' | 'Delayed';
  progress: number;
  department: string;
}

export const tasks: Task[] = [
  { id: 1, name: 'Update Q4 revenue projections', owner: 'Sarah Chen', priority: 'High', deadline: '2025-03-25', status: 'In Progress', progress: 65, department: 'Finance' },
  { id: 2, name: 'Send vendor contracts for review', owner: 'Marcus Johnson', priority: 'Medium', deadline: '2025-03-22', status: 'Pending', progress: 0, department: 'Legal' },
  { id: 3, name: 'Schedule stakeholder sync', owner: 'Emily Park', priority: 'Low', deadline: '2025-03-28', status: 'Completed', progress: 100, department: 'Operations' },
  { id: 4, name: 'Prepare board presentation', owner: 'David Kim', priority: 'High', deadline: '2025-03-20', status: 'In Progress', progress: 40, department: 'Executive' },
  { id: 5, name: 'Finalize hiring pipeline', owner: 'Alex Rivers', priority: 'Medium', deadline: '2025-03-26', status: 'Pending', progress: 0, department: 'HR' },
  { id: 6, name: 'Review compliance report', owner: 'Sarah Chen', priority: 'High', deadline: '2025-03-21', status: 'Pending', progress: 10, department: 'Legal' },
  { id: 7, name: 'Deploy infrastructure update', owner: 'Marcus Johnson', priority: 'High', deadline: '2025-03-19', status: 'Delayed', progress: 55, department: 'Engineering' },
  { id: 8, name: 'Customer feedback analysis', owner: 'Emily Park', priority: 'Medium', deadline: '2025-03-27', status: 'In Progress', progress: 30, department: 'Product' },
  { id: 9, name: 'Update security protocols', owner: 'David Kim', priority: 'High', deadline: '2025-03-23', status: 'In Progress', progress: 80, department: 'Engineering' },
  { id: 10, name: 'Prepare quarterly newsletter', owner: 'Alex Rivers', priority: 'Low', deadline: '2025-03-30', status: 'Pending', progress: 0, department: 'Marketing' },
];

export const activityFeed = [
  { time: '10:32 AM', agent: 'Decision Agent', action: 'Extracted 3 key decisions from quarterly review transcript', type: 'info' as const },
  { time: '10:33 AM', agent: 'Task Agent', action: 'Created 5 atomic tasks with priorities assigned', type: 'success' as const },
  { time: '10:34 AM', agent: 'Assignment Agent', action: 'Assigned tasks to team members based on skillsets and availability', type: 'info' as const },
  { time: '10:35 AM', agent: 'Monitoring Agent', action: 'Configured tracking hooks for 5 tasks with deadline alerts', type: 'info' as const },
  { time: '10:36 AM', agent: 'Escalation Agent', action: 'Set delay thresholds: 24h for High priority, 48h for Medium', type: 'warning' as const },
  { time: '10:45 AM', agent: 'Monitoring Agent', action: 'Detected potential delay on "Deploy infrastructure update"', type: 'warning' as const },
  { time: '10:46 AM', agent: 'Escalation Agent', action: 'Escalation triggered — notified team lead Alex Rivers', type: 'destructive' as const },
  { time: '11:02 AM', agent: 'Decision Agent', action: 'Processed standup meeting notes — 2 new decisions identified', type: 'info' as const },
  { time: '11:15 AM', agent: 'Task Agent', action: 'Auto-updated task priorities based on deadline proximity analysis', type: 'success' as const },
  { time: '11:22 AM', agent: 'Assignment Agent', action: 'Rebalanced workload — moved 2 tasks from Sarah to Marcus', type: 'info' as const },
  { time: '11:30 AM', agent: 'Monitoring Agent', action: 'All High priority tasks on track — next check in 2 hours', type: 'success' as const },
];

export const auditLogs = [
  { timestamp: '2025-03-19 10:32:14', agent: 'Decision Agent', action: 'Extracted decision: "Finalize Q4 projections by Friday"', reason: 'Keyword "finalize" with deadline indicator detected in transcript', severity: 'info' as const },
  { timestamp: '2025-03-19 10:32:18', agent: 'Decision Agent', action: 'Extracted decision: "Send vendor contracts for legal review"', reason: 'Action verb "send" with entity "vendor contracts" identified', severity: 'info' as const },
  { timestamp: '2025-03-19 10:33:02', agent: 'Task Agent', action: 'Created task: "Update Q4 revenue projections"', reason: 'Decision mapped to quantifiable task with measurable outcome', severity: 'success' as const },
  { timestamp: '2025-03-19 10:33:04', agent: 'Task Agent', action: 'Set priority: High for "Update Q4 revenue projections"', reason: 'Deadline proximity (3 days) triggers High priority classification', severity: 'warning' as const },
  { timestamp: '2025-03-19 10:34:11', agent: 'Assignment Agent', action: 'Assigned "Update Q4 revenue projections" to Sarah Chen', reason: 'Skill match: Finance (92%), availability score: 0.85, past performance: A+', severity: 'info' as const },
  { timestamp: '2025-03-19 10:35:00', agent: 'Monitoring Agent', action: 'Configured 24h check-in for High priority tasks', reason: 'SLA policy requires daily monitoring for High priority items', severity: 'info' as const },
  { timestamp: '2025-03-19 10:45:33', agent: 'Monitoring Agent', action: 'Flagged "Deploy infrastructure update" as at-risk', reason: 'Task deadline in 6 hours, status still "In Progress", no recent commits detected', severity: 'warning' as const },
  { timestamp: '2025-03-19 10:46:01', agent: 'Escalation Agent', action: 'Sent escalation notification to Alex Rivers', reason: 'Delay threshold (24h before deadline) breached for High priority task', severity: 'destructive' as const },
  { timestamp: '2025-03-19 11:02:15', agent: 'Decision Agent', action: 'Processed standup meeting — extracted 2 new action items', reason: 'NLP confidence score: 0.94 for action item extraction', severity: 'info' as const },
  { timestamp: '2025-03-19 11:15:30', agent: 'Task Agent', action: 'Auto-elevated priority for "Review compliance report"', reason: 'Regulatory deadline detected — 48h window triggers auto-escalation policy', severity: 'warning' as const },
];

export const weeklyTaskData = [
  { day: 'Mon', created: 45, completed: 38 },
  { day: 'Tue', created: 52, completed: 41 },
  { day: 'Wed', created: 38, completed: 35 },
  { day: 'Thu', created: 61, completed: 50 },
  { day: 'Fri', created: 55, completed: 48 },
  { day: 'Sat', created: 20, completed: 22 },
  { day: 'Sun', created: 12, completed: 15 },
];

export const agentPerformance = [
  { name: 'Decision', accuracy: 96, tasksHandled: 342, avgTime: '1.2s' },
  { name: 'Task', accuracy: 94, tasksHandled: 518, avgTime: '0.8s' },
  { name: 'Assignment', accuracy: 91, tasksHandled: 518, avgTime: '2.1s' },
  { name: 'Monitoring', accuracy: 99, tasksHandled: 1284, avgTime: '0.3s' },
  { name: 'Escalation', accuracy: 97, tasksHandled: 47, avgTime: '0.5s' },
];

export const workflowHistory = [
  { id: 'WF-2847', source: 'Quarterly Review Meeting', tasks: 5, status: 'Completed', time: '12.4s', date: '2025-03-19' },
  { id: 'WF-2846', source: 'Sprint Standup', tasks: 3, status: 'Completed', time: '8.1s', date: '2025-03-19' },
  { id: 'WF-2845', source: 'Client Call Notes', tasks: 7, status: 'Completed', time: '15.8s', date: '2025-03-18' },
  { id: 'WF-2844', source: 'Board Strategy Session', tasks: 9, status: 'Completed', time: '22.3s', date: '2025-03-18' },
  { id: 'WF-2843', source: 'Team Retrospective', tasks: 4, status: 'Completed', time: '9.6s', date: '2025-03-17' },
];
