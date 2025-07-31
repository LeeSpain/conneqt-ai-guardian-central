import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Play, MessageCircle, Phone, Clock } from 'lucide-react';

interface IndustryPreviewProps {
  industry: string;
}

const industryPreviews = {
  healthcare: {
    name: 'Healthcare',
    demoScenarios: [
      { title: 'Appointment Scheduling', description: 'AI handles patient appointment requests', duration: '2 min' },
      { title: 'Prescription Inquiries', description: 'Secure handling of medication questions', duration: '3 min' },
      { title: 'Insurance Verification', description: 'HIPAA-compliant insurance checks', duration: '4 min' }
    ],
    integrations: ['Epic EMR', 'Cerner', 'HIPAA Vault', 'Insurance APIs'],
    compliance: ['HIPAA', 'SOC 2', 'HITRUST']
  },
  ecommerce: {
    name: 'E-commerce',
    demoScenarios: [
      { title: 'Order Tracking', description: 'Real-time order status updates', duration: '1 min' },
      { title: 'Product Support', description: 'Technical product assistance', duration: '2 min' },
      { title: 'Return Processing', description: 'Automated return authorization', duration: '3 min' }
    ],
    integrations: ['Shopify', 'WooCommerce', 'Magento', 'Stripe'],
    compliance: ['PCI DSS', 'GDPR', 'CCPA']
  },
  saas: {
    name: 'SaaS/Tech',
    demoScenarios: [
      { title: 'Onboarding Support', description: 'Guide new users through setup', duration: '5 min' },
      { title: 'Technical Troubleshooting', description: 'API and integration help', duration: '4 min' },
      { title: 'Feature Explanations', description: 'Product functionality guidance', duration: '3 min' }
    ],
    integrations: ['Slack', 'Zapier', 'Intercom', 'Custom APIs'],
    compliance: ['SOC 2', 'ISO 27001', 'GDPR']
  },
  finance: {
    name: 'Financial Services',
    demoScenarios: [
      { title: 'Account Balance Inquiry', description: 'Secure account information', duration: '2 min' },
      { title: 'Transaction Disputes', description: 'Fraud investigation support', duration: '6 min' },
      { title: 'Loan Applications', description: 'Pre-qualification assistance', duration: '8 min' }
    ],
    integrations: ['Plaid', 'Yodlee', 'Banking APIs', 'Credit Bureaus'],
    compliance: ['PCI DSS', 'SOX', 'Basel III', 'GDPR']
  },
  retail: {
    name: 'Retail',
    demoScenarios: [
      { title: 'Store Locator', description: 'Find nearest store locations', duration: '1 min' },
      { title: 'Product Availability', description: 'Real-time inventory checks', duration: '2 min' },
      { title: 'Loyalty Program', description: 'Points and rewards management', duration: '3 min' }
    ],
    integrations: ['Square', 'Lightspeed', 'Loyalty APIs', 'Google Maps'],
    compliance: ['PCI DSS', 'GDPR', 'CCPA']
  },
  'real-estate': {
    name: 'Real Estate',
    demoScenarios: [
      { title: 'Property Search', description: 'MLS-powered property matching', duration: '4 min' },
      { title: 'Viewing Scheduler', description: 'Automated appointment booking', duration: '2 min' },
      { title: 'Market Analysis', description: 'Property value insights', duration: '5 min' }
    ],
    integrations: ['MLS Systems', 'Zillow API', 'DocuSign', 'CRM Systems'],
    compliance: ['RESPA', 'Fair Housing', 'GDPR']
  }
};

const IndustryPreview = ({ industry }: IndustryPreviewProps) => {
  const preview = industryPreviews[industry as keyof typeof industryPreviews];
  
  if (!preview) return null;

  return (
    <Card className="mt-6">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Play className="text-primary" size={20} />
          {preview.name} AI Demos & Integrations
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Demo Scenarios */}
        <div>
          <h4 className="font-semibold mb-3 flex items-center gap-2">
            <MessageCircle size={16} />
            Interactive Demo Scenarios
          </h4>
          <div className="grid gap-3">
            {preview.demoScenarios.map((scenario, index) => (
              <div key={index} className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50 transition-colors">
                <div className="flex-1">
                  <h5 className="font-medium">{scenario.title}</h5>
                  <p className="text-sm text-muted-foreground">{scenario.description}</p>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="secondary" className="text-xs">
                    <Clock size={12} className="mr-1" />
                    {scenario.duration}
                  </Badge>
                  <Button size="sm" variant="outline">
                    <Play size={14} className="mr-1" />
                    Try Demo
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Integrations */}
        <div>
          <h4 className="font-semibold mb-3">Pre-Built Integrations</h4>
          <div className="flex flex-wrap gap-2">
            {preview.integrations.map((integration) => (
              <Badge key={integration} variant="outline">
                {integration}
              </Badge>
            ))}
          </div>
        </div>

        {/* Compliance */}
        <div>
          <h4 className="font-semibold mb-3">Compliance & Security</h4>
          <div className="flex flex-wrap gap-2">
            {preview.compliance.map((cert) => (
              <Badge key={cert} className="bg-green-100 text-green-800 hover:bg-green-200">
                {cert}
              </Badge>
            ))}
          </div>
        </div>

        <Button className="w-full" size="lg">
          <Phone size={16} className="mr-2" />
          Test Your Complete Setup
        </Button>
      </CardContent>
    </Card>
  );
};

export default IndustryPreview;