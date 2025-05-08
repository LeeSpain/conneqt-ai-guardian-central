
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import ServiceSection from '@/components/sections/ServiceSection';
import ClientModelSection from '@/components/sections/ClientModelSection';
import AIGuardianSection from '@/components/sections/AIGuardianSection';
import CTASection from '@/components/sections/CTASection';
import Footer from '@/components/Footer';
import useScrollToTop from '@/hooks/useScrollToTop';
import VideoEmbed from '@/components/VideoEmbed';

const Index = () => {
  // Add the scroll to top hook
  useScrollToTop();
  
  return (
    <>
      <Navbar />
      <VideoEmbed videoId="4_0Nx6GMLSk" />
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
