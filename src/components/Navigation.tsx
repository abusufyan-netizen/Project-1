import { 
  LayoutDashboard, 
  Shirt, 
  CreditCard, 
  Leaf, 
  Settings, 
  Bell, 
  Search,
  Menu
} from 'lucide-react';
import { ReactNode } from 'react';

export function Sidebar() {
  return (
    <aside className="w-64 fixed left-0 top-0 h-full bg-card border-r border-white/5 flex flex-col z-50 hidden lg:flex">
      <div className="p-6 flex items-center gap-3">
        <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
          <Shirt className="w-5 h-5 text-white" />
        </div>
        <span className="text-xl font-bold tracking-tight">Crisp</span>
      </div>

      <nav className="flex-1 px-4 py-6 space-y-2">
        <NavItem icon={<LayoutDashboard />} label="Dashboard" active />
        <NavItem icon={<Shirt />} label="Services" />
        <NavItem icon={<CreditCard />} label="Pricing" />
        <NavItem icon={<Leaf />} label="Eco-Impact" />
        <NavItem icon={<Settings />} label="Settings" />
      </nav>

      <div className="p-6 border-t border-white/5">
        <div className="flex items-center gap-3">
          <img 
            src="https://picsum.photos/seed/user/40/40" 
            alt="User" 
            className="w-10 h-10 rounded-full border-2 border-primary"
            referrerPolicy="no-referrer"
          />
          <div>
            <p className="text-sm font-medium text-white">Alex Morgan</p>
            <p className="text-xs text-text-secondary">Premium Member</p>
          </div>
        </div>
      </div>
    </aside>
  );
}

function NavItem({ icon, label, active = false }: { icon: ReactNode, label: string, active?: boolean }) {
  return (
    <a 
      href="#" 
      className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${
        active 
          ? 'bg-primary text-white shadow-lg shadow-primary/20' 
          : 'text-text-secondary hover:bg-white/5 hover:text-white'
      }`}
    >
      {/* Clone icon to add size/stroke classes if needed, or rely on parent styles */}
      <div className="[&>svg]:w-5 [&>svg]:h-5">{icon}</div>
      <span className="font-medium">{label}</span>
    </a>
  );
}

export function TopBar() {
  return (
    <header className="h-20 border-b border-white/5 bg-background/80 backdrop-blur-md sticky top-0 z-40 flex items-center justify-between px-6 lg:px-8 ml-0 lg:ml-64 transition-all">
      <div className="flex items-center gap-4 text-text-secondary">
        <button className="lg:hidden p-2 -ml-2 hover:bg-white/5 rounded-lg text-white">
          <Menu className="w-6 h-6" />
        </button>
        <span className="text-sm hidden sm:inline-block">Welcome back, Alex!</span>
        <span className="text-sm sm:hidden font-bold text-white">Crisp</span>
      </div>

      <div className="flex items-center gap-6">
        <div className="relative">
          <Search className="w-5 h-5 text-text-secondary" />
        </div>
        <div className="relative">
          <Bell className="w-5 h-5 text-text-secondary hover:text-white cursor-pointer transition-colors" />
          <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-secondary rounded-full border-2 border-background"></span>
        </div>
      </div>
    </header>
  );
}
