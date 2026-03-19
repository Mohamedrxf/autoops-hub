import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, ArrowRight } from 'lucide-react';
import { kpiData, activityFeed } from '@/data/mockData';

const colorMap = {
  primary: { text: 'text-primary', bg: 'bg-primary/10', glow: 'glow-primary' },
  success: { text: 'text-success', bg: 'bg-success/10', glow: 'glow-success' },
  warning: { text: 'text-warning', bg: 'bg-warning/10', glow: 'glow-warning' },
};

const activityTypeMap = {
  info: 'bg-primary/20 border-primary/30',
  success: 'bg-success/20 border-success/30',
  warning: 'bg-warning/20 border-warning/30',
  destructive: 'bg-destructive/20 border-destructive/30',
};

const activityDotMap = {
  info: 'bg-primary',
  success: 'bg-success',
  warning: 'bg-warning',
  destructive: 'bg-destructive',
};

const DashboardPage = () => {
  return (
    <div className="space-y-6">
      {/* KPI Cards */}
      <div className="grid grid-cols-4 gap-4">
        {kpiData.map((stat, i) => {
          const c = colorMap[stat.color];
          return (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="glass-panel-solid p-6 group hover:border-primary/30 transition-all duration-300 cursor-default"
            >
              <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-[0.15em] mb-3">
                {stat.label}
              </p>
              <div className="flex items-end justify-between">
                <h3 className={`text-3xl font-bold ${c.text}`} style={{ fontVariantNumeric: 'tabular-nums' }}>
                  {stat.value}
                </h3>
                <span className={`text-[10px] font-mono ${c.bg} ${c.text} px-2 py-1 rounded-md flex items-center gap-1`}>
                  {stat.trendUp ? <TrendingUp size={10} /> : <TrendingDown size={10} />}
                  {stat.trend}
                </span>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Recent Activity */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.5 }}
        className="glass-panel-solid p-8"
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-sm uppercase tracking-[0.15em] text-muted-foreground font-bold">
            Recent Activity
          </h2>
          <button className="text-xs text-primary flex items-center gap-1 hover:underline">
            View all <ArrowRight size={12} />
          </button>
        </div>

        <div className="space-y-3">
          {activityFeed.slice(0, 5).map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 + i * 0.08 }}
              className={`flex items-start gap-4 p-4 rounded-xl border ${activityTypeMap[item.type]} transition-all`}
            >
              <div className={`w-2 h-2 rounded-full mt-1.5 shrink-0 ${activityDotMap[item.type]}`} />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-mono text-muted-foreground">{item.time}</span>
                  <span className="text-xs font-semibold text-foreground">{item.agent}</span>
                </div>
                <p className="text-sm text-secondary-foreground">{item.action}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default DashboardPage;
