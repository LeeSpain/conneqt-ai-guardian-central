import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import useScrollToTop from '@/hooks/useScrollToTop';

import QuestionnaireForm from '@/components/assessment/QuestionnaireForm';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useEffect } from 'react';
import { AgentProvider } from '@/contexts/AgentContext';
const SolutionBuilder = () => {
  useScrollToTop();
  
  useEffect(() => {
    document.title = 'Solution Builder: Company Basics';
    let meta = document.querySelector('meta[name="description"]') as HTMLMetaElement | null;
    if (!meta) {
      meta = document.createElement('meta');
      meta.setAttribute('name', 'description');
      document.head.appendChild(meta);
    }
    meta.setAttribute('content', 'Build your solution: company basics, AI agent overview, and support requirements.');

    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', window.location.href);
  }, []);

  return (
    <>
      <Navbar />
      <AgentProvider>
        <div className="min-h-screen bg-background pt-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
            <header className="mb-8 text-center">
              <h1 className="text-4xl font-bold tracking-tight">Business Needs Questionnaire</h1>
              <p className="mt-2 text-muted-foreground max-w-2xl mx-auto">
                A short, professional questionnaire to tailor your services and dashboard. Our AI assistant is here to help.
              </p>
            </header>

            <div className="max-w-3xl mx-auto">
              <Card className="flex flex-col">
                <CardHeader className="pb-3">
                  <CardTitle>Business Questionnaire</CardTitle>
                </CardHeader>
                <CardContent>
                  <QuestionnaireForm />
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </AgentProvider>
      <Footer />
    </>
  );
};

export default SolutionBuilder;
