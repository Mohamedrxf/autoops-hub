import { useState } from 'react';
import { motion } from 'framer-motion';
import { Brain, FileText, UserCheck, Monitor, AlertTriangle, Info, Search, Filter, ChevronDown } from 'lucide-react';
import { auditLogs } from '@/data/mockData';

const agentIconMap: Record<string, React.ElementType> = {
  'Decision Agent': Brain,
  'Task Agent': FileText,
  'Assignment Agent': UserCheck,
  'Monitoring Agent': Monitor,
  'Escalation Agent': AlertTriangle,
};

const agentColorMap: Record<string, { text: string; bg: string; border: string }> = {
  'Decision Agent': { text: 'text-primary', bg: 'bg-primary/10', border: 'border-primary/20' },
  'Task Agent': { text: 'text-success', bg: 'bg-success/10', border: 'border-success/20' },
  'Assignment Agent': { text: 'text-blue-400', bg: 'bg-blue-500/10', border: 'border-blue-500/20' },
  'Monitoring Agent': { text: 'text-warning', bg: 'bg-warning/10', border: 'border-warning/20' },
  'Escalation Agent': { text: 'text-destructive', bg: 'bg-destructive/10', border: 'border-destructive/20' },
};

const severityConfig = {
  info: { text: 'text-primary', bg: 'bg-primary/10', label: 'INFO' },
  success: { text: 'text-success', bg: 'bg-success/10', label: 'SUCCESS' },
  warning: { text: 'text-warning', bg: 'bg-warning/10', label: 'WARNING' },
  destructive: { text: 'text-destructive', bg: 'bg-destructive/10', label: 'CRITICAL' },
};

const AuditLogPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedRow, setExpandedRow] = useState<number | null>(null);
  const [filterAgent, setFilterAgent] = useState('all');

  const filteredLogs = auditLogs.filter((log) => {
    const matchesSearch = log.action.toLowerCase().includes(searchTerm.toLowerCase()) || log.reason.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesAgent = filterAgent === 'all' || log.agent === filterAgent;
    return matchesSearch && matchesAgent;
  });

  const uniqueAgents = [...new Set(auditLogs.map((l) => l.agent))];

  // Agent breakdown stats
  const agentBreakdown = uniqueAgents.map((agent) => {
    const count = auditLogs.filter((l) => l.agent === agent).length;
    const colors = agentColorMap[agent];
    return { agent, count, colors };
  });

  return (
    <div className="space-y-5">
      {/* Agent Breakdown */}
      <div className="grid grid-cols-5 gap-3">
        {agentBreakdown.map((ab, i) => {
          const Icon = agentIconMap[ab.agent] || Brain;
          return (
            <motion.button key={ab.agent} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }}
              onClick={() => setFilterAgent(filterAgent === ab.agent ? 'all' : ab.agent)}
              className={`glass-panel p-4 flex items-center gap-3 cursor-pointer transition-all ${filterAgent === ab.agent ? `border ${ab.colors.border}` : 'hover:border-primary/20'}`}>
              <div className={`w-9 h-9 rounded-lg ${ab.colors.bg} flex items-center justify-center`}>
                <Icon className={ab.colors.text} size={16} />
              </div>
              <div>
                <p className={`text-lg font-bold ${ab.colors.text}`}>{ab.count}</p>
                <p className="text-[9px] text-muted-foreground truncate">{ab.agent.replace(' Agent', '')}</p>
              </div>
            </motion.button>
          );
        })}
      </div>

      {/* Log Table */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="glass-panel overflow-hidden">
        <div className="p-5 border-b border-border flex items-center gap-3">
          <div className="flex-1 relative">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search audit logs..."
              className="w-full pl-9 pr-4 py-2 bg-background/50 border border-border rounded-lg text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40"
            />
          </div>
          {filterAgent !== 'all' && (
            <button onClick={() => setFilterAgent('all')} className="text-xs text-primary px-3 py-2 rounded-lg bg-primary/10 border border-primary/20">
              Clear Filter
            </button>
          )}
          <span className="text-xs text-muted-foreground font-mono">{filteredLogs.length} entries</span>
        </div>

        <div className="divide-y divide-border/50">
          {filteredLogs.map((log, i) => {
            const Icon = agentIconMap[log.agent] || Brain;
            const colors = agentColorMap[log.agent] || { text: 'text-primary', bg: 'bg-primary/10', border: 'border-primary/20' };
            const sev = severityConfig[log.severity];
            const isExpanded = expandedRow === i;

            return (
              <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 + i * 0.04 }}
                className="hover:bg-secondary/15 transition-colors cursor-pointer" onClick={() => setExpandedRow(isExpanded ? null : i)}>
                <div className="p-5 flex items-start gap-4">
                  <div className={`w-9 h-9 rounded-lg ${colors.bg} flex items-center justify-center shrink-0 mt-0.5`}>
                    <Icon className={colors.text} size={16} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap mb-1.5">
                      <span className="text-[10px] font-mono text-muted-foreground bg-muted px-2 py-0.5 rounded">{log.timestamp}</span>
                      <span className={`text-xs font-bold ${colors.text}`}>{log.agent}</span>
                      <span className={`text-[9px] font-bold uppercase px-1.5 py-0.5 rounded ${sev.bg} ${sev.text}`}>{sev.label}</span>
                    </div>
                    <p className="text-sm text-foreground">{log.action}</p>

                    {/* Expandable reason */}
                    <motion.div
                      initial={false}
                      animate={{ height: isExpanded ? 'auto' : 0, opacity: isExpanded ? 1 : 0 }}
                      className="overflow-hidden"
                    >
                      <div className="flex items-start gap-2 mt-3 p-3 rounded-lg bg-muted/40 border border-border/50">
                        <Info size={13} className="text-muted-foreground shrink-0 mt-0.5" />
                        <p className="text-xs text-muted-foreground leading-relaxed font-mono">
                          <span className="text-foreground/60 font-bold">AI Reasoning:</span> {log.reason}
                        </p>
                      </div>
                    </motion.div>
                  </div>
                  <ChevronDown size={14} className={`text-muted-foreground transition-transform mt-1 ${isExpanded ? 'rotate-180' : ''}`} />
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
};

export default AuditLogPage;
