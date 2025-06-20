
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Download, Shield, Zap } from 'lucide-react';

const Hero = () => {
  const scrollToProducts = () => {
    document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50 overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute top-40 left-40 w-80 h-80 bg-pink-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      <div className="relative mx-auto max-w-7xl px-6 py-24 text-center">
        {/* Badge */}
        <div className="inline-flex items-center rounded-full bg-blue-100 px-6 py-2 text-sm font-medium text-blue-800 ring-1 ring-inset ring-blue-800/10 mb-8">
          <Shield className="w-4 h-4 mr-2" />
          Trusted by 25,000+ learners worldwide
        </div>

        {/* Main heading */}
        <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight text-gray-900 mb-8">
          Master New Skills with
          <br />
          <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Premium Courses
          </span>
        </h1>
        
        <p className="mx-auto mt-6 max-w-3xl text-xl md:text-2xl leading-8 text-gray-600 mb-12">
          Download comprehensive PDF courses, tutorials, and guides. 
          Instant access to premium content that transforms your skills.
        </p>

        {/* Feature highlights */}
        <div className="flex flex-wrap justify-center gap-6 mb-12">
          <div className="flex items-center bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-sm">
            <Download className="w-5 h-5 text-blue-600 mr-2" />
            <span className="text-gray-700 font-medium">Instant Download</span>
          </div>
          <div className="flex items-center bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-sm">
            <Zap className="w-5 h-5 text-purple-600 mr-2" />
            <span className="text-gray-700 font-medium">Lifetime Access</span>
          </div>
          <div className="flex items-center bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-sm">
            <Shield className="w-5 h-5 text-green-600 mr-2" />
            <span className="text-gray-700 font-medium">Money-back Guarantee</span>
          </div>
        </div>

        {/* CTA buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
          <Button 
            onClick={scrollToProducts}
            size="lg"
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 text-lg font-semibold rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
          >
            Browse Courses
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
          <Button 
            variant="outline" 
            size="lg"
            className="border-2 border-gray-300 text-gray-700 hover:bg-gray-50 px-8 py-4 text-lg font-semibold rounded-xl transition-all duration-300"
          >
            View Sample
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <div className="text-center">
            <div className="text-3xl font-bold text-gray-900 mb-2">50+</div>
            <div className="text-gray-600">Premium Courses</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-gray-900 mb-2">25,000+</div>
            <div className="text-gray-600">Happy Students</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-gray-900 mb-2">4.9/5</div>
            <div className="text-gray-600">Average Rating</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
