import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { CheckCircle2, TrendingUp, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CalendlyModal } from "@/components/CalendlyModal";

const Landing = () => {
  const navigate = useNavigate();
  const [isCalendlyOpen, setIsCalendlyOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-950">
      {/* Navigation */}
      <header className="sticky top-0 z-50 backdrop-blur-xl bg-slate-950/80 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-8">
              <div className="text-xl font-bold bg-gradient-to-r from-violet-400 to-indigo-400 text-transparent bg-clip-text">
                LeakDetector
              </div>
              <nav className="hidden md:flex gap-6">
                <a href="#how-it-works" className="text-slate-300 hover:text-white transition-colors">How It Works</a>
                <a href="#case-studies" className="text-slate-300 hover:text-white transition-colors">Case Studies</a>
                <a href="#about" className="text-slate-300 hover:text-white transition-colors">About</a>
              </nav>
            </div>
            <div className="flex items-center gap-4">
              <Button 
                onClick={() => navigate("/calculator")}
                className="px-4 py-2 bg-gradient-to-r from-violet-600 to-indigo-600 text-white font-semibold rounded-lg hover:shadow-lg transition-all"
              >
                Get Free Audit
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_110%)]" />
        
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-violet-500/30 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-indigo-500/30 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <motion.div 
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-300 text-sm font-medium mb-8">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-violet-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-violet-500"></span>
              </span>
              Free 3-Minute Revenue Diagnostic
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6">
              <span className="text-white">How Much Revenue</span>{" "}
              <span className="bg-gradient-to-r from-violet-400 via-purple-400 to-indigo-400 text-transparent bg-clip-text">
                Are You Leaving
              </span>{" "}
              <span className="text-white">On The Table?</span>
            </h1>
            
            <p className="text-xl text-slate-400 max-w-2xl mx-auto mb-12">
              Most service businesses lose $20K-$100K monthly to fixable operational leaks.
              Find yours in 3 minutes.
            </p>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.4 }}
            >
              <Button 
                size="lg"
                onClick={() => navigate("/calculator")}
                className="group relative inline-flex items-center gap-2 px-8 py-6 h-auto bg-gradient-to-r from-violet-600 to-indigo-600 text-white font-semibold text-lg rounded-xl hover:shadow-lg hover:shadow-violet-500/50 transition-all duration-200 hover:scale-105"
              >
                Get My Free Analysis
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </motion.div>
            
            <motion.div 
              className="flex flex-wrap items-center justify-center gap-6 md:gap-8 mt-12 text-sm text-slate-500"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                <span>100% Free - No Credit Card</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                <span>Takes 3 Minutes</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                <span>Results Instantly</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Social Proof Section */}
      <section id="case-studies" className="py-20 bg-slate-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-white mb-4">
              We've helped businesses recover over $12M in lost revenue
            </h2>
            <p className="text-slate-400">
              Here's what happens after you find your leaks
            </p>
          </motion.div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <motion.div 
              className="p-6 rounded-xl bg-slate-900/50 border border-slate-800"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-violet-500 to-indigo-500 flex items-center justify-center text-white font-bold">
                  SM
                </div>
                <div>
                  <div className="font-semibold text-white">Sarah M.</div>
                  <div className="text-sm text-slate-400">Med Spa Owner</div>
                </div>
              </div>
              <p className="text-slate-300 mb-4">
                "Found $43K in leaks we didn't know existed. Fixed the biggest one in 2 weeks and saw immediate results."
              </p>
              <div className="flex items-center gap-2 text-sm text-emerald-400">
                <TrendingUp className="w-5 h-5" />
                Recovered $22K in first month
              </div>
            </motion.div>
            
            <motion.div 
              className="p-6 rounded-xl bg-slate-900/50 border border-slate-800"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center text-white font-bold">
                  MT
                </div>
                <div>
                  <div className="font-semibold text-white">Mike T.</div>
                  <div className="text-sm text-slate-400">Plumbing Company Owner</div>
                </div>
              </div>
              <p className="text-slate-300 mb-4">
                "The audit alone was worth thousands. We had no idea we were missing 50% of after-hours calls."
              </p>
              <div className="flex items-center gap-2 text-sm text-emerald-400">
                <TrendingUp className="w-5 h-5" />
                Added $18K/month in 30 days
              </div>
            </motion.div>
            
            <motion.div 
              className="p-6 rounded-xl bg-slate-900/50 border border-slate-800"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center text-white font-bold">
                  JK
                </div>
                <div>
                  <div className="font-semibold text-white">Jennifer K.</div>
                  <div className="text-sm text-slate-400">Dental Practice Owner</div>
                </div>
              </div>
              <p className="text-slate-300 mb-4">
                "I thought we were doing fine. The diagnostic showed me we had $67K in dormant leads. Game changer."
              </p>
              <div className="flex items-center gap-2 text-sm text-emerald-400">
                <TrendingUp className="w-5 h-5" />
                Reactivated $35K first quarter
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-white mb-4">
              How It Works
            </h2>
            <p className="text-slate-400 max-w-2xl mx-auto">
              Get your personalized revenue leak analysis in just 3 simple steps
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            <motion.div 
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <div className="w-16 h-16 rounded-2xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-violet-400">1</span>
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">Answer a Few Questions</h3>
              <p className="text-slate-400">
                Quick 3-minute diagnostic about your business operations, lead flow, and sales process.
              </p>
            </motion.div>

            <motion.div 
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <div className="w-16 h-16 rounded-2xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-violet-400">2</span>
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">See Your Leaks</h3>
              <p className="text-slate-400">
                Get an instant breakdown of exactly where you're losing money and how much each leak costs.
              </p>
            </motion.div>

            <motion.div 
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              <div className="w-16 h-16 rounded-2xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-violet-400">3</span>
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">Book Your Strategy Call</h3>
              <p className="text-slate-400">
                Schedule a free 15-minute call to get a personalized plan to fix your biggest leaks.
              </p>
            </motion.div>
          </div>

          <motion.div 
            className="text-center mt-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            <Button 
              size="lg"
              onClick={() => navigate("/calculator")}
              className="px-8 py-6 h-auto bg-gradient-to-r from-violet-600 to-indigo-600 text-white font-semibold text-lg rounded-xl hover:shadow-lg hover:shadow-violet-500/50 transition-all"
            >
              Start My Free Analysis
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-slate-900/50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-white mb-6">
              Built by Growth Experts Who Get It
            </h2>
            <p className="text-lg text-slate-400 mb-8">
              We've spent years analyzing what makes service businesses leak revenue. 
              This diagnostic is the result of working with 500+ businesses across 15 industries. 
              It's completely free because the best way for us to help is to show you exactly what's broken first.
            </p>
            <Button 
              size="lg"
              onClick={() => setIsCalendlyOpen(true)}
              className="px-8 py-6 h-auto bg-gradient-to-r from-violet-600 to-indigo-600 text-white font-semibold text-lg rounded-xl hover:shadow-lg hover:shadow-violet-500/50 transition-all"
            >
              Let's Talk About Your Business
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-950 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <div className="text-xl font-bold bg-gradient-to-r from-violet-400 to-indigo-400 text-transparent bg-clip-text mb-4">
                LeakDetector
              </div>
              <p className="text-slate-400 text-sm">
                Free revenue diagnostic for service businesses. Find your leaks in 3 minutes.
              </p>
            </div>
            
            <div>
              <div className="font-semibold text-white mb-4">Company</div>
              <div className="space-y-2">
                <a href="#about" className="block text-slate-400 hover:text-white text-sm transition-colors">About Us</a>
                <a href="#case-studies" className="block text-slate-400 hover:text-white text-sm transition-colors">Case Studies</a>
                <a href="mailto:contact@leakdetector.com" className="block text-slate-400 hover:text-white text-sm transition-colors">Contact</a>
              </div>
            </div>
            
            <div>
              <div className="font-semibold text-white mb-4">Legal</div>
              <div className="space-y-2">
                <a href="/privacy" className="block text-slate-400 hover:text-white text-sm transition-colors">Privacy Policy</a>
                <a href="/terms" className="block text-slate-400 hover:text-white text-sm transition-colors">Terms of Service</a>
              </div>
            </div>
          </div>
          
          <div className="mt-12 pt-8 border-t border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-sm text-slate-500">
              © 2024 Maverick Growth Systems. All rights reserved.
            </div>
            <div className="flex items-center gap-2 text-sm text-slate-500">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              Trusted by 500+ service businesses
            </div>
          </div>
        </div>
      </footer>

      {/* Calendly Modal */}
      <CalendlyModal 
        isOpen={isCalendlyOpen} 
        onClose={() => setIsCalendlyOpen(false)} 
      />
    </div>
  );
};

export default Landing;
