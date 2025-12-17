/**
 * ShockHero Component
 * 
 * Displays a massive, attention-grabbing loss number with
 * bleeding money animation effects to create psychological impact.
 */

import { motion } from "framer-motion";
import { formatCurrency } from "@/lib/calculations-v2";
import { DollarSign, TrendingDown, AlertTriangle } from "lucide-react";

interface ShockHeroProps {
  businessName: string;
  quarterlyLoss: number;
  annualLoss: number;
  topLeak: string;
}

export function ShockHero({ businessName, quarterlyLoss, annualLoss, topLeak }: ShockHeroProps) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-red-950 to-slate-900 rounded-3xl p-8 md:p-12">
      {/* Falling Dollar Signs Animation */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-red-500/20"
            initial={{ 
              x: `${Math.random() * 100}%`, 
              y: '-10%',
              rotate: Math.random() * 30 - 15
            }}
            animate={{ 
              y: '110%',
              rotate: Math.random() * 60 - 30
            }}
            transition={{
              duration: 3 + Math.random() * 4,
              repeat: Infinity,
              delay: Math.random() * 5,
              ease: "linear"
            }}
          >
            <DollarSign className="w-8 h-8 md:w-12 md:h-12" />
          </motion.div>
        ))}
      </div>

      {/* Dripping Effect Top Border */}
      <div className="absolute top-0 left-0 right-0 h-2">
        <div className="absolute inset-0 bg-gradient-to-b from-red-600 to-transparent" />
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute top-0 w-1 bg-red-600 rounded-b-full"
            style={{ left: `${12 + i * 12}%` }}
            animate={{
              height: [8, 24, 8],
              opacity: [0.8, 1, 0.8]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: i * 0.3,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>

      <div className="relative z-10">
        {/* Header Badge */}
        <motion.div 
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-500/20 border border-red-500/30 mb-6"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <AlertTriangle className="w-4 h-4 text-red-400" />
          <span className="text-red-300 text-sm font-medium">Revenue Leak Detected</span>
        </motion.div>

        {/* Business Name */}
        <motion.h1 
          className="text-2xl md:text-3xl font-bold text-white/90 mb-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          {businessName}
        </motion.h1>

        {/* Main Loss Statement */}
        <motion.div 
          className="mb-8"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, type: "spring", stiffness: 100 }}
        >
          <p className="text-red-300/80 text-lg mb-2">You're losing</p>
          
          {/* THE BIG NUMBER */}
          <motion.div 
            className="relative inline-block"
            animate={{ 
              textShadow: [
                "0 0 20px rgba(239, 68, 68, 0.5)",
                "0 0 40px rgba(239, 68, 68, 0.8)",
                "0 0 20px rgba(239, 68, 68, 0.5)"
              ]
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <span className="text-6xl md:text-8xl lg:text-9xl font-black text-transparent bg-clip-text bg-gradient-to-b from-red-400 via-red-500 to-red-700 tracking-tight">
              {formatCurrency(quarterlyLoss)}
            </span>
          </motion.div>
          
          <p className="text-red-300/80 text-xl mt-2">every quarter</p>
        </motion.div>

        {/* Secondary Stats */}
        <motion.div 
          className="grid grid-cols-2 gap-4 max-w-md"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10">
            <p className="text-white/50 text-xs uppercase tracking-wider mb-1">Annual Loss</p>
            <p className="text-2xl md:text-3xl font-bold text-red-400">
              {formatCurrency(annualLoss)}
            </p>
          </div>
          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10">
            <p className="text-white/50 text-xs uppercase tracking-wider mb-1">Biggest Leak</p>
            <p className="text-lg md:text-xl font-semibold text-amber-400 flex items-center gap-2">
              <TrendingDown className="w-5 h-5" />
              {topLeak}
            </p>
          </div>
        </motion.div>

        {/* Urgency Message */}
        <motion.p 
          className="mt-8 text-white/60 text-sm max-w-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          This money is going straight to your competitors who respond faster. 
          Every day you wait costs you <span className="text-red-400 font-semibold">{formatCurrency(annualLoss / 365)}</span>.
        </motion.p>
      </div>

      {/* Pulsing Glow Effect */}
      <motion.div
        className="absolute -bottom-32 -right-32 w-64 h-64 bg-red-600/20 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3]
        }}
        transition={{ duration: 4, repeat: Infinity }}
      />
    </section>
  );
}

