import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle, Clock, CheckCircle2, Circle, ArrowUpDown } from 'lucide-react';
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

  const markAsDelayed = (id: number) => {
    setTaskList((prev) =>
      prev.map((t) => (t.id === id ? { ...t, status: 'Delayed' as const } : t))
    );
    setEscalation(id);
    setTimeout(() => setEscalation(null), 4000);
  };

  return (
    <div className="space-y-6">
      {/* Escalation alert */}
      <AnimatePresence>
        {escalation !== null && (
          <motion.div
            initial={{ opacity: 0, y: -20, height: 0 }}
            animate={{ opacity: 1, y: 0, height: 'auto' }}
            exit={{ opacity: 0, y: -20, height: 0 }}
            className="p-4 rounded-xl bg-destructive/10 border border-destructive/30 flex items-center gap-3 glow-destructive"
          >
            <AlertTriangle className="text-destructive shrink-0" size={20} />
            <div>
              <span className="text-sm font-bold text-destructive">Escalation Triggered!</span>
              <p className="text-xs text-destructive/70 mt-0.5">
                Task marked as delayed — Escalation Agent notified team lead Alex Rivers.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-panel-solid overflow-hidden"
      >
        <div className="p-6 border-b border-border flex items-center justify-between">
          <h2 className="text-sm uppercase tracking-[0.15em] text-muted-foreground font-bold">
            Task Management
          </h2>
          <span className="text-xs text-muted-foreground font-mono">
            {taskList.length} tasks
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                {['Task Name', 'Owner', 'Priority', 'Deadline', 'Status', 'Action'].map((h) => (
                  <th
                    key={h}
                    className="px-6 py-4 text-left text-[10px] font-bold uppercase tracking-[0.15em] text-muted-foreground"
                  >
                    <span className="flex items-center gap-1">
                      {h}
                      {h !== 'Action' && <ArrowUpDown size={10} className="opacity-40" />}
                    </span>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {taskList.map((task, i) => {
                const sc = statusConfig[task.status];
                const StatusIcon = sc.icon;
                return (
                  <motion.tr
                    key={task.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className="border-b border-border/50 hover:bg-secondary/30 transition-colors"
                  >
                    <td className="px-6 py-4 text-sm font-medium text-foreground">{task.name}</td>
                    <td className="px-6 py-4 text-sm text-secondary-foreground">{task.owner}</td>
                    <td className="px-6 py-4">
                      <span className={`text-[10px] font-bold uppercase px-2.5 py-1 rounded-md ${priorityConfig[task.priority]}`}>
                        {task.priority}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm font-mono text-muted-foreground">{task.deadline}</td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg border ${sc.bg} ${sc.border} ${sc.text}`}>
                        <StatusIcon size={12} />
                        {task.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      {task.status !== 'Delayed' && task.status !== 'Completed' && (
                        <button
                          onClick={() => markAsDelayed(task.id)}
                          className="text-[10px] font-bold uppercase tracking-wider text-warning hover:text-warning/80 bg-warning/10 hover:bg-warning/20 px-3 py-1.5 rounded-md transition-colors border border-warning/20"
                        >
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
