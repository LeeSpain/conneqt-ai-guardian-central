
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import useScrollToTop from '@/hooks/useScrollToTop';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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

      {/* Features Overview */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Tabs defaultValue="features" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-8">
              <TabsTrigger value="features">Service Features</TabsTrigger>
              <TabsTrigger value="benefits">Key Benefits</TabsTrigger>
              <TabsTrigger value="comparison">Plan Comparison</TabsTrigger>
            </TabsList>
            
            <TabsContent value="features">
              <ServiceFeatures />
            </TabsContent>
            
            <TabsContent value="benefits">
              <BenefitsSection />
            </TabsContent>
            
            <TabsContent value="comparison">
              <PlansComparison />
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Pricing Plans */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <PricingPlans />
        </div>
      </section>

      <Footer />
    </>
  );
};

export default SubscriptionServices;
