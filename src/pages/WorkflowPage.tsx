import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PlayCircle, Brain, FileText, UserCheck, Monitor, AlertTriangle, Check, Loader2, Upload, Clock, Zap, Hash } from 'lucide-react';
import { agents, workflowHistory } from '@/data/mockData';

const agentIcons = [Brain, FileText, UserCheck, Monitor, AlertTriangle];

const sampleTranscript = `Team agreed to finalize Q4 revenue projections by Friday — Sarah to lead. Marcus will send all vendor contracts to legal for review by Wednesday. Emily needs to schedule a stakeholder sync for next week. David is preparing the board presentation, deadline is Thursday. We also need Alex to finalize the hiring pipeline by end of month.`;

const WorkflowPage = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [currentStep, setCurrentStep] = useState(-1);
  const [transcript, setTranscript] = useState('');
  const [logs, setLogs] = useState<string[]>([]);

  const agentLogs: Record<number, string[]> = {
    0: ['Tokenizing transcript...', 'Running NLP entity extraction...', 'Identified 5 action items with 94% confidence', 'Extracted 3 key decisions'],
    1: ['Mapping decisions to atomic tasks...', 'Assigning priority weights...', 'Generated 5 tasks with deadlines', 'Cross-referencing with existing tasks'],
    2: ['Loading team skillset matrix...', 'Calculating availability scores...', 'Matching tasks to optimal owners', 'All 5 tasks assigned successfully'],
    3: ['Configuring deadline watchers...', 'Setting up progress webhooks...', 'Enabling real-time status tracking', 'Monitoring hooks active for 5 tasks'],
    4: ['Loading SLA escalation policies...', 'Setting High-priority threshold: 24h', 'Setting Medium-priority threshold: 48h', 'Escalation rules configured'],
  };

  const runWorkflow = () => {
    if (!transcript.trim()) return;
    setIsProcessing(true);
    setCurrentStep(0);
    setLogs([]);
  };

  const reset = () => {
    setIsProcessing(false);
    setCurrentStep(-1);
    setLogs([]);
  };

  const loadSample = () => {
    setTranscript(sampleTranscript);
  };

  useEffect(() => {
    if (isProcessing && currentStep >= 0 && currentStep < agents.length) {
      const stepLogs = agentLogs[currentStep] || [];
      let logIndex = 0;

      const logInterval = setInterval(() => {
        if (logIndex < stepLogs.length) {
          setLogs((prev) => [...prev, `[${agents[currentStep].name}] ${stepLogs[logIndex]}`]);
          logIndex++;
        }
      }, 400);

      const timer = setTimeout(() => {
        clearInterval(logInterval);
        setCurrentStep((prev) => prev + 1);
      }, 2200);

      return () => {
        clearTimeout(timer);
        clearInterval(logInterval);
      };
    }
  }, [isProcessing, currentStep]);

  const allDone = currentStep >= agents.length;

  return (
    <div className="space-y-5">
      {/* Input Panel */}
      <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass-panel p-7">
        <div className="flex items-center justify-between mb-5">
          <div>
            <h2 className="text-xl font-bold text-foreground">Initialize Autonomous Engine</h2>
            <p className="text-xs text-muted-foreground mt-1">Paste a meeting transcript to auto-generate tasks, assignments, and monitoring rules</p>
          </div>
          <div className="flex items-center gap-2">
            {allDone && (
              <button onClick={reset} className="text-xs text-primary hover:underline px-3 py-1.5 rounded-lg bg-primary/10 border border-primary/20">
                Reset
              </button>
            )}
            <button onClick={loadSample} className="text-xs text-muted-foreground hover:text-foreground px-3 py-1.5 rounded-lg bg-secondary border border-border transition-colors">
              Load Sample
            </button>
          </div>
        </div>
        <div className="relative">
          <textarea
            placeholder="Paste your meeting transcript here..."
            value={transcript}
            onChange={(e) => setTranscript(e.target.value)}
            className="w-full h-36 bg-background/50 border border-border rounded-xl p-5 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 transition-all resize-none font-mono text-sm"
          />
          <div className="absolute bottom-4 right-4 flex items-center gap-3">
            <button className="px-4 py-2 bg-secondary border border-border text-muted-foreground rounded-lg text-xs font-medium hover:text-foreground transition-colors flex items-center gap-2">
              <Upload size={13} /> Upload File
            </button>
            <button
              onClick={runWorkflow}
              disabled={isProcessing || !transcript.trim()}
              className="px-5 py-2 bg-primary hover:bg-primary/90 text-primary-foreground font-bold rounded-lg transition-all flex items-center gap-2 glow-primary disabled:opacity-40 disabled:cursor-not-allowed text-sm"
            >
              <PlayCircle size={15} />
              {isProcessing ? 'Processing...' : 'Run Workflow'}
            </button>
          </div>
        </div>
      </motion.section>

      {/* Agent Pipeline */}
      <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className="glass-panel p-7">
        <div className="flex items-center mb-8">
          <h2 className="text-sm uppercase tracking-[0.2em] text-muted-foreground font-bold">Execution Pipeline</h2>
          <div className="h-px flex-1 ml-6 bg-gradient-to-r from-border to-transparent" />
          {isProcessing && (
            <div className="flex items-center gap-2 ml-4">
              <Loader2 className="text-primary animate-spin" size={14} />
              <span className="text-xs text-primary font-mono">Running...</span>
            </div>
          )}
        </div>

        <div className="grid grid-cols-5 gap-5 relative">
          <div className="absolute top-[34px] left-[10%] right-[10%] h-[2px] bg-border z-0" />
          {currentStep >= 0 && (
            <motion.div className="absolute top-[34px] left-[10%] h-[2px] bg-primary z-[1]"
              initial={{ width: '0%' }}
              animate={{ width: `${Math.min(100, (Math.min(currentStep, agents.length) / (agents.length - 1)) * 80)}%` }}
              transition={{ duration: 0.8, ease: 'easeInOut' }}
            />
          )}

          {agents.map((agent, index) => {
            const Icon = agentIcons[index];
            const isActive = currentStep === index;
            const isDone = currentStep > index;

            return (
              <div key={agent.id} className="relative z-10 flex flex-col items-center">
                <motion.div
                  animate={{
                    scale: isActive ? 1.12 : 1,
                    borderColor: isActive ? 'hsl(187 80% 50%)' : isDone ? 'hsl(155 60% 48%)' : 'hsl(220 15% 18%)',
                  }}
                  className={`w-[68px] h-[68px] rounded-2xl border-2 flex items-center justify-center mb-3 transition-all duration-500 ${
                    isActive ? 'glow-primary bg-primary/10' : isDone ? 'glow-success bg-success/10' : 'bg-secondary/30'
                  }`}
                >
                  {isActive ? <Loader2 className="text-primary animate-spin" size={26} />
                    : isDone ? <Check className="text-success" size={26} />
                    : <Icon className="text-muted-foreground" size={26} />}
                </motion.div>
                <h3 className={`text-[11px] font-bold mb-1 text-center ${isActive ? 'text-primary' : isDone ? 'text-success' : 'text-muted-foreground'}`}>
                  {agent.name}
                </h3>
                <div className="h-10 text-center flex items-start justify-center">
                  <AnimatePresence mode="wait">
                    {isActive && (
                      <motion.p key="run" initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -5 }}
                        className="text-[9px] text-primary/80 font-mono leading-tight">{agent.log}</motion.p>
                    )}
                    {isDone && (
                      <motion.span key="ok" initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                        className="text-[9px] text-success font-bold uppercase tracking-wider">Verified ✓</motion.span>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            );
          })}
        </div>

        {/* Completion */}
        <AnimatePresence>
          {allDone && (
            <motion.div initial={{ opacity: 0, y: 10, height: 0 }} animate={{ opacity: 1, y: 0, height: 'auto' }} className="mt-6 p-5 rounded-xl bg-success/10 border border-success/20 flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-success/20 flex items-center justify-center glow-success">
                <Check className="text-success" size={20} />
              </div>
              <div>
                <h3 className="text-sm font-bold text-success">Workflow Complete — 12.4s total</h3>
                <p className="text-xs text-success/70 mt-0.5">5 agents executed · 5 tasks created · 5 assigned · monitoring active</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.section>

      {/* Live Logs + Workflow History */}
      <div className="grid grid-cols-2 gap-4">
        {/* Live Terminal */}
        <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="glass-panel p-6">
          <div className="flex items-center gap-2 mb-4">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-destructive/60" />
              <div className="w-3 h-3 rounded-full bg-warning/60" />
              <div className="w-3 h-3 rounded-full bg-success/60" />
            </div>
            <span className="text-[10px] font-mono text-muted-foreground ml-2">agent-terminal</span>
          </div>
          <div className="bg-background/60 rounded-lg p-4 h-52 overflow-y-auto scrollbar-thin font-mono text-[11px]">
            {logs.length === 0 ? (
              <p className="text-muted-foreground">Awaiting workflow execution...</p>
            ) : (
              logs.map((log, i) => (
                <motion.div key={i} initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                  className="text-primary/80 mb-1 leading-relaxed">
                  <span className="text-muted-foreground mr-2">{'>'}</span>{log}
                </motion.div>
              ))
            )}
            {isProcessing && (
              <span className="inline-block w-2 h-4 bg-primary animate-pulse-glow" />
            )}
          </div>
        </motion.section>

        {/* Workflow History */}
        <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }} className="glass-panel p-6">
          <h2 className="text-sm uppercase tracking-[0.15em] text-muted-foreground font-bold mb-4">Recent Workflows</h2>
          <div className="space-y-2.5">
            {workflowHistory.map((wf, i) => (
              <motion.div key={wf.id} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 + i * 0.06 }}
                className="flex items-center gap-4 p-3 rounded-lg hover:bg-secondary/30 transition-colors">
                <div className="w-8 h-8 rounded-lg bg-success/10 flex items-center justify-center">
                  <Check className="text-success" size={14} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-semibold text-foreground truncate">{wf.source}</p>
                  <div className="flex items-center gap-3 mt-0.5">
                    <span className="text-[10px] text-muted-foreground flex items-center gap-1"><Hash size={9} />{wf.id}</span>
                    <span className="text-[10px] text-muted-foreground flex items-center gap-1"><Zap size={9} />{wf.time}</span>
                    <span className="text-[10px] text-muted-foreground flex items-center gap-1"><Clock size={9} />{wf.date}</span>
                  </div>
                </div>
                <span className="text-[10px] font-mono text-success bg-success/10 px-2 py-1 rounded">{wf.tasks} tasks</span>
              </motion.div>
            ))}
          </div>
        </motion.section>
      </div>
    </div>
  );
};

export default WorkflowPage;
