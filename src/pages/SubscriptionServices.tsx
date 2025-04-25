
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Check } from 'lucide-react';
import { Button } from "@/components/ui/button";

const SubscriptionServices = () => {
  const plans = [
    {
      name: "Basic",
      price: "$79",
      description: "Perfect for small businesses getting started",
      features: [
        "24/7 Customer Support",
        "Up to 100 tickets per month",
        "Basic reporting and analytics",
        "Email support",
        "Single language support",
      ],
      color: "bg-blue-500",
      buttonVariant: "outline" as const
    },
    {
      name: "Professional",
      price: "$199",
      description: "Ideal for growing businesses",
      features: [
        "Everything in Basic, plus:",
        "Up to 1000 tickets per month",
        "Advanced analytics",
        "Priority email & phone support",
        "Multilingual support (3 languages)",
        "Custom workflows",
      ],
      color: "bg-conneqt-blue",
      isPopular: true,
      buttonVariant: "default" as const
    },
    {
      name: "Enterprise",
      price: "$499",
      description: "For large-scale operations",
      features: [
        "Everything in Professional, plus:",
        "Unlimited tickets",
        "Dedicated account manager",
        "Custom API integration",
        "24/7 priority support",
        "Full access to AI Guardian",
        "Custom language support",
      ],
      color: "bg-indigo-600",
      buttonVariant: "outline" as const
    }
  ];

  return (
    <>
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-20 pb-16 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl font-bold mb-6">
              Choose Your <span className="text-conneqt-blue">Subscription</span> Plan
            </h1>
            <p className="text-xl text-conneqt-slate mb-4">
              Scale your customer service with our flexible subscription plans
            </p>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            {plans.map((plan) => (
              <div 
                key={plan.name}
                className={`relative bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100
                  ${plan.isPopular ? 'ring-2 ring-conneqt-blue scale-105 z-10' : ''}
                `}
              >
                {plan.isPopular && (
                  <div className="absolute top-0 right-0 bg-conneqt-blue text-white px-4 py-1 text-sm font-medium rounded-bl-lg">
                    Most Popular
                  </div>
                )}
                
                <div className={`${plan.color} h-2 w-full`} />
                
                <div className="p-6">
                  <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                  <div className="mb-4">
                    <span className="text-4xl font-bold">{plan.price}</span>
                    <span className="text-gray-500">/month</span>
                  </div>
                  <p className="text-gray-600 mb-6">{plan.description}</p>
                  
                  <Button 
                    variant={plan.buttonVariant}
                    className="w-full mb-6"
                  >
                    Choose {plan.name}
                  </Button>
                  
                  <ul className="space-y-3">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-start">
                        <div className="bg-green-100 rounded-full p-1 mr-3 mt-1">
                          <Check size={14} className="text-green-600" />
                        </div>
                        <span className="text-gray-600">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default SubscriptionServices;
