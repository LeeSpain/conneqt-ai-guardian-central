import { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { useToast } from '@/hooks/use-toast';
import { FirecrawlService } from '@/utils/FirecrawlService';
import { PerplexityService } from '@/utils/PerplexityService';

const AIConnections = () => {
  const { toast } = useToast();
  const [firecrawlKey, setFirecrawlKey] = useState(FirecrawlService.getApiKey() || '');
  const [perplexityKey, setPerplexityKey] = useState(PerplexityService.getApiKey() || '');
  const [testing, setTesting] = useState<{fc?: boolean; px?: boolean}>({});

  const firecrawlConnected = useMemo(() => Boolean(FirecrawlService.getApiKey()), []);
  const perplexityConnected = useMemo(() => Boolean(PerplexityService.getApiKey()), []);
  const allConnected = firecrawlConnected && perplexityConnected;

  const saveFirecrawl = () => {
    FirecrawlService.saveApiKey(firecrawlKey.trim());
    toast({ title: 'Firecrawl key saved' });
  };
  const testFirecrawl = async () => {
    setTesting(t => ({ ...t, fc: true }));
    const ok = await FirecrawlService.testApiKey(firecrawlKey.trim());
    setTesting(t => ({ ...t, fc: false }));
    toast({ title: ok ? 'Firecrawl connected' : 'Firecrawl failed', variant: ok ? 'default' : 'destructive' });
  };

  const savePerplexity = () => {
    PerplexityService.saveApiKey(perplexityKey.trim());
    toast({ title: 'Perplexity key saved' });
  };
  const testPerplexity = async () => {
    setTesting(t => ({ ...t, px: true }));
    const ok = await PerplexityService.testApiKey(perplexityKey.trim());
    setTesting(t => ({ ...t, px: false }));
    toast({ title: ok ? 'Perplexity connected' : 'Perplexity failed', variant: ok ? 'default' : 'destructive' });
  };

  return (
    <section aria-labelledby="ai-connections-title" className="mb-8">
      {!allConnected && (
        <Alert className="mb-4">
          <AlertTitle>AI connections needed</AlertTitle>
          <AlertDescription>
            Add your API keys below to enable website crawling and AI summaries in the Solution Builder.
          </AlertDescription>
        </Alert>
      )}
      <Card>
        <CardHeader>
          <CardTitle id="ai-connections-title" className="flex items-center justify-between">
            <span>AI Connections</span>
            <span className="flex gap-2">
              <Badge variant={firecrawlConnected ? 'default' : 'secondary'}>Firecrawl {firecrawlConnected ? 'Connected' : 'Not set'}</Badge>
              <Badge variant={perplexityConnected ? 'default' : 'secondary'}>Perplexity {perplexityConnected ? 'Connected' : 'Not set'}</Badge>
            </span>
          </CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-3">
            <Label htmlFor="firecrawl">Firecrawl API key</Label>
            <Input id="firecrawl" type="password" value={firecrawlKey} onChange={(e) => setFirecrawlKey(e.target.value)} placeholder="fc_..." />
            <div className="flex gap-2">
              <Button size="sm" onClick={saveFirecrawl}>Save</Button>
              <Button size="sm" variant="secondary" onClick={testFirecrawl} disabled={testing.fc}> {testing.fc ? 'Testing…' : 'Test'} </Button>
            </div>
          </div>
          <div className="space-y-3">
            <Label htmlFor="perplexity">Perplexity API key</Label>
            <Input id="perplexity" type="password" value={perplexityKey} onChange={(e) => setPerplexityKey(e.target.value)} placeholder="pplx_..." />
            <div className="flex gap-2">
              <Button size="sm" onClick={savePerplexity}>Save</Button>
              <Button size="sm" variant="secondary" onClick={testPerplexity} disabled={testing.px}> {testing.px ? 'Testing…' : 'Test'} </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </section>
  );
};

export default AIConnections;
