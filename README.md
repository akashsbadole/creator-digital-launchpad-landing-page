
# CreatorHub - Complete Digital Marketplace Platform

A comprehensive Gumroad-like digital marketplace built with React, TypeScript, Supabase, and modern web technologies. Perfect for creators to sell digital products including ebooks, courses, software, templates, and more.

## 🚀 Features Overview

### Core Marketplace Features
- **Product Management** - Create, edit, and manage digital products with rich media
- **Multi-Category Support** - E-books, Software, Courses, Design Assets, Music, Videos, Photography, Templates
- **Secure Downloads** - Tokenized download links with expiration and download limits
- **Product Discovery** - Browse, search, and filter products by category
- **Reviews & Ratings** - Customer feedback system with verified purchase reviews
- **Wishlists** - Save products for later purchase

### E-commerce & Payments
- **Shopping Cart** - Add multiple products and apply discount codes
- **Secure Checkout** - Integrated payment processing with Stripe
- **Order Management** - Complete order tracking and history
- **Coupon System** - Percentage and fixed-amount discount codes
- **Multi-Currency Support** - USD and other currency options
- **Guest Checkout** - Purchase without creating an account

### Seller Tools & Analytics
- **Seller Dashboard** - Comprehensive analytics and sales tracking
- **Revenue Analytics** - Track earnings, orders, and product performance
- **Product Analytics** - View counts, conversion rates, and customer insights
- **Order Management** - Process orders and track customer downloads
- **Email Marketing** - Newsletter campaigns and customer communication
- **Performance Metrics** - Sales trends, top products, and revenue reports

### User Management & Social
- **Authentication System** - Secure login/signup with email verification
- **User Profiles** - Customizable profiles with bio, avatar, and social links
- **Seller Profiles** - Public seller pages with product showcases
- **Follow System** - Follow favorite creators and get updates
- **Customer Reviews** - Verified purchase reviews and testimonials
- **User Roles** - Customer, Seller, and Admin role management

### Marketing & Communication
- **Email Campaigns** - Automated email sequences and newsletters
- **Newsletter Management** - Subscriber lists and segmentation
- **Product Promotions** - Featured products and promotional campaigns
- **SEO Optimization** - Product pages optimized for search engines
- **Analytics Tracking** - User behavior and conversion tracking
- **Social Sharing** - Easy product sharing on social platforms

## 🏗️ Database Schema

### Core Tables

#### Users & Profiles
```sql
-- User profiles with seller capabilities
profiles (
  id UUID PRIMARY KEY,
  email TEXT NOT NULL,
  full_name TEXT,
  username TEXT UNIQUE,
  avatar_url TEXT,
  bio TEXT,
  website TEXT,
  role user_role DEFAULT 'customer',
  is_seller BOOLEAN DEFAULT FALSE,
  stripe_customer_id TEXT,
  stripe_account_id TEXT,
  created_at TIMESTAMPTZ,
  updated_at TIMESTAMPTZ
)
```

#### Product Management
```sql
-- Main products table
products (
  id UUID PRIMARY KEY,
  seller_id UUID REFERENCES profiles(id),
  category_id UUID REFERENCES categories(id),
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  short_description TEXT,
  price DECIMAL(10,2) NOT NULL,
  original_price DECIMAL(10,2),
  currency TEXT DEFAULT 'USD',
  status product_status DEFAULT 'draft',
  is_digital BOOLEAN DEFAULT TRUE,
  file_url TEXT,
  file_size BIGINT,
  download_limit INTEGER DEFAULT 5,
  preview_url TEXT,
  thumbnail_url TEXT,
  tags TEXT[],
  content_type TEXT,
  rating DECIMAL(3,2) DEFAULT 0,
  rating_count INTEGER DEFAULT 0,
  sales_count INTEGER DEFAULT 0,
  view_count INTEGER DEFAULT 0,
  seo_title TEXT,
  seo_description TEXT,
  created_at TIMESTAMPTZ,
  updated_at TIMESTAMPTZ
)

-- Product categories
categories (
  id UUID PRIMARY KEY,
  name TEXT UNIQUE NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  image_url TEXT,
  created_at TIMESTAMPTZ
)

-- Product images gallery
product_images (
  id UUID PRIMARY KEY,
  product_id UUID REFERENCES products(id),
  image_url TEXT NOT NULL,
  alt_text TEXT,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ
)
```

#### E-commerce & Orders
```sql
-- Customer orders
orders (
  id UUID PRIMARY KEY,
  customer_id UUID REFERENCES profiles(id),
  seller_id UUID REFERENCES profiles(id),
  order_number TEXT UNIQUE NOT NULL,
  status order_status DEFAULT 'pending',
  subtotal DECIMAL(10,2) NOT NULL,
  tax_amount DECIMAL(10,2) DEFAULT 0,
  discount_amount DECIMAL(10,2) DEFAULT 0,
  total_amount DECIMAL(10,2) NOT NULL,
  currency TEXT DEFAULT 'USD',
  coupon_id UUID REFERENCES coupons(id),
  payment_method TEXT,
  payment_intent_id TEXT,
  customer_email TEXT,
  customer_name TEXT,
  billing_address JSONB,
  created_at TIMESTAMPTZ,
  updated_at TIMESTAMPTZ
)

-- Individual order items
order_items (
  id UUID PRIMARY KEY,
  order_id UUID REFERENCES orders(id),
  product_id UUID REFERENCES products(id),
  quantity INTEGER DEFAULT 1,
  unit_price DECIMAL(10,2) NOT NULL,
  total_price DECIMAL(10,2) NOT NULL,
  created_at TIMESTAMPTZ
)

-- Secure download tracking
downloads (
  id UUID PRIMARY KEY,
  order_item_id UUID REFERENCES order_items(id),
  customer_id UUID REFERENCES profiles(id),
  product_id UUID REFERENCES products(id),
  download_token TEXT UNIQUE NOT NULL,
  download_count INTEGER DEFAULT 0,
  max_downloads INTEGER DEFAULT 5,
  expires_at TIMESTAMPTZ,
  last_downloaded_at TIMESTAMPTZ,
  ip_address INET,
  user_agent TEXT,
  created_at TIMESTAMPTZ
)
```

#### Marketing & Promotions
```sql
-- Discount coupons
coupons (
  id UUID PRIMARY KEY,
  seller_id UUID REFERENCES profiles(id),
  code TEXT UNIQUE NOT NULL,
  description TEXT,
  discount_type TEXT CHECK (discount_type IN ('percentage', 'fixed')),
  discount_value DECIMAL(10,2) NOT NULL,
  minimum_amount DECIMAL(10,2),
  usage_limit INTEGER,
  usage_count INTEGER DEFAULT 0,
  expires_at TIMESTAMPTZ,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ
)

-- Email campaigns
email_campaigns (
  id UUID PRIMARY KEY,
  seller_id UUID REFERENCES profiles(id),
  name TEXT NOT NULL,
  subject TEXT NOT NULL,
  content TEXT NOT NULL,
  status TEXT DEFAULT 'draft',
  scheduled_at TIMESTAMPTZ,
  sent_at TIMESTAMPTZ,
  recipient_count INTEGER DEFAULT 0,
  open_count INTEGER DEFAULT 0,
  click_count INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ
)

-- Newsletter subscribers
newsletter_subscribers (
  id UUID PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  seller_id UUID REFERENCES profiles(id),
  is_active BOOLEAN DEFAULT TRUE,
  subscribed_at TIMESTAMPTZ,
  unsubscribed_at TIMESTAMPTZ
)
```

#### Social Features
```sql
-- Product reviews
reviews (
  id UUID PRIMARY KEY,
  product_id UUID REFERENCES products(id),
  customer_id UUID REFERENCES profiles(id),
  order_id UUID REFERENCES orders(id),
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  title TEXT,
  content TEXT,
  is_verified BOOLEAN DEFAULT FALSE,
  is_featured BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ,
  updated_at TIMESTAMPTZ,
  UNIQUE(product_id, customer_id)
)

-- Customer wishlists
wishlists (
  id UUID PRIMARY KEY,
  customer_id UUID REFERENCES profiles(id),
  product_id UUID REFERENCES products(id),
  created_at TIMESTAMPTZ,
  UNIQUE(customer_id, product_id)
)

-- Creator following system
followers (
  id UUID PRIMARY KEY,
  follower_id UUID REFERENCES profiles(id),
  following_id UUID REFERENCES profiles(id),
  created_at TIMESTAMPTZ,
  UNIQUE(follower_id, following_id)
)
```

#### Analytics & Tracking
```sql
-- User behavior analytics
analytics_events (
  id UUID PRIMARY KEY,
  event_type TEXT NOT NULL,
  user_id UUID REFERENCES profiles(id),
  product_id UUID REFERENCES products(id),
  order_id UUID REFERENCES orders(id),
  session_id TEXT,
  event_data JSONB,
  ip_address INET,
  user_agent TEXT,
  referrer TEXT,
  utm_source TEXT,
  utm_medium TEXT,
  utm_campaign TEXT,
  created_at TIMESTAMPTZ
)
```

### Security Features

#### Row Level Security (RLS)
- **Data Isolation** - Users can only access their own data
- **Seller Protection** - Sellers can only manage their own products
- **Customer Privacy** - Order and download data is private
- **Admin Controls** - Proper role-based access control

#### Authentication & Authorization
- **Supabase Auth** - Secure email/password authentication
- **JWT Tokens** - Stateless authentication with automatic refresh
- **Email Verification** - Secure account activation
- **Password Reset** - Secure password recovery flow

## 🛠️ Tech Stack

### Frontend
- **React 18** - Modern React with hooks and concurrent features
- **TypeScript** - Type-safe development
- **Vite** - Fast build tool and development server
- **Tailwind CSS** - Utility-first CSS framework
- **shadcn/ui** - Beautiful, accessible UI components
- **React Router** - Client-side routing
- **TanStack Query** - Data fetching and caching
- **Lucide React** - Beautiful icon library

### Backend & Database
- **Supabase** - Backend-as-a-Service platform
- **PostgreSQL** - Robust relational database
- **Row Level Security** - Database-level security
- **Real-time subscriptions** - Live data updates
- **Edge Functions** - Serverless API endpoints

### Payment & File Storage
- **Stripe** - Payment processing and subscriptions
- **Supabase Storage** - Secure file uploads and downloads
- **CDN Integration** - Fast global content delivery

## 📦 Installation & Setup

### Prerequisites
- Node.js 18+ and npm/yarn
- Supabase account
- Stripe account (for payments)

### Quick Start
```bash
# Clone the repository
git clone <your-repo-url>
cd creatorhub

# Install dependencies
npm install

# Set up environment variables
# Configure Supabase project in supabase/config.toml

# Run database migrations
# SQL migrations are provided in supabase/migrations/

# Start development server
npm run dev
```

### Environment Configuration
The app uses Supabase configuration instead of environment variables:
- Database URL and keys are auto-configured via Supabase
- Payment keys should be stored in Supabase Secrets
- File storage is handled through Supabase Storage

## 🚀 Deployment

### Database Setup
1. Create a new Supabase project
2. Run the provided SQL migrations in `supabase/migrations/`
3. Configure authentication settings
4. Set up Row Level Security policies (included in migrations)

### Frontend Deployment
```bash
# Build for production
npm run build

# Deploy to your preferred hosting
# - Vercel (recommended)
# - Netlify
# - Railway
# - Any static hosting service
```

### Payment Integration
1. Create Stripe account and get API keys
2. Add Stripe keys to Supabase Secrets
3. Configure webhook endpoints for order processing
4. Test payment flow in development mode

### File Storage
1. Configure Supabase Storage buckets
2. Set up proper access policies
3. Configure CDN if needed for global delivery
4. Test file upload and download flows

## 🔧 Configuration

### Supabase Setup
1. **Authentication**: Enable email/password auth
2. **Database**: Run provided SQL migrations
3. **Storage**: Create buckets for product files and images
4. **Edge Functions**: Deploy for custom API endpoints
5. **Secrets**: Store API keys securely

### Stripe Configuration
1. Create Stripe account
2. Get publishable and secret keys
3. Set up webhook endpoints
4. Configure payment methods
5. Test in sandbox mode

## 📊 Analytics & Tracking

### Built-in Analytics
- **Product Views** - Track page visits and engagement
- **Conversion Rates** - Purchase funnel analytics
- **Revenue Tracking** - Sales and earnings reports
- **Customer Insights** - User behavior analysis
- **Download Analytics** - File access tracking

### Custom Events
- Page views and product interactions
- Purchase completions and refunds
- Download activities and limits
- Email campaign engagement
- Search and filter usage

## 🔐 Security Features

### Data Protection
- **Encryption at Rest** - Database encryption
- **HTTPS Everywhere** - Secure data transmission
- **Input Validation** - Prevent injection attacks
- **Rate Limiting** - API abuse protection
- **CORS Configuration** - Cross-origin security

### Payment Security
- **PCI Compliance** - Stripe handles card data
- **Secure Tokens** - No sensitive data storage
- **Fraud Protection** - Built-in Stripe safeguards
- **3D Secure** - Additional authentication layer

## 🎨 Customization

### Theming
- Tailwind CSS for easy customization
- shadcn/ui components can be themed
- CSS custom properties for brand colors
- Responsive design for all devices

### Feature Extensions
- Easy to add new product categories
- Extensible analytics system
- Modular component architecture
- Plugin-friendly design patterns

## 📞 Support & Maintenance

### Monitoring
- Real-time error tracking
- Performance monitoring
- Database query optimization
- User experience metrics

### Backup & Recovery
- Automated database backups
- File storage redundancy
- Disaster recovery procedures
- Data export capabilities

## 🤝 Contributing

### Development Workflow
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

### Code Standards
- TypeScript for type safety
- ESLint for code quality
- Prettier for formatting
- Component-driven development

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- **Supabase** - Amazing backend platform
- **shadcn/ui** - Beautiful UI components
- **Stripe** - Reliable payment processing
- **Tailwind CSS** - Utility-first styling
- **React Community** - Excellent ecosystem

---

**Built with ❤️ for creators and entrepreneurs looking to monetize their digital products.**

### Quick Links
- [Live Demo](https://your-app.supabase.co)
- [API Documentation](./api-docs.md)
- [Supabase Dashboard](https://supabase.com/dashboard)
- [Support Discord](https://discord.gg/your-server)

### Version Information
- **Current Version**: 1.0.0
- **Last Updated**: January 2025
- **Node.js**: 18+
- **React**: 18.3+
- **TypeScript**: 5+
