import { motion } from 'framer-motion';
import { Brain, FileText, UserCheck, Monitor, AlertTriangle, Info } from 'lucide-react';
import { auditLogs } from '@/data/mockData';

const agentIconMap: Record<string, React.ElementType> = {
  'Decision Agent': Brain,
  'Task Agent': FileText,
  'Assignment Agent': UserCheck,
  'Monitoring Agent': Monitor,
  'Escalation Agent': AlertTriangle,
};

const agentColorMap: Record<string, string> = {
  'Decision Agent': 'text-primary',
  'Task Agent': 'text-success',
  'Assignment Agent': 'text-blue-400',
  'Monitoring Agent': 'text-warning',
  'Escalation Agent': 'text-destructive',
};

const AuditLogPage = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-panel-solid overflow-hidden"
    >
      <div className="p-6 border-b border-border flex items-center justify-between">
        <h2 className="text-sm uppercase tracking-[0.15em] text-muted-foreground font-bold">
          Audit Trail — AI Decision Transparency
        </h2>
        <span className="text-xs text-muted-foreground font-mono">{auditLogs.length} entries</span>
      </div>

      <div className="divide-y divide-border/50">
        {auditLogs.map((log, i) => {
          const Icon = agentIconMap[log.agent] || Brain;
          const colorClass = agentColorMap[log.agent] || 'text-primary';

          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.06 }}
              className="p-6 hover:bg-secondary/20 transition-colors"
            >
              <div className="flex items-start gap-4">
                <div className="shrink-0 mt-0.5">
                  <Icon className={colorClass} size={18} />
                </div>
                <div className="flex-1 min-w-0 space-y-2">
                  <div className="flex items-center gap-3 flex-wrap">
                    <span className="text-[10px] font-mono text-muted-foreground bg-muted px-2 py-0.5 rounded">
                      {log.timestamp}
                    </span>
                    <span className={`text-xs font-bold ${colorClass}`}>{log.agent}</span>
                  </div>
                  <p className="text-sm text-foreground font-medium">{log.action}</p>
                  <div className="flex items-start gap-2 mt-2 p-3 rounded-lg bg-muted/50 border border-border/50">
                    <Info size={14} className="text-muted-foreground shrink-0 mt-0.5" />
                    <p className="text-xs text-muted-foreground leading-relaxed font-mono">
                      <span className="text-foreground/60 font-bold">Reason:</span> {log.reason}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
};

export default AuditLogPage;
