
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <div className="hero-gradient min-h-[85vh] flex flex-col justify-center">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-10 items-center">
          <div className="animate-fade-in">
            <h1 className="mb-6">
              <span className="text-conneqt-blue">Multilingual</span> Customer Service <span className="text-conneqt-blue">Enhanced by AI</span>
            </h1>
            <p className="text-xl text-conneqt-slate mb-8 max-w-lg">
              Professional customer service solutions in English, Spanish, and Dutch with 
              AI-powered insights to maximize efficiency and scalability.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link 
                to="/quote" 
                className="bg-conneqt-blue hover:bg-blue-500 text-white px-6 py-3 rounded-md font-medium transition-colors flex items-center"
              >
                Request a Quote <ArrowRight size={18} className="ml-2" />
              </Link>
              <Link 
                to="/about" 
                className="bg-white hover:bg-gray-50 text-conneqt-navy border border-conneqt-navy px-6 py-3 rounded-md font-medium transition-colors"
              >
                Learn More
              </Link>
            </div>
          </div>
          <div className="hidden lg:block animate-fade-in animate-delay-300">
            <img 
              src="/lovable-uploads/c56de219-63c2-447c-9b95-00b80e9cba45.png" 
              alt="Customer service team" 
              className="rounded-lg shadow-xl object-cover w-full max-h-[400px]"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
