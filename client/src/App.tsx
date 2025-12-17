import { Switch, Route, useLocation } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import ReportPage from "@/pages/report";
import ThankYouPage from "@/pages/thank-you";

import HomePage from "@/pages/home";
import ApplyPage from "@/pages/apply";

function Router() {
  return (
    <Switch>
      <Route path="/" component={HomePage} />
      <Route path="/apply" component={ApplyPage} />
      <Route path="/report/:id" component={ReportPage} />
      <Route path="/thank-you" component={ThankYouPage} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
