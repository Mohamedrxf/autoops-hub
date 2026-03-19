import { motion } from 'framer-motion';
import { Brain, FileText, UserCheck, Monitor, AlertTriangle, Zap, Clock, Target } from 'lucide-react';
import { activityFeed, agentPerformance } from '@/data/mockData';

const agentIconMap: Record<string, React.ElementType> = {
  'Decision Agent': Brain,
  'Task Agent': FileText,
  'Assignment Agent': UserCheck,
  'Monitoring Agent': Monitor,
  'Escalation Agent': AlertTriangle,
};

const typeColorMap = {
  info: { dot: 'bg-primary', iconBg: 'bg-primary/10', iconText: 'text-primary', lineBg: 'bg-primary/20' },
  success: { dot: 'bg-success', iconBg: 'bg-success/10', iconText: 'text-success', lineBg: 'bg-success/20' },
  warning: { dot: 'bg-warning', iconBg: 'bg-warning/10', iconText: 'text-warning', lineBg: 'bg-warning/20' },
  destructive: { dot: 'bg-destructive', iconBg: 'bg-destructive/10', iconText: 'text-destructive', lineBg: 'bg-destructive/20' },
};

const agentColors: Record<string, { bg: string; text: string; border: string }> = {
  Decision: { bg: 'bg-primary/10', text: 'text-primary', border: 'border-primary/20' },
  Task: { bg: 'bg-success/10', text: 'text-success', border: 'border-success/20' },
  Assignment: { bg: 'bg-blue-500/10', text: 'text-blue-400', border: 'border-blue-500/20' },
  Monitoring: { bg: 'bg-warning/10', text: 'text-warning', border: 'border-warning/20' },
  Escalation: { bg: 'bg-destructive/10', text: 'text-destructive', border: 'border-destructive/20' },
};

const agentIconsSmall: Record<string, React.ElementType> = {
  Decision: Brain,
  Task: FileText,
  Assignment: UserCheck,
  Monitoring: Monitor,
  Escalation: AlertTriangle,
};

const AgentActivityPage = () => {
  return (
    <div className="space-y-5">
      {/* Agent Stats Cards */}
      <div className="grid grid-cols-5 gap-3">
        {agentPerformance.map((agent, i) => {
          const colors = agentColors[agent.name];
          const Icon = agentIconsSmall[agent.name] || Brain;
          return (
            <motion.div key={agent.name} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.07 }}
              className={`glass-panel p-4 border ${colors.border}`}>
              <div className="flex items-center gap-2 mb-3">
                <div className={`w-8 h-8 rounded-lg ${colors.bg} flex items-center justify-center`}>
                  <Icon className={colors.text} size={15} />
                </div>
                <span className="text-xs font-bold text-foreground">{agent.name}</span>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] text-muted-foreground flex items-center gap-1"><Target size={9} />Accuracy</span>
                  <span className={`text-xs font-bold ${colors.text}`}>{agent.accuracy}%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[10px] text-muted-foreground flex items-center gap-1"><Zap size={9} />Tasks</span>
                  <span className="text-xs font-mono text-foreground">{agent.tasksHandled}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[10px] text-muted-foreground flex items-center gap-1"><Clock size={9} />Avg</span>
                  <span className="text-xs font-mono text-foreground">{agent.avgTime}</span>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Timeline */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="glass-panel p-7">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-sm uppercase tracking-[0.15em] text-muted-foreground font-bold">Agent Timeline</h2>
          <div className="flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full bg-success animate-pulse-glow" />
            <span className="text-[10px] text-success font-bold">LIVE</span>
          </div>
        </div>

        <div className="relative">
          <div className="absolute left-[23px] top-0 bottom-0 w-px bg-border" />

          <div className="space-y-1">
            {activityFeed.map((item, i) => {
              const Icon = agentIconMap[item.agent] || Brain;
              const colors = typeColorMap[item.type];

              return (
                <motion.div key={i} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.45 + i * 0.06 }}
                  className="flex items-start gap-5 p-4 rounded-xl hover:bg-secondary/20 transition-colors relative group">
                  <div className={`w-[46px] h-[46px] rounded-xl ${colors.iconBg} flex items-center justify-center shrink-0 z-10 transition-transform group-hover:scale-105`}>
                    <Icon className={colors.iconText} size={20} />
                  </div>
                  <div className="flex-1 min-w-0 pt-1">
                    <div className="flex items-center gap-3 mb-1.5">
                      <span className="text-[10px] font-mono text-muted-foreground bg-muted px-2 py-0.5 rounded">{item.time}</span>
                      <span className="text-xs font-bold text-foreground">{item.agent}</span>
                      <span className={`text-[9px] font-bold uppercase px-1.5 py-0.5 rounded ${colors.lineBg} ${colors.iconText}`}>{item.type}</span>
                    </div>
                    <p className="text-sm text-secondary-foreground leading-relaxed">{item.action}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default AgentActivityPage;
