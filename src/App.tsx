import { useState } from 'react';
import { Sidebar, TopBar } from './components/Navigation';
import { QuickStats } from './components/dashboard/QuickStats';
import { MapWidget } from './components/dashboard/MapWidget';
import { StatusTracker } from './components/dashboard/StatusTracker';
import { EcoChart } from './components/dashboard/EcoChart';
import { PremiumCard } from './components/dashboard/PremiumCard';
import { OrdersTable } from './components/dashboard/OrdersTable';
import { AuthProvider, useAuth } from './context/AuthContext';
import { AuthScreen } from './components/auth/AuthScreen';
import { NewOrderModal } from './components/dashboard/NewOrderModal';
import { Services } from './components/pages/Services';
import { Pricing } from './components/pages/Pricing';
import { EcoImpact } from './components/pages/EcoImpact';
import { Settings } from './components/pages/Settings';

function DashboardContent() {
  return (
    <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Left Column */}
      <div className="space-y-6 lg:col-span-1">
        <QuickStats />
        <StatusTracker />
        <EcoChart />
        
        {/* Premium Card - Visual break or bottom anchor */}
        <div className="h-48">
          <PremiumCard />
        </div>
      </div>

      {/* Right Column */}
      <div className="space-y-6 lg:col-span-2 flex flex-col">
        {/* Map Section - Takes up significant height */}
        <div className="flex-1 min-h-[500px]">
          <MapWidget />
        </div>
        
        {/* Orders Table */}
        <div className="flex-1">
          <OrdersTable />
        </div>
      </div>
    </div>
  );
}

function Dashboard() {
  const { user } = useAuth();
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
  const [currentView, setCurrentView] = useState('dashboard');

  if (!user) {
    return <AuthScreen />;
  }

  const renderContent = () => {
    switch (currentView) {
      case 'services':
        return <Services />;
      case 'pricing':
        return <Pricing />;
      case 'eco-impact':
        return <EcoImpact />;
      case 'settings':
        return <Settings />;
      default:
        return <DashboardContent />;
    }
  };

  return (
    <div className="min-h-screen bg-background text-white font-sans selection:bg-primary selection:text-white">
      <Sidebar 
        onNewOrder={() => setIsOrderModalOpen(true)} 
        currentView={currentView}
        onNavigate={setCurrentView}
      />
      <TopBar />
      
      <main className="lg:ml-64 p-6 lg:p-8">
        <div className="max-w-7xl mx-auto">
          {renderContent()}
        </div>
      </main>

      <NewOrderModal 
        isOpen={isOrderModalOpen} 
        onClose={() => setIsOrderModalOpen(false)} 
      />
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <Dashboard />
    </AuthProvider>
  );
}
