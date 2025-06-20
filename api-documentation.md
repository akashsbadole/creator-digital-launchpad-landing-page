
# Creator Launch Kit API Documentation

## Overview
This document outlines the API endpoints and integration points needed for your Creator Launch Kit with the provided database schema.

## Core API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout
- `POST /api/auth/forgot-password` - Password reset request
- `POST /api/auth/reset-password` - Password reset confirmation
- `POST /api/auth/verify-email` - Email verification

### Products
- `GET /api/products` - List all active products
- `GET /api/products/:id` - Get product details
- `POST /api/products` - Create product (admin)
- `PUT /api/products/:id` - Update product (admin)
- `DELETE /api/products/:id` - Delete product (admin)

### Orders & Payments
- `POST /api/orders` - Create new order
- `GET /api/orders/:id` - Get order details
- `POST /api/orders/:id/payment` - Process payment
- `GET /api/orders/user/:userId` - Get user's orders
- `POST /api/webhooks/stripe` - Stripe webhook handler
- `POST /api/webhooks/paypal` - PayPal webhook handler
- `POST /api/webhooks/razorpay` - Razorpay webhook handler

### Downloads
- `GET /api/downloads/:token` - Download digital product
- `GET /api/downloads/user/:userId` - Get user's available downloads
- `POST /api/downloads/generate` - Generate download link

### Newsletter
- `POST /api/newsletter/subscribe` - Newsletter subscription
- `POST /api/newsletter/unsubscribe` - Newsletter unsubscribe
- `GET /api/newsletter/subscribers` - List subscribers (admin)

### Email Automation
- `POST /api/emails/send` - Send individual email
- `POST /api/emails/campaign` - Create email campaign
- `GET /api/emails/campaigns` - List email campaigns
- `POST /api/emails/trigger` - Trigger automated email

### Coupons
- `POST /api/coupons/validate` - Validate coupon code
- `GET /api/coupons` - List coupons (admin)
- `POST /api/coupons` - Create coupon (admin)

### Reviews
- `POST /api/reviews` - Submit product review
- `GET /api/reviews/product/:productId` - Get product reviews
- `PUT /api/reviews/:id/approve` - Approve review (admin)

### Analytics
- `POST /api/analytics/track` - Track user events
- `GET /api/analytics/dashboard` - Get analytics dashboard data

## Payment Gateway Integration

### Stripe Integration
```javascript
// Client-side Stripe checkout
const stripe = Stripe('pk_your_publishable_key');

const handlePayment = async (orderData) => {
  const response = await fetch('/api/orders', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(orderData)
  });
  
  const { clientSecret } = await response.json();
  
  const result = await stripe.confirmCardPayment(clientSecret, {
    payment_method: {
      card: cardElement,
      billing_details: { name: 'Customer Name' }
    }
  });
};
```

### PayPal Integration
```javascript
// PayPal SDK integration
paypal.Buttons({
  createOrder: function(data, actions) {
    return fetch('/api/orders/paypal', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ items: cartItems })
    }).then(res => res.json()).then(data => data.orderID);
  },
  onApprove: function(data, actions) {
    return fetch('/api/orders/paypal/capture', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ orderID: data.orderID })
    });
  }
}).render('#paypal-button-container');
```

### Razorpay Integration
```javascript
// Razorpay checkout
const options = {
  key: 'rzp_your_key_id',
  amount: orderAmount * 100, // Amount in paise
  currency: 'INR',
  order_id: razorpayOrderId,
  handler: function(response) {
    fetch('/api/orders/razorpay/verify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        razorpay_payment_id: response.razorpay_payment_id,
        razorpay_order_id: response.razorpay_order_id,
        razorpay_signature: response.razorpay_signature
      })
    });
  }
};

const rzp = new Razorpay(options);
rzp.open();
```

## Email Service Integration

### Mailchimp Integration
```javascript
// Add subscriber to Mailchimp
const addToMailchimp = async (email, firstName, lastName, tags = []) => {
  const response = await fetch(`https://us1.api.mailchimp.com/3.0/lists/${listId}/members`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${mailchimpApiKey}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      email_address: email,
      status: 'subscribed',
      merge_fields: {
        FNAME: firstName,
        LNAME: lastName
      },
      tags: tags
    })
  });
  
  return response.json();
};
```

### Automated Email Triggers
```javascript
// Trigger email after purchase
const triggerPurchaseEmails = async (orderId) => {
  // Send immediate product delivery email
  await fetch('/api/emails/trigger', {
    method: 'POST',
    body: JSON.stringify({
      campaignType: 'product_delivery',
      orderId: orderId,
      delay: 0
    })
  });
  
  // Schedule follow-up email for 24 hours later
  await fetch('/api/emails/trigger', {
    method: 'POST',
    body: JSON.stringify({
      campaignType: 'follow_up',
      orderId: orderId,
      delay: 24 * 60 * 60 // 24 hours in seconds
    })
  });
};
```

## Security Considerations

1. **API Authentication**: Use JWT tokens for authenticated endpoints
2. **Payment Security**: Never store payment card data, use tokenization
3. **Download Security**: Use time-limited tokens for file downloads
4. **Rate Limiting**: Implement rate limiting on all public endpoints
5. **Input Validation**: Validate all input data server-side
6. **CORS**: Configure appropriate CORS policies
7. **HTTPS**: Always use HTTPS for production

## Environment Variables Required

```env
# Database
DATABASE_URL=postgresql://username:password@localhost:5432/creator_launch_kit

# Payment Gateways
STRIPE_SECRET_KEY=sk_live_...
STRIPE_PUBLISHABLE_KEY=pk_live_...
PAYPAL_CLIENT_ID=...
PAYPAL_CLIENT_SECRET=...
RAZORPAY_KEY_ID=...
RAZORPAY_KEY_SECRET=...

# Email Services
MAILCHIMP_API_KEY=...
MAILCHIMP_LIST_ID=...
SENDGRID_API_KEY=... (alternative)

# App Configuration
JWT_SECRET=your_jwt_secret
APP_URL=https://yourdomain.com
DOWNLOAD_BASE_URL=https://files.yourdomain.com

# File Storage (AWS S3, Google Cloud, etc.)
AWS_ACCESS_KEY_ID=...
AWS_SECRET_ACCESS_KEY=...
AWS_S3_BUCKET=...
```

This schema and API structure provides a complete foundation for your Creator Launch Kit with all the functionality you requested.
