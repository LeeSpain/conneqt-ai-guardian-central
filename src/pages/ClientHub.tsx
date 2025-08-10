import React, { useEffect, useMemo } from "react";
import Navbar from "@/components/Navbar";
import { Link, useNavigate } from "react-router-dom";
import { useClientProfile } from "@/contexts/ClientProfileContext";
import { ServiceKey } from "@/types/services";
import AIAgentCalling from "@/components/modules/AIAgentCalling";

function useSEO() {
  useEffect(() => {
    document.title = "Client Hub - Personalized Dashboard | ConneqtCentral";

    const metaDesc = document.querySelector('meta[name="description"]') || document.createElement("meta");
    metaDesc.setAttribute("name", "description");
    metaDesc.setAttribute(
      "content",
      "Your personalized client dashboard. Access modules based on the services you selected."
    );
    document.head.appendChild(metaDesc);

    const canonical = document.querySelector('link[rel="canonical"]') || document.createElement("link");
    canonical.setAttribute("rel", "canonical");
    canonical.setAttribute("href", window.location.origin + "/client-hub");
    document.head.appendChild(canonical);
  }, []);
}

const ModuleRenderer = ({ service }: { service: ServiceKey }) => {
  switch (service) {
    case "ai_agent_calling":
      return <AIAgentCalling />;
    default:
      return (
        <div className="rounded-xl border border-conneqt-slate/20 p-5">
          <h3 className="text-conneqt-navy font-semibold">Coming Soon</h3>
          <p className="text-conneqt-slate/80 text-sm mt-1">This module will be available shortly.</p>
        </div>
      );
  }
};

const ClientHub: React.FC = () => {
  useSEO();
  const navigate = useNavigate();
  const { profile } = useClientProfile();

  const hasModules = profile.selectedServices.length > 0;

  useEffect(() => {
    // If not paid, encourage finishing onboarding
    if (!profile.paid) {
      // Just render banner; don't auto-redirect to keep UX friendly
    }
  }, [profile.paid]);

  const modules = useMemo(() => profile.selectedServices, [profile.selectedServices]);

  return (
    <div>
      <Navbar />
      <main className="max-w-6xl mx-auto px-4 py-10">
        <header className="mb-6">
          <h1 className="text-3xl font-bold text-conneqt-navy">Client Hub</h1>
          <p className="text-conneqt-slate/80 mt-2">
            Access all modules included in your plan. Manage services anytime.
          </p>
        </header>

        {!profile.paid && (
          <div className="mb-6 rounded-lg border border-conneqt-blue/30 bg-conneqt-blue/5 p-4">
            <p className="text-conneqt-navy">
              Your purchase isn’t complete. Please finish onboarding to unlock your personalized dashboard.
            </p>
            <div className="mt-3">
              <Link
                to="/client-onboarding"
                className="px-4 py-2 rounded-md bg-conneqt-blue text-white hover:bg-blue-500 transition-colors"
              >
                Resume Onboarding
              </Link>
            </div>
          </div>
        )}

        {!hasModules ? (
          <div className="rounded-xl border border-conneqt-slate/20 p-6">
            <h2 className="text-xl font-semibold text-conneqt-navy">No modules selected</h2>
            <p className="text-conneqt-slate/80 mt-2">
              Choose your services to tailor your dashboard.
            </p>
            <Link
              to="/client-onboarding"
              className="inline-block mt-4 px-4 py-2 rounded-md bg-conneqt-blue text-white hover:bg-blue-500 transition-colors"
            >
              Select Services
            </Link>
          </div>
        ) : (
          <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
            {modules.map((m) => (
              <ModuleRenderer key={m} service={m} />
            ))}
          </section>
        )}
      </main>
    </div>
  );
};

export default ClientHub;
