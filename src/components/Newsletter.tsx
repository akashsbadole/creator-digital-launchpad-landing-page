
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Mail, Gift } from 'lucide-react';

const Newsletter = () => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      // This would integrate with your email service (Mailchimp, ConvertKit, etc.)
      console.log('Subscribing email:', email);
      setIsSubscribed(true);
      setEmail('');
    }
  };

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-purple-600 to-pink-600">
      <div className="max-w-4xl mx-auto">
        <Card className="bg-white/10 backdrop-blur-lg border-white/20 shadow-2xl">
          <CardContent className="p-8 sm:p-12 text-center">
            <div className="mb-6">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-full mb-4">
                <Gift className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                Get Your Free Starter Pack
              </h2>
              <p className="text-xl text-white/90 max-w-2xl mx-auto">
                Join 10,000+ creators and get exclusive templates, guides, and insider tips delivered to your inbox weekly.
              </p>
            </div>

            {!isSubscribed ? (
              <form onSubmit={handleSubscribe} className="max-w-md mx-auto">
                <div className="flex flex-col sm:flex-row gap-4">
                  <Input
                    type="email"
                    placeholder="Enter your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="bg-white/20 border-white/30 text-white placeholder-white/70 focus:bg-white/30"
                    required
                  />
                  <Button 
                    type="submit"
                    className="bg-white text-purple-600 hover:bg-gray-100 font-semibold px-8"
                  >
                    <Mail className="w-4 h-4 mr-2" />
                    Subscribe
                  </Button>
                </div>
                <p className="text-white/70 text-sm mt-4">
                  Free templates • No spam • Unsubscribe anytime
                </p>
              </form>
            ) : (
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-green-500 rounded-full mb-4">
                  <Mail className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">Welcome to the Creator Community!</h3>
                <p className="text-white/90">
                  Check your email for your free starter pack and welcome guide.
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default Newsletter;
