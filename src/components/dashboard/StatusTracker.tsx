import { Card } from '../ui/Card';
import { CheckCircle2, Circle, Truck, Package } from 'lucide-react';

export function StatusTracker() {
  const steps = [
    { label: 'Picked Up', status: 'completed', time: '10:30 AM' },
    { label: 'Processing', status: 'current', time: 'In Progress' },
    { label: 'Out for Delivery', status: 'pending', time: 'Est. 4:00 PM' },
  ];

  return (
    <Card title="Current Order Status" className="h-full">
      <div className="mt-4 space-y-8 relative">
        {/* Connecting Line */}
        <div className="absolute left-[19px] top-2 bottom-2 w-0.5 bg-white/10 -z-10"></div>
        
        {steps.map((step, index) => (
          <div key={index} className="flex items-start gap-4">
            <div className={`
              w-10 h-10 rounded-full flex items-center justify-center border-2 z-10 bg-card
              ${step.status === 'completed' ? 'border-primary text-primary' : ''}
              ${step.status === 'current' ? 'border-secondary text-secondary animate-pulse' : ''}
              ${step.status === 'pending' ? 'border-white/10 text-text-secondary' : ''}
            `}>
              {step.status === 'completed' && <CheckCircle2 className="w-5 h-5" />}
              {step.status === 'current' && <Package className="w-5 h-5" />}
              {step.status === 'pending' && <Truck className="w-5 h-5" />}
            </div>
            
            <div className="flex-1 pt-1">
              <div className="flex justify-between items-center mb-1">
                <h4 className={`font-medium ${step.status === 'pending' ? 'text-text-secondary' : 'text-white'}`}>
                  {step.label}
                </h4>
                <span className="text-xs text-text-secondary font-mono">{step.time}</span>
              </div>
              
              {/* Progress Bar Segment */}
              <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden mt-2">
                <div 
                  className={`h-full rounded-full transition-all duration-1000 ${
                    step.status === 'completed' ? 'bg-primary w-full' : 
                    step.status === 'current' ? 'bg-secondary w-1/2' : 'w-0'
                  }`}
                ></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
