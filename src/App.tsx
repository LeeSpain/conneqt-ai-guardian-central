
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
import ClientManagement from "./pages/ClientManagement";
import CallCenter from "./pages/CallCenter";
import PlatformSettings from "./pages/PlatformSettings";
import WebsiteIntegration from "./pages/WebsiteIntegration";

const queryClient = new QueryClient();

// Create a wrapper component that uses the scroll to top hook
const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/about" element={<About />} />
      <Route path="/quote" element={<Quote />} />
      <Route path="/quote-confirmation" element={<QuoteConfirmation />} />
      <Route path="/subscriptions" element={<SubscriptionServices />} />
      <Route path="/admin-dashboard" element={<AdminDashboard />} />
      <Route path="/client-management" element={<ClientManagement />} />
      <Route path="/call-center" element={<CallCenter />} />
      <Route path="/platform-settings" element={<PlatformSettings />} />
      <Route path="/website-integration" element={<WebsiteIntegration />} />
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
