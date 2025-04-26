
import { ReactNode } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { HoverCard, HoverCardTrigger, HoverCardContent } from "@/components/ui/hover-card";

interface ServiceCardProps {
  title: string;
  description: string;
  icon: ReactNode;
  color: string;
  delay?: number;
}

const ServiceCard = ({ title, description, icon, color, delay = 0 }: ServiceCardProps) => {
  const delayClass = delay ? `animate-delay-${delay}` : '';
  
  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <Card className={`group cursor-pointer transform transition-all duration-500 hover:scale-105 animate-fade-in ${delayClass} overflow-hidden`}>
          <div className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-300 bg-gradient-to-br from 0% via-white to-100%" />
          <CardContent className="p-8 relative">
            <div className={`${color} bg-opacity-10 p-6 rounded-2xl w-16 h-16 flex items-center justify-center mb-6 group-hover:rotate-12 transition-transform duration-500`}>
              <div className={`text-2xl ${color.replace('bg-', 'text-')}`}>
                {icon}
              </div>
            </div>
            <div className="space-y-4">
              <h3 className="text-2xl font-bold mb-3 group-hover:text-conneqt-blue transition-colors duration-300">{title}</h3>
              <p className="text-conneqt-slate leading-relaxed opacity-90">{description}</p>
            </div>
            <div className="absolute top-4 right-4 w-20 h-20 rounded-full bg-gradient-to-br from-white to-gray-100 opacity-0 group-hover:opacity-10 transform translate-x-full group-hover:translate-x-0 transition-all duration-700" />
          </CardContent>
        </Card>
      </HoverCardTrigger>
      <HoverCardContent className="w-80 p-4">
        <div className="space-y-2">
          <h4 className="text-sm font-semibold">{title}</h4>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
};

export default ServiceCard;
