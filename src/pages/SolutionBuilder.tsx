import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import EmbeddedAssistant from '@/components/assessment/EmbeddedAssistant';
import QuestionnaireForm from '@/components/assessment/QuestionnaireForm';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
            {/* Left: AI Assistant Chat (fixed height) */}
            <div className="w-full">
              <EmbeddedAssistant />
            </div>

            {/* Right: Questionnaire in a matching card */}
            <Card className="h-[500px] flex flex-col">
              <CardHeader className="pb-3">
                <CardTitle>Business Questionnaire</CardTitle>
              </CardHeader>
              <CardContent className="flex-1 overflow-y-auto">
                <QuestionnaireForm />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default SolutionBuilder;
