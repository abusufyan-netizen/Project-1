import { ArrowRight, Sparkles } from 'lucide-react';

export function PremiumCard() {
  return (
    <div className="bg-gradient-to-br from-primary to-purple-900 rounded-2xl p-6 shadow-xl relative overflow-hidden h-full flex flex-col justify-between group cursor-pointer">
      {/* Background decoration */}
      <div className="absolute -right-10 -top-10 w-40 h-40 bg-white/10 rounded-full blur-3xl group-hover:bg-white/20 transition-all"></div>
      
      <div>
        <div className="flex items-center gap-2 mb-2">
          <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <h3 className="text-xl font-bold text-white">Crisp Premium</h3>
        </div>
        <p className="text-white/80 text-sm mt-2 leading-relaxed">
          Unlimited free pickups, advanced stain removal, and VIP 12-hour turnaround.
        </p>
      </div>

      <div className="mt-6 flex items-end justify-between">
        <div>
          <span className="text-3xl font-bold text-white">$49.00</span>
          <span className="text-white/60 text-sm ml-1">/month</span>
        </div>
        <button className="bg-white text-primary p-3 rounded-full hover:scale-110 transition-transform shadow-lg">
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
