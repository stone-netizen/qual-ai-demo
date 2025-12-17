import { useRoute } from "wouter";
import { MOCK_REPORT_DATA } from "@/lib/mock-data";
import { StickyCTA } from "@/components/ui/sticky-cta";
import { MermaidDiagram } from "@/components/ui/mermaid-diagram";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { AlertTriangle, TrendingUp, DollarSign, Activity, Check, Phone } from "lucide-react";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts";
import { useEffect, useState } from "react";
import { ReportData } from "@/lib/calculations";
import { Button } from "@/components/ui/button";

export default function ReportPage() {
  const [match, params] = useRoute("/report/:id");
  const [data, setData] = useState<ReportData>(MOCK_REPORT_DATA as unknown as ReportData);

  useEffect(() => {
    if (params?.id) {
      const savedReports = JSON.parse(localStorage.getItem("qual_reports") || "{}");
      if (savedReports[params.id]) {
        setData(savedReports[params.id]);
      }
    }
  }, [params?.id]);

  // Mock tracking
  const trackEvent = (type: string, meta: any) => {
    console.log("TRACKING EVENT:", type, meta);
    // In real app: await fetch('/api/events', ...)
    const events = JSON.parse(localStorage.getItem("qual_events") || "[]");
    events.push({
      id: crypto.randomUUID(),
      created_at: new Date().toISOString(),
      event_type: type,
      metadata: meta
    });
    localStorage.setItem("qual_events", JSON.stringify(events));
  };

  const handleBookClick = () => {
    trackEvent("cta_clicked", { location: "report_sticky" });
  };

  const formatCurrency = (val: number) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(val);

  return (
    <div className="min-h-screen bg-slate-50/50 pb-24 lg:pb-12">
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-40 backdrop-blur-sm bg-white/80">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-white font-bold">Q</div>
            <span className="font-bold text-lg tracking-tight">Qual AI</span>
          </div>
          <Badge variant="outline" className="font-mono text-xs">
            REPORT #{params?.id?.slice(0, 8)}
          </Badge>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Main Content Column */}
          <div className="lg:col-span-8 space-y-8">
            
            {/* Executive Summary */}
            <section className="space-y-4">
              <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900">
                Lost Revenue Report for {data.business_name}
              </h1>
              <Card className="bg-white border-primary/10 shadow-sm">
                <CardContent className="pt-6">
                  <div className="flex flex-col md:flex-row gap-6 items-start">
                    <div className="flex-1 space-y-2">
                       <h2 className="text-lg font-semibold flex items-center gap-2">
                         <Activity className="w-5 h-5 text-primary" />
                         Executive Summary
                       </h2>
                       <p className="text-slate-600 leading-relaxed">
                         {data.ai_report_json.executive_summary}
                       </p>
                    </div>
                    <div className="bg-red-50 border border-red-100 rounded-xl p-4 min-w-[200px] text-center">
                       <p className="text-xs text-red-600 font-medium uppercase tracking-wider">Estimated Monthly Loss</p>
                       <p className="text-3xl font-bold text-red-700 mt-1">{formatCurrency(data.metrics.monthly_revenue_lost)}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </section>

            {/* Top Leaks */}
            <section className="space-y-4">
              <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-amber-500" />
                Top Revenue Leaks
              </h3>
              <div className="grid gap-4">
                {data.ai_report_json.leaks.map((leak, i) => (
                  <Card key={i} className="overflow-hidden border-l-4 border-l-amber-500">
                    <CardContent className="p-4 flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="font-semibold text-slate-900">{leak.name}</h4>
                          <Badge variant="secondary" className="text-xs">{leak.confidence} confidence</Badge>
                        </div>
                        <p className="text-sm text-slate-600 mt-1">{leak.why}</p>
                      </div>
                      <div className="text-right">
                        <span className="text-xs text-slate-500 block">Potential Loss</span>
                        <span className="font-mono font-bold text-red-600">{formatCurrency(leak.monthly_loss_estimate)}</span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>

            {/* Visual Charts */}
            <section className="grid md:grid-cols-2 gap-6">
               <Card>
                 <CardHeader>
                   <CardTitle className="text-sm font-medium text-slate-500">Loss Breakdown</CardTitle>
                 </CardHeader>
                 <CardContent>
                   <div className="h-[200px] w-full">
                     <ResponsiveContainer width="100%" height="100%">
                       <BarChart data={data.ai_report_json.leaks}>
                         <XAxis dataKey="name" fontSize={10} tickLine={false} axisLine={false} />
                         <YAxis fontSize={10} tickLine={false} axisLine={false} tickFormatter={(val) => `$${val}`} />
                         <Tooltip 
                            formatter={(value) => [`$${value}`, "Loss"]}
                            contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                         />
                         <Bar dataKey="monthly_loss_estimate" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                       </BarChart>
                     </ResponsiveContainer>
                   </div>
                 </CardContent>
               </Card>

               <Card className="bg-primary/5 border-primary/10">
                 <CardHeader>
                   <CardTitle className="text-sm font-medium text-primary">90-Day Upside</CardTitle>
                 </CardHeader>
                 <CardContent className="flex flex-col items-center justify-center h-[200px]">
                   <TrendingUp className="w-12 h-12 text-primary mb-4" />
                   <div className="text-4xl font-bold text-slate-900">
                     {formatCurrency(data.metrics.ninety_day_upside)}
                   </div>
                   <p className="text-sm text-slate-500 mt-2 text-center">
                     Recoverable revenue with Qual AI automation
                   </p>
                 </CardContent>
               </Card>
            </section>

            {/* Diagrams */}
            <section className="space-y-8">
               <div className="space-y-4">
                 <h3 className="text-xl font-bold text-slate-900">Current Process (The Leak)</h3>
                 <MermaidDiagram chart={data.ai_report_json.mermaid_current_funnel} />
               </div>
               
               <div className="relative">
                 <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent -z-10 rounded-3xl transform scale-105" />
                 <h3 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                   <div className="p-1 bg-primary rounded text-white">
                     <Check className="w-4 h-4" />
                   </div>
                   Qual AI Fix Funnel
                 </h3>
                 <MermaidDiagram chart={data.ai_report_json.mermaid_fix_funnel} />
               </div>
            </section>

            {/* Demo CTA */}
            <section className="bg-slate-900 text-white rounded-2xl p-8 md:p-12 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
              <div className="relative z-10 text-center space-y-6 max-w-2xl mx-auto">
                <Badge variant="secondary" className="bg-primary/20 text-primary-foreground hover:bg-primary/30 border-none">
                  Live Demo
                </Badge>
                <h2 className="text-3xl font-bold">Don't believe it? Call the Agent.</h2>
                <p className="text-slate-300 text-lg">
                  Experience the "Zero-Delay" response time yourself. Call our demo line and try to stump the AI receptionist.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
                  <Button size="lg" className="bg-white text-slate-900 hover:bg-slate-100 h-14 px-8 text-lg w-full sm:w-auto" onClick={() => window.location.href = "tel:+15550123456"}>
                    <Phone className="w-5 h-5 mr-2 text-primary" />
                    Call +1 (555) 012-3456
                  </Button>
                  <p className="text-xs text-slate-400 mt-2 sm:mt-0">
                    Available 24/7 (just like the real thing)
                  </p>
                </div>
              </div>
            </section>
          </div>

          {/* Sidebar CTA Column */}
          <div className="lg:col-span-4 relative">
             <StickyCTA 
               metrics={data.metrics} 
               topLeak={data.ai_report_json.leaks[0].name}
               tier={data.ai_report_json.tier}
               onBookClick={handleBookClick}
             />
          </div>

        </div>
      </main>
    </div>
  );
}
