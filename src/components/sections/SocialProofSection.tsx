import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Star, 
  Quote, 
  ArrowRight,
  TrendingUp,
  Users,
  Clock,
  DollarSign
} from 'lucide-react';
import { Link } from 'react-router-dom';

const testimonials = [
  {
    name: 'Sarah Chen',
    role: 'Director of Customer Experience',
    company: 'HealthTech Solutions',
    industry: 'Healthcare',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612e38f?w=150&h=150&fit=crop&crop=face',
    quote: "ConneQt AI transformed our patient support. We now handle 3x more inquiries with 95% accuracy and complete HIPAA compliance.",
    metrics: {
      savings: '€180K annually',
      improvement: '300% volume increase',
      satisfaction: '4.9/5 rating'
    }
  },
  {
    name: 'Marcus Rodriguez',
    role: 'VP of Operations',
    company: 'ShopFlow Commerce',
    industry: 'E-commerce',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    quote: "Our customers love the instant responses. Order tracking and returns are now completely automated, freeing our team for complex issues.",
    metrics: {
      savings: '€120K annually',
      improvement: '60% cost reduction',
      satisfaction: '4.7/5 rating'
    }
  },
  {
    name: 'Dr. Emily Watson',
    role: 'Chief Technology Officer',
    company: 'TechFlow SaaS',
    industry: 'Technology',
    avatar: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150&h=150&fit=crop&crop=face',
    quote: "The technical troubleshooting capability is incredible. API issues that used to take hours are now resolved in minutes.",
    metrics: {
      savings: '€200K annually',
      improvement: '75% faster resolution',
      satisfaction: '4.8/5 rating'
    }
  }
];

const socialProof = [
  { metric: '500+', label: 'Enterprise Clients', icon: Users },
  { metric: '2.1M+', label: 'Interactions Monthly', icon: TrendingUp },
  { metric: '96.8%', label: 'Customer Satisfaction', icon: Star },
  { metric: '€50M+', label: 'Savings Generated', icon: DollarSign }
];

const SocialProofSection = () => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Social Proof Stats */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-8">
            Trusted by Industry Leaders
          </h2>
          <div className="grid md:grid-cols-4 gap-8">
            {socialProof.map((item) => (
              <div key={item.label} className="text-center">
                <div className="flex justify-center mb-3">
                  <item.icon className="w-8 h-8 text-primary" />
                </div>
                <div className="text-4xl font-bold text-primary mb-2">{item.metric}</div>
                <div className="text-muted-foreground">{item.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Testimonials */}
        <div className="grid lg:grid-cols-3 gap-8 mb-12">
          {testimonials.map((testimonial) => (
            <Card key={testimonial.name} className="border-2 hover:border-primary/20 transition-colors">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                  <Badge className="ml-2 bg-primary/10 text-primary">{testimonial.industry}</Badge>
                </div>
                
                <div className="relative mb-6">
                  <Quote className="absolute -top-2 -left-2 w-6 h-6 text-primary/20" />
                  <p className="text-muted-foreground italic pl-4">
                    "{testimonial.quote}"
                  </p>
                </div>

                <div className="grid grid-cols-3 gap-2 mb-4 text-xs">
                  <div className="text-center p-2 bg-green-50 rounded">
                    <div className="font-semibold text-green-700">{testimonial.metrics.savings}</div>
                    <div className="text-green-600">Savings</div>
                  </div>
                  <div className="text-center p-2 bg-blue-50 rounded">
                    <div className="font-semibold text-blue-700">{testimonial.metrics.improvement}</div>
                    <div className="text-blue-600">Improvement</div>
                  </div>
                  <div className="text-center p-2 bg-purple-50 rounded">
                    <div className="font-semibold text-purple-700">{testimonial.metrics.satisfaction}</div>
                    <div className="text-purple-600">Satisfaction</div>
                  </div>
                </div>

                <div className="flex items-center">
                  <img 
                    src={testimonial.avatar} 
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover mr-3"
                  />
                  <div>
                    <div className="font-semibold">{testimonial.name}</div>
                    <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                    <div className="text-sm text-muted-foreground">{testimonial.company}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <Card className="inline-block border-primary/20 bg-primary/5 p-8">
            <div className="max-w-lg">
              <h3 className="text-2xl font-bold mb-4">Join These Success Stories</h3>
              <p className="text-muted-foreground mb-6">
                See how your industry peers are transforming customer service with AI
              </p>
              <div className="flex gap-3 justify-center">
                <Button asChild>
                  <Link to="/solution-builder">
                    Start Your Journey <ArrowRight size={16} className="ml-2" />
                  </Link>
                </Button>
                <Button variant="outline" asChild>
                  <Link to="/ai-agents">
                    <Clock size={16} className="mr-2" />
                    View More Case Studies
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

export default SocialProofSection;