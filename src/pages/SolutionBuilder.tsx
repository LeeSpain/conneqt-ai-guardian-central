import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowRight, Check, Users, Play, FileText, Settings, Brain, Calculator } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ServiceTierSelector from '@/components/solution/ServiceTierSelector';
import VolumeCalculator from '@/components/solution/VolumeCalculator';
import IndustryPreview from '@/components/solution/IndustryPreview';
import TrustElements from '@/components/solution/TrustElements';
import DemoChat from '@/components/solution/DemoChat';
import ProposalGenerator from '@/components/solution/ProposalGenerator';
import IntegrationMarketplace from '@/components/solution/IntegrationMarketplace';
import BusinessAssessment from '@/components/solution/BusinessAssessment';
import ROICalculator from '@/components/solution/ROICalculator';
import CompetitorAnalysis from '@/components/solution/CompetitorAnalysis';
import ServiceSelection from '@/components/assessment/ServiceSelection';
import DashboardPreview from '@/components/assessment/DashboardPreview';

const industries = [
  {
    id: 'retail',
    name: 'Retail',
    description: 'Optimize customer experience and drive sales with AI-powered solutions.',
    icon: 'shopping-cart'
  },
  {
    id: 'healthcare',
    name: 'Healthcare',
    description: 'Improve patient care and streamline operations with secure, compliant solutions.',
    icon: 'hospital'
  },
  {
    id: 'finance',
    name: 'Finance',
    description: 'Enhance customer engagement and reduce fraud with intelligent automation.',
    icon: 'credit-card'
  },
  {
    id: 'education',
    name: 'Education',
    description: 'Personalize learning experiences and improve student outcomes with AI.',
    icon: 'book'
  },
  {
    id: 'technology',
    name: 'Technology',
    description: 'Drive innovation and efficiency with cutting-edge AI solutions for tech companies.',
    icon: 'code'
  }
];

const volumes = [
  {
    id: 'low',
    name: 'Low Volume',
    description: 'Up to 1,000 calls/month',
    icon: 'arrow-down'
  },
  {
    id: 'medium',
    name: 'Medium Volume',
    description: '1,000 - 10,000 calls/month',
    icon: 'arrows-left-right'
  },
  {
    id: 'high',
    name: 'High Volume',
    description: '10,000+ calls/month',
    icon: 'arrow-up'
  }
];

const features = [
  {
    id: 'live-chat',
    name: 'Live Chat Support',
    description: '24/7 real-time assistance',
    icon: 'message-square'
  },
  {
    id: 'ai-automation',
    name: 'AI Automation',
    description: 'Automated responses and workflows',
    icon: 'cpu'
  },
  {
    id: 'crm-integration',
    name: 'CRM Integration',
    description: 'Seamless integration with top CRMs',
    icon: 'database'
  },
  {
    id: 'analytics',
    name: 'Advanced Analytics',
    description: 'Data-driven insights and reporting',
    icon: 'bar-chart-2'
  }
];

const SolutionBuilder = () => {
  const [selectedIndustry, setSelectedIndustry] = useState<string>('');
  const [selectedVolume, setSelectedVolume] = useState<string>('');
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]);
  const [selectedServiceTier, setSelectedServiceTier] = useState<string>('');
  const [callVolume, setCallVolume] = useState<number>(0);
  const [activeTab, setActiveTab] = useState('assessment');
  const [selectedDemo, setSelectedDemo] = useState({ industry: '', scenario: '' });

  const calculatePrice = () => {
    let basePrice = 100;

    if (selectedServiceTier === 'premium') {
      basePrice += 50;
    }

    if (selectedVolume === 'high') {
      basePrice += 30;
    }

    basePrice += selectedFeatures.length * 15;

    return 0;
  };

  const toggleFeature = (featureId: string) => {
    if (selectedFeatures.includes(featureId)) {
      setSelectedFeatures(selectedFeatures.filter((id) => id !== featureId));
    } else {
      setSelectedFeatures([...selectedFeatures, featureId]);
    }
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
            <TabsList className="grid w-full grid-cols-8">
              <TabsTrigger value="assessment">Assessment</TabsTrigger>
              <TabsTrigger value="services">Services</TabsTrigger>
              <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
              <TabsTrigger value="industry">Industry</TabsTrigger>
              <TabsTrigger value="service">Service Tier</TabsTrigger>
              <TabsTrigger value="roi">ROI Analysis</TabsTrigger>
              <TabsTrigger value="demo">Live Demo</TabsTrigger>
              <TabsTrigger value="proposal">Get Proposal</TabsTrigger>
            </TabsList>

            {/* Assessment */}
            <TabsContent value="assessment" className="space-y-6">
              <BusinessAssessment onComplete={() => setActiveTab('services')} />
              <div className="flex justify-center">
                <Button onClick={() => setActiveTab('services')}>
                  Continue to Service Selection <ArrowRight size={16} className="ml-2" />
                </Button>
              </div>
            </TabsContent>

            {/* Services */}
            <TabsContent value="services" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Brain className="text-primary" size={24} />
                    Select Services
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ServiceSelection onContinue={() => setActiveTab('dashboard')} />
                </CardContent>
              </Card>
            </TabsContent>

            {/* Dashboard Preview */}
            <TabsContent value="dashboard" className="space-y-6">
              <DashboardPreview />
              <div className="flex justify-center gap-4">
                <Button variant="outline" onClick={() => setActiveTab('services')}>
                  Back
                </Button>
                <Button onClick={() => setActiveTab('industry')}>
                  Continue to Industry <ArrowRight size={16} className="ml-2" />
                </Button>
              </div>
            </TabsContent>

            {/* Industry */}
            <TabsContent value="industry" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="text-primary" size={24} />
                    Select Your Industry
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {industries.map((industry) => (
                      <Button
                        key={industry.id}
                        variant="outline"
                        className={`w-full ${selectedIndustry === industry.id ? 'bg-blue-500 text-white' : ''}`}
                        onClick={() => setSelectedIndustry(industry.id)}
                      >
                        {industry.name}
                      </Button>
                    ))}
                  </div>
                  <div className="flex justify-end mt-4">
                    <Button onClick={() => setActiveTab('service')}>
                      Continue to Service Tier <ArrowRight size={16} className="ml-2" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Service Tier */}
            <TabsContent value="service" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Settings className="text-primary" size={24} />
                    Choose Your Service Tier
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ServiceTierSelector
                    selectedTier={selectedServiceTier}
                    onTierSelect={setSelectedServiceTier}
                  />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calculator className="text-primary" size={24} />
                    Estimate Your Call Volume
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <VolumeCalculator selectedTier={selectedServiceTier} onVolumeChange={setCallVolume} />
                </CardContent>
              </Card>

              <div className="flex justify-between">
                <Button variant="outline" onClick={() => setActiveTab('industry')}>
                  Back
                </Button>
                <Button onClick={() => setActiveTab('roi')}>
                  Continue to ROI Analysis <ArrowRight size={16} className="ml-2" />
                </Button>
              </div>
            </TabsContent>

            {/* ROI */}
            <TabsContent value="roi" className="space-y-6">
              <ROICalculator />

              <CompetitorAnalysis />

              <div className="flex justify-between">
                <Button variant="outline" onClick={() => setActiveTab('service')}>
                  Back
                </Button>
                <Button onClick={() => setActiveTab('demo')}>
                  Explore Live Demo <ArrowRight size={16} className="ml-2" />
                </Button>
              </div>
            </TabsContent>

            {/* Demo */}
            <TabsContent value="demo" className="space-y-6">
              <DemoChat
                industry={selectedDemo.industry}
                scenario={selectedDemo.scenario}
              />

              <div className="flex justify-between">
                <Button variant="outline" onClick={() => setActiveTab('roi')}>
                  Back
                </Button>
                <Button onClick={() => setActiveTab('proposal')}>
                  Generate Proposal <ArrowRight size={16} className="ml-2" />
                </Button>
              </div>
            </TabsContent>

            {/* Proposal */}
            <TabsContent value="proposal" className="space-y-6">
              <ProposalGenerator 
                initialData={{
                  industry: selectedIndustry,
                  monthlyVolume: callVolume,
                  selectedTier: selectedServiceTier
                }}
              />

              <IntegrationMarketplace />

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
