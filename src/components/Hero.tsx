
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { AspectRatio } from '@/components/ui/aspect-ratio';

const Hero = () => {
  return (
    <div className="hero-gradient min-h-[85vh] flex flex-col justify-center">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-10 items-center">
          <div className="animate-fade-in">
            <h1 className="mb-6">
              <span className="text-conneqt-blue">AI-Powered</span> Customer Service Platform: <span className="text-conneqt-blue">The Future of Support</span>
            </h1>
            <p className="text-xl text-conneqt-slate mb-8 max-w-lg">
              Fully Autonomous AI Customer Service with Human Oversight in English, Spanish, and Dutch with 
              seamless integration to your existing business systems.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link 
                to="/quote" 
                className="bg-conneqt-blue hover:bg-blue-500 text-white px-6 py-3 rounded-md font-medium transition-colors flex items-center"
              >
                Request a Quote <ArrowRight size={18} className="ml-2" />
              </Link>
              <Link 
                to="/ai-guardian" 
                className="bg-white hover:bg-gray-50 text-conneqt-navy border border-conneqt-navy px-6 py-3 rounded-md font-medium transition-colors"
              >
                AI Agent Demo
              </Link>
            </div>
          </div>
          
          <div className="hidden lg:block animate-fade-in animate-delay-300">
            <AspectRatio ratio={16 / 9} className="overflow-hidden rounded-lg shadow-xl">
              <img 
                src="/lovable-uploads/c56de219-63c2-447c-9b95-00b80e9cba45.png" 
                alt="AI agent handling customer interactions"
                loading="eager"
                decoding="async"
                className="object-cover w-full h-full"
                fetchPriority="high"
              />
            </AspectRatio>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
