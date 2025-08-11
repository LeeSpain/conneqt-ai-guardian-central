
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link to="/" className="flex-shrink-0 flex items-center">
            <span className="text-conneqt-navy text-xl md:text-2xl font-bold">
              <span className="text-conneqt-blue">Conneqt</span>Central
            </span>
          </Link>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-conneqt-slate hover:text-conneqt-blue px-3 py-2 font-medium transition-colors">
              Home
            </Link>
            <Link to="/about" className="text-conneqt-slate hover:text-conneqt-blue px-3 py-2 font-medium transition-colors">
              About Us
            </Link>
            <Link to="/solution-builder" className="text-conneqt-slate hover:text-conneqt-blue px-3 py-2 font-medium transition-colors">
              Solution Builder
            </Link>
            <Link to="/admin-dashboard" className="text-conneqt-slate hover:text-conneqt-blue px-3 py-2 font-medium transition-colors">
              Admin Dashboard
            </Link>
            <Link to="/client-hub" className="text-conneqt-slate hover:text-conneqt-blue px-3 py-2 font-medium transition-colors">
              Healthcare Dashboard
            </Link>
            <Link to="/client-hub" className="text-conneqt-slate hover:text-conneqt-blue px-3 py-2 font-medium transition-colors">
              Client Hub
            </Link>
            <Link to="/quote" className="bg-conneqt-blue hover:bg-blue-500 text-white px-4 py-2 rounded-md font-medium transition-colors">
              Request a Quote
            </Link>
          </div>
          
          {/* Mobile menu button */}
          <div className="md:hidden">
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-conneqt-slate hover:text-conneqt-blue p-2"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link 
              to="/" 
              className="block px-3 py-2 text-conneqt-slate hover:text-conneqt-blue font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link 
              to="/about" 
              className="block px-3 py-2 text-conneqt-slate hover:text-conneqt-blue font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              About Us
            </Link>
            <Link 
              to="/solution-builder" 
              className="block px-3 py-2 text-conneqt-slate hover:text-conneqt-blue font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              Solution Builder
            </Link>
            <Link 
              to="/admin-dashboard"
              className="block px-3 py-2 text-conneqt-slate hover:text-conneqt-blue font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              Admin Dashboard
            </Link>
            <Link 
              to="/client-hub" 
              className="block px-3 py-2 text-conneqt-slate hover:text-conneqt-blue font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              Healthcare Dashboard
            </Link>
            <Link 
              to="/client-hub" 
              className="block px-3 py-2 text-conneqt-slate hover:text-conneqt-blue font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              Client Hub
            </Link>
            <Link 
              to="/quote" 
              className="block px-3 py-2 bg-conneqt-blue hover:bg-blue-500 text-white rounded-md font-medium transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Request a Quote
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
