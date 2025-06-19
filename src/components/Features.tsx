
import React from 'react';
import { Zap, Shield, Globe, Rocket, Mail, CreditCard } from 'lucide-react';

const Features = () => {
  const features = [
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Instant Delivery",
      description: "Automated digital product delivery within seconds of purchase"
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Secure Payments",
      description: "Accept payments via Stripe, PayPal, and Razorpay with enterprise-grade security"
    },
    {
      icon: <Mail className="w-8 h-8" />,
      title: "Email Automation",
      description: "Automatic customer onboarding and email sequences via Mailchimp integration"
    },
    {
      icon: <Globe className="w-8 h-8" />,
      title: "Global Reach",
      description: "Sell to customers worldwide with multi-currency support"
    },
    {
      icon: <Rocket className="w-8 h-8" />,
      title: "Easy Setup",
      description: "Launch your digital store in minutes, not days"
    },
    {
      icon: <CreditCard className="w-8 h-8" />,
      title: "Multiple Gateways",
      description: "Flexible payment options for maximum conversion"
    }
  ];

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Everything You Need to 
            <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent"> Succeed</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Built by creators, for creators. Our platform handles the technical stuff so you can focus on what you do best.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="group p-8 bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-100"
            >
              <div className="text-purple-600 mb-4 group-hover:scale-110 transition-transform duration-300">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
