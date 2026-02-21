-- Users Table
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    name VARCHAR(255) NOT NULL,
    items_cleaned INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Orders Table
CREATE TABLE IF NOT EXISTS orders (
    id VARCHAR(50) PRIMARY KEY,
    user_id INT NOT NULL,
    items TEXT NOT NULL,
    pickup VARCHAR(255) NOT NULL,
    delivery VARCHAR(255) NOT NULL,
    status VARCHAR(50) NOT NULL, -- 'Pending', 'Cleaning', 'Ready', 'Delivered'
    service_type VARCHAR(50) NOT NULL, -- 'Wash & Fold', 'Dry Clean', 'Alterations'
    instructions TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Indexes for performance
CREATE INDEX idx_orders_user_id ON orders(user_id);
CREATE INDEX idx_orders_status ON orders(status);
