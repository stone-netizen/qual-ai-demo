import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle2, TrendingDown, Clock, PhoneMissed } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="border-b border-slate-100">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-white font-bold">Q</div>
            <span className="font-bold text-lg tracking-tight text-slate-900">Qual AI</span>
          </div>
          <Link href="/apply">
            <Button variant="ghost" className="font-medium text-slate-600">Login</Button>
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-20 pb-32 px-4 bg-slate-50/50">
        <div className="container mx-auto max-w-5xl text-center space-y-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium animate-in fade-in slide-in-from-bottom-4 duration-700">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
            New: 2025 Benchmarks Added
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-slate-900 animate-in fade-in slide-in-from-bottom-6 duration-700 delay-100">
            Calculate your <span className="text-primary">Lost Revenue</span><br />
            from missed calls.
          </h1>
          
          <p className="text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed animate-in fade-in slide-in-from-bottom-8 duration-700 delay-200">
            Most clinics lose 30-40% of leads to slow follow-up and missed calls. 
            See exactly where you're leaking money in 3 minutes.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-300">
            <Link href="/apply">
              <Button size="lg" className="h-14 px-8 text-lg shadow-xl shadow-primary/20 hover:shadow-primary/30 transition-all hover:-translate-y-1">
                Start Free Audit <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
            <div className="text-sm text-slate-500">
              No credit card required • Instant results
            </div>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-none shadow-lg bg-red-50/50">
              <CardContent className="pt-6 space-y-4">
                <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center">
                  <PhoneMissed className="w-6 h-6 text-red-600" />
                </div>
                <h3 className="text-xl font-bold text-slate-900">Missed Calls</h3>
                <p className="text-slate-600">
                  43% of new patient calls go to voicemail. 80% of those callers never leave a message—they just call the next clinic.
                </p>
              </CardContent>
            </Card>

            <Card className="border-none shadow-lg bg-amber-50/50">
              <CardContent className="pt-6 space-y-4">
                <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center">
                  <Clock className="w-6 h-6 text-amber-600" />
                </div>
                <h3 className="text-xl font-bold text-slate-900">Slow Speed-to-Lead</h3>
                <p className="text-slate-600">
                  Responding after 5 minutes drops conversion by 8x. Most clinics take 2+ hours to return a web inquiry.
                </p>
              </CardContent>
            </Card>

            <Card className="border-none shadow-lg bg-slate-50/50">
              <CardContent className="pt-6 space-y-4">
                <div className="w-12 h-12 bg-slate-200 rounded-xl flex items-center justify-center">
                  <TrendingDown className="w-6 h-6 text-slate-600" />
                </div>
                <h3 className="text-xl font-bold text-slate-900">Follow-up Fatigue</h3>
                <p className="text-slate-600">
                  It takes 6-8 touches to book a lead. Most front desks give up after 1 or 2 attempts.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Preview Section */}
      <section className="py-24 bg-slate-900 text-white overflow-hidden">
        <div className="container mx-auto px-4 text-center space-y-12">
          <div className="space-y-4">
            <h2 className="text-3xl md:text-4xl font-bold">What you get</h2>
            <p className="text-slate-400 max-w-2xl mx-auto">
              We analyze your lead volume and response times against 1,000+ clinic benchmarks to generate your custom Fix Funnel.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto text-left">
            <div className="flex gap-4">
              <CheckCircle2 className="w-6 h-6 text-primary flex-shrink-0" />
              <div>
                <h4 className="font-bold text-lg">Revenue Leakage Report</h4>
                <p className="text-slate-400 text-sm mt-1">See exactly how much revenue you're losing monthly due to process gaps.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <CheckCircle2 className="w-6 h-6 text-primary flex-shrink-0" />
              <div>
                <h4 className="font-bold text-lg">Visual Fix Funnel</h4>
                <p className="text-slate-400 text-sm mt-1">A complete diagram of the automation workflows needed to plug your leaks.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <CheckCircle2 className="w-6 h-6 text-primary flex-shrink-0" />
              <div>
                <h4 className="font-bold text-lg">90-Day Upside Projection</h4>
                <p className="text-slate-400 text-sm mt-1">Conservative estimate of revenue recovery with best-practices installed.</p>
              </div>
            </div>
          </div>
          
          <div className="pt-8">
            <Link href="/apply">
               <Button size="lg" className="bg-white text-slate-900 hover:bg-slate-100 hover:text-primary transition-colors">
                 Get Your Report
               </Button>
            </Link>
          </div>
        </div>
      </section>

      <footer className="py-8 bg-white border-t border-slate-100 text-center text-sm text-slate-500">
        © 2025 Qual AI. All rights reserved.
      </footer>
    </div>
  );
}
