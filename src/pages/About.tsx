
import { Users, Globe, HeartHandshake } from 'lucide-react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import useScrollToTop from '@/hooks/useScrollToTop';

const About = () => {
  useScrollToTop();
  
  return (
    <>
      <Navbar />
      
      {/* Hero */}
      <section className="pt-20 pb-16 bg-gradient-to-b from-blue-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="mb-6">About <span className="text-conneqt-blue">ConneqtCentral</span></h1>
            <p className="text-xl text-conneqt-slate mb-8">
              A professional, multilingual, AI-enhanced customer service platform 
              based in Malaga, Spain, owned and operated by MedConneqt.
            </p>
          </div>
        </div>
      </section>
      
      {/* Our Story */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="mb-6">Our Story</h2>
              <p className="text-conneqt-slate mb-4">
                ConneqtCentral was born from our passion to deliver exceptional multilingual customer 
                service solutions to businesses across Europe. As part of the MedConneqt family, 
                we've built on years of experience in the healthcare and wellness sectors.
              </p>
              <p className="text-conneqt-slate mb-4">
                We started by providing customer support services to companies like Dosell (medication dispensers) 
                and MobileCare (glucose monitoring), where we saw firsthand the need for a scalable, 
                AI-enhanced platform that could handle multilingual support efficiently.
              </p>
              <p className="text-conneqt-slate">
                Today, ConneqtCentral offers a comprehensive solution that combines human expertise 
                with AI-powered insights, enabling businesses of all sizes to deliver outstanding 
                customer experiences without the overhead of building their own support infrastructure.
              </p>
            </div>
            <div className="order-first md:order-last">
              <img 
                src="https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?auto=format&fit=crop&q=80&w=600" 
                alt="ConneqtCentral office" 
                className="rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>
      
      {/* Our Values */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="mb-4">Our Values</h2>
            <p className="text-conneqt-slate text-lg max-w-2xl mx-auto">
              These core principles guide everything we do at ConneqtCentral.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {/* Value 1 */}
            <div className="bg-white p-8 rounded-xl shadow-lg">
              <div className="bg-blue-50 w-16 h-16 rounded-lg flex items-center justify-center mb-6">
                <Users size={32} className="text-conneqt-blue" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Human-Centered</h3>
              <p className="text-conneqt-slate">
                While we embrace AI technology, we believe in the irreplaceable value of human connection. 
                Our services blend the best of both worlds.
              </p>
            </div>
            
            {/* Value 2 */}
            <div className="bg-white p-8 rounded-xl shadow-lg">
              <div className="bg-blue-50 w-16 h-16 rounded-lg flex items-center justify-center mb-6">
                <Globe size={32} className="text-conneqt-blue" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Multilingual Excellence</h3>
              <p className="text-conneqt-slate">
                We're proud of our ability to support customers in English, Spanish, and Dutch, 
                breaking down language barriers for businesses across Europe.
              </p>
            </div>
            
            {/* Value 3 */}
            <div className="bg-white p-8 rounded-xl shadow-lg">
              <div className="bg-blue-50 w-16 h-16 rounded-lg flex items-center justify-center mb-6">
                <HeartHandshake size={32} className="text-conneqt-blue" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Partnership Mindset</h3>
              <p className="text-conneqt-slate">
                We don't just provide a service; we become an extension of your team, 
                aligned with your goals and committed to your success.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Clients */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="mb-4">Trusted By</h2>
            <p className="text-conneqt-slate text-lg max-w-2xl mx-auto">
              We're proud to work with innovative companies across Europe.
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center">
            {/* Client logos would go here - using placeholders */}
            <div className="bg-gray-100 h-24 rounded flex items-center justify-center">
              <span className="text-conneqt-slate font-medium">Dosell</span>
            </div>
            <div className="bg-gray-100 h-24 rounded flex items-center justify-center">
              <span className="text-conneqt-slate font-medium">MobileCare</span>
            </div>
            <div className="bg-gray-100 h-24 rounded flex items-center justify-center">
              <span className="text-conneqt-slate font-medium">Client 3</span>
            </div>
            <div className="bg-gray-100 h-24 rounded flex items-center justify-center">
              <span className="text-conneqt-slate font-medium">Client 4</span>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA */}
      <section className="py-16 bg-conneqt-navy text-white">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="mb-6 text-white">Ready to Transform Your Customer Service?</h2>
          <p className="text-lg text-blue-100 mb-8 max-w-2xl mx-auto">
            Let's discuss how ConneqtCentral can support your business with our 
            multilingual customer service solutions.
          </p>
          <Link 
            to="/quote" 
            className="inline-flex items-center bg-conneqt-blue hover:bg-blue-500 text-white px-6 py-3 rounded-md font-medium transition-colors"
          >
            Request a Quote
          </Link>
        </div>
      </section>
      
      <Footer />
    </>
  );
};

export default About;
