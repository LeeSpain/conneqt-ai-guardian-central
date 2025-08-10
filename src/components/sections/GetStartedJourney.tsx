import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  ArrowRight, 
  Play, 
  Brain, 
  Zap, 
  Users, 
  Target,
  CheckCircle,
  Clock,
  Shield,
  Rocket
} from 'lucide-react';
import { Link } from 'react-router-dom';

const journeySteps = [
  {
    step: 1,
    title: 'Assess Your Needs',
    description: 'Take our 5-minute business assessment to get personalized recommendations',
    icon: Brain,
    time: '5 min',
    link: '/solution-builder?tab=assessment'
  },
  {
    step: 2,
    title: 'See AI in Action',
    description: 'Try industry-specific demos and see how AI handles your customer scenarios',
    icon: Play,
    time: '10 min',
    link: '/ai-agents'
  },
  {
    step: 3,
    title: 'Calculate ROI',
    description: 'Get exact cost savings and performance improvements for your business',
    icon: Target,
    time: '5 min',
    link: '/solution-builder?tab=roi'
  },
  {
    step: 4,
    title: 'Launch Your Solution',
    description: 'Get a custom proposal and implementation plan tailored to your needs',
    icon: Rocket,
    time: '2 weeks',
    link: '/quote'
  }
];

const benefits = [
  { icon: Clock, title: '96% Faster', description: 'Response times vs traditional support' },
  { icon: Users, title: '24/7 Coverage', description: 'Never miss a customer inquiry' },
  { icon: Shield, title: 'Enterprise Security', description: 'SOC 2, HIPAA, GDPR compliant' },
  { icon: Zap, title: 'Instant Scaling', description: 'Handle 10x volume without hiring' }
];

const GetStartedJourney = () => {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">
            Start Your AI Transformation Today
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Follow our proven 4-step process to implement AI customer service that delivers measurable results
          </p>
        </div>

        {/* Journey Steps */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {journeySteps.map((step) => (
            <Card key={step.step} className="relative border-2 hover:border-primary/20 transition-all group">
              <CardHeader className="text-center pb-3">
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <div className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold">
                    {step.step}
                  </div>
                </div>
                <div className="flex justify-center mb-3 mt-2">
                  <step.icon className="w-8 h-8 text-primary" />
                </div>
                <CardTitle className="text-lg">{step.title}</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-sm text-muted-foreground mb-3">{step.description}</p>
                <Badge variant="outline" className="mb-4">{step.time}</Badge>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors"
                  asChild
                >
                  <Link to={step.link}>
                    Start Step {step.step}
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Benefits Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {benefits.map((benefit) => (
            <div key={benefit.title} className="text-center">
              <div className="flex justify-center mb-3">
                <benefit.icon className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-lg font-semibold mb-2">{benefit.title}</h3>
              <p className="text-sm text-muted-foreground">{benefit.description}</p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <Card className="inline-block border-primary/20 bg-primary/5 p-8">
            <div className="max-w-md">
              <h3 className="text-2xl font-bold mb-4">Ready to Transform Your Customer Service?</h3>
              <p className="text-muted-foreground mb-6">
                Join 500+ companies already using AI to deliver exceptional customer experiences
              </p>
              <div className="space-y-3">
                <Button size="lg" className="w-full" asChild>
                  <Link to="/solution-builder">
                    Start Free Assessment <ArrowRight size={16} className="ml-2" />
                  </Link>
                </Button>
                <Button variant="outline" size="lg" className="w-full" asChild>
                  <Link to="/ai-agents">
                    <Play size={16} className="mr-2" />
                    Watch Demo First
                  </Link>
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default GetStartedJourney;