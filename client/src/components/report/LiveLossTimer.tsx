/**
 * LiveLossTimer Component
 * 
 * Real-time counter showing money being lost while the user
 * views the page. Creates urgency through live dollar accumulation.
 */

import { useState, useEffect, useRef, memo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Clock, AlertCircle } from "lucide-react";
import { formatCurrency, getSecondsOnPage, getMoneyLostOnPage } from "@/lib/calculations-v2";

interface LiveLossTimerProps {
  lossPerSecond: number;
  monthlyLoss: number;
}

export const LiveLossTimer = memo(function LiveLossTimer({ lossPerSecond, monthlyLoss }: LiveLossTimerProps) {
  const startTimeRef = useRef<number>(Date.now());
  const [state, setState] = useState({ seconds: 0, moneyLost: 0 });
  const lastMilestoneRef = useRef<number>(0);
  // #region agent log
  const renderCountRef = useRef(0);
  renderCountRef.current++;
  fetch('http://127.0.0.1:7242/ingest/3a47df6e-6cba-41ee-8b46-8b80abd612c9',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'LiveLossTimer.tsx:render',message:'LiveLossTimer render',data:{renderCount:renderCountRef.current,lossPerSecond,stateSeconds:state.seconds},timestamp:Date.now(),sessionId:'debug-session',hypothesisId:'B'})}).catch(()=>{});
  // #endregion

  useEffect(() => {
    const interval = setInterval(() => {
      const elapsed = getSecondsOnPage(startTimeRef.current);
      const money = getMoneyLostOnPage(lossPerSecond, startTimeRef.current);

      // Single state update to prevent cascading re-renders
      setState({ seconds: elapsed, moneyLost: money });
    }, 100); // Update every 100ms for smooth counting

    return () => clearInterval(interval);
  }, [lossPerSecond]);

  // Format time display
  const formatTime = (totalSeconds: number): string => {
    const minutes = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    if (minutes > 0) {
      return `${minutes}m ${secs}s`;
    }
    return `${secs} seconds`;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative overflow-hidden"
    >
      <div className="bg-gradient-to-r from-red-950 via-red-900 to-red-950 rounded-2xl p-6 border border-red-800/50">
        {/* Animated Background Pulse */}
        <motion.div
          className="absolute inset-0 bg-red-600/10"
          animate={{
            opacity: [0.1, 0.3, 0.1]
          }}
          transition={{ duration: 2, repeat: Infinity }}
        />

        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Timer Icon and Label */}
          <div className="flex items-center gap-4">
            <motion.div
              className="p-3 bg-red-500/20 rounded-full"
              animate={{
                scale: [1, 1.1, 1],
                boxShadow: [
                  "0 0 0 0 rgba(239, 68, 68, 0.4)",
                  "0 0 0 10px rgba(239, 68, 68, 0)",
                  "0 0 0 0 rgba(239, 68, 68, 0)"
                ]
              }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <Clock className="w-6 h-6 text-red-400" />
            </motion.div>
            <div>
              <p className="text-white/60 text-sm">In the last</p>
              <p className="text-2xl font-bold text-white">{formatTime(state.seconds)}</p>
            </div>
          </div>

          {/* Divider */}
          <div className="hidden md:block w-px h-16 bg-red-700/50" />

          {/* Money Lost Counter */}
          <div className="text-center md:text-left">
            <p className="text-white/60 text-sm mb-1">You've lost approximately</p>
            <div className="relative">
              <span className="text-4xl md:text-5xl font-black text-red-400 tabular-nums">
                ${state.moneyLost.toFixed(2)}
              </span>
            </div>
          </div>

          {/* Rate Display */}
          <div className="hidden lg:block">
            <div className="bg-black/30 rounded-xl px-4 py-3">
              <p className="text-white/40 text-xs uppercase tracking-wider mb-1">Loss Rate</p>
              <p className="text-lg font-semibold text-red-300">
                {formatCurrency(lossPerSecond * 60, 2)}/min
              </p>
              <p className="text-white/40 text-xs">
                {formatCurrency(monthlyLoss)}/month
              </p>
            </div>
          </div>
        </div>

        {/* Warning Message */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 5 }}
          className="mt-4 pt-4 border-t border-red-800/30"
        >
          <div className="flex items-start gap-2 text-red-300/70 text-sm">
            <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
            <p>
              This counter represents real revenue being captured by competitors 
              with faster response systems. The clock never stops.
            </p>
          </div>
        </motion.div>
      </div>

      {/* Milestone Notifications */}
      <AnimatePresence>
        {(() => {
          const currentMilestone = Math.floor(state.seconds / 30) * 30;
          const shouldShow =
            state.seconds > 0 &&
            currentMilestone > 0 &&
            currentMilestone <= 120 &&
            currentMilestone !== lastMilestoneRef.current &&
            state.seconds % 30 >= 0 &&
            state.seconds % 30 < 2; // Show for 2 seconds window

          if (shouldShow) {
            lastMilestoneRef.current = currentMilestone;
            return (
              <motion.div
                key={currentMilestone}
                initial={{ opacity: 0, x: 50, y: -20 }}
                animate={{ opacity: 1, x: 0, y: 0 }}
                exit={{ opacity: 0, x: 50 }}
                transition={{ duration: 0.3 }}
                className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg"
              >
                +{formatCurrency(lossPerSecond * 30)} lost!
              </motion.div>
            );
          }
          return null;
        })()}
      </AnimatePresence>
    </motion.div>
  );
});

