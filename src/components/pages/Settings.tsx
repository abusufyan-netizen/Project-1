import { useState } from 'react';
import { Card } from '../ui/Card';
import { useAuth } from '../../context/AuthContext';
import { User, Bell, Shield, CreditCard, Mail } from 'lucide-react';
import { NotificationToggle } from '../ui/NotificationToggle';

export function Settings() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('profile');

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-white">Account Settings</h2>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Settings Sidebar */}
        <div className="lg:col-span-1">
          <Card className="p-2">
            <nav className="space-y-1">
              <SettingsTab 
                active={activeTab === 'profile'} 
                onClick={() => setActiveTab('profile')} 
                icon={<User />} 
                label="Profile" 
              />
              <SettingsTab 
                active={activeTab === 'notifications'} 
                onClick={() => setActiveTab('notifications')} 
                icon={<Bell />} 
                label="Notifications" 
              />
              <SettingsTab 
                active={activeTab === 'billing'} 
                onClick={() => setActiveTab('billing')} 
                icon={<CreditCard />} 
                label="Billing" 
              />
              <SettingsTab 
                active={activeTab === 'security'} 
                onClick={() => setActiveTab('security')} 
                icon={<Shield />} 
                label="Security" 
              />
            </nav>
          </Card>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-3">
          <Card>
            {activeTab === 'profile' && (
              <div className="space-y-6">
                <h3 className="text-lg font-medium text-white border-b border-white/5 pb-4">Profile Information</h3>
                
                <div className="flex items-center gap-6">
                  <img 
                    src={`https://ui-avatars.com/api/?name=${user?.name || 'User'}&background=f59e0b&color=fff&size=128`}
                    alt="Profile" 
                    className="w-24 h-24 rounded-full border-4 border-card shadow-xl"
                  />
                  <button className="bg-white/5 hover:bg-white/10 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                    Change Photo
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm text-text-secondary">Full Name</label>
                    <input 
                      type="text" 
                      defaultValue={user?.name}
                      className="w-full bg-background border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-primary/50"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm text-text-secondary">Email Address</label>
                    <div className="relative">
                      <Mail className="absolute left-4 top-3.5 w-4 h-4 text-text-secondary" />
                      <input 
                        type="email" 
                        defaultValue={user?.email}
                        className="w-full bg-background border border-white/10 rounded-xl pl-10 pr-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-primary/50"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm text-text-secondary">Phone Number</label>
                    <input 
                      type="tel" 
                      placeholder="+1 (555) 000-0000"
                      className="w-full bg-background border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-primary/50"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm text-text-secondary">Default Address</label>
                    <input 
                      type="text" 
                      placeholder="123 Main St, New York, NY"
                      className="w-full bg-background border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-primary/50"
                    />
                  </div>
                </div>

                <div className="pt-4 flex justify-end">
                  <button className="bg-primary text-white px-6 py-3 rounded-xl font-bold shadow-lg shadow-primary/20 hover:bg-amber-600 transition-colors">
                    Save Changes
                  </button>
                </div>
              </div>
            )}

            {activeTab === 'notifications' && (
              <div className="space-y-6">
                <h3 className="text-lg font-medium text-white border-b border-white/5 pb-4">Notification Preferences</h3>
                
                <div className="space-y-4">
                  <NotificationToggle 
                    title="Order Updates" 
                    description="Get notified when your clothes are picked up, cleaning, or ready."
                    defaultChecked={true}
                  />
                  <NotificationToggle 
                    title="Promotions & Offers" 
                    description="Receive exclusive deals and eco-impact reports."
                    defaultChecked={false}
                  />
                  <NotificationToggle 
                    title="Driver Arrival" 
                    description="Real-time alerts when your driver is nearby."
                    defaultChecked={true}
                  />
                  <NotificationToggle 
                    title="Email Digest" 
                    description="Weekly summary of your cleaning stats and savings."
                    defaultChecked={true}
                  />
                </div>
              </div>
            )}

            {activeTab === 'billing' && (
              <div className="space-y-6">
                <h3 className="text-lg font-medium text-white border-b border-white/5 pb-4">Payment Methods</h3>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/10">
                    <div className="flex items-center gap-4">
                      <div className="p-2 bg-white/10 rounded-lg">
                        <CreditCard className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <p className="font-medium text-white">Visa ending in 4242</p>
                        <p className="text-sm text-text-secondary">Expires 12/28</p>
                      </div>
                    </div>
                    <span className="px-3 py-1 bg-primary/20 text-primary text-xs font-bold rounded-full">Default</span>
                  </div>
                  
                  <button className="w-full py-3 border border-dashed border-white/20 rounded-xl text-text-secondary hover:text-white hover:border-white/40 transition-colors flex items-center justify-center gap-2">
                    <CreditCard className="w-4 h-4" />
                    Add New Card
                  </button>
                </div>

                <h3 className="text-lg font-medium text-white border-b border-white/5 pb-4 pt-4">Billing History</h3>
                <div className="space-y-2">
                  {[
                    { date: 'Jan 15, 2026', amount: '$45.00', status: 'Paid' },
                    { date: 'Jan 01, 2026', amount: '$49.00', status: 'Paid' },
                    { date: 'Dec 15, 2025', amount: '$32.50', status: 'Paid' },
                  ].map((invoice, i) => (
                    <div key={i} className="flex justify-between items-center p-3 hover:bg-white/5 rounded-lg transition-colors">
                      <div>
                        <p className="text-sm text-white">Invoice #{2026001 + i}</p>
                        <p className="text-xs text-text-secondary">{invoice.date}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium text-white">{invoice.amount}</p>
                        <p className="text-xs text-secondary">{invoice.status}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'security' && (
              <div className="space-y-6">
                <h3 className="text-lg font-medium text-white border-b border-white/5 pb-4">Security Settings</h3>
                
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm text-text-secondary">Current Password</label>
                    <input 
                      type="password" 
                      className="w-full bg-background border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-primary/50"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm text-text-secondary">New Password</label>
                    <input 
                      type="password" 
                      className="w-full bg-background border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-primary/50"
                    />
                  </div>
                  <button className="bg-white/10 text-white px-6 py-3 rounded-xl font-medium hover:bg-white/20 transition-colors">
                    Update Password
                  </button>
                </div>

                <div className="pt-6 border-t border-white/5">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-white font-medium">Two-Factor Authentication</h4>
                      <p className="text-sm text-text-secondary">Add an extra layer of security to your account.</p>
                    </div>
                    <button className="bg-secondary/20 text-secondary px-4 py-2 rounded-lg text-sm font-bold hover:bg-secondary/30 transition-colors">
                      Enable 2FA
                    </button>
                  </div>
                </div>
              </div>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
}

function SettingsTab({ active, onClick, icon, label }: { active: boolean, onClick: () => void, icon: React.ReactNode, label: string }) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
        active 
          ? 'bg-primary/10 text-primary font-medium' 
          : 'text-text-secondary hover:bg-white/5 hover:text-white'
      }`}
    >
      <div className="[&>svg]:w-5 [&>svg]:h-5">{icon}</div>
      <span>{label}</span>
    </button>
  );
}
