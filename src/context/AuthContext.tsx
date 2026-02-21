import { createContext, useContext, useState, ReactNode, useEffect } from 'react';

interface User {
  id: number;
  name: string;
  email: string;
  items_cleaned: number; // Matches DB column
  orders: Order[];
}

export interface Order {
  id: string;
  items: string;
  pickup: string;
  delivery: string;
  status: 'Pending' | 'Cleaning' | 'Ready' | 'Delivered';
  serviceType: 'Wash & Fold' | 'Dry Clean' | 'Alterations';
  instructions?: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, name: string) => Promise<void>;
  logout: () => void;
  addOrder: (order: Omit<Order, 'id'>) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  // Load user from session (simulated by email in localStorage for persistence across refreshes in this simple auth)
  useEffect(() => {
    const storedEmail = localStorage.getItem('user_email');
    if (storedEmail) {
      fetch('/api/auth/me', {
        headers: { 'x-user-email': storedEmail }
      })
      .then(res => {
        if (res.ok) return res.json();
        throw new Error('Failed to fetch user');
      })
      .then(userData => {
        // Map DB snake_case to frontend camelCase if needed, but for now we use DB structure mostly
        // DB returns items_cleaned, frontend expects itemsCleaned (or we update frontend to use items_cleaned)
        // Let's normalize the order data from DB snake_case to frontend camelCase
        const normalizedOrders = userData.orders.map((o: any) => ({
          ...o,
          serviceType: o.service_type // Map DB column to frontend prop
        }));
        setUser({ ...userData, orders: normalizedOrders });
      })
      .catch(() => {
        localStorage.removeItem('user_email');
        setUser(null);
      });
    }
  }, []);

  const login = async (email: string, name: string) => {
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, name })
      });
      
      if (!res.ok) throw new Error('Login failed');
      
      const userData = await res.json();
      const normalizedOrders = userData.orders.map((o: any) => ({
        ...o,
        serviceType: o.service_type
      }));
      
      setUser({ ...userData, orders: normalizedOrders });
      localStorage.setItem('user_email', email);
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user_email');
  };

  const addOrder = async (orderData: Omit<Order, 'id'>) => {
    if (!user) return;

    try {
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: user.id,
          ...orderData
        })
      });

      if (!res.ok) throw new Error('Failed to create order');

      const newOrder = await res.json();
      // Normalize new order
      const normalizedOrder = { ...newOrder, serviceType: newOrder.service_type };

      setUser(prev => {
        if (!prev) return null;
        return {
          ...prev,
          items_cleaned: prev.items_cleaned + 1,
          orders: [normalizedOrder, ...prev.orders]
        };
      });
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, addOrder }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
