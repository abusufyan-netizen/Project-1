import { Leaf, Droplets, Wind, TreeDeciduous } from 'lucide-react';
import { Card } from '../ui/Card';
import { EcoChart } from '../dashboard/EcoChart';
import { motion } from 'motion/react';

export function EcoImpact() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-2xl font-bold text-white">Your Environmental Impact</h2>
          <p className="text-text-secondary">See how your choice of New Shine helps the planet.</p>
        </div>
      </div>

      {/* Hero Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <ImpactCard 
          icon={<Droplets className="text-blue-400" />}
          value="1,240 Gallons"
          label="Water Saved"
          description="Compared to traditional home washing machines."
          delay={0}
        />
        <ImpactCard 
          icon={<Wind className="text-gray-400" />}
          value="45 kg"
          label="CO2 Reduced"
          description="By optimizing our delivery routes and bulk cleaning."
          delay={0.1}
        />
        <ImpactCard 
          icon={<TreeDeciduous className="text-green-400" />}
          value="12 Trees"
          label="Equivalent Planted"
          description="Your carbon offset contribution this year."
          delay={0.2}
        />
      </div>

      {/* Main Chart Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 h-[400px]">
          <EcoChart />
        </div>
        <div className="space-y-6">
          <Card title="Our Green Promise">
            <div className="space-y-4">
              <div className="flex gap-4">
                <div className="p-2 bg-secondary/10 rounded-lg h-fit">
                  <Leaf className="w-5 h-5 text-secondary" />
                </div>
                <div>
                  <h4 className="font-bold text-white text-sm">Non-Toxic Solvents</h4>
                  <p className="text-xs text-text-secondary mt-1">We use GreenEarth® cleaning technology that is 100% non-toxic and biodegradable.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="p-2 bg-primary/10 rounded-lg h-fit">
                  <Wind className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h4 className="font-bold text-white text-sm">Electric Fleet</h4>
                  <p className="text-xs text-text-secondary mt-1">Our delivery vans are 100% electric, reducing urban noise and air pollution.</p>
                </div>
              </div>
            </div>
          </Card>
          
          <div className="bg-gradient-to-br from-secondary/20 to-emerald-900/20 rounded-2xl p-6 border border-secondary/20">
            <h3 className="text-white font-bold mb-2">Did you know?</h3>
            <p className="text-sm text-text-secondary">
              Using New Shine extends the life of your garments by up to 40% compared to harsh home detergents and high-heat drying.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function ImpactCard({ icon, value, label, description, delay }: { icon: React.ReactNode, value: string, label: string, description: string, delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
    >
      <Card className="h-full">
        <div className="flex items-center gap-4 mb-4">
          <div className="p-3 bg-white/5 rounded-xl">
            <div className="[&>svg]:w-6 [&>svg]:h-6">{icon}</div>
          </div>
          <div>
            <h3 className="text-2xl font-bold text-white">{value}</h3>
            <p className="text-sm font-medium text-text-secondary">{label}</p>
          </div>
        </div>
        <p className="text-xs text-text-secondary leading-relaxed">
          {description}
        </p>
      </Card>
    </motion.div>
  );
}
