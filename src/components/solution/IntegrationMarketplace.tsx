import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Search, Star, Download, ExternalLink, Zap, Shield, Clock } from 'lucide-react';

interface Integration {
  id: string;
  name: string;
  category: string;
  description: string;
  logo: string;
  rating: number;
  installs: string;
  features: string[];
  pricing: 'Free' | 'Premium' | 'Enterprise';
  setupTime: string;
  verified: boolean;
}

const integrations: Integration[] = [
  {
    id: 'salesforce',
    name: 'Salesforce CRM',
    category: 'CRM',
    description: 'Seamlessly sync customer interactions with your Salesforce pipeline.',
    logo: '🔗',
    rating: 4.8,
    installs: '10k+',
    features: ['Lead capture', 'Contact sync', 'Activity logging', 'Custom fields'],
    pricing: 'Premium',
    setupTime: '15 min',
    verified: true
  },
  {
    id: 'shopify',
    name: 'Shopify',
    category: 'E-commerce',
    description: 'Handle order inquiries, returns, and product support automatically.',
    logo: '🛍️',
    rating: 4.9,
    installs: '25k+',
    features: ['Order tracking', 'Inventory sync', 'Return processing', 'Product catalog'],
    pricing: 'Free',
    setupTime: '10 min',
    verified: true
  },
  {
    id: 'slack',
    name: 'Slack',
    category: 'Communication',
    description: 'Get real-time notifications and escalate conversations to your team.',
    logo: '💬',
    rating: 4.7,
    installs: '50k+',
    features: ['Instant alerts', 'Team escalation', 'Conversation history', 'Channel routing'],
    pricing: 'Free',
    setupTime: '5 min',
    verified: true
  },
  {
    id: 'hubspot',
    name: 'HubSpot',
    category: 'CRM',
    description: 'Integrate with HubSpot for comprehensive customer relationship management.',
    logo: '🎯',
    rating: 4.6,
    installs: '8k+',
    features: ['Contact management', 'Deal tracking', 'Email sync', 'Analytics'],
    pricing: 'Premium',
    setupTime: '20 min',
    verified: true
  },
  {
    id: 'stripe',
    name: 'Stripe',
    category: 'Payments',
    description: 'Handle billing inquiries and payment processing seamlessly.',
    logo: '💳',
    rating: 4.8,
    installs: '15k+',
    features: ['Payment status', 'Billing support', 'Refund processing', 'Subscription management'],
    pricing: 'Premium',
    setupTime: '12 min',
    verified: true
  },
  {
    id: 'zendesk',
    name: 'Zendesk',
    category: 'Support',
    description: 'Create tickets and manage customer support workflows.',
    logo: '🎫',
    rating: 4.5,
    installs: '20k+',
    features: ['Ticket creation', 'Status updates', 'Priority routing', 'SLA tracking'],
    pricing: 'Premium',
    setupTime: '18 min',
    verified: true
  }
];

const categories = ['All', 'CRM', 'E-commerce', 'Communication', 'Payments', 'Support'];

const IntegrationMarketplace = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [installedIntegrations, setInstalledIntegrations] = useState<Set<string>>(new Set());

  const filteredIntegrations = integrations.filter(integration => {
    const matchesSearch = integration.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         integration.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || integration.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleInstall = (integrationId: string) => {
    setInstalledIntegrations(prev => new Set([...prev, integrationId]));
  };

  const getPricingColor = (pricing: string) => {
    switch (pricing) {
      case 'Free': return 'bg-green-100 text-green-800';
      case 'Premium': return 'bg-blue-100 text-blue-800';
      case 'Enterprise': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Zap className="text-primary" size={24} />
          Integration Marketplace
        </CardTitle>
        <div className="flex gap-4 mt-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={16} />
            <Input
              placeholder="Search integrations..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
      </CardHeader>
      
      <CardContent>
        <Tabs value={selectedCategory} onValueChange={setSelectedCategory} className="mb-6">
          <TabsList className="grid w-full grid-cols-6">
            {categories.map((category) => (
              <TabsTrigger key={category} value={category}>
                {category}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>

        <div className="grid gap-4">
          {filteredIntegrations.map((integration) => (
            <Card key={integration.id} className="border-2 hover:border-primary/20 transition-colors">
              <CardContent className="p-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4 flex-1">
                    <div className="text-3xl">{integration.logo}</div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold">{integration.name}</h3>
                        {integration.verified && (
                          <Badge className="bg-blue-100 text-blue-800 text-xs">
                            <Shield size={10} className="mr-1" />
                            Verified
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">{integration.description}</p>
                      
                      <div className="flex items-center gap-4 text-xs text-muted-foreground mb-3">
                        <div className="flex items-center gap-1">
                          <Star className="fill-yellow-400 text-yellow-400" size={12} />
                          <span>{integration.rating}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Download size={12} />
                          <span>{integration.installs} installs</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock size={12} />
                          <span>{integration.setupTime} setup</span>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-1 mb-3">
                        {integration.features.slice(0, 3).map((feature) => (
                          <Badge key={feature} variant="outline" className="text-xs">
                            {feature}
                          </Badge>
                        ))}
                        {integration.features.length > 3 && (
                          <Badge variant="outline" className="text-xs">
                            +{integration.features.length - 3} more
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col items-end gap-2">
                    <Badge className={getPricingColor(integration.pricing)}>
                      {integration.pricing}
                    </Badge>
                    
                    {installedIntegrations.has(integration.id) ? (
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">
                          <ExternalLink size={14} className="mr-1" />
                          Configure
                        </Button>
                        <Badge className="bg-green-100 text-green-800">
                          Installed
                        </Badge>
                      </div>
                    ) : (
                      <Button 
                        size="sm" 
                        onClick={() => handleInstall(integration.id)}
                        className="min-w-[80px]"
                      >
                        Install
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredIntegrations.length === 0 && (
          <div className="text-center py-8">
            <div className="text-muted-foreground mb-2">No integrations found</div>
            <div className="text-sm text-muted-foreground">
              Try adjusting your search or category filter
            </div>
          </div>
        )}

        <Card className="mt-6 border-primary/20 bg-primary/5">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-semibold">Need a Custom Integration?</h4>
                <p className="text-sm text-muted-foreground">
                  Our team can build custom integrations for your specific needs
                </p>
              </div>
              <Button variant="outline">
                Request Integration
              </Button>
            </div>
          </CardContent>
        </Card>
      </CardContent>
    </Card>
  );
};

export default IntegrationMarketplace;