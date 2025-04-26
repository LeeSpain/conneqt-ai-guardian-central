
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import useScrollToTop from '@/hooks/useScrollToTop';
import ServiceFeatures from '@/components/subscription/ServiceFeatures';
import BenefitsSection from '@/components/subscription/BenefitsSection';
import PlansComparison from '@/components/subscription/PlansComparison';
import PricingPlans from '@/components/subscription/PricingPlans';

const SubscriptionServices = () => {
  useScrollToTop();

  return (
    <>
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-20 pb-16 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl font-bold mb-6">
              Choose Your <span className="text-conneqt-blue">Solution</span>
            </h1>
            <p className="text-xl text-conneqt-slate mb-4">
              Flexible plans designed to scale with your business needs
            </p>
          </div>
        </div>
      </section>

      {/* Service Features */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Service Features</h2>
            <p className="text-conneqt-slate">Discover what makes our service stand out</p>
          </div>
          <ServiceFeatures />
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Key Benefits</h2>
            <p className="text-conneqt-slate">Why businesses choose our solutions</p>
          </div>
          <BenefitsSection />
        </div>
      </section>

      {/* Plans Comparison */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Plan Comparison</h2>
            <p className="text-conneqt-slate">Compare our plans to find the perfect fit</p>
          </div>
          <PlansComparison />
        </div>
      </section>

      {/* Pricing Plans */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Pricing Plans</h2>
            <p className="text-conneqt-slate">Select the plan that works best for you</p>
          </div>
          <PricingPlans />
        </div>
      </section>

      <Footer />
    </>
  );
};

export default SubscriptionServices;
