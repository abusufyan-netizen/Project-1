import { useState } from 'react';

export function NotificationToggle({ title, description, defaultChecked }: { title: string, description: string, defaultChecked: boolean }) {
  const [enabled, setEnabled] = useState(defaultChecked);

  return (
    <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/10">
      <div>
        <h4 className="font-medium text-white">{title}</h4>
        <p className="text-sm text-text-secondary">{description}</p>
      </div>
      <button 
        onClick={() => setEnabled(!enabled)}
        className={`w-12 h-6 rounded-full transition-colors relative ${enabled ? 'bg-primary' : 'bg-white/20'}`}
      >
        <span className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${enabled ? 'translate-x-6' : 'translate-x-0'}`} />
      </button>
    </div>
  );
}
