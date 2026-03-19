import { Bell, Search } from 'lucide-react';

interface TopHeaderProps {
  title: string;
}

const TopHeader = ({ title }: TopHeaderProps) => {
  return (
    <header className="h-16 glass-panel-solid flex items-center justify-between px-8 shrink-0">
      <div>
        <h1 className="text-lg font-semibold text-foreground capitalize">
          {title.replace('-', ' ')}
        </h1>
        <div className="flex items-center gap-2 mt-0.5">
          <div className="w-2 h-2 rounded-full bg-success animate-pulse-glow" />
          <span className="text-[10px] uppercase tracking-[0.2em] text-success font-bold">
            System Active
          </span>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <button className="w-9 h-9 rounded-lg bg-secondary/60 border border-border flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors">
          <Search size={16} />
        </button>
        <button className="w-9 h-9 rounded-lg bg-secondary/60 border border-border flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors relative">
          <Bell size={16} />
          <div className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-destructive border-2 border-card" />
        </button>
        <div className="px-3 py-1.5 bg-secondary/60 rounded-lg border border-border text-[10px] font-mono text-muted-foreground">
          v2.4.0
        </div>
      </div>
    </header>
  );
};

export default TopHeader;
