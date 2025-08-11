
import { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import ServiceSection from '@/components/sections/ServiceSection';
import HighlightsStrip from '@/components/sections/HighlightsStrip';
import CTASection from '@/components/sections/CTASection';
import Footer from '@/components/Footer';
import useScrollToTop from '@/hooks/useScrollToTop';

const Index = () => {
  // Add the scroll to top hook
  useScrollToTop();

  useEffect(() => {
    document.title = 'AI Call Center Services | Conneqt';
    const metaDesc = 'Explore all AI call center services and build a tailored solution.';
    let m = document.querySelector('meta[name="description"]');
    if (!m) {
      m = document.createElement('meta');
      m.setAttribute('name', 'description');
      document.head.appendChild(m);
    }
    m.setAttribute('content', metaDesc);

    let c = document.querySelector('link[rel="canonical"]');
    if (!c) {
      c = document.createElement('link');
      c.setAttribute('rel', 'canonical');
      document.head.appendChild(c);
    }
    c.setAttribute('href', window.location.origin + '/');
  }, []);
  
  return (
    <>
      <Navbar />
      <Hero />
      <ServiceSection />
      <HighlightsStrip />
      <CTASection />
      <Footer />
    </>
  );
};

export default Index;
