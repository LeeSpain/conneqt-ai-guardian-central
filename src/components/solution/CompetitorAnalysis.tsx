import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { 
  BarChart3, 
  Target, 
  Shield, 
  Clock, 
  DollarSign, 
  Users, 
  Zap, 
  CheckCircle, 
  XCircle,
  ArrowRight
} from 'lucide-react';

interface CompetitorAnalysisProps {
  selectedTier?: string;
  monthlyVolume?: number;
}

const competitors = [
  {
    name: 'Traditional Call Center',
    type: 'Human-Only',
    monthlyBase: 0,
    perAgent: 4200, // Monthly cost per agent
    agentsNeeded: (volume: number) => Math.ceil(volume / 1000), // 1 agent per 1000 calls
    features: {
      availability: '8-16 hours',
      responseTime: '3-5 minutes',
      accuracy: '75-85%',
      languages: '1-2',
      scaling: 'Slow (weeks)',
      setup: '4-8 weeks'
    },
    pros: ['Human empathy', 'Complex problem solving', 'Cultural nuance'],
    cons: ['High costs', 'Limited hours', 'Inconsistent quality', 'Scalability issues']
  },
  {
    name: 'Chatbot Solutions',
    type: 'AI-Only Basic',
    monthlyBase: 150,
    perCall: 0.05,
    features: {
      availability: '24/7',
      responseTime: '< 1 second',
      accuracy: '60-70%',
      languages: '5-10',
      scaling: 'Instant',
      setup: '1-2 weeks'
    },
    pros: ['Low cost', 'Fast setup', '24/7 availability', 'Instant scaling'],
    cons: ['Limited functionality', 'Poor complex queries', 'No voice support', 'Basic integrations']
  },
  {
    name: 'Hybrid Solutions',
    type: 'AI + Human Fallback',
    monthlyBase: 800,
    perCall: 0.20,
    agentsNeeded: (volume: number) => Math.ceil(volume / 5000), // Reduced need due to AI
    features: {
      availability: '24/7 AI + business hours human',
      responseTime: '30 seconds - 2 minutes',
      accuracy: '85-90%',
      languages: '10-15',
      scaling: 'Fast (days)',
      setup: '2-4 weeks'
    },
    pros: ['Best of both worlds', 'Good accuracy', 'Reasonable cost', 'Decent scaling'],
    cons: ['Complex setup', 'Handoff friction', 'Higher than pure AI', 'Multiple vendors']
  },
  {
    name: 'ConneQt AI',
    type: 'Advanced AI + Professional Support',
    monthlyBase: 599,
    perCall: 0.12,
    features: {
      availability: '24/7 AI + on-demand experts',
      responseTime: '< 30 seconds',
      accuracy: '95%+',
      languages: '25+',
      scaling: 'Instant',
      setup: '1-2 weeks'
    },
    pros: ['Industry-specific AI', 'Enterprise integrations', 'Professional support', 'Proven ROI'],
    cons: ['Higher than basic chatbots', 'Requires setup investment'],
    highlighted: true
  }
];

const CompetitorAnalysis = ({ selectedTier, monthlyVolume = 5000 }: CompetitorAnalysisProps) => {
  const calculateCost = (competitor: any) => {
    let cost = competitor.monthlyBase;
    
    if (competitor.perCall) {
      cost += monthlyVolume * competitor.perCall;
    }
    
    if (competitor.agentsNeeded) {
      const agents = competitor.agentsNeeded(monthlyVolume);
      cost += agents * (competitor.perAgent || 0);
    }
    
    return cost;
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  const getFeatureIcon = (value: string) => {
    if (value.includes('24/7') || value.includes('< 30') || value.includes('95%') || value.includes('Instant')) {
      return <CheckCircle className="text-green-600" size={16} />;
    }
    if (value.includes('60-70%') || value.includes('weeks') || value.includes('8-16')) {
      return <XCircle className="text-red-600" size={16} />;
    }
    return <CheckCircle className="text-yellow-600" size={16} />;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <BarChart3 className="text-primary" size={24} />
          Competitive Analysis
        </CardTitle>
        <p className="text-muted-foreground">
          Compare ConneQt AI with traditional customer service solutions
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="text-center p-4 bg-muted/50 rounded-lg">
          <p className="text-sm text-muted-foreground mb-1">Analysis based on</p>
          <p className="font-semibold">{monthlyVolume.toLocaleString()} calls per month</p>
        </div>

        <div className="space-y-4">
          {competitors.map((competitor, index) => (
            <Card 
              key={index} 
              className={`${competitor.highlighted ? 'border-primary bg-primary/5' : ''}`}
            >
              <CardContent className="p-4">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="font-semibold flex items-center gap-2">
                      {competitor.name}
                      {competitor.highlighted && (
                        <Badge className="bg-primary text-primary-foreground">
                          Recommended
                        </Badge>
                      )}
                    </h3>
                    <p className="text-sm text-muted-foreground">{competitor.type}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold">
                      {formatCurrency(calculateCost(competitor))}
                    </div>
                    <div className="text-xs text-muted-foreground">per month</div>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <h4 className="font-medium mb-2 text-sm">Key Features</h4>
                    <div className="space-y-1 text-xs">
                      {Object.entries(competitor.features).map(([key, value]) => (
                        <div key={key} className="flex items-center justify-between">
                          <span className="capitalize">{key.replace(/([A-Z])/g, ' $1')}:</span>
                          <div className="flex items-center gap-1">
                            {getFeatureIcon(value)}
                            <span>{value}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div>
                      <h5 className="font-medium text-sm text-green-700 mb-1">Advantages</h5>
                      <ul className="text-xs space-y-0.5">
                        {competitor.pros.map((pro, i) => (
                          <li key={i} className="flex items-center gap-1">
                            <CheckCircle className="text-green-600" size={12} />
                            {pro}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h5 className="font-medium text-sm text-red-700 mb-1">Limitations</h5>
                      <ul className="text-xs space-y-0.5">
                        {competitor.cons.map((con, i) => (
                          <li key={i} className="flex items-center gap-1">
                            <XCircle className="text-red-600" size={12} />
                            {con}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                {competitor.highlighted && (
                  <div className="border-t pt-3">
                    <Button className="w-full">
                      Choose ConneQt AI <ArrowRight size={16} className="ml-2" />
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="border-primary/20 bg-primary/5">
          <CardContent className="p-4">
            <h3 className="font-semibold mb-3 flex items-center gap-2">
              <Target className="text-primary" size={20} />
              Why Choose ConneQt AI?
            </h3>
            <div className="grid md:grid-cols-3 gap-4 text-sm">
              <div className="flex items-start gap-2">
                <DollarSign className="text-green-600 flex-shrink-0 mt-0.5" size={16} />
                <div>
                  <div className="font-medium">Cost Effective</div>
                  <div className="text-muted-foreground">60-80% savings vs traditional call centers</div>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <Zap className="text-blue-600 flex-shrink-0 mt-0.5" size={16} />
                <div>
                  <div className="font-medium">Advanced AI</div>
                  <div className="text-muted-foreground">Industry-specific, not generic chatbots</div>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <Shield className="text-purple-600 flex-shrink-0 mt-0.5" size={16} />
                <div>
                  <div className="font-medium">Enterprise Ready</div>
                  <div className="text-muted-foreground">Security, compliance, and integrations</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </CardContent>
    </Card>
  );
};

export default CompetitorAnalysis;