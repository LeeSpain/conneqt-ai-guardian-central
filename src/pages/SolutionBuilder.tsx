import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowRight, Check, Users, Zap, Globe, Shield, Play, FileText, Settings } from 'lucide-react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ServiceTierSelector from '@/components/solution/ServiceTierSelector';
import VolumeCalculator from '@/components/solution/VolumeCalculator';
import IndustryPreview from '@/components/solution/IndustryPreview';
import TrustElements from '@/components/solution/TrustElements';
import DemoChat from '@/components/solution/DemoChat';
import ProposalGenerator from '@/components/solution/ProposalGenerator';
import IntegrationMarketplace from '@/components/solution/IntegrationMarketplace';

const industries = [
  { 
    id: 'healthcare', 
    name: 'Healthcare', 
    description: 'Patient support, appointment scheduling, medical inquiries',
    features: ['HIPAA Compliance', 'Medical Terminology', 'Appointment Booking'],
    pricing: '€2,500/month'
  },
  { 
    id: 'ecommerce', 
    name: 'E-commerce', 
    description: 'Order tracking, product inquiries, returns management',
    features: ['Order Integration', 'Product Catalog', 'Return Processing'],
    pricing: '€1,800/month'
  },
  { 
    id: 'saas', 
    name: 'SaaS/Tech', 
    description: 'Technical support, onboarding, feature explanations',
    features: ['API Documentation', 'Technical Support', 'User Onboarding'],
    pricing: '€2,200/month'
  },
  { 
    id: 'finance', 
    name: 'Financial Services', 
    description: 'Account inquiries, transaction support, compliance',
    features: ['Financial Compliance', 'Secure Transactions', 'KYC Support'],
    pricing: '€3,500/month'
  },
  { 
    id: 'retail', 
    name: 'Retail', 
    description: 'Store locations, product availability, customer service',
    features: ['Inventory Integration', 'Store Locator', 'Product Info'],
    pricing: '€1,500/month'
  },
  { 
    id: 'real-estate', 
    name: 'Real Estate', 
    description: 'Property inquiries, scheduling viewings, market information',
    features: ['Property Database', 'Viewing Scheduler', 'Market Data'],
    pricing: '€2,800/month'
  }
];

const volumes = [
  { id: 'startup', name: 'Startup', range: '< 1,000 calls/month', multiplier: 1 },
  { id: 'small', name: 'Small Business', range: '1,000 - 5,000 calls/month', multiplier: 1.2 },
  { id: 'medium', name: 'Medium Business', range: '5,000 - 20,000 calls/month', multiplier: 1.8 },
  { id: 'enterprise', name: 'Enterprise', range: '20,000+ calls/month', multiplier: 3.5 }
];

const features = [
  { id: 'multilingual', name: 'Multilingual Support', description: 'English, Spanish, Dutch' },
  { id: 'crm', name: 'CRM Integration', description: 'Salesforce, HubSpot, Custom' },
  { id: 'voice', name: 'Voice AI', description: 'Natural voice conversations' },
  { id: 'analytics', name: 'Advanced Analytics', description: 'Performance insights & reporting' },
  { id: 'whitelabel', name: 'White-Label Branding', description: 'Your brand, your domain' },
  { id: 'api', name: 'API Access', description: 'Full API integration capabilities' }
];

const SolutionBuilder = () => {
  const [selectedIndustry, setSelectedIndustry] = useState<string>('');
  const [selectedVolume, setSelectedVolume] = useState<string>('');
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]);
  const [selectedServiceTier, setSelectedServiceTier] = useState<string>('');
  const [callVolume, setCallVolume] = useState<number>(0);
  const [activeTab, setActiveTab] = useState('industry');
  const [selectedDemo, setSelectedDemo] = useState({ industry: '', scenario: '' });

  const calculatePrice = () => {
    if (!selectedIndustry || !selectedVolume) return 0;
    
    const industry = industries.find(i => i.id === selectedIndustry);
    const volume = volumes.find(v => v.id === selectedVolume);
    
    if (!industry || !volume) return 0;
    
    const basePrice = parseInt(industry.pricing.replace('€', '').replace(',', '').replace('/month', ''));
    const volumeAdjusted = basePrice * volume.multiplier;
    const featuresCost = selectedFeatures.length * 200;
    
    return Math.round(volumeAdjusted + featuresCost);
  };

  const toggleFeature = (featureId: string) => {
    setSelectedFeatures(prev => 
      prev.includes(featureId) 
        ? prev.filter(id => id !== featureId)
        : [...prev, featureId]
    );
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">
              <span className="bg-gradient-to-r from-conneqt-blue to-blue-600 bg-clip-text text-transparent">
                Build Your Complete Customer Service Solution
              </span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Choose from AI-only automation, hybrid AI+human support, or full-service outsourcing. 
              Get industry-specific templates, transparent pricing, and seamless integrations.
            </p>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="industry">Industry</TabsTrigger>
              <TabsTrigger value="service">Service Tier</TabsTrigger>
              <TabsTrigger value="demo">Live Demo</TabsTrigger>
              <TabsTrigger value="integrations">Integrations</TabsTrigger>
              <TabsTrigger value="proposal">Get Proposal</TabsTrigger>
            </TabsList>

            <TabsContent value="industry" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="text-conneqt-blue" size={24} />
                    Choose Your Industry
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-4">
                    {industries.map((industry) => (
                      <div
                        key={industry.id}
                        className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                          selectedIndustry === industry.id
                            ? 'border-conneqt-blue bg-blue-50'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                        onClick={() => setSelectedIndustry(industry.id)}
                      >
                        <h3 className="font-semibold mb-2">{industry.name}</h3>
                        <p className="text-sm text-gray-600 mb-3">{industry.description}</p>
                        <div className="flex flex-wrap gap-1 mb-2">
                          {industry.features.map((feature) => (
                            <Badge key={feature} variant="secondary" className="text-xs">
                              {feature}
                            </Badge>
                          ))}
                        </div>
                        <p className="text-sm font-medium text-conneqt-blue">
                          Starting at {industry.pricing}
                        </p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {selectedIndustry && <IndustryPreview industry={selectedIndustry} />}
              
              <div className="flex justify-center">
                <Button onClick={() => setActiveTab('service')}>
                  Continue to Service Tier <ArrowRight size={16} className="ml-2" />
                </Button>
              </div>
            </TabsContent>

            <TabsContent value="service" className="space-y-6">
              <ServiceTierSelector 
                selectedTier={selectedServiceTier}
                onTierSelect={setSelectedServiceTier}
              />
              
              <VolumeCalculator 
                selectedTier={selectedServiceTier}
                onVolumeChange={setCallVolume}
              />
              
              <div className="flex justify-center gap-4">
                <Button variant="outline" onClick={() => setActiveTab('industry')}>
                  Back
                </Button>
                <Button onClick={() => setActiveTab('demo')}>
                  Try Live Demo <Play size={16} className="ml-2" />
                </Button>
              </div>
            </TabsContent>

            <TabsContent value="demo" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Play className="text-primary" size={24} />
                    Try Live AI Demos
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-3 gap-4 mb-6">
                    {['healthcare', 'ecommerce', 'saas'].map((industry) => (
                      <Button
                        key={industry}
                        variant={selectedDemo.industry === industry ? "default" : "outline"}
                        className="h-auto p-4 flex flex-col items-center"
                        onClick={() => setSelectedDemo({ industry, scenario: 'Appointment Scheduling' })}
                      >
                        <span className="font-medium capitalize">{industry}</span>
                        <span className="text-xs opacity-70">Try interactive demo</span>
                      </Button>
                    ))}
                  </div>
                  
                  {selectedDemo.industry && (
                    <DemoChat 
                      industry={selectedDemo.industry} 
                      scenario={selectedDemo.scenario}
                    />
                  )}
                </CardContent>
              </Card>
              
              <div className="flex justify-center gap-4">
                <Button variant="outline" onClick={() => setActiveTab('service')}>
                  Back
                </Button>
                <Button onClick={() => setActiveTab('integrations')}>
                  View Integrations <Settings size={16} className="ml-2" />
                </Button>
              </div>
            </TabsContent>

            <TabsContent value="integrations" className="space-y-6">
              <IntegrationMarketplace />
              
              <div className="flex justify-center gap-4">
                <Button variant="outline" onClick={() => setActiveTab('demo')}>
                  Back
                </Button>
                <Button onClick={() => setActiveTab('proposal')}>
                  Get Proposal <FileText size={16} className="ml-2" />
                </Button>
              </div>
            </TabsContent>

            <TabsContent value="proposal" className="space-y-6">
              <ProposalGenerator 
                initialData={{
                  industry: selectedIndustry,
                  monthlyVolume: callVolume,
                  selectedTier: selectedServiceTier
                }}
              />
              <TrustElements />
            </TabsContent>
          </Tabs>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default SolutionBuilder;