import { LayoutDashboard, PlayCircle, CheckSquare, Cpu, Terminal } from 'lucide-react';
import { motion } from 'framer-motion';

interface AppSidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const navItems = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'workflow', label: 'Run Workflow', icon: PlayCircle },
  { id: 'tasks', label: 'Tasks', icon: CheckSquare },
  { id: 'activity', label: 'Agent Activity', icon: Cpu },
  { id: 'audit', label: 'Audit Logs', icon: Terminal },
];

const AppSidebar = ({ activeTab, onTabChange }: AppSidebarProps) => {
  return (
    <aside className="w-64 glass-panel-solid flex flex-col p-6 shrink-0">
      {/* Logo */}
      <div className="flex items-center gap-3 mb-12 px-2">
        <div className="w-9 h-9 bg-primary rounded-lg flex items-center justify-center glow-primary">
          <Cpu className="text-primary-foreground" size={20} />
        </div>
        <span className="text-xl font-bold tracking-tight text-foreground">
          AutoOps
        </span>
      </div>

      {/* Navigation */}
      <nav className="space-y-1.5 flex-1">
        {navItems.map((item) => {
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 relative ${
                isActive
                  ? 'text-primary'
                  : 'text-muted-foreground hover:text-foreground hover:bg-secondary/50'
              }`}
            >
              {isActive && (
                <motion.div
                  layoutId="sidebar-active"
                  className="absolute inset-0 bg-primary/10 rounded-xl border border-primary/20"
                  transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                />
              )}
              <item.icon size={18} className="relative z-10" />
              <span className="font-medium text-sm relative z-10">{item.label}</span>
            </button>
          );
        })}
      </nav>

      {/* User */}
      <div className="mt-auto pt-6 border-t border-border flex items-center gap-3 px-2">
        <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-primary to-blue-500 flex items-center justify-center text-primary-foreground text-xs font-bold">
          AR
        </div>
        <div className="text-xs">
          <p className="text-foreground font-semibold">Alex Rivers</p>
          <p className="text-muted-foreground">Ops Lead</p>
        </div>
      </div>
    </aside>
  );
};

export default AppSidebar;
