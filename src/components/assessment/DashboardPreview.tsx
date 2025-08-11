import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useClientProfile } from '@/contexts/ClientProfileContext';
import { SERVICE_CATALOG } from '@/types/services';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { getServiceLabel, getServiceDescription } from '@/utils/serviceConfig';

const DashboardPreview: React.FC = () => {
  const { profile } = useClientProfile();
  const navigate = useNavigate();
  const { toast } = useToast();

  const selected = SERVICE_CATALOG.filter((s) => profile.selectedServices.includes(s.key));

  const proceed = () => {
    toast({ title: 'Selections saved', description: 'We will build your dashboard with these modules.' });
    navigate('/client-onboarding');
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Dashboard Preview</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {selected.length === 0 ? (
          <p className="text-muted-foreground">No services selected yet. Choose services to preview your dashboard.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {selected.map((s) => (
              <div key={s.key} className="rounded-lg border p-4">
                <h3 className="font-semibold text-conneqt-navy">{getServiceLabel(s.key)}</h3>
                <p className="text-sm text-conneqt-slate/80 mt-1">{getServiceDescription(s.key)}</p>
                <div className="mt-3 text-xs text-muted-foreground">Module will be enabled on your dashboard.</div>
              </div>
            ))}
          </div>
        )}

        <div className="flex justify-end">
          <Button onClick={proceed}>Proceed to Onboarding</Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default DashboardPreview;
