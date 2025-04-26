
import { Check } from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const ServiceFeatures = () => {
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
  );
};

export default ServiceFeatures;
