import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Calculator, TrendingUp, DollarSign, Clock, Users, ArrowRight } from 'lucide-react';

interface ROICalculatorProps {
  industry?: string;
  monthlyVolume?: number;
  selectedTier?: string;
}

interface ROIMetrics {
  currentCosts: number;
  newCosts: number;
  monthlySavings: number;
  annualSavings: number;
  paybackPeriod: number;
  efficiencyGain: number;
  customerSatisfaction: number;
}

const ROICalculator = ({ industry, monthlyVolume = 0, selectedTier }: ROICalculatorProps) => {
  const [currentAgents, setCurrentAgents] = useState<number>(0);
  const [avgSalary, setAvgSalary] = useState<number>(35000);
  const [responseTime, setResponseTime] = useState<number>(5);
  const [resolutionRate, setResolutionRate] = useState<number>(75);
  const [metrics, setMetrics] = useState<ROIMetrics | null>(null);

  const industryMultipliers = {
    healthcare: { salary: 1.2, complexity: 1.3 },
    finance: { salary: 1.4, complexity: 1.4 },
    saas: { salary: 1.3, complexity: 1.2 },
    ecommerce: { salary: 1.0, complexity: 1.0 },
    retail: { salary: 0.9, complexity: 0.9 },
    'real-estate': { salary: 1.1, complexity: 1.1 }
  };

  const tierPricing = {
    'ai-first': { base: 299, perCall: 0.15 },
    'ai-plus': { base: 599, perCall: 0.12 },
    business: { base: 1299, perCall: 0.09 },
    enterprise: { base: 2499, perCall: 0.06 }
  };

  useEffect(() => {
    if (currentAgents > 0 && monthlyVolume > 0) {
      calculateROI();
    }
  }, [currentAgents, avgSalary, responseTime, resolutionRate, monthlyVolume, selectedTier, industry]);

  const calculateROI = () => {
    // Current costs calculation
    const multiplier = industry ? industryMultipliers[industry as keyof typeof industryMultipliers] : { salary: 1, complexity: 1 };
    const adjustedSalary = avgSalary * (multiplier?.salary || 1);
    const monthlySalaryCosts = (adjustedSalary / 12) * currentAgents;
    const overheadCosts = monthlySalaryCosts * 0.4; // 40% overhead (benefits, equipment, training)
    const currentCosts = monthlySalaryCosts + overheadCosts;

    // New solution costs
    const tier = tierPricing[selectedTier as keyof typeof tierPricing] || tierPricing['ai-plus'];
    const newCosts = tier.base + (monthlyVolume * tier.perCall);

    // Savings calculation
    const monthlySavings = Math.max(0, currentCosts - newCosts);
    const annualSavings = monthlySavings * 12;

    // Payback period (months)
    const setupCost = selectedTier === 'enterprise' ? 2500 : selectedTier === 'business' ? 1000 : 500;
    const paybackPeriod = monthlySavings > 0 ? setupCost / monthlySavings : 0;

    // Efficiency improvements
    const currentEfficiency = (resolutionRate / 100) * (1 / responseTime);
    const newEfficiency = 0.95 * (1 / 0.5); // 95% resolution rate, 30-second response time
    const efficiencyGain = ((newEfficiency - currentEfficiency) / currentEfficiency) * 100;

    // Customer satisfaction improvement
    const satisfactionImprovement = Math.min(25, efficiencyGain * 0.3);

    setMetrics({
      currentCosts,
      newCosts,
      monthlySavings,
      annualSavings,
      paybackPeriod,
      efficiencyGain,
      customerSatisfaction: satisfactionImprovement
    });
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calculator className="text-primary" size={24} />
          ROI Calculator
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="agents">Current Support Agents</Label>
            <Input
              id="agents"
              type="number"
              value={currentAgents || ''}
              onChange={(e) => setCurrentAgents(Number(e.target.value))}
              placeholder="5"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="salary">Average Annual Salary (€)</Label>
            <Input
              id="salary"
              type="number"
              value={avgSalary || ''}
              onChange={(e) => setAvgSalary(Number(e.target.value))}
              placeholder="35000"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="response">Avg Response Time (minutes)</Label>
            <Input
              id="response"
              type="number"
              value={responseTime || ''}
              onChange={(e) => setResponseTime(Number(e.target.value))}
              placeholder="5"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="resolution">First-Contact Resolution (%)</Label>
            <Input
              id="resolution"
              type="number"
              max="100"
              value={resolutionRate || ''}
              onChange={(e) => setResolutionRate(Number(e.target.value))}
              placeholder="75"
            />
          </div>
        </div>

        {metrics && (
          <>
            <Separator />
            <div className="space-y-4">
              <h3 className="font-semibold text-lg flex items-center gap-2">
                <TrendingUp className="text-primary" size={20} />
                ROI Analysis Results
              </h3>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                <Card className="border-primary/20 bg-primary/5">
                  <CardContent className="p-4 text-center">
                    <DollarSign className="text-primary mx-auto mb-2" size={24} />
                    <div className="text-2xl font-bold text-primary">
                      {formatCurrency(metrics.monthlySavings)}
                    </div>
                    <div className="text-sm text-muted-foreground">Monthly Savings</div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4 text-center">
                    <TrendingUp className="text-green-600 mx-auto mb-2" size={24} />
                    <div className="text-2xl font-bold text-green-600">
                      {formatCurrency(metrics.annualSavings)}
                    </div>
                    <div className="text-sm text-muted-foreground">Annual Savings</div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4 text-center">
                    <Clock className="text-blue-600 mx-auto mb-2" size={24} />
                    <div className="text-2xl font-bold text-blue-600">
                      {metrics.paybackPeriod > 0 ? `${metrics.paybackPeriod.toFixed(1)}` : '0'}
                    </div>
                    <div className="text-sm text-muted-foreground">Payback Period (months)</div>
                  </CardContent>
                </Card>
              </div>

              <div className="space-y-3">
                <h4 className="font-semibold">Cost Comparison</h4>
                <div className="space-y-2">
                  <div className="flex justify-between items-center p-3 bg-muted/50 rounded">
                    <span className="text-sm">Current monthly costs:</span>
                    <span className="font-semibold">{formatCurrency(metrics.currentCosts)}</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-primary/10 rounded">
                    <span className="text-sm">AI solution costs:</span>
                    <span className="font-semibold text-primary">{formatCurrency(metrics.newCosts)}</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-green-100 rounded">
                    <span className="text-sm font-medium">Net monthly savings:</span>
                    <span className="font-bold text-green-700">{formatCurrency(metrics.monthlySavings)}</span>
                  </div>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <h4 className="font-semibold flex items-center gap-2">
                    <Users size={16} />
                    Efficiency Improvements
                  </h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Response time improvement:</span>
                      <Badge className="bg-blue-100 text-blue-800">90%+ faster</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span>Resolution rate improvement:</span>
                      <Badge className="bg-green-100 text-green-800">+{metrics.efficiencyGain.toFixed(1)}%</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span>Customer satisfaction boost:</span>
                      <Badge className="bg-purple-100 text-purple-800">+{metrics.customerSatisfaction.toFixed(1)}%</Badge>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <h4 className="font-semibold">Additional Benefits</h4>
                  <ul className="text-sm space-y-1">
                    <li className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                      24/7 availability without overtime
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                      Consistent service quality
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                      Scalable during peak periods
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                      Reduced training costs
                    </li>
                  </ul>
                </div>
              </div>

              <div className="pt-4 border-t">
                <div className="text-center space-y-3">
                  <p className="text-sm text-muted-foreground">
                    Based on industry benchmarks and your current metrics
                  </p>
                  <Button className="w-full md:w-auto">
                    Generate ROI Report <ArrowRight size={16} className="ml-2" />
                  </Button>
                </div>
              </div>
            </div>
          </>
        )}

        {!metrics && currentAgents === 0 && (
          <div className="text-center py-6 text-muted-foreground">
            <Calculator className="mx-auto mb-3 opacity-50" size={48} />
            <p>Enter your current support team details to calculate ROI</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ROICalculator;