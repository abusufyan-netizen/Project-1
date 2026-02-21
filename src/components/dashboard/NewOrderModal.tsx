import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Shirt, Scissors, Droplets, Check } from 'lucide-react';
import { useAuth, Order } from '../../context/AuthContext';

interface NewOrderModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function NewOrderModal({ isOpen, onClose }: NewOrderModalProps) {
  const { addOrder } = useAuth();
  const [serviceType, setServiceType] = useState<Order['serviceType']>('Wash & Fold');
  const [items, setItems] = useState('');
  const [instructions, setInstructions] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await addOrder({
        items: items || 'Custom Order',
        pickup: 'Today',
        delivery: 'Tomorrow',
        status: 'Pending',
        serviceType,
        instructions
      });
      
      setIsSubmitting(false);
      onClose();
      // Reset form
      setItems('');
      setInstructions('');
    } catch (error) {
      console.error(error);
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
          />
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-lg bg-card border border-white/10 rounded-3xl p-6 shadow-2xl z-50"
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-white">Schedule New Pickup</h2>
              <button onClick={onClose} className="p-2 hover:bg-white/5 rounded-full text-text-secondary hover:text-white transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Service Selection */}
              <div className="grid grid-cols-3 gap-3">
                <ServiceOption 
                  icon={<Shirt />} 
                  label="Wash & Fold" 
                  selected={serviceType === 'Wash & Fold'} 
                  onClick={() => setServiceType('Wash & Fold')} 
                />
                <ServiceOption 
                  icon={<Droplets />} 
                  label="Dry Clean" 
                  selected={serviceType === 'Dry Clean'} 
                  onClick={() => setServiceType('Dry Clean')} 
                />
                <ServiceOption 
                  icon={<Scissors />} 
                  label="Alterations" 
                  selected={serviceType === 'Alterations'} 
                  onClick={() => setServiceType('Alterations')} 
                />
              </div>

              {/* Items Description */}
              <div>
                <label className="block text-sm font-medium text-text-secondary mb-2">What are we cleaning?</label>
                <input 
                  type="text" 
                  value={items}
                  onChange={(e) => setItems(e.target.value)}
                  placeholder="e.g., 3 Shirts, 1 Comforter"
                  className="w-full bg-background border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                  required
                />
              </div>

              {/* Special Instructions */}
              <div>
                <label className="block text-sm font-medium text-text-secondary mb-2">Special Instructions</label>
                <textarea 
                  value={instructions}
                  onChange={(e) => setInstructions(e.target.value)}
                  placeholder="e.g., Starch on shirts, careful with the silk dress..."
                  className="w-full bg-background border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all h-24 resize-none"
                />
              </div>

              <button 
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-primary to-amber-600 text-white font-bold py-4 rounded-xl shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <span className="animate-pulse">Scheduling...</span>
                ) : (
                  <>
                    Confirm Pickup <Check className="w-5 h-5" />
                  </>
                )}
              </button>
            </form>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

function ServiceOption({ icon, label, selected, onClick }: { icon: React.ReactNode, label: string, selected: boolean, onClick: () => void }) {
  return (
    <button 
      type="button"
      onClick={onClick}
      className={`flex flex-col items-center justify-center p-4 rounded-xl border transition-all ${
        selected 
          ? 'bg-primary/10 border-primary text-primary shadow-[0_0_15px_rgba(245,158,11,0.3)]' 
          : 'bg-white/5 border-transparent text-text-secondary hover:bg-white/10 hover:text-white'
      }`}
    >
      <div className="mb-2 [&>svg]:w-6 [&>svg]:h-6">{icon}</div>
      <span className="text-xs font-medium">{label}</span>
    </button>
  );
}
