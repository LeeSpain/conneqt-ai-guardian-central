
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Check, Users, Database, Brain } from 'lucide-react';
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const SubscriptionServices = () => {
  const plans = [
    {
      name: "Starter",
      price: "€99",
      description: "Perfect for individual users getting started",
      features: [
        "Dashboard access",
        "View-only AI features",
        "Basic insights",
        "Single user account",
        "Email support",
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
        "Full ticketing system",
        "Interactive AI chat",
        "Export capabilities",
        "Comprehensive reports",
        "User role management",
        "Up to 3 user accounts",
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
        "Advanced analytics dashboard",
        "CRM/API integration access",
        "Custom branding options",
        "Workflow builder",
        "Priority support",
        "Up to 10 user accounts",
      ],
      users: "Up to 10",
      color: "bg-indigo-600",
      buttonVariant: "outline" as const,
      icon: Brain
    }
  ];

  const addOns = [
    {
      name: "Extra Users",
      price: "€20",
      period: "per user/month",
      description: "Add more users to your plan"
    },
    {
      name: "CRM/API Integration",
      price: "€79",
      period: "per month",
      description: "Connect with your existing tools"
    },
    {
      name: "Custom AI Tuning",
      price: "€99",
      period: "one-time",
      description: "Customize AI behavior for your needs"
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
              Choose Your <span className="text-conneqt-blue">Plan</span>
            </h1>
            <p className="text-xl text-conneqt-slate mb-4">
              Fixed monthly tiers designed to scale with your business
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
        </div>
      </section>

      {/* Add-ons Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Available Add-ons</h2>
            <p className="text-lg text-conneqt-slate">
              Enhance your plan with these additional features
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {addOns.map((addon) => (
              <div 
                key={addon.name}
                className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow"
              >
                <h3 className="text-xl font-semibold mb-2">{addon.name}</h3>
                <div className="mb-3">
                  <span className="text-2xl font-bold text-conneqt-blue">{addon.price}</span>
                  <span className="text-gray-500"> {addon.period}</span>
                </div>
                <p className="text-gray-600">{addon.description}</p>
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
