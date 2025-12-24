import { motion } from "framer-motion";
import { TrendingDown } from "lucide-react";
import { formatCurrency } from "@/utils/calculations";

interface DoNothingCostProps {
  monthlyLoss: number;
}

export const DoNothingCost = ({ monthlyLoss }: DoNothingCostProps) => {
  const annualLoss = monthlyLoss * 12;
  
  const formatLargeNumber = (value: number) => {
    if (value >= 1000000) {
      return `$${(value / 1000000).toFixed(1)}M`;
    }
    return formatCurrency(value);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="relative overflow-hidden rounded-2xl border border-border/50 bg-card p-8 text-center"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-muted/30 to-transparent" />
      
      <div className="relative z-10">
        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-muted">
          <TrendingDown className="h-6 w-6 text-muted-foreground" />
        </div>
        
        <h3 className="mb-4 text-lg font-semibold text-muted-foreground uppercase tracking-wide">
          Cost of Inaction
        </h3>
        
        <p className="mx-auto max-w-xl text-lg text-muted-foreground">
          If no changes are made, this business is projected to lose approximately
        </p>
        
        <p className="my-4 text-5xl font-bold text-foreground md:text-6xl">
          {formatLargeNumber(annualLoss)}
        </p>
        
        <p className="text-lg text-muted-foreground">
          in recoverable revenue over the next 12 months.
        </p>
      </div>
    </motion.div>
  );
};
