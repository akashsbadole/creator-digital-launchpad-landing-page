
# Creator Launch Kit - Digital Product Sales Platform

A comprehensive digital product sales platform built with React, TypeScript, and modern web technologies. Perfect for selling ebooks, courses, templates, and other digital products with integrated payment processing and email automation.

## 🚀 Features

### Core Features
- **Modern Landing Page** - Conversion-optimized design with hero section, product showcase, testimonials
- **Digital Product Management** - Support for ebooks, courses, templates, and bundles
- **Multi-Payment Gateway Integration** - Stripe, PayPal, and Razorpay support
- **Automated Email Marketing** - Mailchimp integration with automated sequences
- **Secure Download System** - Time-limited, tokenized download links
- **Coupon & Discount System** - Flexible discount codes and promotions
- **Customer Reviews** - Product reviews and testimonials system
- **Analytics & Tracking** - Comprehensive event tracking and analytics
- **Newsletter Management** - Subscriber management and segmentation

### Payment Gateways
- **Stripe** - Credit/debit cards, subscriptions
- **PayPal** - PayPal payments and express checkout
- **Razorpay** - Popular in India and Asia markets

### Email Automation
- **Welcome sequences** for new subscribers
- **Product delivery** emails with download links
- **Follow-up campaigns** for customer engagement
- **Newsletter campaigns** for ongoing marketing

## 🛠 Tech Stack

- **Frontend**: React 18, TypeScript, Vite
- **Styling**: Tailwind CSS, shadcn/ui components
- **State Management**: TanStack Query
- **Routing**: React Router DOM
- **Database**: PostgreSQL (schema provided)
- **Payment Processing**: Stripe, PayPal, Razorpay
- **Email Service**: Mailchimp, SendGrid (alternative)
- **File Storage**: AWS S3, Google Cloud Storage

## 📦 Installation

```bash
# Clone the repository
git clone <your-repo-url>
cd creator-launch-kit

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
# Edit .env.local with your API keys

# Start development server
npm run dev
```

## 🗄️ Database Schema

The platform uses a comprehensive PostgreSQL schema supporting:

### Core Tables
- **users** - Customer authentication and profiles
- **products** - Digital product catalog
- **orders** - Order management and tracking
- **order_items** - Individual product items in orders
- **downloads** - Secure download tracking with tokens

### Marketing & Automation
- **newsletter_subscribers** - Email list management
- **email_campaigns** - Automated email sequences
- **email_sends** - Individual email delivery tracking
- **coupons** - Discount codes and promotions
- **coupon_usage** - Coupon redemption tracking

### Social Proof & Analytics
- **reviews** - Product reviews and testimonials
- **analytics_events** - User behavior and conversion tracking

### Key Features of Schema
- **UUID primary keys** for better security
- **Row-level security (RLS)** for data protection
- **Comprehensive indexing** for performance
- **JSON fields** for flexible data storage
- **Audit trails** with created_at/updated_at timestamps

## 🔧 Configuration

### Environment Variables

Create a `.env.local` file with the following variables:

```env
# Database Configuration
DATABASE_URL=postgresql://username:password@localhost:5432/creator_launch_kit

# Payment Gateways
STRIPE_SECRET_KEY=sk_test_...
STRIPE_PUBLISHABLE_KEY=pk_test_...
PAYPAL_CLIENT_ID=your_paypal_client_id
PAYPAL_CLIENT_SECRET=your_paypal_client_secret
RAZORPAY_KEY_ID=rzp_test_...
RAZORPAY_KEY_SECRET=your_razorpay_secret

# Email Services
MAILCHIMP_API_KEY=your_mailchimp_api_key
MAILCHIMP_LIST_ID=your_list_id
SENDGRID_API_KEY=SG.your_sendgrid_key (alternative)

# Application Settings
JWT_SECRET=your_jwt_secret_key
APP_URL=http://localhost:3000
DOWNLOAD_BASE_URL=https://files.yourdomain.com

# File Storage (AWS S3 example)
AWS_ACCESS_KEY_ID=your_aws_access_key
AWS_SECRET_ACCESS_KEY=your_aws_secret_key
AWS_S3_BUCKET=your-digital-products-bucket
AWS_REGION=us-east-1
```

## 💳 Payment Integration

### Stripe Setup
1. Create account at [Stripe Dashboard](https://dashboard.stripe.com)
2. Get API keys from developers section
3. Configure webhooks for order completion
4. Set up products and pricing in Stripe

### PayPal Setup
1. Create developer account at [PayPal Developer](https://developer.paypal.com)
2. Create application to get Client ID and Secret
3. Configure webhook endpoints
4. Test in sandbox environment

### Razorpay Setup
1. Sign up at [Razorpay Dashboard](https://dashboard.razorpay.com)
2. Get Key ID and Key Secret
3. Configure webhook URL
4. Set up payment methods

## 📧 Email Integration

### Mailchimp Setup
1. Create Mailchimp account
2. Generate API key from account settings
3. Create audience and get List ID
4. Configure automation workflows

### Email Campaigns Supported
- **Welcome Series** - New subscriber onboarding
- **Product Delivery** - Instant download links
- **Follow-up Sequence** - Customer engagement
- **Newsletter** - Regular updates and promotions

## 🏗️ API Endpoints

### Authentication
```
POST /api/auth/register     - User registration
POST /api/auth/login        - User login
POST /api/auth/logout       - User logout
POST /api/auth/verify-email - Email verification
```

### Products
```
GET  /api/products          - List all products
GET  /api/products/:id      - Get product details
POST /api/products          - Create product (admin)
PUT  /api/products/:id      - Update product (admin)
```

### Orders & Payments
```
POST /api/orders            - Create new order
GET  /api/orders/:id        - Get order details
POST /api/orders/:id/payment - Process payment
GET  /api/orders/user/:userId - Get user orders
```

### Downloads
```
GET  /api/downloads/:token  - Download digital product
POST /api/downloads/generate - Generate download link
GET  /api/downloads/user/:userId - User's downloads
```

### Marketing
```
POST /api/newsletter/subscribe   - Newsletter signup
POST /api/coupons/validate      - Validate coupon
POST /api/reviews               - Submit review
POST /api/analytics/track       - Track events
```

## 🔐 Security Features

- **JWT Authentication** for secure API access
- **Password Hashing** with bcrypt
- **SQL Injection Protection** with parameterized queries
- **Rate Limiting** on API endpoints
- **CORS Configuration** for frontend integration
- **Secure Download Tokens** with expiration
- **Input Validation** on all endpoints

## 📱 Frontend Features

### Landing Page Components
- **Hero Section** - Compelling value proposition
- **Product Showcase** - Interactive pricing cards
- **Features Grid** - Key benefits and features
- **Testimonials** - Social proof and reviews
- **Newsletter Signup** - Lead capture form
- **Footer** - Links and contact information

### Product Management
- **Product Cards** - Beautiful product displays
- **Pricing Tiers** - Multiple product bundles
- **Discount Badges** - Visual savings indicators
- **Purchase Flow** - Streamlined checkout process

## 🚀 Deployment

### Database Setup
```sql
-- Run the provided schema
psql -d your_database < database-schema.sql

-- Insert sample data
-- Products, campaigns, and coupons are included
```

### Frontend Deployment
```bash
# Build for production
npm run build

# Deploy to your hosting provider
# (Vercel, Netlify, etc.)
```

### Backend API
- Deploy to Node.js hosting (Heroku, Railway, etc.)
- Configure environment variables
- Set up webhook endpoints
- Configure file storage

## 📊 Analytics & Tracking

The platform tracks:
- **Page Views** - Landing page and product views
- **Conversion Events** - Add to cart, purchases
- **Download Tracking** - File access and usage
- **Email Engagement** - Opens, clicks, conversions
- **Revenue Metrics** - Sales, refunds, lifetime value

## 🎨 Customization

### Styling
- Tailwind CSS for rapid styling
- shadcn/ui components for consistency
- Responsive design for all devices
- Dark/light mode support

### Content Management
- Easy product management through admin panel
- Customizable email templates
- Dynamic pricing and discount rules
- Flexible content blocks

## 📞 Support

### Email Marketing
- Automated sequences based on user behavior
- Segmentation based on purchase history
- A/B testing for email campaigns
- Detailed analytics and reporting

### Customer Support
- Order management dashboard
- Download history tracking
- Refund and dispute handling
- Customer communication logs

## 🔄 Development Workflow

```bash
# Start development
npm run dev

# Run tests
npm test

# Build for production
npm run build

# Preview production build
npm run preview
```

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

**Built with ❤️ for creators and entrepreneurs looking to monetize their digital products.**
