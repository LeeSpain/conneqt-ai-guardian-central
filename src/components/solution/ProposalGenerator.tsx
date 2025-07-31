import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { FileText, Download, Send, Clock, DollarSign, CheckCircle } from 'lucide-react';

interface ProposalData {
  companyName: string;
  contactName: string;
  email: string;
  industry: string;
  monthlyVolume: number;
  selectedTier: string;
  specialRequirements: string;
}

interface ProposalGeneratorProps {
  initialData: Partial<ProposalData>;
}

const ProposalGenerator = ({ initialData }: ProposalGeneratorProps) => {
  const [formData, setFormData] = useState<ProposalData>({
    companyName: '',
    contactName: '',
    email: '',
    industry: '',
    monthlyVolume: 0,
    selectedTier: '',
    specialRequirements: '',
    ...initialData
  });
  
  const [isGenerating, setIsGenerating] = useState(false);
  const [proposalGenerated, setProposalGenerated] = useState(false);

  const generateProposal = () => {
    setIsGenerating(true);
    // Simulate proposal generation
    setTimeout(() => {
      setIsGenerating(false);
      setProposalGenerated(true);
    }, 3000);
  };

  const calculatePricing = () => {
    const basePricing = {
      starter: { base: 299, perCall: 0.12 },
      business: { base: 599, perCall: 0.09 },
      enterprise: { base: 1299, perCall: 0.06 }
    };
    
    const tier = basePricing[formData.selectedTier as keyof typeof basePricing];
    if (!tier) return { monthly: 0, setup: 0 };
    
    const monthly = tier.base + (formData.monthlyVolume * tier.perCall);
    const setup = formData.selectedTier === 'enterprise' ? 2500 : formData.selectedTier === 'business' ? 1000 : 500;
    
    return { monthly: Math.round(monthly), setup };
  };

  const pricing = calculatePricing();

  if (proposalGenerated) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CheckCircle className="text-green-600" size={24} />
            Proposal Generated Successfully
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <h3 className="font-semibold text-green-800 mb-2">Your Custom Proposal is Ready!</h3>
            <p className="text-green-700 text-sm mb-4">
              We've created a comprehensive proposal tailored to {formData.companyName}'s needs in the {formData.industry} industry.
            </p>
            
            <div className="grid md:grid-cols-2 gap-4 mb-4">
              <div className="bg-white rounded p-3">
                <div className="text-sm text-gray-600">Monthly Investment</div>
                <div className="text-xl font-bold text-green-600">€{pricing.monthly.toLocaleString()}</div>
              </div>
              <div className="bg-white rounded p-3">
                <div className="text-sm text-gray-600">Setup Fee</div>
                <div className="text-xl font-bold">€{pricing.setup.toLocaleString()}</div>
              </div>
            </div>
            
            <div className="flex gap-2">
              <Button className="flex-1">
                <Download size={16} className="mr-2" />
                Download PDF
              </Button>
              <Button variant="outline" className="flex-1">
                <Send size={16} className="mr-2" />
                Email Proposal
              </Button>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="font-semibold">Next Steps:</h4>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-semibold">1</div>
                <div>
                  <div className="font-medium">Schedule Implementation Call</div>
                  <div className="text-sm text-muted-foreground">30-minute technical discussion with our team</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-semibold">2</div>
                <div>
                  <div className="font-medium">Contract Signing</div>
                  <div className="text-sm text-muted-foreground">Digital contract with e-signature</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-semibold">3</div>
                <div>
                  <div className="font-medium">Go Live</div>
                  <div className="text-sm text-muted-foreground">2-week implementation timeline</div>
                </div>
              </div>
            </div>
          </div>

          <Button 
            className="w-full" 
            size="lg"
            onClick={() => {
              setProposalGenerated(false);
              setFormData({
                companyName: '',
                contactName: '',
                email: '',
                industry: '',
                monthlyVolume: 0,
                selectedTier: '',
                specialRequirements: ''
              });
            }}
          >
            Generate Another Proposal
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileText className="text-primary" size={24} />
          Generate Custom Proposal
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="company">Company Name</Label>
            <Input
              id="company"
              value={formData.companyName}
              onChange={(e) => setFormData(prev => ({ ...prev, companyName: e.target.value }))}
              placeholder="Your Company Ltd."
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="contact">Contact Name</Label>
            <Input
              id="contact"
              value={formData.contactName}
              onChange={(e) => setFormData(prev => ({ ...prev, contactName: e.target.value }))}
              placeholder="John Smith"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email Address</Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
              placeholder="john@company.com"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="industry">Industry</Label>
            <Input
              id="industry"
              value={formData.industry}
              onChange={(e) => setFormData(prev => ({ ...prev, industry: e.target.value }))}
              placeholder="Healthcare, E-commerce, etc."
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="requirements">Special Requirements</Label>
          <Textarea
            id="requirements"
            value={formData.specialRequirements}
            onChange={(e) => setFormData(prev => ({ ...prev, specialRequirements: e.target.value }))}
            placeholder="Any specific integration needs, compliance requirements, or custom features..."
            rows={3}
          />
        </div>

        {pricing.monthly > 0 && (
          <>
            <Separator />
            <div className="bg-muted/50 rounded-lg p-4">
              <h4 className="font-semibold mb-3 flex items-center gap-2">
                <DollarSign size={16} />
                Pricing Summary
              </h4>
              <div className="grid md:grid-cols-3 gap-4">
                <div>
                  <div className="text-sm text-muted-foreground">Monthly Cost</div>
                  <div className="text-2xl font-bold text-primary">€{pricing.monthly.toLocaleString()}</div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Setup Fee</div>
                  <div className="text-lg font-semibold">€{pricing.setup.toLocaleString()}</div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Annual Savings</div>
                  <div className="text-lg font-semibold text-green-600">€{Math.round(pricing.monthly * 2).toLocaleString()}</div>
                </div>
              </div>
            </div>
          </>
        )}

        <Button 
          className="w-full" 
          size="lg" 
          onClick={generateProposal}
          disabled={!formData.companyName || !formData.contactName || !formData.email || isGenerating}
        >
          {isGenerating ? (
            <>
              <Clock size={16} className="mr-2 animate-spin" />
              Generating Proposal...
            </>
          ) : (
            <>
              <FileText size={16} className="mr-2" />
              Generate Custom Proposal
            </>
          )}
        </Button>

        <div className="flex flex-wrap gap-2 justify-center">
          <Badge variant="outline" className="text-xs">
            <Clock size={12} className="mr-1" />
            Ready in 30 seconds
          </Badge>
          <Badge variant="outline" className="text-xs">
            PDF & Email delivery
          </Badge>
          <Badge variant="outline" className="text-xs">
            No commitment required
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProposalGenerator;