
import { ReactNode } from 'react';
import { Card, CardContent } from "@/components/ui/card";

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
    <Card className={`group hover:shadow-lg transition-all duration-300 animate-fade-in ${delayClass} overflow-hidden`}>
      <div className={`absolute inset-0 opacity-0 group-hover:opacity-5 transition-opacity duration-300 ${color}`} />
      <CardContent className="p-6">
        <div className={`${color} bg-opacity-10 p-4 rounded-xl w-14 h-14 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
          <div className="text-conneqt-blue">
            {icon}
          </div>
        </div>
        <h3 className="text-xl font-semibold mb-3 group-hover:text-conneqt-blue transition-colors duration-300">{title}</h3>
        <p className="text-conneqt-slate leading-relaxed">{description}</p>
      </CardContent>
    </Card>
  );
};

export default ServiceCard;
