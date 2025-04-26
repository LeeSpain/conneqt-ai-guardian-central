
import { Check, Users, Database, Brain } from 'lucide-react';
import { Button } from "@/components/ui/button";

const PricingPlans = () => {
  const plans = [
    {
      name: "Starter",
      price: "€99",
      description: "Perfect for individual users getting started",
      features: [
        "24/7 Basic Customer Support",
        "View-only AI insights dashboard",
        "Up to 100 customer interactions/month",
        "Basic email & chat support",
        "Standard response time (24h)",
        "Essential reporting features",
      ],
      users: "1",
      color: "bg-blue-500",
      buttonVariant: "outline" as const,
      icon: Users
    },
    {
      name: "Professional",
      price: "€199",
      description: "Ideal for growing teams",
      features: [
        "Advanced ticketing system",
        "Interactive AI chat assistant",
        "Up to 500 customer interactions/month",
        "Priority email & phone support",
        "Faster response time (12h)",
        "Export & analytics features",
        "Custom workflow creation",
        "Team collaboration tools",
      ],
      users: "Up to 3",
      color: "bg-conneqt-blue",
      isPopular: true,
      buttonVariant: "default" as const,
      icon: Database
    },
    {
      name: "Enterprise",
      price: "€349",
      description: "For established organizations",
      features: [
        "Full-featured AI analytics dashboard",
        "Unlimited customer interactions",
        "24/7 dedicated support team",
        "Instant priority response",
        "Advanced API integration",
        "Custom branding options",
        "Automated workflow builder",
        "Advanced security features",
        "Dedicated account manager",
      ],
      users: "Up to 10",
      color: "bg-indigo-600",
      buttonVariant: "outline" as const,
      icon: Brain
    }
  ];

  return (
    <div className="grid md:grid-cols-3 gap-8">
      {plans.map((plan) => (
        <div 
          key={plan.name}
          className={`relative bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100
            ${plan.isPopular ? 'ring-2 ring-conneqt-blue scale-105 z-10' : ''}
            transition-all duration-300 hover:shadow-xl
          `}
        >
          {plan.isPopular && (
            <div className="absolute top-0 right-0 bg-conneqt-blue text-white px-4 py-1 text-sm font-medium rounded-bl-lg">
              Most Popular
            </div>
          )}
          
          <div className={`${plan.color} h-2 w-full`} />
          
          <div className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className={`${plan.color} bg-opacity-10 p-2 rounded-lg`}>
                <plan.icon className={`h-6 w-6 ${plan.color.replace('bg-', 'text-')}`} />
              </div>
              <h3 className="text-2xl font-bold">{plan.name}</h3>
            </div>
            
            <div className="mb-4">
              <span className="text-4xl font-bold">{plan.price}</span>
              <span className="text-gray-500">/month</span>
            </div>
            
            <p className="text-gray-600 mb-6">{plan.description}</p>
            
            <Button 
              variant={plan.buttonVariant}
              className="w-full mb-6"
            >
              Get Started
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
  );
};

export default PricingPlans;
