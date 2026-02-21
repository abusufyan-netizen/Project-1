import { Card } from '../ui/Card';

const orders = [
  { id: '#29109', items: '3 Suits, 2 Shirts', pickup: '15 Jan, 2026', delivery: '16 Jan, 2026', status: 'Cleaning' },
  { id: '#29108', items: '1 Dress, 1 Coat', pickup: '11 Jan, 2026', delivery: '12 Jan, 2026', status: 'Ready' },
  { id: '#29107', items: '5 Shirts (W&F)', pickup: '08 Jan, 2026', delivery: '09 Jan, 2026', status: 'Delivered' },
  { id: '#29106', items: '2 Duvets', pickup: '05 Jan, 2026', delivery: '07 Jan, 2026', status: 'Delivered' },
];

export function OrdersTable() {
  return (
    <Card title="Recent Orders" className="h-full">
      <div className="flex gap-4 mb-6 border-b border-white/5 pb-4 overflow-x-auto">
        {['All', 'Wash & Fold', 'Dry Clean', 'Alterations'].map((tab, i) => (
          <button 
            key={tab}
            className={`text-sm font-medium whitespace-nowrap px-3 py-1 rounded-full transition-colors ${
              i === 0 ? 'bg-white/10 text-white' : 'text-text-secondary hover:text-white'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="text-text-secondary text-xs uppercase tracking-wider border-b border-white/5">
              <th className="pb-3 pl-2 font-medium">Order ID</th>
              <th className="pb-3 font-medium">Items</th>
              <th className="pb-3 font-medium">Pickup Date</th>
              <th className="pb-3 font-medium">Delivery Date</th>
              <th className="pb-3 font-medium">Status</th>
            </tr>
          </thead>
          <tbody className="text-sm">
            {orders.map((order) => (
              <tr key={order.id} className="group hover:bg-white/5 transition-colors border-b border-white/5 last:border-0">
                <td className="py-4 pl-2 font-mono text-text-secondary group-hover:text-white transition-colors">{order.id}</td>
                <td className="py-4 text-white font-medium">{order.items}</td>
                <td className="py-4 text-text-secondary">{order.pickup}</td>
                <td className="py-4 text-text-secondary">{order.delivery}</td>
                <td className="py-4">
                  <StatusBadge status={order.status} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
}

function StatusBadge({ status }: { status: string }) {
  let colorClass = '';
  let dotClass = '';

  switch (status) {
    case 'Cleaning':
      colorClass = 'text-primary';
      dotClass = 'bg-primary';
      break;
    case 'Ready':
      colorClass = 'text-secondary';
      dotClass = 'bg-secondary';
      break;
    case 'Delivered':
      colorClass = 'text-text-secondary';
      dotClass = 'bg-gray-500';
      break;
    default:
      colorClass = 'text-white';
      dotClass = 'bg-white';
  }

  return (
    <div className={`flex items-center gap-2 ${colorClass}`}>
      <span className={`w-2 h-2 rounded-full ${dotClass} animate-pulse`}></span>
      <span className="font-medium">{status}</span>
    </div>
  );
}
