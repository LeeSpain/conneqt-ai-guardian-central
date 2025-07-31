import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Check, Users, Zap, Globe, Shield } from 'lucide-react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ServiceTierSelector from '@/components/solution/ServiceTierSelector';
import VolumeCalculator from '@/components/solution/VolumeCalculator';

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

          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              {/* Service Tier Selection */}
              <ServiceTierSelector 
                selectedTier={selectedServiceTier}
                onTierSelect={setSelectedServiceTier}
              />

              {/* Call Volume Calculator */}
              <VolumeCalculator 
                selectedTier={selectedServiceTier}
                onVolumeChange={setCallVolume}
              />

              {/* Industry Selection */}
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

              {/* Volume Selection */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Zap className="text-conneqt-blue" size={24} />
                    Expected Call Volume
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-4">
                    {volumes.map((volume) => (
                      <div
                        key={volume.id}
                        className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                          selectedVolume === volume.id
                            ? 'border-conneqt-blue bg-blue-50'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                        onClick={() => setSelectedVolume(volume.id)}
                      >
                        <h3 className="font-semibold mb-1">{volume.name}</h3>
                        <p className="text-sm text-gray-600">{volume.range}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Features Selection */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="text-conneqt-blue" size={24} />
                    Additional Features
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-4">
                    {features.map((feature) => (
                      <div
                        key={feature.id}
                        className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                          selectedFeatures.includes(feature.id)
                            ? 'border-conneqt-blue bg-blue-50'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                        onClick={() => toggleFeature(feature.id)}
                      >
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="font-semibold mb-1">{feature.name}</h3>
                            <p className="text-sm text-gray-600">{feature.description}</p>
                            <p className="text-sm font-medium text-conneqt-blue mt-2">
                              +€200/month
                            </p>
                          </div>
                          {selectedFeatures.includes(feature.id) && (
                            <Check className="text-conneqt-blue" size={20} />
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Pricing Summary */}
            <div className="lg:col-span-1">
              <Card className="sticky top-24">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Globe className="text-conneqt-blue" size={24} />
                    Your Solution Summary
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {selectedServiceTier && callVolume > 0 ? (
                    <div className="space-y-4">
                      <div className="p-4 bg-muted/50 rounded-lg">
                        <h3 className="font-semibold mb-2">Selected Configuration</h3>
                        <div className="space-y-1 text-sm">
                          <p><strong>Service Level:</strong> {selectedServiceTier.charAt(0).toUpperCase() + selectedServiceTier.slice(1).replace('-', ' ')}</p>
                          <p><strong>Monthly Calls:</strong> {callVolume.toLocaleString()}</p>
                          {selectedIndustry && (
                            <p><strong>Industry:</strong> {industries.find(i => i.id === selectedIndustry)?.name}</p>
                          )}
                          {selectedFeatures.length > 0 && (
                            <p><strong>Add-ons:</strong> {selectedFeatures.length} selected</p>
                          )}
                        </div>
                      </div>
                      
                      <div className="p-4 bg-primary/10 rounded-lg">
                        <h3 className="font-semibold text-primary mb-2">Complete Solution Pricing</h3>
                        <p className="text-3xl font-bold text-primary">
                          €{calculatePrice().toLocaleString()}
                        </p>
                        <p className="text-sm text-muted-foreground mt-1">per month, includes everything</p>
                        <div className="mt-2 text-xs text-muted-foreground">
                          <p>✓ Setup & training included</p>
                          <p>✓ No hidden fees</p>
                          <p>✓ 30-day money-back guarantee</p>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Button className="w-full" asChild>
                          <Link to="/quote">
                            Get Detailed Proposal <ArrowRight size={16} className="ml-2" />
                          </Link>
                        </Button>
                        <Button variant="outline" className="w-full" asChild>
                          <Link to="/ai-guardian">
                            Try AI Demo
                          </Link>
                        </Button>
                        <Button variant="secondary" className="w-full" asChild>
                          <Link to="/subscription-services">
                            Compare All Plans
                          </Link>
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <p className="text-muted-foreground mb-4">
                        Select service level and call volume to see pricing
                      </p>
                      <div className="space-y-2">
                        <Button variant="outline" className="w-full" asChild>
                          <Link to="/ai-guardian">
                            Try AI Demo First
                          </Link>
                        </Button>
                        <Button variant="secondary" className="w-full" asChild>
                          <Link to="/subscription-services">
                            View All Options
                          </Link>
                        </Button>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default SolutionBuilder;