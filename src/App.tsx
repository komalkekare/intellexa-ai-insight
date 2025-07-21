import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import Index from "./pages/Index";
import AIInsights from "./pages/AIInsights";
import SourceTracking from "./pages/SourceTracking";
import TeamCollaboration from "./pages/TeamCollaboration";
import RealTimeUpdates from "./pages/RealTimeUpdates";
import EnterpriseSecurity from "./pages/EnterpriseSecurity";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/chat" element={<Index />} />
          <Route path="/ai-insights" element={<AIInsights />} />
          <Route path="/source-tracking" element={<SourceTracking />} />
          <Route path="/team-collaboration" element={<TeamCollaboration />} />
          <Route path="/real-time-updates" element={<RealTimeUpdates />} />
          <Route path="/enterprise-security" element={<EnterpriseSecurity />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
