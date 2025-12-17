/**
 * AnimatedFunnel Component (Redesigned)
 * 
 * Clean funnel visualization with neutral color palette.
 * No dramatic "leaking" animations or alarm colors.
 */

import { useMemo } from "react";
import { motion } from "framer-motion";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { type FunnelStage } from "@/lib/calculations-v2";

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

interface AnimatedFunnelProps {
  currentFunnel: FunnelStage[];
  projectedFunnel: FunnelStage[];
  showComparison?: boolean;
}

export function AnimatedFunnel({ currentFunnel, projectedFunnel, showComparison = true }: AnimatedFunnelProps) {
  
  // Memoize chart data with neutral color palette
  const chartData = useMemo(() => ({
    labels: currentFunnel.map(s => s.name),
    datasets: [
      {
        label: "Current",
        data: currentFunnel.map(s => s.count),
        backgroundColor: "rgba(100, 116, 139, 0.6)", // slate-500
        borderColor: "rgba(100, 116, 139, 1)",
        borderWidth: 1,
        borderRadius: 4,
      },
      {
        label: "Projected",
        data: projectedFunnel.map(s => s.count),
        backgroundColor: "rgba(59, 130, 246, 0.6)", // blue-500
        borderColor: "rgba(59, 130, 246, 1)",
        borderWidth: 1,
        borderRadius: 4,
      }
    ]
  }), [currentFunnel, projectedFunnel]);

  // Memoize chart options - clean, professional
  const chartOptions = useMemo(() => ({
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top" as const,
        labels: {
          usePointStyle: true,
          padding: 16,
          font: { size: 12 }
        }
      },
      tooltip: {
        backgroundColor: "rgba(30, 41, 59, 0.95)",
        padding: 12,
        cornerRadius: 6,
        titleFont: { size: 13 },
        bodyFont: { size: 12 }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: { color: "rgba(226, 232, 240, 0.8)" },
        ticks: { font: { size: 11 } }
      },
      x: {
        grid: { display: false },
        ticks: { font: { size: 11 } }
      }
    }
  }), []);

  // Calculate summary stats
  const totalDropoff = currentFunnel.reduce((sum, s) => sum + s.dropoff, 0);
  const finalConversion = currentFunnel[currentFunnel.length - 1]?.percentage || 0;
  const projectedConversion = projectedFunnel[projectedFunnel.length - 1]?.percentage || 0;

  return (
    <section className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-slate-900 mb-2">Funnel Analysis</h2>
        <p className="text-slate-600">Lead progression through your sales process</p>
      </div>

      {/* Chart */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="bg-white rounded-xl border border-slate-200 p-6"
      >
        <div className="h-[280px]">
          <Bar data={chartData} options={chartOptions} />
        </div>
      </motion.div>

      {/* Summary metrics */}
      <div className="grid grid-cols-3 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-slate-50 rounded-xl p-4 text-center border border-slate-200"
        >
          <p className="text-xs font-medium text-slate-500 uppercase tracking-wide mb-1">
            Drop-off
          </p>
          <p className="text-xl font-semibold text-slate-700">
            {totalDropoff} leads
          </p>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="bg-slate-50 rounded-xl p-4 text-center border border-slate-200"
        >
          <p className="text-xs font-medium text-slate-500 uppercase tracking-wide mb-1">
            Current Conversion
          </p>
          <p className="text-xl font-semibold text-slate-700">
            {finalConversion}%
          </p>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-blue-50 rounded-xl p-4 text-center border border-blue-200"
        >
          <p className="text-xs font-medium text-blue-600 uppercase tracking-wide mb-1">
            Projected
          </p>
          <p className="text-xl font-semibold text-blue-600">
            {projectedConversion}%
          </p>
        </motion.div>
      </div>

      {/* Note */}
      <p className="text-sm text-slate-500">
        Projections based on typical improvements seen with AI-assisted lead engagement.
      </p>
    </section>
  );
}
