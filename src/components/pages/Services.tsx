import { Shirt, Scissors, Droplets, Sparkles } from 'lucide-react';
import { Card } from '../ui/Card';
import { motion } from 'motion/react';

const services = [
  {
    icon: <Shirt className="w-8 h-8 text-primary" />,
    title: "Wash & Fold",
    description: "Everyday laundry, washed, dried, and neatly folded. Perfect for t-shirts, jeans, and socks.",
    price: "$1.99 / lb",
    features: ["Premium Detergents", "Color Separation", "Next-Day Delivery"]
  },
  {
    icon: <Droplets className="w-8 h-8 text-secondary" />,
    title: "Dry Cleaning",
    description: "Expert care for your delicate garments. We use eco-friendly solvents that are tough on stains but gentle on fabrics.",
    price: "From $6.99 / item",
    features: ["Stain Treatment", "Hand Finishing", "Eco-Friendly Solvents"]
  },
  {
    icon: <Scissors className="w-8 h-8 text-blue-400" />,
    title: "Alterations & Repairs",
    description: "From hemming pants to zipper replacements, our expert tailors ensure the perfect fit.",
    price: "Custom Quote",
    features: ["Fitting Sessions", "Zipper Repair", "Hemming & Tapering"]
  },
  {
    icon: <Sparkles className="w-8 h-8 text-amber-200" />,
    title: "Specialty Care",
    description: "Cleaning for wedding dresses, leather, suede, and household items like comforters and curtains.",
    price: "From $25.00",
    features: ["Preservation", "Leather Care", "Household Items"]
  }
];

export function Services() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-2xl font-bold text-white">Our Services</h2>
          <p className="text-text-secondary">Premium care for every fabric in your wardrobe.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {services.map((service, index) => (
          <motion.div
            key={service.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="h-full hover:bg-white/5 transition-colors border-l-4 border-l-transparent hover:border-l-primary group">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-white/5 rounded-xl group-hover:bg-primary/10 transition-colors">
                  {service.icon}
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <h3 className="text-lg font-bold text-white mb-2">{service.title}</h3>
                    <span className="text-sm font-medium text-primary bg-primary/10 px-2 py-1 rounded-lg border border-primary/20">
                      {service.price}
                    </span>
                  </div>
                  <p className="text-text-secondary text-sm mb-4 leading-relaxed">
                    {service.description}
                  </p>
                  <ul className="space-y-2">
                    {service.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-2 text-xs text-text-secondary">
                        <span className="w-1.5 h-1.5 rounded-full bg-secondary"></span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
