import { 
  LayoutDashboard, 
  Shirt, 
  CreditCard, 
  Leaf, 
  Settings, 
  Bell, 
  Search,
  Menu,
  LogOut,
  PlusCircle
} from 'lucide-react';
import { ReactNode } from 'react';
import { useAuth } from '../context/AuthContext';

interface SidebarProps {
  onNewOrder: () => void;
  currentView: string;
  onNavigate: (view: string) => void;
}

export function Sidebar({ onNewOrder, currentView, onNavigate }: SidebarProps) {
  const { user, logout } = useAuth();

  return (
    <aside className="w-64 fixed left-0 top-0 h-full bg-card border-r border-white/5 flex flex-col z-50 hidden lg:flex">
      <div className="p-6 flex items-center gap-3">
        <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center shadow-[0_0_15px_rgba(245,158,11,0.4)]">
          <Shirt className="w-5 h-5 text-white" />
        </div>
        <span className="text-xl font-bold tracking-tight text-white">New Shine</span>
      </div>

      <div className="px-4 mb-4">
        <button 
          onClick={onNewOrder}
          className="w-full bg-gradient-to-r from-primary to-amber-600 text-white p-3 rounded-xl font-medium shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2"
        >
          <PlusCircle className="w-5 h-5" />
          New Order
        </button>
      </div>

      <nav className="flex-1 px-4 space-y-2">
        <NavItem 
          icon={<LayoutDashboard />} 
          label="Dashboard" 
          active={currentView === 'dashboard'} 
          onClick={() => onNavigate('dashboard')}
        />
        <NavItem 
          icon={<Shirt />} 
          label="Services" 
          active={currentView === 'services'} 
          onClick={() => onNavigate('services')}
        />
        <NavItem 
          icon={<CreditCard />} 
          label="Pricing" 
          active={currentView === 'pricing'} 
          onClick={() => onNavigate('pricing')}
        />
        <NavItem 
          icon={<Leaf />} 
          label="Eco-Impact" 
          active={currentView === 'eco-impact'} 
          onClick={() => onNavigate('eco-impact')}
        />
        <NavItem 
          icon={<Settings />} 
          label="Settings" 
          active={currentView === 'settings'} 
          onClick={() => onNavigate('settings')}
        />
      </nav>

      <div className="p-6 border-t border-white/5">
        <div className="flex items-center gap-3 mb-4">
          <img 
            src={`https://ui-avatars.com/api/?name=${user?.name || 'User'}&background=f59e0b&color=fff`}
            alt="User" 
            className="w-10 h-10 rounded-full border-2 border-primary"
          />
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-white truncate">{user?.name}</p>
            <p className="text-xs text-text-secondary truncate">{user?.email}</p>
          </div>
        </div>
        <button 
          onClick={logout}
          className="flex items-center gap-2 text-text-secondary hover:text-red-400 transition-colors text-sm w-full"
        >
          <LogOut className="w-4 h-4" />
          Sign Out
        </button>
      </div>
    </aside>
  );
}

function NavItem({ icon, label, active = false, onClick }: { icon: ReactNode, label: string, active?: boolean, onClick: () => void }) {
  return (
    <button 
      onClick={onClick}
      className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${
        active 
          ? 'bg-primary/10 text-primary border border-primary/20 shadow-[0_0_10px_rgba(245,158,11,0.1)]' 
          : 'text-text-secondary hover:bg-white/5 hover:text-white'
      }`}
    >
      {/* Clone icon to add size/stroke classes if needed, or rely on parent styles */}
      <div className="[&>svg]:w-5 [&>svg]:h-5">{icon}</div>
      <span className="font-medium">{label}</span>
    </button>
  );
}

export function TopBar() {
  const { user } = useAuth();

  return (
    <header className="h-20 border-b border-white/5 bg-background/80 backdrop-blur-md sticky top-0 z-40 flex items-center justify-between px-6 lg:px-8 ml-0 lg:ml-64 transition-all">
      <div className="flex items-center gap-4 text-text-secondary">
        <button className="lg:hidden p-2 -ml-2 hover:bg-white/5 rounded-lg text-white">
          <Menu className="w-6 h-6" />
        </button>
        <span className="text-sm hidden sm:inline-block">Welcome back, <span className="text-primary font-medium">{user?.name.split(' ')[0]}</span>!</span>
        <span className="text-sm sm:hidden font-bold text-white">New Shine</span>
      </div>

      <div className="flex items-center gap-6">
        <div className="relative">
          <Search className="w-5 h-5 text-text-secondary" />
        </div>
        <div className="relative">
          <Bell className="w-5 h-5 text-text-secondary hover:text-white cursor-pointer transition-colors" />
          <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-secondary rounded-full border-2 border-background shadow-[0_0_8px_#10b981]"></span>
        </div>
      </div>
    </header>
  );
}
