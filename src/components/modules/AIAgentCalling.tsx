import React from "react";
import { Phone, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const AIAgentCalling: React.FC = () => {
  return (
    <article className="rounded-xl border border-conneqt-slate/20 p-5 shadow-sm bg-white">
      <header className="flex items-center gap-3 mb-3">
        <div className="h-10 w-10 rounded-lg bg-conneqt-blue/10 text-conneqt-blue flex items-center justify-center">
          <Phone size={18} />
        </div>
        <div>
          <h3 className="text-conneqt-navy font-semibold">AI Agent Calling</h3>
          <p className="text-xs text-conneqt-slate/70">Automate outbound/inbound calls with AI.</p>
        </div>
      </header>

      <p className="text-sm text-conneqt-slate/90 mb-4">
        Connect your numbers, configure call flows, and track outcomes. Integrates with your CRM.
      </p>

      <div className="flex items-center gap-3">
        <Link
          to="/ai-agents/console"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-conneqt-blue text-white hover:bg-blue-500 transition-colors"
          aria-label="Open Agent Console"
        >
          Open Console <ArrowRight size={16} />
        </Link>
        <Link to="/ai-agents" className="text-conneqt-blue underline underline-offset-4 text-sm">
          Configure Agents
        </Link>
      </div>
    </article>
  );
};

export default AIAgentCalling;
