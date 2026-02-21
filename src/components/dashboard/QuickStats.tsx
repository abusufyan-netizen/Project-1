import { Clock, ShieldCheck, Leaf, Shirt } from 'lucide-react';
import { ReactNode } from 'react';
import { Card } from '../ui/Card';

export function QuickStats() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-6">
      <StatItem 
        icon={<Clock className="text-primary" />} 
        label="Avg. Turnaround" 
        value="24 Hrs" 
        trend="+2 hrs faster"
      />
      <StatItem 
        icon={<ShieldCheck className="text-secondary" />} 
        label="Quality Guarantee" 
        value="100%" 
        subtext="Refund Policy Active"
      />
      <StatItem 
        icon={<Leaf className="text-green-400" />} 
        label="Carbon Saved" 
        value="12 kg" 
        trend="Eco-friendly choice"
      />
      <StatItem 
        icon={<Shirt className="text-blue-400" />} 
        label="Items Cleaned" 
        value="73" 
        subtext="Lifetime Total"
      />
    </div>
  );
}

function StatItem({ icon, label, value, trend, subtext }: { icon: ReactNode, label: string, value: string, trend?: string, subtext?: string }) {
  return (
    <Card className="hover:bg-white/5 transition-colors cursor-pointer group">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-text-secondary mb-1">{label}</p>
          <h4 className="text-2xl font-bold text-white mb-1">{value}</h4>
          {trend && <p className="text-xs text-secondary font-medium">{trend}</p>}
          {subtext && <p className="text-xs text-text-secondary">{subtext}</p>}
        </div>
        <div className="p-3 bg-white/5 rounded-xl group-hover:bg-white/10 transition-colors">
          {icon}
        </div>
      </div>
    </Card>
  );
}
