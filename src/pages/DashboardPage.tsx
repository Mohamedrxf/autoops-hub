import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, ArrowRight, Activity, Zap, Users, ShieldCheck } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, AreaChart, Area, PieChart, Pie, Cell } from 'recharts';
import { kpiData, activityFeed, weeklyTaskData, agentPerformance } from '@/data/mockData';

const colorMap = {
  primary: { text: 'text-primary', bg: 'bg-primary/10', glow: 'glow-primary', hex: 'hsl(187, 80%, 50%)' },
  success: { text: 'text-success', bg: 'bg-success/10', glow: 'glow-success', hex: 'hsl(155, 60%, 48%)' },
  warning: { text: 'text-warning', bg: 'bg-warning/10', glow: 'glow-warning', hex: 'hsl(38, 80%, 55%)' },
};

const activityDotMap = {
  info: 'bg-primary',
  success: 'bg-success',
  warning: 'bg-warning',
  destructive: 'bg-destructive',
};

const statusDistribution = [
  { name: 'Completed', value: 942, color: 'hsl(155, 60%, 48%)' },
  { name: 'In Progress', value: 215, color: 'hsl(187, 80%, 50%)' },
  { name: 'Pending', value: 124, color: 'hsl(215, 15%, 55%)' },
  { name: 'Delayed', value: 3, color: 'hsl(0, 72%, 55%)' },
];

const sparkData = [
  [4, 6, 5, 8, 7, 9, 11, 10, 12],
  [8, 7, 9, 6, 8, 7, 9, 10, 9],
  [2, 3, 2, 4, 3, 3, 4, 3, 4],
  [1, 2, 1, 0, 1, 0, 1, 0, 0],
];

const MiniSparkline = ({ data, color }: { data: number[]; color: string }) => {
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;
  const w = 80;
  const h = 28;
  const points = data.map((v, i) => `${(i / (data.length - 1)) * w},${h - ((v - min) / range) * h}`).join(' ');
  return (
    <svg width={w} height={h} className="mt-2">
      <polyline points={points} fill="none" stroke={color} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
};

const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload) return null;
  return (
    <div className="glass-panel-solid p-3 text-xs border border-glass-border">
      <p className="text-muted-foreground mb-1">{label}</p>
      {payload.map((p: any, i: number) => (
        <p key={i} style={{ color: p.color }} className="font-semibold">
          {p.name}: {p.value}
        </p>
      ))}
    </div>
  );
};

const DashboardPage = () => {
  return (
    <div className="space-y-5">
      {/* KPI Cards */}
      <div className="grid grid-cols-4 gap-4">
        {kpiData.map((stat, i) => {
          const c = colorMap[stat.color];
          return (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08, duration: 0.5 }}
              className="glass-panel p-5 group hover:border-primary/30 transition-all duration-300 cursor-default"
            >
              <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-[0.15em] mb-2">
                {stat.label}
              </p>
              <div className="flex items-end justify-between">
                <div>
                  <h3 className={`text-3xl font-bold ${c.text}`} style={{ fontVariantNumeric: 'tabular-nums' }}>
                    {stat.value}
                  </h3>
                  <MiniSparkline data={sparkData[i]} color={c.hex} />
                </div>
                <span className={`text-[10px] font-mono ${c.bg} ${c.text} px-2 py-1 rounded-md flex items-center gap-1`}>
                  {stat.trendUp ? <TrendingUp size={10} /> : <TrendingDown size={10} />}
                  {stat.trend}
                </span>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-3 gap-4">
        {/* Weekly Tasks Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
          className="col-span-2 glass-panel p-6"
        >
          <h2 className="text-sm uppercase tracking-[0.15em] text-muted-foreground font-bold mb-6">
            Weekly Task Flow
          </h2>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={weeklyTaskData} barGap={4}>
              <XAxis dataKey="day" tick={{ fill: 'hsl(215,15%,55%)', fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: 'hsl(215,15%,55%)', fontSize: 11 }} axisLine={false} tickLine={false} width={30} />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="created" fill="hsl(187,80%,50%)" radius={[4, 4, 0, 0]} name="Created" opacity={0.8} />
              <Bar dataKey="completed" fill="hsl(155,60%,48%)" radius={[4, 4, 0, 0]} name="Completed" opacity={0.8} />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Status Distribution */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="glass-panel p-6"
        >
          <h2 className="text-sm uppercase tracking-[0.15em] text-muted-foreground font-bold mb-4">
            Status Distribution
          </h2>
          <ResponsiveContainer width="100%" height={150}>
            <PieChart>
              <Pie data={statusDistribution} cx="50%" cy="50%" innerRadius={40} outerRadius={65} dataKey="value" strokeWidth={0}>
                {statusDistribution.map((entry, i) => (
                  <Cell key={i} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          <div className="space-y-2 mt-2">
            {statusDistribution.map((s) => (
              <div key={s.name} className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full" style={{ background: s.color }} />
                  <span className="text-muted-foreground">{s.name}</span>
                </div>
                <span className="font-mono text-foreground font-semibold">{s.value}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Agent Performance + Activity */}
      <div className="grid grid-cols-2 gap-4">
        {/* Agent Performance */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="glass-panel p-6"
        >
          <h2 className="text-sm uppercase tracking-[0.15em] text-muted-foreground font-bold mb-5">
            Agent Performance
          </h2>
          <div className="space-y-4">
            {agentPerformance.map((agent, i) => (
              <motion.div
                key={agent.name}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.55 + i * 0.06 }}
                className="flex items-center gap-4"
              >
                <div className="w-20 text-xs font-semibold text-foreground">{agent.name}</div>
                <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${agent.accuracy}%` }}
                    transition={{ delay: 0.7 + i * 0.08, duration: 0.8, ease: 'easeOut' }}
                    className="h-full rounded-full"
                    style={{
                      background: agent.accuracy > 95
                        ? 'hsl(155, 60%, 48%)'
                        : agent.accuracy > 90
                        ? 'hsl(187, 80%, 50%)'
                        : 'hsl(38, 80%, 55%)',
                    }}
                  />
                </div>
                <span className="text-xs font-mono text-muted-foreground w-10 text-right">{agent.accuracy}%</span>
                <span className="text-[10px] text-muted-foreground font-mono w-12 text-right">{agent.avgTime}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Recent Activity */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55 }}
          className="glass-panel p-6"
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm uppercase tracking-[0.15em] text-muted-foreground font-bold">
              Live Feed
            </h2>
            <div className="flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-full bg-success animate-pulse-glow" />
              <span className="text-[10px] text-success font-bold">LIVE</span>
            </div>
          </div>
          <div className="space-y-2 max-h-[280px] overflow-y-auto scrollbar-thin">
            {activityFeed.slice(0, 7).map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 + i * 0.06 }}
                className="flex items-start gap-3 p-3 rounded-lg hover:bg-secondary/30 transition-colors"
              >
                <div className={`w-1.5 h-1.5 rounded-full mt-2 shrink-0 ${activityDotMap[item.type]}`} />
                <div className="min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="text-[10px] font-mono text-muted-foreground">{item.time}</span>
                    <span className="text-[10px] font-bold text-foreground">{item.agent}</span>
                  </div>
                  <p className="text-xs text-secondary-foreground leading-relaxed">{item.action}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* System Health Bar */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.65 }}
        className="glass-panel p-5"
      >
        <div className="grid grid-cols-4 gap-6">
          {[
            { icon: Activity, label: 'System Uptime', value: '99.97%', sub: 'Last 30 days', color: 'text-success' },
            { icon: Zap, label: 'Avg Response', value: '1.1s', sub: 'Per agent cycle', color: 'text-primary' },
            { icon: Users, label: 'Active Users', value: '24', sub: 'Online now', color: 'text-primary' },
            { icon: ShieldCheck, label: 'AI Accuracy', value: '95.4%', sub: 'Aggregate score', color: 'text-success' },
          ].map((stat, i) => (
            <div key={i} className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-secondary/60 flex items-center justify-center">
                <stat.icon className={stat.color} size={18} />
              </div>
              <div>
                <p className={`text-lg font-bold ${stat.color}`} style={{ fontVariantNumeric: 'tabular-nums' }}>{stat.value}</p>
                <p className="text-[10px] text-muted-foreground">{stat.label} · {stat.sub}</p>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default DashboardPage;
