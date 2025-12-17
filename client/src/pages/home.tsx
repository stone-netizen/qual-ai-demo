/**
 * LeakDetector.ai v2.0 - Home Page
 * 
 * High-impact landing page with urgency messaging
 * and compelling value proposition.
 */

import { Link } from "wouter";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  ArrowRight, 
  CheckCircle2, 
  TrendingDown, 
  Clock, 
  PhoneMissed, 
  DollarSign,
  Zap,
  Users,
  Shield,
  Star,
  Play
} from "lucide-react";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="border-b border-slate-100 sticky top-0 z-50 bg-white/90 backdrop-blur-sm">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-white font-bold">
              L
            </div>
            <span className="font-bold text-lg tracking-tight text-slate-900">LeakDetector.ai</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="hidden sm:inline text-sm text-slate-500">
              500+ businesses use our calculator
            </span>
            <Link href="/apply">
              <Button variant="default" size="sm">
                Start Free Audit
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-16 pb-24 px-4 overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-50/80 to-white" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-red-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        
        <div className="container mx-auto max-w-6xl relative z-10">
          <div className="text-center space-y-8">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Badge variant="outline" className="px-4 py-1.5 text-sm border-primary/30 bg-primary/5">
                <span className="relative flex h-2 w-2 mr-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                </span>
                You're Bleeding Money Right Now
              </Badge>
            </motion.div>
            
            {/* Headline */}
            <motion.h1 
              className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tight text-slate-900"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.5 }}
            >
              Calculate Your{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-red-600 to-red-700">
                Lost Revenue
              </span>
              <br />
              <span className="text-slate-700">from Missed Leads</span>
            </motion.h1>
            
            {/* Subheadline */}
            <motion.p 
              className="text-xl md:text-2xl text-slate-600 max-w-3xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              Most businesses lose <span className="text-red-600 font-semibold">30-40% of leads</span> to 
              slow follow-up and missed calls. See exactly how much money you're leaving on the table.
            </motion.p>

            {/* CTA */}
            <motion.div 
              className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              <Link href="/apply">
                <Button 
                  size="lg" 
                  className="h-14 px-8 text-lg shadow-xl shadow-primary/25 hover:shadow-primary/40 transition-all hover:-translate-y-1 group"
                >
                  <Zap className="w-5 h-5 mr-2" />
                  Calculate My Lost Revenue
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <div className="flex items-center gap-4 text-sm text-slate-500">
                <span className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  Takes 3 minutes
                </span>
                <span className="flex items-center gap-1">
                  <CheckCircle2 className="w-4 h-4 text-green-500" />
                  100% Free
                </span>
              </div>
            </motion.div>

            {/* Social Proof */}
            <motion.div
              className="flex flex-wrap items-center justify-center gap-6 pt-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
                ))}
                <span className="ml-2 text-sm text-slate-600">500+ businesses</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-green-600" />
                <span className="text-sm text-slate-600">HIPAA Compliant</span>
              </div>
              <div className="flex items-center gap-2">
                <DollarSign className="w-5 h-5 text-primary" />
                <span className="text-sm text-slate-600">$12M+ recovered</span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="py-20 bg-slate-50/50">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Where Your Revenue Is Leaking
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Every day, these problems silently drain money from your business
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Problem Card 1 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <Card className="h-full border-none shadow-lg bg-gradient-to-br from-red-50 to-white hover:shadow-xl transition-shadow">
                <CardContent className="pt-8 space-y-4">
                  <div className="w-14 h-14 bg-red-100 rounded-2xl flex items-center justify-center">
                    <PhoneMissed className="w-7 h-7 text-red-600" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900">Missed Calls</h3>
                  <p className="text-slate-600">
                    <span className="font-bold text-red-600">43%</span> of new patient calls go to voicemail. 
                    80% of those callers never leave a message—they just call the next clinic.
                  </p>
                  <div className="pt-2">
                    <span className="text-sm font-medium text-red-600">
                      💸 Average loss: $2,500/month
                    </span>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Problem Card 2 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1, duration: 0.5 }}
            >
              <Card className="h-full border-none shadow-lg bg-gradient-to-br from-amber-50 to-white hover:shadow-xl transition-shadow">
                <CardContent className="pt-8 space-y-4">
                  <div className="w-14 h-14 bg-amber-100 rounded-2xl flex items-center justify-center">
                    <Clock className="w-7 h-7 text-amber-600" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900">Slow Speed-to-Lead</h3>
                  <p className="text-slate-600">
                    Responding after <span className="font-bold text-amber-600">5 minutes</span> drops 
                    conversion by 8x. Most businesses take 2+ hours to return a web inquiry.
                  </p>
                  <div className="pt-2">
                    <span className="text-sm font-medium text-amber-600">
                      ⏱️ Every minute costs you money
                    </span>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Problem Card 3 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              <Card className="h-full border-none shadow-lg bg-gradient-to-br from-slate-50 to-white hover:shadow-xl transition-shadow">
                <CardContent className="pt-8 space-y-4">
                  <div className="w-14 h-14 bg-slate-200 rounded-2xl flex items-center justify-center">
                    <TrendingDown className="w-7 h-7 text-slate-600" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900">Follow-up Fatigue</h3>
                  <p className="text-slate-600">
                    It takes <span className="font-bold">6-8 touches</span> to book a lead. 
                    Most front desks give up after 1 or 2 attempts.
                  </p>
                  <div className="pt-2">
                    <span className="text-sm font-medium text-slate-600">
                      📉 70% of leads fall through the cracks
                    </span>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* What You Get Section */}
      <section className="py-20 bg-slate-900 text-white overflow-hidden">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center space-y-4 mb-12">
            <Badge className="bg-primary/20 text-primary-foreground border-primary/30">
              Free Revenue Audit
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold">
              What You'll Get in 3 Minutes
            </h2>
            <p className="text-slate-400 max-w-2xl mx-auto">
              We analyze your lead volume and response times against 1,000+ industry benchmarks 
              to generate your custom Revenue Leak Report.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: TrendingDown,
                title: "Revenue Leakage Report",
                description: "See exactly how much revenue you're losing monthly due to process gaps."
              },
              {
                icon: Zap,
                title: "Fix Funnel Blueprint",
                description: "A complete diagram of the automation workflows needed to plug your leaks."
              },
              {
                icon: DollarSign,
                title: "90-Day ROI Projection",
                description: "Conservative estimate of revenue recovery with AI automation installed."
              }
            ].map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="flex gap-4"
              >
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-primary/20 rounded-xl flex items-center justify-center">
                    <item.icon className="w-6 h-6 text-primary" />
                  </div>
                </div>
                <div>
                  <h4 className="font-bold text-lg mb-2">{item.title}</h4>
                  <p className="text-slate-400 text-sm">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
          
          <div className="text-center pt-12">
            <Link href="/apply">
              <Button 
                size="lg" 
                className="bg-white text-slate-900 hover:bg-slate-100 hover:text-primary transition-colors h-14 px-8"
              >
                Get Your Free Report
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              How It Works
            </h2>
          </div>

          <div className="space-y-8">
            {[
              { num: "1", title: "Answer 4 Quick Questions", desc: "About your business, lead volume, and current follow-up process." },
              { num: "2", title: "Our AI Crunches the Numbers", desc: "Comparing your metrics against industry benchmarks." },
              { num: "3", title: "Get Your Custom Report", desc: "Complete with dollar figures and a fix funnel blueprint." }
            ].map((step, i) => (
              <motion.div
                key={step.num}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="flex items-start gap-6"
              >
                <div className="flex-shrink-0 w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white font-bold text-xl">
                  {step.num}
                </div>
                <div className="pt-2">
                  <h3 className="text-xl font-bold text-slate-900 mb-1">{step.title}</h3>
                  <p className="text-slate-600">{step.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-gradient-to-b from-white to-slate-50">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="max-w-2xl mx-auto space-y-6"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900">
              Stop Guessing. Start Knowing.
            </h2>
            <p className="text-lg text-slate-600">
              In 3 minutes, you'll know exactly how much revenue you're losing 
              and what to do about it.
            </p>
            <Link href="/apply">
              <Button 
                size="lg" 
                className="h-14 px-10 text-lg shadow-xl shadow-primary/25"
              >
                Calculate My Lost Revenue
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
            <p className="text-sm text-slate-500">
              No credit card required • Instant results • 100% free
            </p>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 bg-white border-t border-slate-100">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-primary rounded flex items-center justify-center text-white font-bold text-xs">
                L
              </div>
              <span className="font-semibold text-slate-900">LeakDetector.ai</span>
            </div>
            <div className="flex items-center gap-6 text-sm text-slate-500">
              <span>© 2025 LeakDetector.ai</span>
              <a href="#" className="hover:text-primary">Privacy</a>
              <a href="#" className="hover:text-primary">Terms</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
