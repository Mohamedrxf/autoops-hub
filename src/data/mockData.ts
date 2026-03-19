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
}

export const tasks: Task[] = [
  { id: 1, name: 'Update Q4 revenue projections', owner: 'Sarah Chen', priority: 'High', deadline: '2025-03-25', status: 'In Progress' },
  { id: 2, name: 'Send vendor contracts for review', owner: 'Marcus Johnson', priority: 'Medium', deadline: '2025-03-22', status: 'Pending' },
  { id: 3, name: 'Schedule stakeholder sync', owner: 'Emily Park', priority: 'Low', deadline: '2025-03-28', status: 'Completed' },
  { id: 4, name: 'Prepare board presentation', owner: 'David Kim', priority: 'High', deadline: '2025-03-20', status: 'In Progress' },
  { id: 5, name: 'Finalize hiring pipeline', owner: 'Alex Rivers', priority: 'Medium', deadline: '2025-03-26', status: 'Pending' },
  { id: 6, name: 'Review compliance report', owner: 'Sarah Chen', priority: 'High', deadline: '2025-03-21', status: 'Pending' },
  { id: 7, name: 'Deploy infrastructure update', owner: 'Marcus Johnson', priority: 'High', deadline: '2025-03-19', status: 'Delayed' },
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
];

export const auditLogs = [
  { timestamp: '2025-03-19 10:32:14', agent: 'Decision Agent', action: 'Extracted decision: "Finalize Q4 projections by Friday"', reason: 'Keyword "finalize" with deadline indicator detected in transcript' },
  { timestamp: '2025-03-19 10:32:18', agent: 'Decision Agent', action: 'Extracted decision: "Send vendor contracts for legal review"', reason: 'Action verb "send" with entity "vendor contracts" identified' },
  { timestamp: '2025-03-19 10:33:02', agent: 'Task Agent', action: 'Created task: "Update Q4 revenue projections"', reason: 'Decision mapped to quantifiable task with measurable outcome' },
  { timestamp: '2025-03-19 10:33:04', agent: 'Task Agent', action: 'Set priority: High for "Update Q4 revenue projections"', reason: 'Deadline proximity (3 days) triggers High priority classification' },
  { timestamp: '2025-03-19 10:34:11', agent: 'Assignment Agent', action: 'Assigned "Update Q4 revenue projections" to Sarah Chen', reason: 'Skill match: Finance (92%), availability score: 0.85, past performance: A+' },
  { timestamp: '2025-03-19 10:35:00', agent: 'Monitoring Agent', action: 'Configured 24h check-in for High priority tasks', reason: 'SLA policy requires daily monitoring for High priority items' },
  { timestamp: '2025-03-19 10:45:33', agent: 'Monitoring Agent', action: 'Flagged "Deploy infrastructure update" as at-risk', reason: 'Task deadline in 6 hours, status still "In Progress", no recent commits detected' },
  { timestamp: '2025-03-19 10:46:01', agent: 'Escalation Agent', action: 'Sent escalation notification to Alex Rivers', reason: 'Delay threshold (24h before deadline) breached for High priority task' },
];
