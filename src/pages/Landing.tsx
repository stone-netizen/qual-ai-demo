import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Zap, Shield, Clock, TrendingUp, BarChart3, Users } from "lucide-react";
import { Button } from "@/components/ui/button";

const Landing = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-900 to-slate-800">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-slate-900/80 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-emerald-500 flex items-center justify-center">
              <Zap className="w-5 h-5 text-slate-900" />
            </div>
            <span className="text-xl font-bold text-white">LeakDetector</span>
          </div>
          <Button
            variant="ghost"
            className="text-slate-300 hover:text-white hover:bg-slate-800"
            onClick={() => navigate("/auth")}
          >
            Sign In
          </Button>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="pt-32 pb-20 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 mb-8">
              <TrendingUp className="w-4 h-4 text-emerald-400" />
              <span className="text-sm text-emerald-400 font-medium">
                Revenue Intelligence Platform
              </span>
            </div>

            {/* Headline */}
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight">
              Calculate Your{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-emerald-600">
                Ghost Revenue
              </span>
            </h1>

            {/* Subheadline */}
            <p className="text-xl md:text-2xl text-slate-400 mb-12 max-w-3xl mx-auto leading-relaxed">
              Find out how much money your business loses every month to fixable
              operational leaks
            </p>

            {/* CTA Button */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.4 }}
            >
              <Button
                size="lg"
                className="bg-emerald-500 hover:bg-emerald-600 text-slate-900 font-semibold text-lg px-8 py-6 h-auto rounded-xl shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40 transition-all duration-300"
                onClick={() => navigate("/calculator")}
              >
                Start Free Analysis
                <span className="ml-2">→</span>
              </Button>
            </motion.div>

            {/* Trust Badges */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="flex flex-wrap items-center justify-center gap-6 md:gap-8 mt-12"
            >
              <div className="flex items-center gap-2 text-slate-400">
                <Users className="w-5 h-5 text-amber-400" />
                <span className="text-sm font-medium">Used by 500+ businesses</span>
              </div>
              <div className="hidden md:block w-px h-4 bg-slate-700" />
              <div className="flex items-center gap-2 text-slate-400">
                <Shield className="w-5 h-5 text-amber-400" />
                <span className="text-sm font-medium">No credit card required</span>
              </div>
              <div className="hidden md:block w-px h-4 bg-slate-700" />
              <div className="flex items-center gap-2 text-slate-400">
                <Clock className="w-5 h-5 text-amber-400" />
                <span className="text-sm font-medium">3-minute audit</span>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Feature Cards */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="max-w-6xl mx-auto mt-24 grid md:grid-cols-3 gap-6"
        >
          <div className="p-6 rounded-2xl bg-slate-800/50 border border-slate-700/50 backdrop-blur-sm">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center mb-4">
              <BarChart3 className="w-6 h-6 text-emerald-400" />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">
              Identify Revenue Leaks
            </h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              Discover hidden operational inefficiencies costing your business
              thousands every month.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-800/50 border border-slate-700/50 backdrop-blur-sm">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center mb-4">
              <TrendingUp className="w-6 h-6 text-emerald-400" />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">
              Quantify Lost Revenue
            </h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              Get precise dollar amounts for each leak category so you can
              prioritize fixes effectively.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-800/50 border border-slate-700/50 backdrop-blur-sm">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center mb-4">
              <Zap className="w-6 h-6 text-emerald-400" />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">
              Actionable Insights
            </h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              Receive a detailed report with step-by-step recommendations to
              recover lost revenue.
            </p>
          </div>
        </motion.div>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800 py-8 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded bg-emerald-500 flex items-center justify-center">
              <Zap className="w-4 h-4 text-slate-900" />
            </div>
            <span className="text-sm text-slate-400">
              © 2024 LeakDetector. All rights reserved.
            </span>
          </div>
          <div className="flex items-center gap-6">
            <a href="#" className="text-sm text-slate-400 hover:text-white transition-colors">
              Privacy
            </a>
            <a href="#" className="text-sm text-slate-400 hover:text-white transition-colors">
              Terms
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
