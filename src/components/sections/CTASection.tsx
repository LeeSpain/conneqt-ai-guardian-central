
import { Link } from 'react-router-dom';

const CTASection = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
        <h2 className="mb-6">Ready to Launch Your AI Call Center Business?</h2>
        <p className="text-lg text-conneqt-slate mb-8 max-w-2xl mx-auto">
          Join successful entrepreneurs and agencies already offering AI-powered customer service 
          solutions to their clients. Start building your solution today.
        </p>
        <div className="flex justify-center">
          <Link 
            to="/solution-builder" 
            className="bg-conneqt-blue hover:bg-blue-500 text-white px-6 py-3 rounded-md font-medium transition-colors"
          >
            Build Your Solution
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
