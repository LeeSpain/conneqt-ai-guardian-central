
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-conneqt-navy text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-xl font-bold mb-4 text-white">
              <span className="text-conneqt-blue">Conneqt</span>Central
            </h3>
            <p className="text-gray-300 mb-4">
              Professional, multilingual, AI-enhanced customer service and 
              remote call centre platform based in Malaga, Spain.
            </p>
            <p className="text-gray-300">
              Owned & Operated by: MedConneqt
            </p>
          </div>
          
          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-white">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-300 hover:text-conneqt-blue transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-300 hover:text-conneqt-blue transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/quote" className="text-gray-300 hover:text-conneqt-blue transition-colors">
                  Request a Quote
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Contact */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-white">Contact Us</h4>
            <address className="text-gray-300 not-italic">
              <p className="mb-2">Malaga, Spain</p>
              <p className="mb-2">
                <a href="mailto:info@conneqtcentral.com" className="hover:text-conneqt-blue transition-colors">
                  info@conneqtcentral.com
                </a>
              </p>
              <p>
                <a href="tel:+34123456789" className="hover:text-conneqt-blue transition-colors">
                  +34 123 456 789
                </a>
              </p>
            </address>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-300 text-sm">
            © {new Date().getFullYear()} ConneqtCentral. All rights reserved.
          </p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <a href="#" className="text-gray-300 hover:text-conneqt-blue transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="text-gray-300 hover:text-conneqt-blue transition-colors">
              Terms of Service
            </a>
            <div className="flex space-x-2">
              <span className="text-gray-300">Languages:</span>
              <a href="#" className="text-gray-300 hover:text-conneqt-blue transition-colors">EN</a>
              <a href="#" className="text-gray-300 hover:text-conneqt-blue transition-colors">ES</a>
              <a href="#" className="text-gray-300 hover:text-conneqt-blue transition-colors">NL</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
