import { Check } from 'lucide-react';
import { Card } from '../ui/Card';
import { motion } from 'motion/react';

const pricingTiers = [
  {
    name: "Pay As You Go",
    price: "$0",
    period: "/ month",
    description: "Perfect for occasional cleaning needs.",
    features: [
      "Standard Turnaround (48h)",
      "Standard Stain Removal",
      "Pay per item pricing",
      "Email Support"
    ],
    cta: "Current Plan",
    active: true
  },
  {
    name: "Crisp Premium",
    price: "$49",
    period: "/ month",
    description: "For the busy professional who needs the best.",
    features: [
      "Unlimited Free Pickups",
      "VIP Turnaround (24h)",
      "Advanced Stain Treatment",
      "Free Minor Repairs",
      "Priority Support"
    ],
    cta: "Upgrade Now",
    highlight: true
  },
  {
    name: "Family Plan",
    price: "$89",
    period: "/ month",
    description: "Comprehensive care for the whole household.",
    features: [
      "Everything in Premium",
      "2x Laundry Bags Included",
      "Household Item Discounts",
      "Dedicated Account Manager"
    ],
    cta: "Contact Sales",
    active: false
  }
];

export function Pricing() {
  return (
    <div className="space-y-6">
      <div className="text-center max-w-2xl mx-auto mb-12">
        <h2 className="text-3xl font-bold text-white mb-4">Simple, Transparent Pricing</h2>
        <p className="text-text-secondary">Choose the plan that fits your lifestyle. No hidden fees, ever.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {pricingTiers.map((tier, index) => (
          <motion.div
            key={tier.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="h-full"
          >
            <Card className={`h-full flex flex-col relative overflow-hidden ${tier.highlight ? 'border-primary shadow-[0_0_30px_rgba(245,158,11,0.15)]' : ''}`}>
              {tier.highlight && (
                <div className="absolute top-0 right-0 bg-primary text-white text-xs font-bold px-3 py-1 rounded-bl-xl">
                  POPULAR
                </div>
              )}
              
              <div className="mb-6">
                <h3 className="text-lg font-medium text-text-secondary mb-2">{tier.name}</h3>
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-bold text-white">{tier.price}</span>
                  <span className="text-sm text-text-secondary">{tier.period}</span>
                </div>
                <p className="text-sm text-text-secondary mt-4">{tier.description}</p>
              </div>

              <div className="flex-1 space-y-4 mb-8">
                {tier.features.map((feature) => (
                  <div key={feature} className="flex items-center gap-3">
                    <div className={`p-1 rounded-full ${tier.highlight ? 'bg-primary/20 text-primary' : 'bg-white/10 text-white'}`}>
                      <Check className="w-3 h-3" />
                    </div>
                    <span className="text-sm text-text-secondary">{feature}</span>
                  </div>
                ))}
              </div>

              <button 
                className={`w-full py-3 rounded-xl font-bold transition-all ${
                  tier.highlight 
                    ? 'bg-primary text-white hover:bg-amber-600 shadow-lg shadow-primary/20' 
                    : tier.active
                    ? 'bg-white/10 text-white cursor-default'
                    : 'bg-white text-background hover:bg-gray-200'
                }`}
              >
                {tier.cta}
              </button>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
