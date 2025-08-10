
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import About from "./pages/About";
import Quote from "./pages/Quote";
import NotFound from "./pages/NotFound";
import SubscriptionServices from "./pages/SubscriptionServices";
import QuoteConfirmation from "./pages/QuoteConfirmation";
import AdminDashboard from "./pages/AdminDashboard";
import HealthcareDashboard from "./pages/HealthcareDashboard";
import ClientManagement from "./pages/ClientManagement";
import TeamManagement from "./pages/TeamManagement";
import Reports from "./pages/Reports";
import CallCenter from "./pages/CallCenter";
import PlatformSettings from "./pages/PlatformSettings";
import WebsiteIntegration from "./pages/WebsiteIntegration";
import AIGuardian from "./pages/AIGuardian";
import ManagedServices from "./pages/ManagedServices";
import SolutionBuilder from "./pages/SolutionBuilder";
import AIAgents from "./pages/AIAgents";
import MasterAgentSettings from "./pages/MasterAgentSettings";
import ClientAgents from "./pages/ClientAgents";
import ClientAgentManager from "./pages/ClientAgentManager";
import AgentConsole from "./pages/AgentConsole";

const queryClient = new QueryClient();

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/about" element={<About />} />
      <Route path="/quote" element={<Quote />} />
      <Route path="/solution-builder" element={<SolutionBuilder />} />
      <Route path="/managed-services" element={<ManagedServices />} />
      <Route path="/quote-confirmation" element={<QuoteConfirmation />} />
      <Route path="/subscriptions" element={<SubscriptionServices />} />
      <Route path="/admin-dashboard" element={<AdminDashboard />} />
      <Route path="/healthcare-dashboard" element={<HealthcareDashboard />} />
      <Route path="/client-management" element={<ClientManagement />} />
      <Route path="/team-management" element={<TeamManagement />} />
      <Route path="/reports" element={<Reports />} />
      <Route path="/call-center" element={<CallCenter />} />
      <Route path="/platform-settings" element={<PlatformSettings />} />
      <Route path="/website-integration" element={<WebsiteIntegration />} />
      <Route path="/ai-guardian" element={<AIGuardian />} />
      {/* AI Agents */}
      <Route path="/ai-agents" element={<AIAgents />} />
      <Route path="/ai-agents/master" element={<MasterAgentSettings />} />
      <Route path="/ai-agents/clients" element={<ClientAgents />} />
      <Route path="/ai-agents/clients/:clientId" element={<ClientAgentManager />} />
      <Route path="/ai-agents/console" element={<AgentConsole />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
