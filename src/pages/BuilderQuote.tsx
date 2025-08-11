import { useEffect, useMemo } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useClientProfile } from "@/contexts/ClientProfileContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useNavigate } from "react-router-dom";
import { calculateBuilderQuote } from "@/utils/builderPricing";

const setMeta = () => {
  document.title = "Builder Quote | Conneqt Central";

  const desc = "Professional quote generated from your Solution Builder inputs with clear pricing and assumptions.";
  let meta = document.querySelector('meta[name="description"]');
  if (!meta) {
    meta = document.createElement("meta");
    meta.setAttribute("name", "description");
    document.head.appendChild(meta);
  }
  meta.setAttribute("content", desc);

  let canonical = document.querySelector('link[rel="canonical"]');
  if (!canonical) {
    canonical = document.createElement("link");
    canonical.setAttribute("rel", "canonical");
    document.head.appendChild(canonical);
  }
  canonical.setAttribute("href", window.location.origin + "/builder-quote");
};

const currency = (n: number) => `€${n.toFixed(2)}`;

const BuilderQuote = () => {
  const navigate = useNavigate();
  const { profile } = useClientProfile();

  useEffect(() => {
    setMeta();
  }, []);

  const ready = useMemo(() => {
    return Boolean(profile.assessmentAnswers && profile.assessmentResult && profile.selectedServices?.length);
  }, [profile]);

  useEffect(() => {
    if (!ready) {
      // If the builder wasn't completed, send user back
      navigate("/solution-builder", { replace: true });
    }
  }, [ready, navigate]);

  if (!ready) return null;

  const answers = profile.assessmentAnswers!;
  const overview = profile.companyOverview;
  const pricing = calculateBuilderQuote(profile);

  return (
    <>
      <Navbar />
      <main className="pt-20 pb-16">
        <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <header className="text-center max-w-3xl mx-auto mb-10">
            <h1 className="mb-3">Your Professional Quote</h1>
            <p className="text-muted-foreground">A clear overview and pricing based on your Solution Builder selections.</p>
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Summary */}
            <div className="lg:col-span-2 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Company overview</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div><span className="text-muted-foreground">Company:</span> {answers.companyName || "—"}</div>
                    <div><span className="text-muted-foreground">Industry:</span> {answers.industry || "—"}</div>
                    <div><span className="text-muted-foreground">Website:</span> {answers.website || "—"}</div>
                    <div><span className="text-muted-foreground">Team size:</span> {answers.teamSize || "—"}</div>
                  </div>
                  {overview?.summary && (
                    <div className="prose prose-sm dark:prose-invert max-w-none">
                      <p>{overview.summary}</p>
                      {overview.keyPoints && overview.keyPoints.length > 0 && (
                        <ul>
                          {overview.keyPoints.map((k, i) => (
                            <li key={i}>{k}</li>
                          ))}
                        </ul>
                      )}
                    </div>
                  )}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Requirements & selections</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-sm">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <div><span className="text-muted-foreground">Typical volume:</span> {answers.callVolume || "—"}</div>
                    <div><span className="text-muted-foreground">Complexity:</span> {answers.complexity || "—"}</div>
                    <div><span className="text-muted-foreground">Coverage:</span> {answers.coverage || "—"}</div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <div><span className="text-muted-foreground">Integrations:</span> {answers.integrations || "—"}</div>
                    <div><span className="text-muted-foreground">Compliance:</span> {answers.compliance || "—"}</div>
                    <div><span className="text-muted-foreground">Tier suggested:</span> {profile.assessmentResult?.suggestedTier || "—"}</div>
                  </div>
                  {profile.selectedServices?.length ? (
                    <div>
                      <span className="text-muted-foreground">Modules:</span>
                      <ul className="list-disc pl-5 mt-1">
                        {profile.selectedServices.map((s) => (
                          <li key={s}>{s}</li>
                        ))}
                      </ul>
                    </div>
                  ) : null}
                </CardContent>
              </Card>
            </div>

            {/* Pricing */}
            <aside className="lg:col-span-1">
              <Card>
                <CardHeader>
                  <CardTitle>Pricing breakdown</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-sm">
                    {pricing.lines.map((l) => (
                      <div key={l.label} className="flex items-start justify-between gap-3">
                        <span>{l.label}</span>
                        <span>{currency(l.amount)}</span>
                      </div>
                    ))}
                    <Separator className="my-2" />
                    <div className="flex items-center justify-between">
                      <span>Subtotal</span>
                      <span>{currency(pricing.subtotal)}</span>
                    </div>
                    {pricing.discount > 0 && (
                      <div className="flex items-center justify-between text-emerald-600">
                        <span>Bundle discount</span>
                        <span>-{currency(pricing.discount)}</span>
                      </div>
                    )}
                    <div className="flex items-center justify-between">
                      <span>Adjusted subtotal</span>
                      <span>{currency(pricing.adjustedSubtotal)}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>One-time setup</span>
                      <span>{currency(pricing.setupFee)}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>VAT (21%)</span>
                      <span>{currency(pricing.vat)}</span>
                    </div>
                    <Separator className="my-2" />
                    <div className="flex items-center justify-between font-semibold">
                      <span>Total first month</span>
                      <span>{currency(pricing.total)}</span>
                    </div>
                  </div>
                  {pricing.assumptions.length > 0 && (
                    <div className="mt-4">
                      <div className="text-xs text-muted-foreground mb-1">Assumptions</div>
                      <ul className="text-xs list-disc pl-5 space-y-1">
                        {pricing.assumptions.map((a, i) => (
                          <li key={i}>{a}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                  <div className="mt-6 space-y-2">
                    <Button className="w-full" onClick={() => navigate("/quote")}>Request final proposal</Button>
                    <Button variant="secondary" className="w-full" onClick={() => navigate("/solution-builder")}>Back to builder</Button>
                  </div>
                </CardContent>
              </Card>
            </aside>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default BuilderQuote;
