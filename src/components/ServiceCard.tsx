
import { ReactNode } from 'react';

interface ServiceCardProps {
  title: string;
  description: string;
  icon: ReactNode;
  delay?: number;
}

const ServiceCard = ({ title, description, icon, delay = 0 }: ServiceCardProps) => {
  const delayClass = delay ? `animate-delay-${delay}` : '';
  
  return (
    <div className={`bg-white rounded-xl p-6 card-shadow animate-fade-in animate-slide-in ${delayClass}`}>
      <div className="bg-blue-50 p-3 rounded-lg w-12 h-12 flex items-center justify-center text-conneqt-blue mb-4">
        {icon}
      </div>
      <h3 className="text-xl font-semibold mb-3">{title}</h3>
      <p className="text-conneqt-slate">{description}</p>
    </div>
  );
};

export default ServiceCard;
