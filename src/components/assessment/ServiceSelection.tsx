import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Check } from 'lucide-react';
import { SERVICE_CATALOG, ServiceKey } from '@/types/services';
import { useClientProfile } from '@/contexts/ClientProfileContext';

interface ServiceSelectionProps {
  onContinue?: () => void;
}

const ServiceSelection: React.FC<ServiceSelectionProps> = ({ onContinue }) => {
  const { profile, setSelectedServices } = useClientProfile();
  const selectedSet = new Set<ServiceKey>(profile.selectedServices);

  const toggle = (key: ServiceKey) => {
    const next = new Set(selectedSet);
    if (next.has(key)) next.delete(key);
    else next.add(key);
    setSelectedServices(Array.from(next));
  };

  const applyRecommendation = () => {
    const rec = profile.assessmentResult?.suggestedServices || [];
    setSelectedServices(rec);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Choose Your Services</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {profile.assessmentResult?.suggestedServices?.length ? (
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-sm text-muted-foreground">Recommended:</span>
            {profile.assessmentResult.suggestedServices.map((s) => (
              <Badge key={s} variant="secondary" className="capitalize">
                {String(s).replace(/_/g, ' ')}
              </Badge>
            ))}
            <Button size="sm" variant="outline" onClick={applyRecommendation}>
              Apply Recommendation
            </Button>
          </div>
        ) : null}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {SERVICE_CATALOG.map((svc) => (
            <button
              key={svc.key}
              type="button"
              onClick={() => toggle(svc.key)}
              className={`w-full text-left rounded-xl border transition-colors px-5 py-4 ${
                selectedSet.has(svc.key)
                  ? 'border-conneqt-blue bg-conneqt-blue/5'
                  : 'border-conneqt-slate/20 hover:border-conneqt-blue/40'
              }`}
            >
              <div className="flex items-start gap-3">
                <div
                  className={`mt-1 h-5 w-5 rounded-full border flex items-center justify-center ${
                    selectedSet.has(svc.key)
                      ? 'border-conneqt-blue bg-conneqt-blue text-white'
                      : 'border-conneqt-slate/40'
                  }`}
                >
                  {selectedSet.has(svc.key) && <Check size={14} />}
                </div>
                <div>
                  <h3 className="text-conneqt-navy font-semibold">{svc.name}</h3>
                  <p className="text-conneqt-slate/80 text-sm mt-1">{svc.description}</p>
                </div>
              </div>
            </button>
          ))}
        </div>

        {onContinue && (
          <div className="flex justify-end">
            <Button onClick={onContinue}>Continue to Dashboard Preview</Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ServiceSelection;
