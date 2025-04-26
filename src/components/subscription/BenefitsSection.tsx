
import { Check, BadgeEuro, ShieldCheck, Users } from 'lucide-react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const BenefitsSection = () => {
  const benefits = [
    {
      title: "Business Growth",
      icon: BadgeEuro,
      items: [
        "Reduced operational costs",
        "Improved customer satisfaction",
        "Scalable solutions",
        "Increased revenue potential"
      ]
    },
    {
      title: "Enhanced Security",
      icon: ShieldCheck,
      items: [
        "Advanced data protection",
        "Compliance management",
        "Regular security updates",
        "Secure client communication"
      ]
    },
    {
      title: "Team Efficiency",
      icon: Users,
      items: [
        "Streamlined workflows",
        "Data-driven decisions",
        "Enhanced team productivity",
        "Better resource allocation"
      ]
    }
  ];

  return (
    <div className="grid md:grid-cols-3 gap-8">
      {benefits.map((benefit) => (
        <Card key={benefit.title} className="bg-gradient-to-br from-white to-gray-50 border-none shadow-md hover:shadow-xl transition-shadow duration-300">
          <CardHeader className="pb-4">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-conneqt-blue bg-opacity-10 p-3 rounded-lg">
                <benefit.icon className="h-6 w-6 text-conneqt-blue" />
              </div>
              <CardTitle className="text-xl">{benefit.title}</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              {benefit.items.map((item) => (
                <li key={item} className="flex items-center gap-3">
                  <Check className="h-4 w-4 text-green-500 flex-shrink-0" />
                  <span className="text-gray-600 text-sm">{item}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default BenefitsSection;
