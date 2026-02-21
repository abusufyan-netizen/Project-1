import { Card } from '../ui/Card';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Jan', saved: 400 },
  { name: 'Feb', saved: 300 },
  { name: 'Mar', saved: 600 },
  { name: 'Apr', saved: 800 },
  { name: 'May', saved: 500 },
  { name: 'Jun', saved: 900 },
  { name: 'Jul', saved: 1000 },
];

export function EcoChart() {
  return (
    <Card title="Water Saved (Gallons)" className="h-full min-h-[300px]">
      <div className="h-[250px] w-full mt-4">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              <linearGradient id="colorSaved" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#A3E635" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#A3E635" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#333" vertical={false} />
            <XAxis 
              dataKey="name" 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: '#9CA3AF', fontSize: 12 }} 
              dy={10}
            />
            <YAxis 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: '#9CA3AF', fontSize: 12 }} 
            />
            <Tooltip 
              contentStyle={{ backgroundColor: '#1E1E24', borderColor: '#333', borderRadius: '8px', color: '#fff' }}
              itemStyle={{ color: '#A3E635' }}
            />
            <Area 
              type="monotone" 
              dataKey="saved" 
              stroke="#A3E635" 
              strokeWidth={3}
              fillOpacity={1} 
              fill="url(#colorSaved)" 
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}
