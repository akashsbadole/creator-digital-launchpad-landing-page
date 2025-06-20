
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Check, ArrowRight } from 'lucide-react';

const ProductShowcase = () => {
  const products = [
    {
      id: 'starter',
      title: 'Creator Starter',
      subtitle: 'Perfect for beginners',
      price: 29,
      originalPrice: 49,
      badge: 'Most Popular',
      features: [
        'Complete Ebook Template Library',
        'Social Media Templates', 
        'Email Sequence Templates',
        'Launch Checklist',
        '24/7 Email Support'
      ]
    },
    {
      id: 'pro', 
      title: 'Creator Pro',
      subtitle: 'For serious entrepreneurs',
      price: 97,
      originalPrice: 197,
      badge: 'Best Value',
      features: [
        'Everything in Starter',
        'Advanced Course Templates',
        'Webinar Framework',
        'Sales Page Templates',
        'Marketing Automation',
        '1-on-1 Consultation'
      ]
    },
    {
      id: 'enterprise',
      title: 'Creator Enterprise', 
      subtitle: 'Scale your empire',
      price: 297,
      originalPrice: 497,
      badge: 'Premium',
      features: [
        'Everything in Pro',
        'White-label Solutions',
        'Custom Branding Package',
        'Advanced Analytics',
        'Priority Support',
        'Monthly Strategy Calls'
      ]
    }
  ];

  const handlePurchase = (productId: string, price: number) => {
    console.log(`Purchasing ${productId} for $${price}`);
    alert(`Redirecting to payment for ${productId} - $${price}`);
  };

  return (
    <section id="products" className="py-24 px-6 lg:px-8 bg-gray-50">
      <div className="mx-auto max-w-7xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl mb-6">
            No magic.
            <br />
            Just answers backed by evidence.
          </h2>
          <p className="mx-auto max-w-2xl text-xl text-gray-600">
            Choose the perfect plan to launch and scale your digital product business
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {products.map((product) => (
            <Card 
              key={product.id} 
              className={`relative bg-white shadow-sm hover:shadow-lg transition-shadow duration-200 ${
                product.badge === 'Most Popular' ? 'ring-2 ring-blue-600' : ''
              }`}
            >
              {product.badge && (
                <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-blue-600 text-white px-4 py-1">
                  {product.badge}
                </Badge>
              )}
              
              <CardHeader className="text-center pb-6 pt-8">
                <CardTitle className="text-2xl font-bold text-gray-900 mb-2">{product.title}</CardTitle>
                <p className="text-gray-600 mb-6">{product.subtitle}</p>
                
                <div className="mb-6">
                  <div className="flex items-baseline justify-center">
                    <span className="text-4xl font-bold text-gray-900">${product.price}</span>
                    <span className="ml-2 text-lg text-gray-500 line-through">${product.originalPrice}</span>
                  </div>
                  <p className="text-sm text-green-600 font-medium mt-1">
                    Save ${product.originalPrice - product.price}
                  </p>
                </div>
              </CardHeader>

              <CardContent className="pt-0">
                <ul className="space-y-3 mb-8">
                  {product.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <Check className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button 
                  onClick={() => handlePurchase(product.id, product.price)}
                  className={`w-full py-3 text-base font-semibold rounded-lg transition-all duration-200 ${
                    product.badge === 'Most Popular'
                      ? 'bg-blue-600 hover:bg-blue-700 text-white'
                      : 'bg-gray-900 hover:bg-gray-800 text-white'
                  }`}
                >
                  Get started
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
                
                <p className="text-xs text-gray-500 text-center mt-4">
                  Instant download • 30-day money-back guarantee
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductShowcase;
