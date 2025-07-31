
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import ServiceSection from '@/components/sections/ServiceSection';
import SuccessShowcase from '@/components/sections/SuccessShowcase';
import ClientModelSection from '@/components/sections/ClientModelSection';
import AIGuardianSection from '@/components/sections/AIGuardianSection';
import GetStartedJourney from '@/components/sections/GetStartedJourney';
import SocialProofSection from '@/components/sections/SocialProofSection';
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
      <SuccessShowcase />
      <ServiceSection />
      <ClientModelSection />
      <AIGuardianSection />
      <GetStartedJourney />
      <SocialProofSection />
      <CTASection />
      <Footer />
    </>
  );
};

export default Index;
