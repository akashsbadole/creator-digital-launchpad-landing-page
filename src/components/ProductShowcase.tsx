
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Check, ArrowRight, Download, Clock, Users, Star } from 'lucide-react';

const ProductShowcase = () => {
  const [processing, setProcessing] = useState<string | null>(null);

  const products = [
    {
      id: 'web-development',
      title: 'Complete Web Development Course',
      subtitle: 'From Beginner to Professional',
      price: 49,
      originalPrice: 99,
      badge: 'Best Seller',
      rating: 4.9,
      students: 2847,
      duration: '180 pages',
      level: 'All Levels',
      image: '/placeholder.svg',
      syllabi: [
        'HTML5 & CSS3 Fundamentals',
        'JavaScript ES6+ Mastery',
        'React.js Complete Guide',
        'Node.js & Express Backend',
        'Database Design (SQL/NoSQL)',
        'Deployment & DevOps',
        '20+ Real-world Projects',
        'Interview Preparation Guide'
      ],
      features: [
        'Complete 180-page PDF guide',
        'Source code for all projects',
        'Bonus: Job interview questions',
        'Lifetime access & updates',
        '30-day money-back guarantee'
      ]
    },
    {
      id: 'digital-marketing',
      title: 'Digital Marketing Mastery',
      subtitle: 'Grow your business online',
      price: 39,
      originalPrice: 79,
      badge: 'Popular',
      rating: 4.8,
      students: 1923,
      duration: '120 pages',
      level: 'Beginner',
      image: '/placeholder.svg',
      syllabi: [
        'Social Media Marketing Strategy',
        'Google Ads & Facebook Ads',
        'SEO & Content Marketing',
        'Email Marketing Automation',
        'Analytics & Data Tracking',
        'Conversion Rate Optimization',
        'Influencer Marketing',
        'Case Studies & Templates'
      ],
      features: [
        'Comprehensive 120-page guide',
        'Marketing templates & checklists',
        'Campaign planning worksheets',
        'Bonus: 50 marketing tools list',
        'Instant download access'
      ]
    },
    {
      id: 'python-programming',
      title: 'Python Programming Bootcamp',
      subtitle: 'Master Python from scratch',
      price: 59,
      originalPrice: 119,
      badge: 'New',
      rating: 4.9,
      students: 3156,
      duration: '220 pages',
      level: 'All Levels',
      image: '/placeholder.svg',
      syllabi: [
        'Python Basics & Syntax',
        'Data Structures & Algorithms',
        'Object-Oriented Programming',
        'Web Development with Django',
        'Data Science with Pandas',
        'Machine Learning Basics',
        'API Development',
        '15+ Hands-on Projects'
      ],
      features: [
        'Detailed 220-page PDF course',
        'Complete Python code examples',
        'Project files & datasets',
        'Cheat sheets & quick reference',
        'Certificate of completion'
      ]
    }
  ];

  const handlePurchase = async (productId: string, price: number, title: string) => {
    setProcessing(productId);
    
    try {
      // Simulate payment processing
      console.log(`Processing payment for ${title} - $${price}`);
      
      // Here you would integrate with your actual payment gateway
      // For now, we'll simulate the process
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Simulate successful payment
      alert(`Payment successful! Your ${title} is ready for download. Check your email for the download link.`);
      
      // In a real implementation, this would:
      // 1. Process payment via Stripe/PayPal/Razorpay
      // 2. Generate secure download link
      // 3. Send email with download instructions
      // 4. Update user's purchase history
      
    } catch (error) {
      console.error('Payment failed:', error);
      alert('Payment failed. Please try again.');
    } finally {
      setProcessing(null);
    }
  };

  return (
    <section id="products" className="py-24 px-6 lg:px-8 bg-gray-50">
      <div className="mx-auto max-w-7xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900 mb-6">
            Premium Digital Courses
          </h2>
          <p className="mx-auto max-w-2xl text-xl text-gray-600 mb-8">
            Comprehensive PDF guides with everything you need to master new skills
          </p>
          <div className="flex justify-center items-center gap-4 text-sm text-gray-500">
            <div className="flex items-center">
              <Download className="w-4 h-4 mr-1" />
              Instant Download
            </div>
            <div className="flex items-center">
              <Shield className="w-4 h-4 mr-1" />
              30-Day Guarantee
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <Card 
              key={product.id} 
              className={`relative bg-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 ${
                product.badge === 'Best Seller' ? 'ring-2 ring-blue-500' : ''
              }`}
            >
              {product.badge && (
                <Badge className={`absolute -top-3 left-1/2 transform -translate-x-1/2 px-4 py-1 ${
                  product.badge === 'Best Seller' ? 'bg-blue-600' : 
                  product.badge === 'Popular' ? 'bg-green-600' : 'bg-purple-600'
                } text-white`}>
                  {product.badge}
                </Badge>
              )}
              
              <CardHeader className="text-center pb-4 pt-8">
                <div className="w-full h-48 bg-gradient-to-br from-blue-100 to-purple-100 rounded-lg mb-4 flex items-center justify-center">
                  <Download className="w-16 h-16 text-blue-600" />
                </div>
                
                <CardTitle className="text-2xl font-bold text-gray-900 mb-2">{product.title}</CardTitle>
                <p className="text-gray-600 mb-4">{product.subtitle}</p>
                
                <div className="flex justify-center items-center gap-4 mb-4">
                  <div className="flex items-center">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="ml-1 text-sm font-medium">{product.rating}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <Users className="w-4 h-4 mr-1" />
                    {product.students.toLocaleString()} students
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <Clock className="w-4 h-4 mr-1" />
                    {product.duration}
                  </div>
                </div>
                
                <div className="mb-6">
                  <div className="flex items-baseline justify-center mb-2">
                    <span className="text-4xl font-bold text-gray-900">${product.price}</span>
                    <span className="ml-2 text-lg text-gray-500 line-through">${product.originalPrice}</span>
                  </div>
                  <p className="text-sm text-green-600 font-medium">
                    Save ${product.originalPrice - product.price} (Limited Time)
                  </p>
                </div>
              </CardHeader>

              <CardContent className="pt-0">
                <div className="mb-6">
                  <h4 className="font-semibold text-gray-900 mb-3">What you'll learn:</h4>
                  <ul className="space-y-2">
                    {product.syllabi.slice(0, 4).map((item, index) => (
                      <li key={index} className="flex items-start text-sm">
                        <Check className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700">{item}</span>
                      </li>
                    ))}
                  </ul>
                  {product.syllabi.length > 4 && (
                    <p className="text-sm text-gray-500 mt-2">
                      +{product.syllabi.length - 4} more topics...
                    </p>
                  )}
                </div>

                <div className="mb-6">
                  <h4 className="font-semibold text-gray-900 mb-3">What's included:</h4>
                  <ul className="space-y-2">
                    {product.features.map((feature, index) => (
                      <li key={index} className="flex items-start text-sm">
                        <Check className="w-4 h-4 text-blue-500 mr-2 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <Button 
                  onClick={() => handlePurchase(product.id, product.price, product.title)}
                  disabled={processing === product.id}
                  className={`w-full py-3 text-base font-semibold rounded-lg transition-all duration-300 ${
                    product.badge === 'Best Seller'
                      ? 'bg-blue-600 hover:bg-blue-700 text-white'
                      : 'bg-gray-900 hover:bg-gray-800 text-white'
                  } ${processing === product.id ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  {processing === product.id ? (
                    'Processing...'
                  ) : (
                    <>
                      Buy Now & Download
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </>
                  )}
                </Button>
                
                <p className="text-xs text-gray-500 text-center mt-4">
                  Secure payment • Instant download • 30-day money-back guarantee
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-gray-600 mb-4">Need help choosing? All courses include:</p>
          <div className="flex flex-wrap justify-center gap-6">
            <div className="flex items-center">
              <Download className="w-5 h-5 text-blue-600 mr-2" />
              <span>Instant PDF download</span>
            </div>
            <div className="flex items-center">
              <Shield className="w-5 h-5 text-green-600 mr-2" />
              <span>30-day money-back guarantee</span>
            </div>
            <div className="flex items-center">
              <Clock className="w-5 h-5 text-purple-600 mr-2" />
              <span>Lifetime access</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductShowcase;
