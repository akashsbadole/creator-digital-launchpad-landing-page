
import React from 'react';
import Hero from '@/components/Hero';
import ProductShowcase from '@/components/ProductShowcase';
import Features from '@/components/Features';
import Testimonials from '@/components/Testimonials';
import Newsletter from '@/components/Newsletter';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50">
      <Hero />
      <Features />
      <ProductShowcase />
      <Testimonials />
      <Newsletter />
      <Footer />
    </div>
  );
};

export default Index;
