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
import useScrollToTop from "./hooks/useScrollToTop";

const queryClient = new QueryClient();

const App = () => {
  // Add the scroll to top hook
  useScrollToTop();

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/about" element={<About />} />
            <Route path="/quote" element={<Quote />} />
            <Route path="/quote-confirmation" element={<QuoteConfirmation />} />
            <Route path="/subscriptions" element={<SubscriptionServices />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
