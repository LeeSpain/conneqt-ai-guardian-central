import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import { useClientProfile } from "@/contexts/ClientProfileContext";
import { SERVICE_CATALOG, type ServiceKey } from "@/types/services";
import { CompanyAnalyzer } from "@/utils/CompanyAnalyzer";
import { PerplexityService } from "@/utils/PerplexityService";

const industries = [
  "Retail",
  "Healthcare",
  "Finance",
  "Education",
  "Technology",
  "SaaS",
  "E-commerce",
];

const teamSizes = ["1-10", "11-50", "51-200", "200+"];

const QuestionnaireForm: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { setSelectedServices, setAssessment, setCompanyOverview } = useClientProfile();
  

  const [step, setStep] = useState(0);
  const totalSteps = 6;

  const [answers, setAnswers] = useState({
    companyName: "",
    website: "",
    industry: "",
    teamSize: "",
    callVolume: "", // low | medium | high
    complexity: "", // simple | mixed | complex
    coverage: "", // business-hours | extended | 24/7
    integrations: "", // none | few | many
    compliance: "", // none | basic | strict
    goals: "",
    requirements: "",
  });

  const [selectedServices, setSelected] = useState<ServiceKey[]>([]);

  const [aiLoading, setAiLoading] = useState(false);
  const [aiProgress, setAiProgress] = useState(0);
  const [overviewDraft, setOverviewDraft] = useState("");
  const [overviewKeyPoints, setOverviewKeyPoints] = useState<string[]>([]);
  const [aiDisabled, setAiDisabled] = useState(false);
  const aiAvailable = Boolean(PerplexityService.getApiKey()) && !aiDisabled;

  // Trigger AI analysis on Step 2 (index 1)
  useEffect(() => {
    if (step !== 1) return;
    if (!aiAvailable) return;
    if (aiLoading || overviewDraft) return;
    if (!answers.companyName) return;

    setAiLoading(true);
    setAiProgress(15);

    const t1 = setTimeout(() => setAiProgress(40), 500);
    const t2 = setTimeout(() => setAiProgress(70), 1000);
    const t3 = setTimeout(() => setAiProgress(90), 1600);

    const run = async () => {
      try {
        const analysis = await CompanyAnalyzer.analyzeCompany({
          websiteUrl: answers.website || undefined,
          companyName: answers.companyName,
          industry: answers.industry || undefined,
        });

        if (analysis) {
          setOverviewDraft(analysis.summary);
          setOverviewKeyPoints(analysis.keyPoints || []);
          setCompanyOverview({
            website: answers.website,
            summary: analysis.summary,
            keyPoints: analysis.keyPoints || [],
            sources: analysis.sources || [],
          });
          toast({ title: 'Company analyzed', description: 'Overview ready. Continue to Support requirements.' });
        } else {
          toast({ title: 'Analysis unavailable', description: 'You can continue without the AI overview.' });
        }
      } catch (e) {
        setAiDisabled(true);
        toast({ title: 'Analysis failed', description: 'Analysis temporarily unavailable. You can continue without AI.', variant: 'destructive' });
      } finally {
        setAiLoading(false);
        setAiProgress(100);
        clearTimeout(t1); clearTimeout(t2); clearTimeout(t3);
      }
    };

    run();
  }, [step, aiAvailable, aiLoading, overviewDraft, answers.companyName, answers.industry, answers.website, toast, setCompanyOverview]);
  const progress = useMemo(() => Math.round(((step + 1) / totalSteps) * 100), [step]);

  // Auto-advance when AI is unavailable (no frontend settings exposed)
  useEffect(() => {
    if (step === 1 && !aiAvailable && !aiLoading) {
      const t = setTimeout(() => setStep((s) => Math.min(totalSteps - 1, s + 1)), 800);
      return () => clearTimeout(t);
    }
  }, [step, aiAvailable, aiLoading, totalSteps]);

  const nextDisabled = useMemo(() => {
    if (step === 0) return !(answers.companyName && answers.industry && answers.website);
    if (step === 1) return aiAvailable ? (aiLoading || !overviewDraft) : false; // allow skipping when AI unavailable
    if (step === 2) return !(answers.callVolume && answers.complexity && answers.coverage);
    if (step === 3) return !(answers.integrations && answers.compliance);
    if (step === 4) return selectedServices.length === 0; // require at least one service
    return false;
  }, [step, answers, aiAvailable, aiLoading, overviewDraft, selectedServices]);

  const computeScoreAndTier = () => {
    let score = 0;
    if (answers.callVolume === "medium") score += 1;
    if (answers.callVolume === "high") score += 2;
    if (answers.complexity === "mixed") score += 1;
    if (answers.complexity === "complex") score += 2;
    if (answers.coverage === "extended") score += 1;
    if (answers.coverage === "24/7") score += 2;
    if (answers.compliance === "basic") score += 1;
    if (answers.compliance === "strict") score += 2;

    const normalized = Math.min(10, score);
    const overall = Math.round((normalized / 10) * 100);

    const tier = score >= 6 ? "enterprise" : score >= 3 ? "professional" : "starter";

    const recommendations: string[] = [];
    if (answers.coverage === "24/7") recommendations.push("Plan 24/7 coverage with overflow routing");
    if (answers.complexity !== "simple") recommendations.push("Include AI + human hybrid workflows");
    if (answers.compliance !== "none") recommendations.push("Enable audit logs and role-based access");

    const riskFactors: string[] = [];
    if (answers.compliance === "strict") riskFactors.push("Strict compliance requirements");
    if (answers.callVolume === "high") riskFactors.push("High volume spikes");

    const strengths: string[] = [];
    if (answers.callVolume === "low") strengths.push("Manageable volume to iterate quickly");
    if (answers.complexity === "simple") strengths.push("Straightforward flows");

    return { overall, tier, recommendations, riskFactors, strengths };
  };

  const onConfirm = () => {
    const { overall, tier, recommendations, riskFactors, strengths } = computeScoreAndTier();

    setSelectedServices(selectedServices);
    setAssessment(
      { ...answers },
      {
        overallScore: overall,
        suggestedTier: tier,
        recommendations,
        riskFactors,
        strengths,
        suggestedServices: selectedServices,
      }
    );

    toast({ title: "Selections saved", description: "We will prepare your onboarding next." });
    navigate("/builder-quote");
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-4">
        <Progress value={progress} />
        <div className="mt-2 text-sm text-muted-foreground">Step {step + 1} of {totalSteps}</div>
      </div>

      {/* Step 1: Company Basics */}
      {step === 0 && (
        <section aria-labelledby="basics-title" className="space-y-6">
          <h2 id="basics-title" className="text-2xl font-semibold tracking-tight">Company basics</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="company">Company name</Label>
              <Input id="company" value={answers.companyName} onChange={(e) => setAnswers(a => ({ ...a, companyName: e.target.value }))} placeholder="Acme Inc." />
            </div>
            <div className="space-y-2">
              <Label htmlFor="website">Website</Label>
              <Input id="website" value={answers.website} onChange={(e) => setAnswers(a => ({ ...a, website: e.target.value }))} placeholder="https://" />
            </div>
            <div className="space-y-2">
              <Label>Industry</Label>
              <Select value={answers.industry} onValueChange={(v) => setAnswers(a => ({ ...a, industry: v }))}>
                <SelectTrigger aria-label="Select industry"><SelectValue placeholder="Select industry" /></SelectTrigger>
                <SelectContent>
                  {industries.map((i) => (
                    <SelectItem key={i} value={i}>{i}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Team size</Label>
              <Select value={answers.teamSize} onValueChange={(v) => setAnswers(a => ({ ...a, teamSize: v }))}>
                <SelectTrigger aria-label="Select team size"><SelectValue placeholder="Select team size" /></SelectTrigger>
                <SelectContent>
                  {teamSizes.map((s) => (
                    <SelectItem key={s} value={s}>{s}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </section>
      )}

      {/* Step 2: AI Agent is Working */}
      {step === 1 && (
        <section aria-labelledby="agent-title" className="space-y-6">
          <h2 id="agent-title" className="text-2xl font-semibold tracking-tight">AI Agent is working</h2>
          {aiAvailable ? (
            <div className="space-y-3">
              <Progress value={aiProgress} />
              <div className="text-xs text-muted-foreground">{aiLoading ? 'Analyzing...' : 'Finalizing...'}</div>
            </div>
          ) : (
            <div className="rounded-md border p-3 space-y-2">
              <div className="font-medium">Preparing next step</div>
              <p className="text-sm text-muted-foreground">Automatic analysis is not available right now. You can continue without it.</p>
            </div>
          )}
        </section>
      )}

      {/* Step 3: Support Requirements */}
      {step === 2 && (
        <section aria-labelledby="support-title" className="space-y-6">
          <h2 id="support-title" className="text-2xl font-semibold tracking-tight">Support requirements</h2>

          {/* Introduction & Overview */}
          <div className="rounded-md border p-3 space-y-2">
            <div className="flex items-center justify-between">
              <div className="font-medium">Introduction & Overview</div>
              <Button
                size="sm"
                variant="secondary"
                onClick={() => {
                  const summary = overviewDraft || `Based on available information, ${answers.companyName || 'this company'} operates in the ${answers.industry || 'unspecified'} sector. The public website suggests focus areas around its core offerings. This overview will improve once AI data access is configured.`;
                  setCompanyOverview({
                    website: answers.website,
                    summary,
                    keyPoints: overviewKeyPoints || [],
                  });
                  toast({ title: "Overview saved", description: "We’ll include this in your proposal." });
                }}
              >
                Save Overview
              </Button>
            </div>
            <p className="text-sm">
              {overviewDraft || `Based on available information, ${answers.companyName || 'this company'} operates in the ${answers.industry || 'unspecified'} sector. The public website suggests focus areas around its core offerings. This overview will improve once AI data access is configured.`}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <fieldset className="space-y-3">
              <legend className="text-sm font-medium">Typical volume</legend>
              <RadioGroup value={answers.callVolume} onValueChange={(v) => setAnswers(a => ({ ...a, callVolume: v }))}>
                <div className="flex items-center space-x-2"><RadioGroupItem id="vol-low" value="low" /><Label htmlFor="vol-low">Low</Label></div>
                <div className="flex items-center space-x-2"><RadioGroupItem id="vol-med" value="medium" /><Label htmlFor="vol-med">Medium</Label></div>
                <div className="flex items-center space-x-2"><RadioGroupItem id="vol-high" value="high" /><Label htmlFor="vol-high">High</Label></div>
              </RadioGroup>
            </fieldset>

            <fieldset className="space-y-3">
              <legend className="text-sm font-medium">Inquiry complexity</legend>
              <RadioGroup value={answers.complexity} onValueChange={(v) => setAnswers(a => ({ ...a, complexity: v }))}>
                <div className="flex items-center space-x-2"><RadioGroupItem id="cmp-simple" value="simple" /><Label htmlFor="cmp-simple">Simple</Label></div>
                <div className="flex items-center space-x-2"><RadioGroupItem id="cmp-mixed" value="mixed" /><Label htmlFor="cmp-mixed">Mixed</Label></div>
                <div className="flex items-center space-x-2"><RadioGroupItem id="cmp-complex" value="complex" /><Label htmlFor="cmp-complex">Complex</Label></div>
              </RadioGroup>
            </fieldset>

            <fieldset className="space-y-3">
              <legend className="text-sm font-medium">Coverage</legend>
              <RadioGroup value={answers.coverage} onValueChange={(v) => setAnswers(a => ({ ...a, coverage: v }))}>
                <div className="flex items-center space-x-2"><RadioGroupItem id="cov-bh" value="business-hours" /><Label htmlFor="cov-bh">Business hours</Label></div>
                <div className="flex items-center space-x-2"><RadioGroupItem id="cov-ext" value="extended" /><Label htmlFor="cov-ext">Extended</Label></div>
                <div className="flex items-center space-x-2"><RadioGroupItem id="cov-247" value="24/7" /><Label htmlFor="cov-247">24/7</Label></div>
              </RadioGroup>
            </fieldset>
          </div>
        </section>
      )}

      {/* Step 4: Tech & Compliance */}
      {step === 3 && (
        <section aria-labelledby="tech-title" className="space-y-6">
          <h2 id="tech-title" className="text-2xl font-semibold tracking-tight">Tech & compliance</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <fieldset className="space-y-3">
              <legend className="text-sm font-medium">Integrations</legend>
              <RadioGroup value={answers.integrations} onValueChange={(v) => setAnswers(a => ({ ...a, integrations: v }))}>
                <div className="flex items-center space-x-2"><RadioGroupItem id="int-none" value="none" /><Label htmlFor="int-none">None</Label></div>
                <div className="flex items-center space-x-2"><RadioGroupItem id="int-few" value="few" /><Label htmlFor="int-few">Few</Label></div>
                <div className="flex items-center space-x-2"><RadioGroupItem id="int-many" value="many" /><Label htmlFor="int-many">Many</Label></div>
              </RadioGroup>
            </fieldset>

            <fieldset className="space-y-3">
              <legend className="text-sm font-medium">Compliance</legend>
              <RadioGroup value={answers.compliance} onValueChange={(v) => setAnswers(a => ({ ...a, compliance: v }))}>
                <div className="flex items-center space-x-2"><RadioGroupItem id="cmp-none" value="none" /><Label htmlFor="cmp-none">None</Label></div>
                <div className="flex items-center space-x-2"><RadioGroupItem id="cmp-basic" value="basic" /><Label htmlFor="cmp-basic">Basic</Label></div>
                <div className="flex items-center space-x-2"><RadioGroupItem id="cmp-strict" value="strict" /><Label htmlFor="cmp-strict">Strict</Label></div>
              </RadioGroup>
            </fieldset>
          </div>
        </section>
      )}

      {/* Step 5: Service Interests */}
      {step === 4 && (
        <section aria-labelledby="services-title" className="space-y-4">
          <h2 id="services-title" className="text-2xl font-semibold tracking-tight">Service interests</h2>
          <p className="text-sm text-muted-foreground">Choose the modules you want enabled. You can adjust later.</p>
          <div className="space-y-3">
            {SERVICE_CATALOG.map((svc) => (
              <label key={svc.key} className="flex items-start gap-3 p-3 rounded-md border cursor-pointer">
                <Checkbox
                  checked={selectedServices.includes(svc.key)}
                  onCheckedChange={(checked) => {
                    const isOn = Boolean(checked);
                    setSelected((prev) =>
                      isOn ? [...prev, svc.key] : prev.filter((k) => k !== svc.key)
                    );
                  }}
                />
                <div>
                  <div className="font-medium">{svc.name}</div>
                  <div className="text-sm text-muted-foreground">{svc.description}</div>
                </div>
              </label>
            ))}
          </div>
        </section>
      )}

      {/* Step 6: Review */}
      {step === 5 && (
        <section aria-labelledby="review-title" className="space-y-4">
          <h2 id="review-title" className="text-2xl font-semibold tracking-tight">Review & confirm</h2>
          <div className="space-y-2 text-sm">
            <div><span className="text-muted-foreground">Company:</span> {answers.companyName || "—"}</div>
            <div><span className="text-muted-foreground">Industry:</span> {answers.industry || "—"}</div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
              <div><span className="text-muted-foreground">Volume:</span> {answers.callVolume || "—"}</div>
              <div><span className="text-muted-foreground">Complexity:</span> {answers.complexity || "—"}</div>
              <div><span className="text-muted-foreground">Coverage:</span> {answers.coverage || "—"}</div>
            </div>
            <Separator className="my-2" />
            <div className="flex flex-wrap gap-2">
              {selectedServices.length === 0 ? (
                <span className="text-muted-foreground">No services selected yet.</span>
              ) : (
                selectedServices.map((k) => {
                  const svc = SERVICE_CATALOG.find((s) => s.key === k)!;
                  return <Badge key={k} variant="secondary">{svc.name}</Badge>;
                })
              )}
            </div>
          </div>
        </section>
      )}

      {/* Controls */}
      <div className="mt-6 flex items-center justify-between">
        <Button variant="outline" onClick={() => setStep((s) => Math.max(0, s - 1))} disabled={step === 0}>
          Back
        </Button>
        {step < totalSteps - 1 ? (
          <Button onClick={() => {
            if (nextDisabled) {
              toast({ title: "Missing info", description: "Please complete the required fields to continue." });
              return;
            }
            setStep((s) => Math.min(totalSteps - 1, s + 1));
          }}>
            Continue
          </Button>
        ) : (
          <Button onClick={onConfirm}>
            Confirm & proceed
          </Button>
        )}
      </div>
    </div>
  );
};

export default QuestionnaireForm;
