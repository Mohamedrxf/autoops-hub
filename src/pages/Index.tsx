import { useState } from 'react';
import BackgroundVideo from '@/components/BackgroundVideo';
import AppSidebar from '@/components/AppSidebar';
import TopHeader from '@/components/TopHeader';
import DashboardPage from '@/pages/DashboardPage';
import WorkflowPage from '@/pages/WorkflowPage';
import TasksPage from '@/pages/TasksPage';
import AgentActivityPage from '@/pages/AgentActivityPage';
import AuditLogPage from '@/pages/AuditLogPage';
import { AnimatePresence, motion } from 'framer-motion';

const titleMap: Record<string, string> = {
  dashboard: 'Dashboard',
  workflow: 'Run Workflow',
  tasks: 'Tasks',
  activity: 'Agent Activity',
  audit: 'Audit Logs',
};

const pageMap: Record<string, React.FC> = {
  dashboard: DashboardPage,
  workflow: WorkflowPage,
  tasks: TasksPage,
  activity: AgentActivityPage,
  audit: AuditLogPage,
};

const Index = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const PageComponent = pageMap[activeTab] || DashboardPage;

  return (
    <div className="min-h-screen w-full overflow-hidden relative">
      <BackgroundVideo />

      <div className="relative z-10 flex h-screen p-4 gap-4">
        <AppSidebar activeTab={activeTab} onTabChange={setActiveTab} />

        <main className="flex-1 flex flex-col gap-4 overflow-hidden min-w-0">
          <TopHeader title={titleMap[activeTab] || 'Dashboard'} />

          <div className="flex-1 overflow-y-auto pr-1 scrollbar-thin">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
              >
                <PageComponent />
              </motion.div>
            </AnimatePresence>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Index;
