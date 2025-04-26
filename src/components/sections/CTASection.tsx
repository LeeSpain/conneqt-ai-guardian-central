
import { Link } from 'react-router-dom';

const CTASection = () => {
  return (
    <section className="section-padding bg-gray-50">
      <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
        <h2 className="mb-6">Ready to Enhance Your Customer Service?</h2>
        <p className="text-lg text-conneqt-slate mb-8 max-w-2xl mx-auto">
          Whether you need a fully managed service or access to our powerful platform, 
          we're here to help your business deliver exceptional customer experiences.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link 
            to="/quote" 
            className="bg-conneqt-blue hover:bg-blue-500 text-white px-6 py-3 rounded-md font-medium transition-colors"
          >
            Request a Quote
          </Link>
          <Link 
            to="/about" 
            className="bg-white hover:bg-gray-50 text-conneqt-navy border border-conneqt-navy px-6 py-3 rounded-md font-medium transition-colors"
          >
            Learn More About Us
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
