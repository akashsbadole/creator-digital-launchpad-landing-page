
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowRight } from 'lucide-react';

const Newsletter = () => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      console.log('Subscribing email:', email);
      setIsSubscribed(true);
      setEmail('');
    }
  };

  return (
    <section className="py-24 px-6 lg:px-8 bg-gray-900">
      <div className="mx-auto max-w-4xl text-center">
        <h2 className="text-4xl font-bold tracking-tight text-white sm:text-5xl mb-6">
          Privacy and security first
        </h2>
        
        <div className="space-y-6 text-left max-w-2xl mx-auto mb-12">
          <details className="bg-gray-800 rounded-lg">
            <summary className="px-6 py-4 text-white font-medium cursor-pointer hover:bg-gray-700 rounded-lg">
              We are SOC 2 Type 2 certified
            </summary>
          </details>
          
          <details className="bg-gray-800 rounded-lg">
            <summary className="px-6 py-4 text-white font-medium cursor-pointer hover:bg-gray-700 rounded-lg">
              We store data in Deutschland, Europe
            </summary>
          </details>
          
          <details className="bg-gray-800 rounded-lg">
            <summary className="px-6 py-4 text-white font-medium cursor-pointer hover:bg-gray-700 rounded-lg">
              Can you help me understand my data? I don't want any of it in my code
            </summary>
          </details>
          
          <details className="bg-gray-800 rounded-lg">
            <summary className="px-6 py-4 text-white font-medium cursor-pointer hover:bg-gray-700 rounded-lg">
              We are GDPR compliant
            </summary>
          </details>
          
          <details className="bg-gray-800 rounded-lg">
            <summary className="px-6 py-4 text-white font-medium cursor-pointer hover:bg-gray-700 rounded-lg">
              We handle data deletion for you
            </summary>
          </details>
          
          <details className="bg-gray-800 rounded-lg">
            <summary className="px-6 py-4 text-white font-medium cursor-pointer hover:bg-gray-700 rounded-lg">
              Your data will never be sent to third AI models
            </summary>
          </details>
          
          <details className="bg-gray-800 rounded-lg">
            <summary className="px-6 py-4 text-white font-medium cursor-pointer hover:bg-gray-700 rounded-lg">
              Which languages do you translate to?
            </summary>
          </details>
        </div>

        <Button className="bg-white text-gray-900 hover:bg-gray-100 px-8 py-3 text-lg font-semibold rounded-lg">
          Get started for free
        </Button>
      </div>
    </section>
  );
};

export default Newsletter;
