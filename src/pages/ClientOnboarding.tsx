import React, { useEffect, useMemo } from "react";
import Navbar from "@/components/Navbar";
import { useNavigate, Link } from "react-router-dom";
import { useClientProfile } from "@/contexts/ClientProfileContext";
import { SERVICE_CATALOG, ServiceKey } from "@/types/services";
import { Check, CreditCard } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { isServiceEnabled, getServiceLabel, getServiceDescription } from "@/utils/serviceConfig";

function useSEO() {
  useEffect(() => {
    document.title = "Client Onboarding - Choose Services | ConneqtCentral";

    const metaDesc = document.querySelector('meta[name="description"]') || document.createElement("meta");
    metaDesc.setAttribute("name", "description");
    metaDesc.setAttribute(
      "content",
      "Select your ConneqtCentral services and finish checkout to personalize your client dashboard."
    );
    document.head.appendChild(metaDesc);

    const canonical = document.querySelector('link[rel="canonical"]') || document.createElement("link");
    canonical.setAttribute("rel", "canonical");
    canonical.setAttribute("href", window.location.origin + "/client-onboarding");
    document.head.appendChild(canonical);
  }, []);
}

const ToggleTile = ({
  active,
  name,
  description,
  onClick,
}: {
  active: boolean;
  name: string;
  description: string;
  onClick: () => void;
}) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`w-full text-left rounded-xl border transition-colors px-5 py-4 ${
        active ? "border-conneqt-blue bg-conneqt-blue/5" : "border-conneqt-slate/20 hover:border-conneqt-blue/40"
      }`}
    >
      <div className="flex items-start gap-3">
        <div
          className={`mt-1 h-5 w-5 rounded-full border flex items-center justify-center ${
            active ? "border-conneqt-blue bg-conneqt-blue text-white" : "border-conneqt-slate/40"
          }`}
        >
          {active && <Check size={14} />}
        </div>
        <div>
          <h3 className="text-conneqt-navy font-semibold">{name}</h3>
          <p className="text-conneqt-slate/80 text-sm mt-1">{description}</p>
        </div>
      </div>
    </button>
  );
};

const ClientOnboarding: React.FC = () => {
  useSEO();
  const navigate = useNavigate();
  const { profile, setSelectedServices, markPaid } = useClientProfile();
  const { toast } = useToast();

  const selectedSet = useMemo(() => new Set(profile.selectedServices), [profile.selectedServices]);

  const toggleService = (key: ServiceKey) => {
    const next = new Set(selectedSet);
    if (next.has(key)) next.delete(key);
    else next.add(key);
    setSelectedServices(Array.from(next));
  };

  const handleSaveSelections = () => {
    toast({ title: "Selections saved", description: "Review and complete purchase to continue." });
  };

  const handleCompletePurchase = () => {
    // Placeholder for Stripe Checkout integration
    markPaid();
    toast({ title: "Payment confirmed", description: "Your personalized dashboard is ready." });
    navigate("/client-hub");
  };

  return (
    <div>
      <Navbar />
      <main className="max-w-5xl mx-auto px-4 py-10">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-conneqt-navy">Client Onboarding</h1>
          <p className="text-conneqt-slate/80 mt-2">
            Choose the services you want. We’ll build your dashboard with only the modules you select.
          </p>
        </header>

        <section>
          <h2 className="text-xl font-semibold text-conneqt-navy mb-4">Select Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {SERVICE_CATALOG.filter((s) => isServiceEnabled(s.key)).map((s) => (
              <ToggleTile
                key={s.key}
                active={selectedSet.has(s.key)}
                name={getServiceLabel(s.key)}
                description={getServiceDescription(s.key)}
                onClick={() => toggleService(s.key)}
              />
            ))}
          </div>
        </section>

        <div className="flex flex-wrap items-center gap-3 mt-8">
          <button
            onClick={handleSaveSelections}
            className="px-5 py-2 rounded-md border border-conneqt-slate/30 text-conneqt-navy hover:border-conneqt-blue transition-colors"
          >
            Save Selections
          </button>
          <button
            onClick={handleCompletePurchase}
            className="inline-flex items-center gap-2 px-5 py-2 rounded-md bg-conneqt-blue text-white hover:bg-blue-500 transition-colors"
          >
            <CreditCard size={16} /> Complete Purchase
          </button>
          {profile.paid && (
            <Link
              to="/client-hub"
              className="px-4 py-2 text-conneqt-blue underline underline-offset-4"
            >
              Go to your dashboard
            </Link>
          )}
        </div>
      </main>
    </div>
  );
};

export default ClientOnboarding;
