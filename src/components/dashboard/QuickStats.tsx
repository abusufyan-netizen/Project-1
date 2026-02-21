import { Clock, ShieldCheck, Leaf, Shirt } from 'lucide-react';
import { ReactNode } from 'react';
import { Card } from '../ui/Card';
import { useAuth } from '../../context/AuthContext';
import { motion } from 'motion/react';

export function QuickStats() {
  const { user } = useAuth();
  const itemsCleaned = user?.items_cleaned || 0;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-6">
      <StatItem 
        icon={<Clock className="text-primary" />} 
        label="Avg. Turnaround" 
        value="24 Hrs" 
        trend="+2 hrs faster"
        delay={0}
      />
      <StatItem 
        icon={<ShieldCheck className="text-secondary" />} 
        label="Quality Guarantee" 
        value="100%" 
        subtext="Refund Policy Active"
        delay={0.1}
      />
      <StatItem 
        icon={<Leaf className="text-green-400" />} 
        label="Carbon Saved" 
        value="12 kg" 
        trend="Eco-friendly choice"
        delay={0.2}
      />
      <StatItem 
        icon={<Shirt className="text-blue-400" />} 
        label="Items Cleaned" 
        value={itemsCleaned.toString()} 
        subtext="Lifetime Total"
        delay={0.3}
      />
    </div>
  );
}

function StatItem({ icon, label, value, trend, subtext, delay }: { icon: ReactNode, label: string, value: string, trend?: string, subtext?: string, delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay }}
    >
      <Card className="hover:bg-white/5 transition-colors cursor-pointer group border-l-4 border-l-transparent hover:border-l-primary">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm text-text-secondary mb-1">{label}</p>
            <h4 className="text-2xl font-bold text-white mb-1 group-hover:text-primary transition-colors">{value}</h4>
            {trend && <p className="text-xs text-secondary font-medium">{trend}</p>}
            {subtext && <p className="text-xs text-text-secondary">{subtext}</p>}
          </div>
          <div className="p-3 bg-white/5 rounded-xl group-hover:bg-primary/20 group-hover:scale-110 transition-all duration-300">
            {icon}
          </div>
        </div>
      </Card>
    </motion.div>
  );
}
