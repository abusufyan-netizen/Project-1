import express from 'express';
import { createServer as createViteServer } from 'vite';
import db from './src/db/index';

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Routes
  
  // Auth: Login / Register
  app.post('/api/auth/login', (req, res) => {
    const { email, name } = req.body;
    
    try {
      let user = db.prepare('SELECT * FROM users WHERE email = ?').get(email) as any;
      
      if (!user) {
        const info = db.prepare('INSERT INTO users (email, name) VALUES (?, ?)').run(email, name);
        user = { id: info.lastInsertRowid, email, name, items_cleaned: 0 };
      }

      // Fetch user orders
      const orders = db.prepare('SELECT * FROM orders WHERE user_id = ? ORDER BY created_at DESC').all(user.id);
      
      res.json({ ...user, orders });
    } catch (error) {
      console.error('Login error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  // Get User Data (Me)
  app.get('/api/auth/me', (req, res) => {
    const email = req.headers['x-user-email'];
    if (!email) return res.status(401).json({ error: 'Unauthorized' });

    try {
      const user = db.prepare('SELECT * FROM users WHERE email = ?').get(email) as any;
      if (!user) return res.status(404).json({ error: 'User not found' });

      const orders = db.prepare('SELECT * FROM orders WHERE user_id = ? ORDER BY created_at DESC').all(user.id);
      res.json({ ...user, orders });
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  // Create Order
  app.post('/api/orders', (req, res) => {
    const { userId, items, pickup, delivery, status, serviceType, instructions } = req.body;
    const id = `#${Math.floor(Math.random() * 10000) + 20000}`;

    try {
      db.prepare(`
        INSERT INTO orders (id, user_id, items, pickup, delivery, status, service_type, instructions)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
      `).run(id, userId, items, pickup, delivery, status, serviceType, instructions || '');

      // Update items cleaned count (simple logic: +1 per order for demo, or parse items string)
      db.prepare('UPDATE users SET items_cleaned = items_cleaned + 1 WHERE id = ?').run(userId);

      const newOrder = db.prepare('SELECT * FROM orders WHERE id = ?').get(id);
      res.json(newOrder);
    } catch (error) {
      console.error('Order error:', error);
      res.status(500).json({ error: 'Failed to create order' });
    }
  });

  // Vite middleware
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    // In production, serve static files from dist
    const path = await import('path');
    app.use(express.static(path.resolve('dist')));
    app.get('*', (req, res) => {
      res.sendFile(path.resolve('dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
