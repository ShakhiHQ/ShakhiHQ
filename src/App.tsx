import { useState } from 'react';
import { 
  BarChart3, 
  Package, 
  ShoppingBag, 
  Calendar, 
  Camera, 
  Leaf, 
  Menu, 
  X,
  Bell,
  Settings,
  Search
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import Inventory from './components/Inventory';
import Orders from './components/Orders';
import Workshops from './components/Workshops';
import ContentPlan from './components/ContentPlan';

type View = 'dashboard' | 'inventory' | 'orders' | 'workshops' | 'content';

export default function App() {
  const [currentView, setCurrentView] = useState<View>('dashboard');
  const [isSidebarOpen, setSidebarOpen] = useState(true);

  const navItems = [
    { id: 'dashboard', label: 'Overview', icon: BarChart3 },
    { id: 'inventory', label: 'Inventory', icon: Package },
    { id: 'orders', label: 'Orders', icon: ShoppingBag },
    { id: 'workshops', label: 'Workshops', icon: Calendar },
    { id: 'content', label: 'Content', icon: Camera },
  ] as const;

  const renderView = () => {
    switch (currentView) {
      case 'inventory': return <Inventory />;
      case 'orders': return <Orders />;
      case 'workshops': return <Workshops />;
      case 'content': return <ContentPlan />;
      default: return (
        <div className="space-y-8">
          <header>
            <h2 className="font-serif italic text-4xl text-sage-800">Welcome back, Parvathy</h2>
            <p className="text-sage-500 mt-2 font-sans">Here's what's happening with Shakhi today.</p>
          </header>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="organic-card col-span-1 lg:col-span-2 min-h-[400px] flex items-center justify-center text-sage-300 italic border-dashed">
              Dashboard Analytics & Trends Coming Soon...
            </div>
            <div className="space-y-6">
              <div className="organic-card">
                <h3 className="font-bold text-sage-800 mb-4 flex items-center gap-2">
                  <Bell size={18} className="text-sage-400" />
                  Recent Alerts
                </h3>
                <div className="space-y-3">
                  <div className="p-3 bg-amber-50 rounded-xl text-xs text-amber-700 flex items-start gap-2">
                    <span className="mt-0.5">•</span>
                    "Haworthia Fasciata" stock is critically low (8 left).
                  </div>
                  <div className="p-3 bg-blue-50 rounded-xl text-xs text-blue-700 flex items-start gap-2">
                    <span className="mt-0.5">•</span>
                    New workshop inquiry from @green_thumb_kerala.
                  </div>
                </div>
              </div>
              <div className="organic-card bg-sage-800 text-white border-none">
                <h3 className="font-bold mb-4 opacity-80">Quick Actions</h3>
                <div className="grid grid-cols-2 gap-2">
                  <button onClick={() => setCurrentView('orders')} className="p-3 bg-white/10 hover:bg-white/20 rounded-xl text-xs transition-colors">Log New Order</button>
                  <button onClick={() => setCurrentView('inventory')} className="p-3 bg-white/10 hover:bg-white/20 rounded-xl text-xs transition-colors">Stock Update</button>
                  <button onClick={() => setCurrentView('content')} className="p-3 bg-white/10 hover:bg-white/20 rounded-xl text-xs transition-colors">Draft Reel</button>
                  <button className="p-3 bg-white/10 hover:bg-white/20 rounded-xl text-xs transition-colors">Export Report</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }
  };

  return (
    <div className="min-h-screen flex text-sage-900 font-sans">
      {/* Sidebar Overlay for Mobile */}
      <AnimatePresence>
        {!isSidebarOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSidebarOpen(true)}
            className="fixed inset-0 bg-sage-900/20 backdrop-blur-sm z-40 lg:hidden"
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <aside className={`
        fixed lg:static inset-y-0 left-0 z-50
        w-64 bg-white border-r border-sage-100 flex flex-col transition-transform duration-300 ease-in-out
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <div className="p-8 flex items-center gap-3">
          <div className="w-10 h-10 bg-sage-800 rounded-2xl flex items-center justify-center text-sage-100 shadow-xl">
            <Leaf size={22} fill="currentColor" />
          </div>
          <div className="flex flex-col">
            <h1 className="font-serif italic text-xl leading-none text-sage-800">Shakhi</h1>
            <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-sage-400 mt-1">Management</span>
          </div>
        </div>

        <nav className="flex-1 px-4 py-4 space-y-2">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setCurrentView(item.id);
                // On mobile, close sidebar when navigating
                if (window.innerWidth < 1024) setSidebarOpen(false);
              }}
              className={`
                w-full flex items-center gap-3 px-4 py-3 rounded-2xl transition-all
                ${currentView === item.id 
                  ? 'bg-sage-50 text-sage-800 font-semibold shadow-sm' 
                  : 'text-sage-400 hover:text-sage-600 hover:bg-sage-50/50'}
              `}
            >
              <item.icon size={20} className={currentView === item.id ? 'text-sage-800' : 'text-sage-300'} />
              <span className="text-sm">{item.label}</span>
              {currentView === item.id && (
                <motion.div layoutId="active-nav" className="ml-auto w-1 h-4 bg-sage-800 rounded-full" />
              )}
            </button>
          ))}
        </nav>

        <div className="p-6 border-t border-sage-50">
          <div className="flex items-center gap-4 bg-sage-50 p-3 rounded-2xl">
            <div className="w-10 h-10 rounded-xl bg-sage-200 overflow-hidden">
               <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Parvathy" alt="Avatar" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-xs font-bold text-sage-800 truncate">Parvathy</div>
              <div className="text-[10px] text-sage-400">Owner</div>
            </div>
            <button className="text-sage-300 hover:text-sage-600">
              <Settings size={16} />
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-h-screen overflow-hidden">
        {/* Top Header */}
        <header className="h-16 bg-white/80 backdrop-blur-md border-b border-sage-100 flex items-center justify-between px-8 z-30 sticky top-0">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setSidebarOpen(!isSidebarOpen)}
              className="lg:hidden p-2 hover:bg-sage-50 rounded-xl transition-colors"
            >
              {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
            <div className="hidden md:flex items-center gap-2 text-sage-400 bg-sage-50/50 px-4 py-2 rounded-full border border-sage-100">
              <Search size={16} />
              <input type="text" placeholder="Global search..." className="bg-transparent text-sm focus:outline-none w-48" />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button className="relative p-2 text-sage-400 hover:text-sage-800 transition-colors">
              <div className="absolute top-1 right-1 w-2 h-2 bg-emerald-500 border-2 border-white rounded-full" />
              <Bell size={20} />
            </button>
            <div className="h-8 w-[1px] bg-sage-100" />
            <div className="text-sm text-sage-400 font-mono hidden sm:block">
              {new Date().toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
            </div>
          </div>
        </header>

        {/* View Container */}
        <div className="flex-1 overflow-y-auto p-4 md:p-8 lg:p-12 bg-sage-50/30">
          <div className="max-w-6xl mx-auto w-full">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentView}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                {renderView()}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </main>
    </div>
  );
}
