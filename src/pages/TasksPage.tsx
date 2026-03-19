import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle, Clock, CheckCircle2, Circle, ArrowUpDown, Search, Filter, BarChart3 } from 'lucide-react';
import { tasks as initialTasks, type Task } from '@/data/mockData';

const statusConfig = {
  Pending: { icon: Circle, text: 'text-muted-foreground', bg: 'bg-muted/50', border: 'border-border' },
  'In Progress': { icon: Clock, text: 'text-primary', bg: 'bg-primary/10', border: 'border-primary/30' },
  Completed: { icon: CheckCircle2, text: 'text-success', bg: 'bg-success/10', border: 'border-success/30' },
  Delayed: { icon: AlertTriangle, text: 'text-destructive', bg: 'bg-destructive/10', border: 'border-destructive/30' },
};

const priorityConfig = {
  High: 'text-destructive bg-destructive/10',
  Medium: 'text-warning bg-warning/10',
  Low: 'text-muted-foreground bg-muted',
};

const TasksPage = () => {
  const [taskList, setTaskList] = useState<Task[]>(initialTasks);
  const [escalation, setEscalation] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');

  const markAsDelayed = (id: number) => {
    setTaskList((prev) => prev.map((t) => (t.id === id ? { ...t, status: 'Delayed' as const } : t)));
    setEscalation(id);
    setTimeout(() => setEscalation(null), 4000);
  };

  const filteredTasks = taskList.filter((t) => {
    const matchesSearch = t.name.toLowerCase().includes(searchTerm.toLowerCase()) || t.owner.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || t.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const statusCounts = taskList.reduce((acc, t) => {
    acc[t.status] = (acc[t.status] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return (
    <div className="space-y-5">
      {/* Escalation Alert */}
      <AnimatePresence>
        {escalation !== null && (
          <motion.div initial={{ opacity: 0, y: -20, height: 0 }} animate={{ opacity: 1, y: 0, height: 'auto' }} exit={{ opacity: 0, y: -20, height: 0 }}
            className="p-4 rounded-xl bg-destructive/10 border border-destructive/30 flex items-center gap-3 glow-destructive">
            <AlertTriangle className="text-destructive shrink-0" size={20} />
            <div>
              <span className="text-sm font-bold text-destructive">Escalation Triggered!</span>
              <p className="text-xs text-destructive/70 mt-0.5">Task marked as delayed — Escalation Agent notified team lead Alex Rivers.</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Stats Row */}
      <div className="grid grid-cols-4 gap-3">
        {(['Pending', 'In Progress', 'Completed', 'Delayed'] as const).map((status, i) => {
          const sc = statusConfig[status];
          const Icon = sc.icon;
          return (
            <motion.button key={status} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }}
              onClick={() => setFilterStatus(filterStatus === status ? 'all' : status)}
              className={`glass-panel p-4 flex items-center gap-3 transition-all cursor-pointer ${filterStatus === status ? 'border-primary/40' : 'hover:border-primary/20'}`}>
              <div className={`w-9 h-9 rounded-lg ${sc.bg} flex items-center justify-center`}>
                <Icon className={sc.text} size={16} />
              </div>
              <div>
                <p className={`text-xl font-bold ${sc.text}`} style={{ fontVariantNumeric: 'tabular-nums' }}>
                  {statusCounts[status] || 0}
                </p>
                <p className="text-[10px] text-muted-foreground">{status}</p>
              </div>
            </motion.button>
          );
        })}
      </div>

      {/* Search + Table */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }} className="glass-panel overflow-hidden">
        <div className="p-5 border-b border-border flex items-center gap-3">
          <div className="flex-1 relative">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search tasks or owners..."
              className="w-full pl-9 pr-4 py-2 bg-background/50 border border-border rounded-lg text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40"
            />
          </div>
          {filterStatus !== 'all' && (
            <button onClick={() => setFilterStatus('all')} className="text-xs text-primary px-3 py-2 rounded-lg bg-primary/10 border border-primary/20 hover:bg-primary/20 transition-colors">
              Clear Filter
            </button>
          )}
          <span className="text-xs text-muted-foreground font-mono">{filteredTasks.length} tasks</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                {['Task Name', 'Owner', 'Dept', 'Priority', 'Progress', 'Deadline', 'Status', 'Action'].map((h) => (
                  <th key={h} className="px-5 py-3.5 text-left text-[10px] font-bold uppercase tracking-[0.12em] text-muted-foreground">
                    <span className="flex items-center gap-1">{h}</span>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filteredTasks.map((task, i) => {
                const sc = statusConfig[task.status];
                const StatusIcon = sc.icon;
                return (
                  <motion.tr key={task.id} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.04 }}
                    className="border-b border-border/50 hover:bg-secondary/20 transition-colors">
                    <td className="px-5 py-3.5 text-sm font-medium text-foreground max-w-[220px] truncate">{task.name}</td>
                    <td className="px-5 py-3.5 text-sm text-secondary-foreground">{task.owner}</td>
                    <td className="px-5 py-3.5">
                      <span className="text-[10px] font-mono text-muted-foreground bg-muted px-2 py-0.5 rounded">{task.department}</span>
                    </td>
                    <td className="px-5 py-3.5">
                      <span className={`text-[10px] font-bold uppercase px-2 py-1 rounded-md ${priorityConfig[task.priority]}`}>{task.priority}</span>
                    </td>
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-2">
                        <div className="w-20 h-1.5 bg-muted rounded-full overflow-hidden">
                          <div className="h-full rounded-full transition-all duration-500"
                            style={{
                              width: `${task.progress}%`,
                              background: task.status === 'Delayed' ? 'hsl(0,72%,55%)' : task.progress === 100 ? 'hsl(155,60%,48%)' : 'hsl(187,80%,50%)',
                            }} />
                        </div>
                        <span className="text-[10px] font-mono text-muted-foreground w-8">{task.progress}%</span>
                      </div>
                    </td>
                    <td className="px-5 py-3.5 text-xs font-mono text-muted-foreground">{task.deadline}</td>
                    <td className="px-5 py-3.5">
                      <span className={`inline-flex items-center gap-1.5 text-[10px] font-semibold px-2.5 py-1 rounded-lg border ${sc.bg} ${sc.border} ${sc.text}`}>
                        <StatusIcon size={11} />{task.status}
                      </span>
                    </td>
                    <td className="px-5 py-3.5">
                      {task.status !== 'Delayed' && task.status !== 'Completed' && (
                        <button onClick={() => markAsDelayed(task.id)}
                          className="text-[10px] font-bold uppercase tracking-wider text-warning hover:text-warning/80 bg-warning/10 hover:bg-warning/20 px-2.5 py-1 rounded-md transition-colors border border-warning/20">
                          Mark Delayed
                        </button>
                      )}
                    </td>
                  </motion.tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
};

export default TasksPage;
