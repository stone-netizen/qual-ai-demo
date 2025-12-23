import { UseFormReturn } from "react-hook-form";
import { FormField } from "./FormField";
import { CalculatorFormData, MISSED_CALL_RATES } from "@/hooks/useCalculatorForm";
import { cn } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CheckCircle2, XCircle, Info, Phone, PhoneOff } from "lucide-react";

interface StepProps {
  form: UseFormReturn<CalculatorFormData>;
}

export const Step4Operations = ({ form }: StepProps) => {
  const { formState: { errors }, watch, setValue } = form;
  
  const answersAfterHours = watch("answersAfterHours");
  const missedCallRate = watch("missedCallRate");

  return (
    <div className="space-y-6">
      {/* Missed Call Rate - Primary Question */}
      <FormField
        label="How often do you miss incoming calls?"
        required
        error={errors.missedCallRate?.message}
        helpText="During business hours when you're busy"
      >
        <Select value={missedCallRate} onValueChange={(value) => setValue("missedCallRate", value)}>
          <SelectTrigger
            className={cn(
              "h-12 bg-slate-50 border-slate-200 text-slate-900 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500",
              errors.missedCallRate && "border-red-500"
            )}
          >
            <PhoneOff className="w-5 h-5 text-slate-400 mr-2" />
            <SelectValue placeholder="Select how often" />
          </SelectTrigger>
          <SelectContent className="bg-white border-slate-200 shadow-lg z-50">
            {MISSED_CALL_RATES.map((rate) => (
              <SelectItem key={rate.value} value={rate.value} className="text-slate-900 hover:bg-slate-100">
                {rate.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {missedCallRate === "unknown" && (
          <div className="flex items-start gap-2 p-3 bg-blue-50 rounded-lg mt-2">
            <Info className="w-4 h-4 text-blue-500 mt-0.5" />
            <p className="text-sm text-blue-700">We'll use industry average: 45%</p>
          </div>
        )}
      </FormField>

      {/* After Hours & Weekend Call Handling */}
      <FormField
        label="Do you have a system to handle calls after hours and on weekends?"
        required
        error={errors.answersAfterHours?.message}
        helpText="Answering service, voicemail callback system, or staff on-call"
      >
        <div className="grid grid-cols-2 gap-4">
          <button
            type="button"
            onClick={() => {
              setValue("answersAfterHours", true);
              setValue("answersWeekends", true);
            }}
            className={cn(
              "flex flex-col items-center gap-3 p-5 rounded-xl border-2 transition-all duration-200",
              answersAfterHours === true
                ? "border-emerald-500 bg-emerald-50"
                : "border-slate-200 hover:border-slate-300 bg-white"
            )}
          >
            <Phone className={cn("w-8 h-8", answersAfterHours === true ? "text-emerald-500" : "text-slate-300")} />
            <div className="text-center">
              <span className={cn("font-medium block", answersAfterHours === true ? "text-emerald-700" : "text-slate-600")}>
                Yes
              </span>
              <span className="text-xs text-slate-500">Calls get handled</span>
            </div>
          </button>
          <button
            type="button"
            onClick={() => {
              setValue("answersAfterHours", false);
              setValue("answersWeekends", false);
            }}
            className={cn(
              "flex flex-col items-center gap-3 p-5 rounded-xl border-2 transition-all duration-200",
              answersAfterHours === false
                ? "border-emerald-500 bg-emerald-50"
                : "border-slate-200 hover:border-slate-300 bg-white"
            )}
          >
            <PhoneOff className={cn("w-8 h-8", answersAfterHours === false ? "text-emerald-500" : "text-slate-300")} />
            <div className="text-center">
              <span className={cn("font-medium block", answersAfterHours === false ? "text-emerald-700" : "text-slate-600")}>
                No
              </span>
              <span className="text-xs text-slate-500">Calls go unanswered</span>
            </div>
          </button>
        </div>
      </FormField>

      {/* Contextual info based on selection */}
      {answersAfterHours === false && (
        <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl">
          <p className="text-sm text-amber-800 font-medium">Potential Revenue Leak</p>
          <p className="text-sm text-amber-700 mt-1">
            Research shows 78% of customers buy from whoever responds first. Calls outside business hours often go to competitors.
          </p>
        </div>
      )}

      {answersAfterHours === true && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl">
          <p className="text-sm text-emerald-800 font-medium">Great!</p>
          <p className="text-sm text-emerald-700 mt-1">
            Having a system to capture after-hours leads gives you a competitive advantage.
          </p>
        </div>
      )}
    </div>
  );
};
