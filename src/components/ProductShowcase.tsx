
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Check, Star, Download, Users } from 'lucide-react';

const ProductShowcase = () => {
  const products = [
    {
      id: 'starter',
      title: 'Creator Starter Kit',
      subtitle: 'Perfect for beginners',
      price: 29,
      originalPrice: 49,
      image: '/placeholder.svg',
      badge: 'Most Popular',
      features: [
        'Complete Ebook Template Library',
        'Social Media Templates',
        'Email Sequence Templates',
        'Launch Checklist',
        '24/7 Email Support',
        'Lifetime Updates'
      ],
      stats: {
        downloads: '2.5K+',
        rating: 4.8,
        users: '850+'
      }
    },
    {
      id: 'pro',
      title: 'Creator Pro Bundle',
      subtitle: 'For serious entrepreneurs',
      price: 97,
      originalPrice: 197,
      image: '/placeholder.svg',
      badge: 'Best Value',
      features: [
        'Everything in Starter Kit',
        'Advanced Course Templates',
        'Webinar Framework',
        'Sales Page Templates',
        'Marketing Automation Setup',
        'Personal 1-on-1 Consultation',
        'Private Community Access',
        'Done-For-You Funnels'
      ],
      stats: {
        downloads: '1.2K+',
        rating: 4.9,
        users: '420+'
      }
    },
    {
      id: 'enterprise',
      title: 'Creator Enterprise',
      subtitle: 'Scale your empire',
      price: 297,
      originalPrice: 497,
      image: '/placeholder.svg',
      badge: 'Premium',
      features: [
        'Everything in Pro Bundle',
        'White-label Solutions',
        'Custom Branding Package',
        'Advanced Analytics Dashboard',
        'Priority Support',
        'Monthly Strategy Calls',
        'Revenue Optimization Audit',
        'Team Collaboration Tools'
      ],
      stats: {
        downloads: '380+',
        rating: 5.0,
        users: '120+'
      }
    }
  ];

  const handlePurchase = (productId: string, price: number) => {
    // This will be connected to payment processing
    console.log(`Purchasing ${productId} for $${price}`);
    // Placeholder for payment integration
    alert(`Redirecting to payment for ${productId} - $${price}`);
  };

  return (
    <section id="products" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-50 to-purple-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Choose Your 
            <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent"> Launch Kit</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Start your creator journey with the right tools. All kits include instant download and lifetime access.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <Card 
              key={product.id} 
              className={`relative overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl ${
                product.badge === 'Most Popular' ? 'border-2 border-purple-500 shadow-xl' : 'border border-gray-200'
              }`}
            >
              {product.badge && (
                <Badge className="absolute top-4 right-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white">
                  {product.badge}
                </Badge>
              )}
              
              <CardHeader className="text-center pb-4">
                <div className="w-full h-48 bg-gradient-to-br from-purple-100 to-pink-100 rounded-lg mb-4 flex items-center justify-center">
                  <div className="text-6xl">📚</div>
                </div>
                <CardTitle className="text-2xl font-bold text-gray-900">{product.title}</CardTitle>
                <p className="text-gray-600">{product.subtitle}</p>
                
                {/* Stats */}
                <div className="flex justify-center space-x-4 text-sm text-gray-500 mt-4">
                  <div className="flex items-center">
                    <Download className="w-4 h-4 mr-1" />
                    {product.stats.downloads}
                  </div>
                  <div className="flex items-center">
                    <Star className="w-4 h-4 mr-1 text-yellow-500" />
                    {product.stats.rating}
                  </div>
                  <div className="flex items-center">
                    <Users className="w-4 h-4 mr-1" />
                    {product.stats.users}
                  </div>
                </div>
              </CardHeader>

              <CardContent className="pt-0">
                {/* Pricing */}
                <div className="text-center mb-6">
                  <div className="flex items-center justify-center space-x-2">
                    <span className="text-3xl font-bold text-gray-900">${product.price}</span>
                    <span className="text-lg text-gray-500 line-through">${product.originalPrice}</span>
                  </div>
                  <p className="text-sm text-green-600 font-medium mt-1">
                    Save ${product.originalPrice - product.price}
                  </p>
                </div>

                {/* Features */}
                <ul className="space-y-3 mb-8">
                  {product.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <Check className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA Button */}
                <Button 
                  onClick={() => handlePurchase(product.id, product.price)}
                  className={`w-full py-3 text-lg font-semibold rounded-full transition-all duration-300 ${
                    product.badge === 'Most Popular'
                      ? 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white'
                      : 'bg-gray-900 hover:bg-gray-800 text-white'
                  }`}
                >
                  Get Instant Access
                </Button>
                
                <p className="text-xs text-gray-500 text-center mt-3">
                  Instant download • 30-day money-back guarantee
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Trust indicators */}
        <div className="text-center mt-16">
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-8 text-gray-600">
            <div className="flex items-center">
              <Shield className="w-5 h-5 mr-2" />
              <span>Secure Checkout</span>
            </div>
            <div className="flex items-center">
              <Download className="w-5 h-5 mr-2" />
              <span>Instant Download</span>
            </div>
            <div className="flex items-center">
              <Check className="w-5 h-5 mr-2" />
              <span>30-Day Guarantee</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductShowcase;
