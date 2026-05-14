import { lazy, Suspense } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Index from "./pages/Index";
import ScrollToTop from "./components/ScrollToTop";

const About = lazy(() => import("./pages/About"));
const Programs = lazy(() => import("./pages/Programs"));
const WhyInvincio = lazy(() => import("./pages/WhyInvincio"));
const Results = lazy(() => import("./pages/Results"));
const Process = lazy(() => import("./pages/Process"));
const FAQ = lazy(() => import("./pages/FAQ"));
const NotFound = lazy(() => import("./pages/NotFound"));
const WrittenExam = lazy(() => import("./pages/WrittenExam"));
const SSBInterview = lazy(() => import("./pages/SSBInterview"));
const FutureLeader = lazy(() => import("./pages/FutureLeader"));
const Privacy = lazy(() => import("./pages/Privacy"));
const Terms = lazy(() => import("./pages/Terms"));

const queryClient = new QueryClient();

const RouteFallback = () => (
  <div className="min-h-[60vh] flex items-center justify-center bg-[#F1FFFF]">
    <div className="h-10 w-10 rounded-full border-2 border-[#00568C]/20 border-t-[#00568C] animate-spin" />
  </div>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToTop />
        <Suspense fallback={<RouteFallback />}>
          <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<Index />} />
              <Route path="/about" element={<About />} />
              <Route path="/programs" element={<Programs />} />
              <Route path="/difference" element={<WhyInvincio />} />
              <Route path="/results" element={<Results />} />
              <Route path="/process" element={<Process />} />
              <Route path="/faq" element={<FAQ />} />
              <Route path="/programs/written-exam" element={<WrittenExam />} />
              <Route path="/programs/ssb-interview" element={<SSBInterview />} />
              <Route path="/programs/future-leader" element={<FutureLeader />} />
              <Route path="/privacy" element={<Privacy />} />
              <Route path="/terms" element={<Terms />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </Suspense>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
