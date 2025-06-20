
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Star, Play } from 'lucide-react';

const Hero = () => {
  const scrollToProducts = () => {
    document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative px-6 py-24 lg:px-8 bg-gradient-to-b from-gray-50 to-white">
      <div className="mx-auto max-w-7xl">
        <div className="text-center">
          {/* Badge */}
          <div className="inline-flex items-center rounded-full bg-blue-50 px-4 py-2 text-sm font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10 mb-8">
            <Star className="w-4 h-4 mr-2 text-blue-600" />
            Trusted by 10,000+ creators worldwide
          </div>

          {/* Main heading */}
          <h1 className="text-5xl font-bold tracking-tight text-gray-900 sm:text-7xl lg:text-8xl mb-8">
            All your digital products.
            <br />
            <span className="text-blue-600">One place.</span> Instant sales.
          </h1>
          
          <p className="mx-auto mt-6 max-w-3xl text-xl leading-8 text-gray-600 mb-12">
            Launch, sell, and scale your digital empire with our comprehensive creator toolkit. 
            From ebooks to courses - we handle payments, delivery, and marketing automation.
          </p>

          {/* CTA buttons */}
          <div className="flex items-center justify-center gap-x-6 mb-16">
            <Button 
              onClick={scrollToProducts}
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 text-lg font-semibold rounded-lg transition-all duration-200 hover:scale-105"
            >
              Start selling today
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
            <Button 
              variant="outline" 
              className="border-gray-300 text-gray-700 hover:bg-gray-50 px-8 py-4 text-lg font-semibold rounded-lg transition-all duration-200"
            >
              <Play className="w-5 h-5 mr-2" />
              Watch demo
            </Button>
          </div>

          {/* Trust logos */}
          <div className="mt-16">
            <p className="text-sm font-semibold text-gray-500 mb-8">Trusted by creators, product teams and developers at</p>
            <div className="flex items-center justify-center space-x-12 opacity-60">
              <div className="text-2xl font-bold text-gray-400">Stripe</div>
              <div className="text-2xl font-bold text-gray-400">PayPal</div>
              <div className="text-2xl font-bold text-gray-400">Mailchimp</div>
              <div className="text-2xl font-bold text-gray-400">Razorpay</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
