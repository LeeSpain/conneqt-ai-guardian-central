import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  ArrowRight, 
  CheckCircle, 
  Users, 
  Zap, 
  Shield, 
  Brain,
  Target,
  TrendingUp,
  Clock,
  Globe,
  Phone,
  MessageCircle,
  Mic,
  BarChart3,
  Play
} from 'lucide-react';
import { Link } from 'react-router-dom';

const quickStats = [
  { label: 'Response Time', value: '< 30s', icon: Clock, color: 'text-blue-600' },
  { label: 'Resolution Rate', value: '96.8%', icon: Target, color: 'text-green-600' },
  { label: 'Languages', value: '25+', icon: Globe, color: 'text-purple-600' },
  { label: 'Uptime', value: '99.9%', icon: Shield, color: 'text-orange-600' }
];

const industryShowcase = [
  {
    id: 'healthcare',
    name: 'Healthcare',
    icon: '🏥',
    description: 'HIPAA-compliant patient support',
    features: ['Appointment scheduling', 'Medical inquiries', 'Insurance verification'],
    savings: '€180K annually',
    improvement: '40% faster responses'
  },
  {
    id: 'ecommerce',
    name: 'E-commerce',
    icon: '🛍️',
    description: 'Order and product support',
    features: ['Order tracking', 'Returns processing', 'Product assistance'],
    savings: '€120K annually',
    improvement: '60% cost reduction'
  },
  {
    id: 'saas',
    name: 'SaaS & Tech',
    icon: '💻',
    description: 'Technical support and onboarding',
    features: ['API troubleshooting', 'User onboarding', 'Feature guidance'],
    savings: '€200K annually',
    improvement: '50% faster resolution'
  }
];

const SuccessShowcase = () => {
  const [selectedIndustry, setSelectedIndustry] = useState(industryShowcase[0]);

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">
            <span className="bg-gradient-to-r from-conneqt-blue to-blue-600 bg-clip-text text-transparent">
              Proven Results Across Industries
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            See how our AI-powered customer service transforms businesses like yours
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid md:grid-cols-4 gap-6 mb-16">
          {quickStats.map((stat) => (
            <Card key={stat.label} className="text-center border-2 hover:border-primary/20 transition-colors">
              <CardContent className="p-6">
                <div className="flex justify-center mb-3">
                  <stat.icon className={`w-8 h-8 ${stat.color}`} />
                </div>
                <div className="text-3xl font-bold text-primary mb-1">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Industry Showcase */}
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h3 className="text-2xl font-bold mb-6">Industry-Specific AI Solutions</h3>
            <div className="space-y-4">
              {industryShowcase.map((industry) => (
                <Card 
                  key={industry.id}
                  className={`cursor-pointer transition-all ${
                    selectedIndustry.id === industry.id 
                      ? 'border-primary bg-primary/5' 
                      : 'hover:border-primary/20'
                  }`}
                  onClick={() => setSelectedIndustry(industry)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <div className="text-2xl">{industry.icon}</div>
                      <div className="flex-1">
                        <h4 className="font-semibold mb-1">{industry.name}</h4>
                        <p className="text-sm text-muted-foreground mb-2">{industry.description}</p>
                        <div className="flex gap-2 text-xs">
                          <Badge variant="outline">{industry.savings}</Badge>
                          <Badge variant="outline">{industry.improvement}</Badge>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          <div>
            <Card className="border-primary/20 bg-primary/5">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <span className="text-2xl">{selectedIndustry.icon}</span>
                  {selectedIndustry.name} Success Story
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-3 bg-background rounded-lg">
                    <div className="text-2xl font-bold text-green-600">{selectedIndustry.savings}</div>
                    <div className="text-sm text-muted-foreground">Annual Savings</div>
                  </div>
                  <div className="text-center p-3 bg-background rounded-lg">
                    <div className="text-lg font-bold text-blue-600">{selectedIndustry.improvement}</div>
                    <div className="text-sm text-muted-foreground">Performance Boost</div>
                  </div>
                </div>
                
                <div>
                  <h5 className="font-medium mb-2">Key Capabilities:</h5>
                  <ul className="space-y-1">
                    {selectedIndustry.features.map((feature, index) => (
                      <li key={index} className="flex items-center gap-2 text-sm">
                        <CheckCircle className="w-4 h-4 text-green-600" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-4 space-y-2">
                  <Button className="w-full" asChild>
                    <Link to="/solution-builder">
                      Build Your {selectedIndustry.name} Solution
                    </Link>
                  </Button>
                  <Button variant="outline" className="w-full" asChild>
                    <Link to="/ai-agents">
                      Try {selectedIndustry.name} Demo
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SuccessShowcase;