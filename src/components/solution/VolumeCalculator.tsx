import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Calculator, TrendingUp } from 'lucide-react';
import { serviceTiers } from './ServiceTierSelector';

interface VolumeCalculatorProps {
  selectedTier: string;
  onVolumeChange: (volume: number) => void;
}

const VolumeCalculator = ({ selectedTier, onVolumeChange }: VolumeCalculatorProps) => {
  const [monthlyVolume, setMonthlyVolume] = useState<number>(0);
  const [dailyAverage, setDailyAverage] = useState<number>(0);
  
  const handleVolumeChange = (value: number) => {
    setMonthlyVolume(value);
    setDailyAverage(Math.round(value / 30));
    onVolumeChange(value);
  };

  const handleDailyChange = (value: number) => {
    setDailyAverage(value);
    const monthly = value * 30;
    setMonthlyVolume(monthly);
    onVolumeChange(monthly);
  };

  const calculateMonthlyCost = () => {
    if (!selectedTier || monthlyVolume === 0) return 0;
    
    const tier = serviceTiers.find(t => t.id === selectedTier);
    if (!tier) return 0;
    
    const baseCost = tier.pricing.base;
    const variableCost = monthlyVolume * (tier.pricing.perCall || 0);
    const setupCost = tier.pricing.setup || 0;
    
    return baseCost + variableCost + (setupCost / 12); // Amortize setup over 12 months
  };

  const getVolumeCategory = () => {
    if (monthlyVolume < 1000) return { name: 'Startup', color: 'bg-blue-100 text-blue-800' };
    if (monthlyVolume < 5000) return { name: 'Small Business', color: 'bg-green-100 text-green-800' };
    if (monthlyVolume < 20000) return { name: 'Medium Business', color: 'bg-yellow-100 text-yellow-800' };
    return { name: 'Enterprise', color: 'bg-purple-100 text-purple-800' };
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calculator className="text-primary" size={24} />
          Call Volume Calculator
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="monthly-volume">Monthly Call Volume</Label>
            <Input
              id="monthly-volume"
              type="number"
              placeholder="0"
              value={monthlyVolume || ''}
              onChange={(e) => handleVolumeChange(Number(e.target.value))}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="daily-average">Daily Average</Label>
            <Input
              id="daily-average"
              type="number"
              placeholder="0"
              value={dailyAverage || ''}
              onChange={(e) => handleDailyChange(Number(e.target.value))}
            />
          </div>
        </div>

        {monthlyVolume > 0 && (
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
              <div>
                <p className="text-sm text-muted-foreground">Business Category</p>
                <Badge className={getVolumeCategory().color}>
                  {getVolumeCategory().name}
                </Badge>
              </div>
              <div className="text-right">
                <p className="text-sm text-muted-foreground">Peak daily calls</p>
                <p className="text-lg font-semibold">{Math.round(dailyAverage * 1.5)}</p>
              </div>
            </div>

            {selectedTier && (
              <div className="border-t pt-4">
                <div className="flex items-center gap-2 mb-2">
                  <TrendingUp className="text-primary" size={16} />
                  <span className="font-medium">Estimated Monthly Cost</span>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Base plan:</span>
                    <span>€{serviceTiers.find(t => t.id === selectedTier)?.pricing.base.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Variable cost ({monthlyVolume.toLocaleString()} calls):</span>
                    <span>€{(monthlyVolume * (serviceTiers.find(t => t.id === selectedTier)?.pricing.perCall || 0)).toLocaleString()}</span>
                  </div>
                  {serviceTiers.find(t => t.id === selectedTier)?.pricing.setup && (
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Setup (amortized):</span>
                      <span>€{Math.round((serviceTiers.find(t => t.id === selectedTier)?.pricing.setup || 0) / 12)}</span>
                    </div>
                  )}
                  <div className="border-t pt-2 flex justify-between font-semibold text-lg">
                    <span>Total:</span>
                    <span className="text-primary">€{Math.round(calculateMonthlyCost()).toLocaleString()}</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default VolumeCalculator;