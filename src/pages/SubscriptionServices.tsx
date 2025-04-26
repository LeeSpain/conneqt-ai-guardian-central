
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Check, Users, Database, Brain, BadgeEuro } from 'lucide-react';
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import useScrollToTop from '@/hooks/useScrollToTop';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const SubscriptionServices = () => {
  useScrollToTop();
  
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

  const serviceFeatures = [
    {
      title: "Customer Support Excellence",
      description: "Multi-channel support with AI-powered assistance",
      details: [
        "24/7 availability across time zones",
        "Multiple language support",
        "Video call support options",
        "Ticket tracking system",
      ]
    },
    {
      title: "AI-Powered Solutions",
      description: "Smart automation and intelligent insights",
      details: [
        "Predictive analytics",
        "Automated response suggestions",
        "Customer behavior analysis",
        "Smart workload distribution",
      ]
    },
    {
      title: "Integration Capabilities",
      description: "Seamless connection with your existing tools",
      details: [
        "CRM system integration",
        "API access for custom solutions",
        "Third-party app compatibility",
        "Data synchronization",
      ]
    },
  ];

  return (
    <>
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-20 pb-16 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl font-bold mb-6">
              Choose Your <span className="text-conneqt-blue">Solution</span>
            </h1>
            <p className="text-xl text-conneqt-slate mb-4">
              Flexible plans designed to scale with your business needs
            </p>
          </div>
        </div>
      </section>

      {/* Features Overview */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Tabs defaultValue="features" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-8">
              <TabsTrigger value="features">Service Features</TabsTrigger>
              <TabsTrigger value="benefits">Key Benefits</TabsTrigger>
              <TabsTrigger value="comparison">Plan Comparison</TabsTrigger>
            </TabsList>
            
            <TabsContent value="features">
              <div className="grid md:grid-cols-3 gap-8">
                {serviceFeatures.map((feature) => (
                  <Card key={feature.title}>
                    <CardHeader>
                      <CardTitle>{feature.title}</CardTitle>
                      <CardDescription>{feature.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        {feature.details.map((detail) => (
                          <li key={detail} className="flex items-center gap-2">
                            <Check className="h-4 w-4 text-green-500" />
                            <span>{detail}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="benefits">
              <div className="grid md:grid-cols-2 gap-8">
                <Card>
                  <CardHeader>
                    <CardTitle>Business Growth</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      <li className="flex items-center gap-2">
                        <BadgeEuro className="h-4 w-4 text-green-500" />
                        <span>Reduced operational costs</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="h-4 w-4 text-green-500" />
                        <span>Improved customer satisfaction</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="h-4 w-4 text-green-500" />
                        <span>Scalable solutions</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>Operational Excellence</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      <li className="flex items-center gap-2">
                        <Check className="h-4 w-4 text-green-500" />
                        <span>Streamlined workflows</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="h-4 w-4 text-green-500" />
                        <span>Data-driven decisions</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="h-4 w-4 text-green-500" />
                        <span>Enhanced team productivity</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            
            <TabsContent value="comparison">
              <Card>
                <CardContent className="pt-6">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left p-4">Feature</th>
                          <th className="p-4">Starter</th>
                          <th className="p-4">Professional</th>
                          <th className="p-4">Enterprise</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b">
                          <td className="p-4">Users</td>
                          <td className="p-4 text-center">1</td>
                          <td className="p-4 text-center">Up to 3</td>
                          <td className="p-4 text-center">Up to 10</td>
                        </tr>
                        <tr className="border-b">
                          <td className="p-4">Support Level</td>
                          <td className="p-4 text-center">Basic</td>
                          <td className="p-4 text-center">Priority</td>
                          <td className="p-4 text-center">Dedicated</td>
                        </tr>
                        <tr className="border-b">
                          <td className="p-4">AI Features</td>
                          <td className="p-4 text-center">Limited</td>
                          <td className="p-4 text-center">Advanced</td>
                          <td className="p-4 text-center">Full Access</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Pricing Plans */}
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
