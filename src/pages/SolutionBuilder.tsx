import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import EmbeddedAssistant from '@/components/assessment/EmbeddedAssistant';
import QuestionnaireForm from '@/components/assessment/QuestionnaireForm';

const SolutionBuilder = () => {
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-background pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <header className="mb-8 text-center">
            <h1 className="text-4xl font-bold tracking-tight">Business Needs Questionnaire</h1>
            <p className="mt-2 text-muted-foreground max-w-2xl mx-auto">
              A short, professional questionnaire to tailor your services and dashboard. Our AI assistant is here to help.
            </p>
          </header>

          <div className="grid grid-cols-1 gap-10">
            <EmbeddedAssistant />
            <main>
              <QuestionnaireForm />
            </main>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default SolutionBuilder;
