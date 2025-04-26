
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import ServiceSection from '@/components/sections/ServiceSection';
import ClientModelSection from '@/components/sections/ClientModelSection';
import AIGuardianSection from '@/components/sections/AIGuardianSection';
import CTASection from '@/components/sections/CTASection';
import Footer from '@/components/Footer';
import useScrollToTop from '@/hooks/useScrollToTop';

const Index = () => {
  // Add the scroll to top hook
  useScrollToTop();
  
  return (
    <>
      <Navbar />
      <Hero />
      <ServiceSection />
      <ClientModelSection />
      <AIGuardianSection />
      <CTASection />
      <Footer />
    </>
  );
};

export default Index;
