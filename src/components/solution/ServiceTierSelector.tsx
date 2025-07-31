import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Bot, Users, Building2, Check, Clock, Globe, Shield } from 'lucide-react';

export interface ServiceTier {
  id: string;
  name: string;
  description: string;
  features: string[];
  pricing: {
    base: number;
    perCall?: number;
    setup?: number;
  };
  icon: React.ReactNode;
  recommended?: boolean;
  sla?: string;
  availability?: string;
}

const serviceTiers: ServiceTier[] = [
  {
    id: 'ai-only',
    name: 'AI-Only',
    description: 'Fully automated AI agents handling all customer interactions',
    features: [
      'AI Voice & Chat Agents',
      'Natural Language Processing',
      'Multi-language Support',
      'Basic Analytics',
      'Standard Integration'
    ],
    pricing: {
      base: 1500,
      perCall: 0.15
    },
    icon: <Bot size={24} />,
    sla: '24/7 AI Response',
    availability: '99.9% Uptime'
  },
  {
    id: 'hybrid',
    name: 'AI + Human Hybrid',
    description: 'AI agents with seamless escalation to human agents',
    features: [
      'Everything in AI-Only',
      'Human Agent Backup',
      'Smart Escalation Rules',
      'Quality Assurance',
      'Advanced Analytics',
      'Priority Support'
    ],
    pricing: {
      base: 2500,
      perCall: 0.25,
      setup: 500
    },
    icon: <Users size={24} />,
    recommended: true,
    sla: 'AI: Instant, Human: <30 seconds',
    availability: '99.95% Uptime'
  },
  {
    id: 'full-service',
    name: 'Full Outsourced',
    description: 'Complete customer service outsourcing with dedicated team',
    features: [
      'Everything in Hybrid',
      'Dedicated Account Manager',
      'Custom Workflows',
      'Full Staff Training',
      'White-glove Setup',
      'Monthly Business Reviews',
      'Custom Integrations'
    ],
    pricing: {
      base: 4500,
      perCall: 0.35,
      setup: 2000
    },
    icon: <Building2 size={24} />,
    sla: '24/7 Human + AI Support',
    availability: '99.99% Uptime'
  }
];

interface ServiceTierSelectorProps {
  selectedTier: string;
  onTierSelect: (tierId: string) => void;
}

const ServiceTierSelector = ({ selectedTier, onTierSelect }: ServiceTierSelectorProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Shield className="text-primary" size={24} />
          Service Level
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {serviceTiers.map((tier) => (
            <div
              key={tier.id}
              className={`relative p-6 border-2 rounded-lg cursor-pointer transition-all hover:shadow-md ${
                selectedTier === tier.id
                  ? 'border-primary bg-primary/5'
                  : 'border-border hover:border-primary/50'
              }`}
              onClick={() => onTierSelect(tier.id)}
            >
              {tier.recommended && (
                <Badge className="absolute -top-2 -right-2 bg-primary text-primary-foreground">
                  Most Popular
                </Badge>
              )}
              
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-primary/10 text-primary">
                    {tier.icon}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">{tier.name}</h3>
                    <p className="text-sm text-muted-foreground">{tier.description}</p>
                  </div>
                </div>
                {selectedTier === tier.id && (
                  <Check className="text-primary" size={20} />
                )}
              </div>

              <div className="grid md:grid-cols-2 gap-4 mb-4">
                <div className="space-y-2">
                  <h4 className="font-medium text-sm">Features</h4>
                  <ul className="space-y-1">
                    {tier.features.slice(0, 3).map((feature) => (
                      <li key={feature} className="text-xs text-muted-foreground flex items-center gap-1">
                        <Check size={12} className="text-primary" />
                        {feature}
                      </li>
                    ))}
                    {tier.features.length > 3 && (
                      <li className="text-xs text-muted-foreground">
                        +{tier.features.length - 3} more features
                      </li>
                    )}
                  </ul>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-xs">
                    <Clock size={12} className="text-primary" />
                    <span className="text-muted-foreground">{tier.sla}</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs">
                    <Globe size={12} className="text-primary" />
                    <span className="text-muted-foreground">{tier.availability}</span>
                  </div>
                </div>
              </div>

              <div className="border-t pt-4">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-sm text-muted-foreground">Starting at</span>
                    <p className="text-lg font-bold text-primary">
                      €{tier.pricing.base.toLocaleString()}<span className="text-sm font-normal">/month</span>
                    </p>
                  </div>
                  <div className="text-right">
                    <span className="text-xs text-muted-foreground">Per call</span>
                    <p className="text-sm font-medium">€{tier.pricing.perCall}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default ServiceTierSelector;
export { serviceTiers };