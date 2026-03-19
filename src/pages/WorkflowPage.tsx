import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PlayCircle, Brain, FileText, UserCheck, Monitor, AlertTriangle, Check, Loader2, Upload } from 'lucide-react';
import { agents } from '@/data/mockData';

const agentIcons = [Brain, FileText, UserCheck, Monitor, AlertTriangle];

const WorkflowPage = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [currentStep, setCurrentStep] = useState(-1);
  const [transcript, setTranscript] = useState('');

  const runWorkflow = () => {
    if (!transcript.trim()) return;
    setIsProcessing(true);
    setCurrentStep(0);
  };

  const reset = () => {
    setIsProcessing(false);
    setCurrentStep(-1);
  };

  useEffect(() => {
    if (isProcessing && currentStep >= 0 && currentStep < agents.length) {
      const timer = setTimeout(() => setCurrentStep((prev) => prev + 1), 2200);
      return () => clearTimeout(timer);
    }
  }, [isProcessing, currentStep]);

  const allDone = currentStep >= agents.length;

  return (
    <div className="space-y-6">
      {/* Input Panel */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-panel-solid p-8"
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-foreground">Initialize Autonomous Engine</h2>
          {allDone && (
            <button onClick={reset} className="text-xs text-primary hover:underline">
              Reset & Run Again
            </button>
          )}
        </div>
        <div className="relative">
          <textarea
            placeholder="Paste your meeting transcript here... (e.g., 'Team agreed to finalize Q4 projections by Friday. Marcus will send vendor contracts to legal. Emily to schedule stakeholder sync next week.')"
            value={transcript}
            onChange={(e) => setTranscript(e.target.value)}
            className="w-full h-44 bg-background/60 border border-border rounded-xl p-6 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 transition-all resize-none font-mono text-sm"
          />
          <div className="absolute bottom-4 right-4 flex items-center gap-3">
            <button className="px-4 py-2.5 bg-secondary border border-border text-muted-foreground rounded-lg text-sm font-medium hover:text-foreground transition-colors flex items-center gap-2">
              <Upload size={14} />
              Upload
            </button>
            <button
              onClick={runWorkflow}
              disabled={isProcessing || !transcript.trim()}
              className="px-6 py-2.5 bg-primary hover:bg-primary/90 text-primary-foreground font-bold rounded-lg transition-all flex items-center gap-2 glow-primary disabled:opacity-40 disabled:cursor-not-allowed text-sm"
            >
              <PlayCircle size={16} />
              {isProcessing ? 'Processing...' : 'Run Autonomous Workflow'}
            </button>
          </div>
        </div>
      </motion.section>

      {/* Agent Pipeline */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="glass-panel-solid p-8"
      >
        <div className="flex items-center mb-10">
          <h2 className="text-sm uppercase tracking-[0.2em] text-muted-foreground font-bold">
            Execution Pipeline
          </h2>
          <div className="h-px flex-1 ml-6 bg-gradient-to-r from-border to-transparent" />
        </div>

        <div className="grid grid-cols-5 gap-6 relative">
          {/* Connection line */}
          <div className="absolute top-14 left-[10%] right-[10%] h-[2px] bg-border z-0" />
          {currentStep >= 0 && (
            <motion.div
              className="absolute top-14 left-[10%] h-[2px] bg-primary z-[1]"
              initial={{ width: '0%' }}
              animate={{
                width: `${Math.min(100, (Math.min(currentStep, agents.length) / (agents.length - 1)) * 80)}%`,
              }}
              transition={{ duration: 0.8, ease: 'easeInOut' }}
            />
          )}

          {agents.map((agent, index) => {
            const Icon = agentIcons[index];
            const isActive = currentStep === index;
            const isDone = currentStep > index;
            const isPending = currentStep < index;

            return (
              <div key={agent.id} className="relative z-10 flex flex-col items-center">
                <motion.div
                  animate={{
                    scale: isActive ? 1.1 : 1,
                    borderColor: isActive
                      ? 'hsl(187 80% 50%)'
                      : isDone
                      ? 'hsl(155 60% 48%)'
                      : 'hsl(220 15% 18%)',
                  }}
                  className={`w-[72px] h-[72px] rounded-2xl border-2 flex items-center justify-center mb-4 transition-all duration-500 ${
                    isActive ? 'glow-primary bg-primary/10' : isDone ? 'glow-success bg-success/10' : 'bg-secondary/30'
                  }`}
                >
                  {isActive ? (
                    <Loader2 className="text-primary animate-spin" size={28} />
                  ) : isDone ? (
                    <Check className="text-success" size={28} />
                  ) : (
                    <Icon className={isPending ? 'text-muted-foreground' : 'text-foreground'} size={28} />
                  )}
                </motion.div>

                <h3
                  className={`text-xs font-bold mb-2 text-center ${
                    isActive ? 'text-primary' : isDone ? 'text-success' : 'text-muted-foreground'
                  }`}
                >
                  {agent.name}
                </h3>

                <div className="h-12 text-center flex items-start justify-center">
                  <AnimatePresence mode="wait">
                    {isActive && (
                      <motion.p
                        key="running"
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -5 }}
                        className="text-[10px] text-primary/80 font-mono leading-tight"
                      >
                        {agent.log}
                      </motion.p>
                    )}
                    {isDone && (
                      <motion.span
                        key="done"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-[10px] text-success font-bold uppercase tracking-wider"
                      >
                        Verified ✓
                      </motion.span>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            );
          })}
        </div>

        {/* Completion banner */}
        <AnimatePresence>
          {allDone && (
            <motion.div
              initial={{ opacity: 0, y: 10, height: 0 }}
              animate={{ opacity: 1, y: 0, height: 'auto' }}
              exit={{ opacity: 0 }}
              className="mt-8 p-6 rounded-xl bg-success/10 border border-success/20 flex items-center gap-4"
            >
              <div className="w-10 h-10 rounded-full bg-success/20 flex items-center justify-center glow-success">
                <Check className="text-success" size={20} />
              </div>
              <div>
                <h3 className="text-sm font-bold text-success">Workflow Complete</h3>
                <p className="text-xs text-success/70 mt-0.5">
                  All 5 agents executed successfully. 5 tasks created, 3 assigned, monitoring active.
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.section>
    </div>
  );
};

export default WorkflowPage;
