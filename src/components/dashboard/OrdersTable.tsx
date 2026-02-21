import { useState } from 'react';
import { Card } from '../ui/Card';
import { useAuth } from '../../context/AuthContext';
import { motion } from 'motion/react';
import { Search } from 'lucide-react';

export function OrdersTable() {
  const { user } = useAuth();
  const orders = user?.orders || [];
  const [filter, setFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredOrders = orders.filter(order => {
    const matchesFilter = filter === 'All' || 
      (filter === 'Wash & Fold' && order.serviceType === 'Wash & Fold') ||
      (filter === 'Dry Clean' && order.serviceType === 'Dry Clean') ||
      (filter === 'Alterations' && order.serviceType === 'Alterations');
    
    const matchesSearch = 
      order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.items.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesFilter && matchesSearch;
  });

  return (
    <Card title="Recent Orders" className="h-full">
      <div className="flex flex-col sm:flex-row gap-4 mb-6 border-b border-white/5 pb-4 justify-between items-start sm:items-center">
        <div className="flex gap-2 overflow-x-auto w-full sm:w-auto pb-2 sm:pb-0">
          {['All', 'Wash & Fold', 'Dry Clean', 'Alterations'].map((tab) => (
            <button 
              key={tab}
              onClick={() => setFilter(tab)}
              className={`text-sm font-medium whitespace-nowrap px-3 py-1 rounded-full transition-colors ${
                filter === tab 
                  ? 'bg-primary/20 text-primary border border-primary/20' 
                  : 'text-text-secondary hover:text-white'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="relative w-full sm:w-auto">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-secondary" />
          <input 
            type="text" 
            placeholder="Search orders..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full sm:w-64 bg-background border border-white/10 rounded-lg pl-9 pr-4 py-1.5 text-sm text-white focus:outline-none focus:ring-1 focus:ring-primary/50"
          />
        </div>
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
            {filteredOrders.map((order, index) => (
              <motion.tr 
                key={order.id} 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="group hover:bg-white/5 transition-colors border-b border-white/5 last:border-0"
              >
                <td className="py-4 pl-2 font-mono text-text-secondary group-hover:text-primary transition-colors">{order.id}</td>
                <td className="py-4 text-white font-medium">
                  {order.items}
                  {order.instructions && (
                    <span className="block text-xs text-text-secondary mt-0.5 italic truncate max-w-[150px]">
                      "{order.instructions}"
                    </span>
                  )}
                </td>
                <td className="py-4 text-text-secondary">{order.pickup}</td>
                <td className="py-4 text-text-secondary">{order.delivery}</td>
                <td className="py-4">
                  <StatusBadge status={order.status} />
                </td>
              </motion.tr>
            ))}
            {filteredOrders.length === 0 && (
              <tr>
                <td colSpan={5} className="py-8 text-center text-text-secondary">
                  No orders found matching your criteria.
                </td>
              </tr>
            )}
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
    case 'Pending':
      colorClass = 'text-amber-200';
      dotClass = 'bg-amber-200';
      break;
    default:
      colorClass = 'text-white';
      dotClass = 'bg-white';
  }

  return (
    <div className={`flex items-center gap-2 ${colorClass}`}>
      <span className={`w-2 h-2 rounded-full ${dotClass} animate-pulse shadow-[0_0_8px_currentColor]`}></span>
      <span className="font-medium">{status}</span>
    </div>
  );
}
