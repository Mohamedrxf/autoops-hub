import { motion } from 'framer-motion';
import { Brain, FileText, UserCheck, Monitor, AlertTriangle } from 'lucide-react';
import { activityFeed } from '@/data/mockData';

const agentIconMap: Record<string, React.ElementType> = {
  'Decision Agent': Brain,
  'Task Agent': FileText,
  'Assignment Agent': UserCheck,
  'Monitoring Agent': Monitor,
  'Escalation Agent': AlertTriangle,
};

const typeColorMap = {
  info: { dot: 'bg-primary', line: 'bg-primary/30', iconBg: 'bg-primary/10', iconText: 'text-primary' },
  success: { dot: 'bg-success', line: 'bg-success/30', iconBg: 'bg-success/10', iconText: 'text-success' },
  warning: { dot: 'bg-warning', line: 'bg-warning/30', iconBg: 'bg-warning/10', iconText: 'text-warning' },
  destructive: { dot: 'bg-destructive', line: 'bg-destructive/30', iconBg: 'bg-destructive/10', iconText: 'text-destructive' },
};

const AgentActivityPage = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-panel-solid p-8"
    >
      <h2 className="text-sm uppercase tracking-[0.15em] text-muted-foreground font-bold mb-8">
        Agent Timeline
      </h2>

      <div className="relative">
        {/* Timeline line */}
        <div className="absolute left-[23px] top-0 bottom-0 w-px bg-border" />

        <div className="space-y-1">
          {activityFeed.map((item, i) => {
            const Icon = agentIconMap[item.agent] || Brain;
            const colors = typeColorMap[item.type];

            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.08 }}
                className="flex items-start gap-5 p-4 rounded-xl hover:bg-secondary/30 transition-colors relative"
              >
                {/* Timeline dot */}
                <div className={`w-[46px] h-[46px] rounded-xl ${colors.iconBg} flex items-center justify-center shrink-0 z-10`}>
                  <Icon className={colors.iconText} size={20} />
                </div>

                <div className="flex-1 min-w-0 pt-1">
                  <div className="flex items-center gap-3 mb-1.5">
                    <span className="text-xs font-mono text-muted-foreground bg-muted px-2 py-0.5 rounded">
                      {item.time}
                    </span>
                    <span className="text-xs font-bold text-foreground">{item.agent}</span>
                  </div>
                  <p className="text-sm text-secondary-foreground leading-relaxed">{item.action}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
};

export default AgentActivityPage;
