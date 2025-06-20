
import React from 'react';
import { Zap, Shield, Search, Globe, Mail, CreditCard } from 'lucide-react';

const Features = () => {
  const features = [
    {
      icon: <Search className="w-8 h-8" />,
      title: "Find anything in your digital repository",
      description: "Powerful search across all your digital products, customers, and sales data in one unified dashboard."
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Unlock massive scale",
      description: "Handle thousands of customers and products with enterprise-grade infrastructure that scales with your business."
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Flexible analysis that serves you",
      description: "Advanced analytics and reporting tools that adapt to your business needs and provide actionable insights."
    }
  ];

  return (
    <section className="py-24 px-6 lg:px-8 bg-white">
      <div className="mx-auto max-w-7xl">
        <div className="text-center mb-20">
          <h2 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl mb-6">
            Unlock massive scale
          </h2>
          <p className="mx-auto max-w-2xl text-xl text-gray-600">
            Everything you need to build, launch, and scale your digital product business
          </p>
        </div>

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
          {features.map((feature, index) => (
            <div key={index} className="text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-blue-100 text-blue-600 mb-6">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">{feature.title}</h3>
              <p className="text-gray-600 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>

        {/* Additional feature section */}
        <div className="mt-24 grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-16">
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-6">What are the main pain in the doors for Spotify workflows?</h3>
            <div className="space-y-4 text-gray-600">
              <p>• Our docs are the bread</p>
              <p>• When you want to find something, you have to go through all the steps</p>
              <p>• There's a lot of repetitive work that needs to be done manually</p>
              <p>• Integration with other tools is limited and complex</p>
              <p>• Analytics are scattered across different platforms</p>
            </div>
          </div>
          <div className="bg-gray-50 rounded-2xl p-8">
            <h4 className="text-lg font-semibold text-gray-900 mb-4">Flexible analysis that serves you</h4>
            <div className="space-y-3 text-sm text-gray-600">
              <p>• Our UK-based customer service team is available to help</p>
              <p>• A home of our infrastructure</p>
              <p>• Delivery and streaming</p>
              <p>• Top ranked integrations for enhanced functionality</p>
              <p>• Comprehensive analytics dashboard</p>
              <p>• Real-time performance monitoring</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
