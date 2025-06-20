
-- Creator Launch Kit Database Schema
-- This schema supports digital product sales, user management, payments, and email automation

-- Users table for customer management
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) UNIQUE NOT NULL,
    first_name VARCHAR(100),
    last_name VARCHAR(100),
    password_hash VARCHAR(255) NOT NULL,
    email_verified BOOLEAN DEFAULT FALSE,
    email_verification_token VARCHAR(255),
    password_reset_token VARCHAR(255),
    password_reset_expires TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Products table for digital products (ebooks, courses, etc.)
CREATE TABLE products (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    description TEXT,
    subtitle VARCHAR(255),
    price DECIMAL(10,2) NOT NULL,
    original_price DECIMAL(10,2),
    category VARCHAR(100), -- 'ebook', 'course', 'template', etc.
    badge VARCHAR(50), -- 'Most Popular', 'Best Value', 'Premium'
    features JSON, -- Array of product features
    file_url VARCHAR(500), -- URL to the digital product file
    file_name VARCHAR(255),
    file_size BIGINT, -- File size in bytes
    download_limit INTEGER DEFAULT 5, -- Number of allowed downloads per purchase
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Orders table for purchase tracking
CREATE TABLE orders (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    guest_email VARCHAR(255), -- For guest purchases
    order_number VARCHAR(50) UNIQUE NOT NULL,
    total_amount DECIMAL(10,2) NOT NULL,
    currency VARCHAR(3) DEFAULT 'USD',
    status VARCHAR(50) DEFAULT 'pending', -- 'pending', 'completed', 'failed', 'refunded'
    payment_method VARCHAR(50), -- 'stripe', 'paypal', 'razorpay'
    payment_intent_id VARCHAR(255), -- Payment gateway transaction ID
    billing_email VARCHAR(255),
    billing_name VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Order items table for tracking individual products in orders
CREATE TABLE order_items (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    order_id UUID REFERENCES orders(id) ON DELETE CASCADE,
    product_id UUID REFERENCES products(id) ON DELETE CASCADE,
    quantity INTEGER DEFAULT 1,
    unit_price DECIMAL(10,2) NOT NULL,
    total_price DECIMAL(10,2) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Downloads table for tracking digital product downloads
CREATE TABLE downloads (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    order_item_id UUID REFERENCES order_items(id) ON DELETE CASCADE,
    user_id UUID REFERENCES users(id) ON DELETE SET NULL,
    guest_email VARCHAR(255),
    download_token VARCHAR(255) UNIQUE NOT NULL, -- Secure token for download access
    download_count INTEGER DEFAULT 0,
    expires_at TIMESTAMP, -- Download link expiration
    last_downloaded_at TIMESTAMP,
    ip_address INET,
    user_agent TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Newsletter subscribers table
CREATE TABLE newsletter_subscribers (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) UNIQUE NOT NULL,
    first_name VARCHAR(100),
    last_name VARCHAR(100),
    status VARCHAR(50) DEFAULT 'active', -- 'active', 'unsubscribed', 'bounced'
    source VARCHAR(100), -- 'landing_page', 'checkout', 'manual'
    tags JSON, -- Array of tags for segmentation
    mailchimp_id VARCHAR(255), -- External email service ID
    subscribed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    unsubscribed_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Email campaigns table for tracking email automation
CREATE TABLE email_campaigns (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    type VARCHAR(50) NOT NULL, -- 'welcome', 'product_delivery', 'follow_up', 'newsletter'
    subject VARCHAR(255) NOT NULL,
    template_id VARCHAR(255), -- Email service template ID
    trigger_event VARCHAR(100), -- 'purchase', 'signup', 'download'
    delay_hours INTEGER DEFAULT 0, -- Delay before sending
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Email sends table for tracking individual email deliveries
CREATE TABLE email_sends (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    campaign_id UUID REFERENCES email_campaigns(id) ON DELETE CASCADE,
    recipient_email VARCHAR(255) NOT NULL,
    user_id UUID REFERENCES users(id) ON DELETE SET NULL,
    order_id UUID REFERENCES orders(id) ON DELETE SET NULL,
    status VARCHAR(50) DEFAULT 'pending', -- 'pending', 'sent', 'delivered', 'opened', 'clicked', 'failed'
    external_message_id VARCHAR(255), -- Email service message ID
    sent_at TIMESTAMP,
    delivered_at TIMESTAMP,
    opened_at TIMESTAMP,
    clicked_at TIMESTAMP,
    failed_reason TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Coupons table for discount codes
CREATE TABLE coupons (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    code VARCHAR(50) UNIQUE NOT NULL,
    name VARCHAR(255),
    type VARCHAR(50) NOT NULL, -- 'percentage', 'fixed_amount'
    value DECIMAL(10,2) NOT NULL, -- Percentage (0-100) or fixed amount
    minimum_amount DECIMAL(10,2), -- Minimum order amount
    usage_limit INTEGER, -- Maximum number of uses
    usage_count INTEGER DEFAULT 0,
    expires_at TIMESTAMP,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Coupon usage tracking
CREATE TABLE coupon_usage (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    coupon_id UUID REFERENCES coupons(id) ON DELETE CASCADE,
    order_id UUID REFERENCES orders(id) ON DELETE CASCADE,
    user_id UUID REFERENCES users(id) ON DELETE SET NULL,
    discount_amount DECIMAL(10,2) NOT NULL,
    used_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Reviews and testimonials table
CREATE TABLE reviews (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    product_id UUID REFERENCES products(id) ON DELETE CASCADE,
    user_id UUID REFERENCES users(id) ON DELETE SET NULL,
    order_id UUID REFERENCES orders(id) ON DELETE SET NULL,
    rating INTEGER CHECK (rating >= 1 AND rating <= 5),
    title VARCHAR(255),
    content TEXT,
    reviewer_name VARCHAR(255),
    reviewer_role VARCHAR(255),
    is_featured BOOLEAN DEFAULT FALSE,
    is_approved BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Analytics and tracking table
CREATE TABLE analytics_events (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    event_type VARCHAR(100) NOT NULL, -- 'page_view', 'product_view', 'add_to_cart', 'purchase', 'download'
    user_id UUID REFERENCES users(id) ON DELETE SET NULL,
    session_id VARCHAR(255),
    product_id UUID REFERENCES products(id) ON DELETE SET NULL,
    order_id UUID REFERENCES orders(id) ON DELETE SET NULL,
    event_data JSON, -- Additional event properties
    ip_address INET,
    user_agent TEXT,
    referrer VARCHAR(500),
    utm_source VARCHAR(100),
    utm_medium VARCHAR(100),
    utm_campaign VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Indexes for better performance
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_orders_user_id ON orders(user_id);
CREATE INDEX idx_orders_status ON orders(status);
CREATE INDEX idx_orders_created_at ON orders(created_at);
CREATE INDEX idx_order_items_order_id ON order_items(order_id);
CREATE INDEX idx_order_items_product_id ON order_items(product_id);
CREATE INDEX idx_downloads_token ON downloads(download_token);
CREATE INDEX idx_downloads_expires_at ON downloads(expires_at);
CREATE INDEX idx_newsletter_email ON newsletter_subscribers(email);
CREATE INDEX idx_email_sends_recipient ON email_sends(recipient_email);
CREATE INDEX idx_email_sends_status ON email_sends(status);
CREATE INDEX idx_coupons_code ON coupons(code);
CREATE INDEX idx_analytics_event_type ON analytics_events(event_type);
CREATE INDEX idx_analytics_created_at ON analytics_events(created_at);

-- Insert sample data for products
INSERT INTO products (name, subtitle, price, original_price, category, badge, features) VALUES 
(
    'Creator Starter Kit',
    'Perfect for beginners',
    29.00,
    49.00,
    'bundle',
    'Most Popular',
    '["Complete Ebook Template Library", "Social Media Templates", "Email Sequence Templates", "Launch Checklist", "24/7 Email Support", "Lifetime Updates"]'
),
(
    'Creator Pro Bundle',
    'For serious entrepreneurs',
    97.00,
    197.00,
    'bundle',
    'Best Value',
    '["Everything in Starter Kit", "Advanced Course Templates", "Webinar Framework", "Sales Page Templates", "Marketing Automation Setup", "Personal 1-on-1 Consultation", "Private Community Access", "Done-For-You Funnels"]'
),
(
    'Creator Enterprise',
    'Scale your empire',
    297.00,
    497.00,
    'bundle',
    'Premium',
    '["Everything in Pro Bundle", "White-label Solutions", "Custom Branding Package", "Advanced Analytics Dashboard", "Priority Support", "Monthly Strategy Calls", "Revenue Optimization Audit", "Team Collaboration Tools"]'
);

-- Insert sample email campaigns
INSERT INTO email_campaigns (name, type, subject, trigger_event, delay_hours) VALUES 
('Welcome Email', 'welcome', 'Welcome to the Creator Community!', 'signup', 0),
('Product Delivery', 'product_delivery', 'Your Digital Products Are Ready!', 'purchase', 0),
('Follow-up Email', 'follow_up', 'How are you enjoying your Creator Kit?', 'download', 24),
('Newsletter', 'newsletter', 'Weekly Creator Tips & Updates', 'newsletter_signup', 0);

-- Insert sample coupons
INSERT INTO coupons (code, name, type, value, minimum_amount, usage_limit, expires_at) VALUES 
('LAUNCH50', 'Launch Week Special', 'percentage', 50.00, 25.00, 100, NOW() + INTERVAL '30 days'),
('SAVE20', 'Save $20', 'fixed_amount', 20.00, 50.00, 500, NOW() + INTERVAL '60 days'),
('EARLYBIRD', 'Early Bird Discount', 'percentage', 30.00, NULL, 50, NOW() + INTERVAL '14 days');
