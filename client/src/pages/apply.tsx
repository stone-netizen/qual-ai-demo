import { useState } from "react";
import { useLocation } from "wouter";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Check, ArrowRight, Loader2, Building2, Phone, TrendingUp, ArrowLeft, Users, Info, CheckCircle, Calculator } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { 
  calculateReportV2, 
  RESPONSE_TIME_OPTIONS, 
  BUSINESS_TYPE_OPTIONS,
  MISSED_CALLS_OPTIONS,
  INDUSTRY_BENCHMARKS,
  getBenchmarksForType
} from "@/lib/calculations-v2";

// Schema Definitions - 3 Steps Only
const step1Schema = z.object({
  business_type: z.string().min(1, "Please select a business type"),
  clinic_name: z.string().min(2, "Business name is required"),
  city: z.string().min(2, "City is required"),
  role: z.string().min(1, "Role is required"),
});

const step2Schema = z.object({
  leads_per_month: z.coerce.number().min(1, "Please enter lead volume"),
  missed_calls_range: z.string().min(1, "Please select missed calls range"),
  response_time: z.string().min(1, "Select response time"),
});

const step3Schema = z.object({
  avg_value: z.coerce.number().min(1, "Average value is required"),
  use_custom_rates: z.boolean().optional(),
  contact_rate: z.coerce.number().min(0).max(100).optional(),
  booking_rate: z.coerce.number().min(0).max(100).optional(),
  show_rate: z.coerce.number().min(0).max(100).optional(),
  close_rate: z.coerce.number().min(0).max(100).optional(),
});

type Step1Data = z.infer<typeof step1Schema>;
type Step2Data = z.infer<typeof step2Schema>;
type Step3Data = z.infer<typeof step3Schema>;

/**
 * Intelligent missed calls estimator based on leads, response time, and business type
 */
function estimateMissedCalls(
  leadsPerMonth: number, 
  responseTime: string, 
  businessType: string
): { low: number; mid: number; high: number; suggestedRange: string } {
  const leadsPerWeek = leadsPerMonth / 4.33;
  
  // Base miss rate by response time (more granular)
  const missRateByResponseTime: Record<string, number> = {
    'under_5': 0.05,
    '5_to_15': 0.10,
    '15_to_30': 0.15,
    '30_to_60': 0.25,
    '1_to_2_hours': 0.35,
    '2_to_4_hours': 0.45,
    '4_plus': 0.60,
    // Legacy mappings
    '5_to_30': 0.12,
    '30_to_120': 0.30,
    'hours_plus': 0.50,
    'next_day': 0.60
  };
  
  // Business type multiplier (some industries have more after-hours inquiries)
  const businessMultiplier: Record<string, number> = {
    'medspa': 1.3,    // More after-hours research
    'dental': 1.1,    // Moderate
    'chiro': 1.2,     // Pain-driven calls
    'physio': 0.9,    // More scheduled
    'other': 1.0
  };
  
  const baseRate = missRateByResponseTime[responseTime] || 0.30;
  const multiplier = businessMultiplier[businessType] || 1.0;
  
  const mid = Math.round(leadsPerWeek * baseRate * multiplier);
  const low = Math.max(1, mid - 3);
  const high = mid + 3;
  
  // Suggest appropriate range
  let suggestedRange = '5-10';
  if (mid <= 5) suggestedRange = '0-5';
  else if (mid <= 10) suggestedRange = '5-10';
  else if (mid <= 20) suggestedRange = '10-20';
  else suggestedRange = '20+';
  
  return { low, mid, high, suggestedRange };
}

const STEP_TITLES = [
  "Calculate Your Revenue Leaks",
  "Lead Volume & Speed",
  "Quick Estimates"
];

const STEP_LABELS = ["Basics", "Volume", "Estimate"];

// Helper to get business type display label
function getBusinessTypeLabel(businessType: string): string {
  const option = BUSINESS_TYPE_OPTIONS.find(opt => opt.value === businessType);
  return option?.label || 'Practice';
}

export default function ApplyPage() {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [, setLocation] = useLocation();
  const [formData, setFormData] = useState<Partial<Step1Data & Step2Data & Step3Data>>({});
  const [showAdvancedRates, setShowAdvancedRates] = useState(false);
  const [selectedRole, setSelectedRole] = useState<string>("");
  const [selectedMissedCalls, setSelectedMissedCalls] = useState<string>("");

  // Get benchmarks based on selected business type
  const businessType = formData.business_type || "other";
  const benchmarks = getBenchmarksForType(businessType);

  // Forms
  const form1 = useForm<Step1Data>({ 
    resolver: zodResolver(step1Schema),
    defaultValues: {
      business_type: "",
      clinic_name: "",
      city: "",
      role: "",
    }
  });

  const form2 = useForm<Step2Data>({ 
    resolver: zodResolver(step2Schema),
    defaultValues: {
      leads_per_month: "" as unknown as number,
      missed_calls_range: "",
      response_time: "",
    }
  });

  const form3 = useForm<Step3Data>({ 
    resolver: zodResolver(step3Schema),
    defaultValues: {
      avg_value: "" as unknown as number,
      use_custom_rates: false,
      contact_rate: benchmarks.contact,
      booking_rate: benchmarks.booking,
      show_rate: benchmarks.show,
      close_rate: benchmarks.close,
    }
  });

  // Update form3 defaults when business type changes
  const updateBenchmarksForType = (type: string) => {
    const newBenchmarks = getBenchmarksForType(type);
    form3.setValue("contact_rate", newBenchmarks.contact);
    form3.setValue("booking_rate", newBenchmarks.booking);
    form3.setValue("show_rate", newBenchmarks.show);
    form3.setValue("close_rate", newBenchmarks.close);
  };

  const onStep1Submit = (data: Step1Data) => {
    setFormData(prev => ({ ...prev, ...data }));
    updateBenchmarksForType(data.business_type);
    setStep(2);
    window.scrollTo(0, 0);
  };

  const onStep2Submit = (data: Step2Data) => {
    setFormData(prev => ({ ...prev, ...data }));
    setStep(3);
    window.scrollTo(0, 0);
  };

  const onStep3Submit = async (data: Step3Data) => {
    // Get numeric value for missed calls
    const missedCallsOption = MISSED_CALLS_OPTIONS.find(
      opt => opt.value === formData.missed_calls_range
    );
    const missedCallsWeek = missedCallsOption?.numericValue || 7;

    // Use custom rates or benchmarks
    const currentBenchmarks = getBenchmarksForType(formData.business_type || "other");
    const finalContactRate = showAdvancedRates && data.contact_rate !== undefined 
      ? data.contact_rate 
      : currentBenchmarks.contact;
    const finalBookingRate = showAdvancedRates && data.booking_rate !== undefined 
      ? data.booking_rate 
      : currentBenchmarks.booking;
    const finalShowRate = showAdvancedRates && data.show_rate !== undefined 
      ? data.show_rate 
      : currentBenchmarks.show;
    const finalCloseRate = showAdvancedRates && data.close_rate !== undefined 
      ? data.close_rate 
      : currentBenchmarks.close;

    const finalData = { 
      ...formData, 
      ...data,
      missed_calls_week: missedCallsWeek,
      contact_rate: finalContactRate,
      booking_rate: finalBookingRate,
      show_rate: finalShowRate,
      close_rate: finalCloseRate,
      using_custom_rates: showAdvancedRates
    };

    setFormData(finalData);
    setLoading(true);
    
    // Simulate AI Processing
    await new Promise(resolve => setTimeout(resolve, 2500));
    
    // Generate Report with V2 calculations
    const report = calculateReportV2(finalData as any);
    
    // Save to LocalStorage
    const reports = JSON.parse(localStorage.getItem("qual_reports") || "{}");
    reports[report.id] = report;
    localStorage.setItem("qual_reports", JSON.stringify(reports));
    
    setLocation(`/report/${report.id}`);
  };

  const goBack = () => {
    if (step > 1) {
      setStep(step - 1);
      window.scrollTo(0, 0);
    }
  };

  // Get business type label for display
  const getBusinessTypeLabel = (value: string) => {
    return BUSINESS_TYPE_OPTIONS.find(opt => opt.value === value)?.label || "practice";
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white py-12 px-4">
      <div className="max-w-2xl mx-auto space-y-8">
        
        {/* Progress Header */}
        <div className="text-center space-y-4">
          {!loading && (
            <Badge variant="secondary" className="mb-2">
              2 minutes to complete
            </Badge>
          )}
          <h1 className="text-2xl font-bold text-slate-900">
            {loading ? "Calculating your revenue analysis..." : STEP_TITLES[step - 1]}
          </h1>
          {!loading && step === 1 && (
            <p className="text-slate-600">
              See exactly where you're losing money and how to fix it
            </p>
          )}
          {!loading && (
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-medium text-slate-500 uppercase tracking-wide">
                {STEP_LABELS.map((label, index) => (
                  <span key={label} className={step >= index + 1 ? "text-primary" : ""}>
                    {label}
                  </span>
                ))}
              </div>
              <Progress value={(step / 3) * 100} className="h-2" />
            </div>
          )}
        </div>

        {/* Loading State */}
        {loading ? (
          <Card className="border-primary/20 shadow-xl animate-in fade-in zoom-in-95 duration-500">
            <CardContent className="pt-12 pb-12 flex flex-col items-center text-center space-y-6">
              <div className="relative">
                <div className="w-20 h-20 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm">
                    <span className="font-bold text-primary text-sm">AI</span>
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-bold text-slate-900">Analyzing your funnel...</h3>
                <p className="text-slate-500">Calculating revenue opportunities and identifying improvements.</p>
              </div>
              <div className="max-w-xs w-full space-y-2">
                <div className="text-xs text-slate-400 flex justify-between animate-in fade-in duration-500">
                  <span>Applying industry benchmarks...</span>
                  <Check className="w-3 h-3 text-green-500" />
                </div>
                <div className="text-xs text-slate-400 flex justify-between animate-in fade-in duration-500 delay-300">
                  <span>Calculating opportunity gap...</span>
                  <Check className="w-3 h-3 text-green-500" />
                </div>
                <div className="text-xs text-slate-400 flex justify-between animate-in fade-in duration-500 delay-500">
                  <span>Identifying priority improvements...</span>
                  <Loader2 className="w-3 h-3 animate-spin" />
                </div>
                <div className="text-xs text-slate-400 flex justify-between animate-in fade-in duration-500 delay-700">
                  <span>Generating your report...</span>
                  <Loader2 className="w-3 h-3 animate-spin text-slate-300" />
                </div>
              </div>
            </CardContent>
          </Card>
        ) : (
          <Card className="border-none shadow-xl">
            {/* Step 1 Form - Business Basics */}
            {step === 1 && (
              <Form {...form1}>
                <form onSubmit={form1.handleSubmit(onStep1Submit)}>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Building2 className="w-5 h-5 text-primary" />
                      Business Basics
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Business Type */}
                    <FormField
                      control={form1.control}
                      name="business_type"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>What type of business?</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select type" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {BUSINESS_TYPE_OPTIONS.map(opt => (
                                <SelectItem key={opt.value} value={opt.value}>
                                  {opt.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    {/* Business Name & City */}
                    <div className="grid grid-cols-2 gap-4">
                      <FormField
                        control={form1.control}
                        name="clinic_name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Business Name</FormLabel>
                            <FormControl>
                              <Input placeholder="e.g. Bright Smile Dental" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form1.control}
                        name="city"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>City</FormLabel>
                            <FormControl>
                              <Input placeholder="e.g. San Diego" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    {/* Visual Role Selection */}
                    <FormField
                      control={form1.control}
                      name="role"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>What's your role?</FormLabel>
                          <FormControl>
                            <div className="grid grid-cols-2 gap-3">
                              <button
                                type="button"
                                className={`p-4 border rounded-lg transition-all ${
                                  field.value === "owner"
                                    ? "border-primary bg-primary/5 ring-2 ring-primary/20"
                                    : "border-slate-200 hover:border-slate-300"
                                }`}
                                onClick={() => {
                                  field.onChange("owner");
                                  setSelectedRole("owner");
                                }}
                              >
                                <Building2 className="w-6 h-6 mb-2 mx-auto text-slate-600" />
                                <p className="font-medium text-slate-900">Owner</p>
                              </button>
                              <button
                                type="button"
                                className={`p-4 border rounded-lg transition-all ${
                                  field.value === "manager"
                                    ? "border-primary bg-primary/5 ring-2 ring-primary/20"
                                    : "border-slate-200 hover:border-slate-300"
                                }`}
                                onClick={() => {
                                  field.onChange("manager");
                                  setSelectedRole("manager");
                                }}
                              >
                                <Users className="w-6 h-6 mb-2 mx-auto text-slate-600" />
                                <p className="font-medium text-slate-900">Manager</p>
                              </button>
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </CardContent>

                  {/* Trust Signal */}
                  <div className="px-6 pb-4">
                    <div className="pt-4 border-t text-center">
                      <p className="text-sm text-slate-500">
                        <CheckCircle className="w-4 h-4 inline mr-1 text-green-500" />
                        Join 500+ practices that discovered their revenue leaks
                      </p>
                    </div>
                  </div>

                  <CardFooter>
                    <Button type="submit" className="w-full">
                      Next Step <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </CardFooter>
                </form>
              </Form>
            )}

            {/* Step 2 Form - Lead Volume & Speed */}
            {step === 2 && (
              <Form {...form2}>
                <form onSubmit={form2.handleSubmit(onStep2Submit)}>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Phone className="w-5 h-5 text-primary" />
                      Lead Volume & Speed
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Leads Per Month */}
                    <FormField
                      control={form2.control}
                      name="leads_per_month"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>How many new leads per month?</FormLabel>
                          <FormDescription>Include calls, web forms, and walk-ins</FormDescription>
                          <FormControl>
                            <Input type="number" placeholder="e.g. 150" {...field} />
                          </FormControl>
                          {field.value && formData.business_type && (
                            <p className="text-xs text-slate-500 mt-2">
                              <Info className="w-3 h-3 inline mr-1" />
                              Average {getBusinessTypeLabel(formData.business_type)} gets {benchmarks.leadsPerMonth.min}-{benchmarks.leadsPerMonth.max} leads/month
                            </p>
                          )}
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Missed Calls - Visual Buttons */}
                    <FormField
                      control={form2.control}
                      name="missed_calls_range"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>About how many calls go unanswered each week?</FormLabel>
                          <FormDescription>Best guess is fine — we'll calculate the exact cost</FormDescription>
                          <FormControl>
                            <div className="grid grid-cols-4 gap-2">
                              {MISSED_CALLS_OPTIONS.map((option) => (
                                <button
                                  key={option.value}
                                  type="button"
                                  className={`p-3 border rounded-lg transition-all ${
                                    field.value === option.value
                                      ? "border-primary bg-primary/5 ring-2 ring-primary/20"
                                      : "border-slate-200 hover:border-slate-300"
                                  }`}
                                  onClick={() => {
                                    field.onChange(option.value);
                                    setSelectedMissedCalls(option.value);
                                  }}
                                >
                                  <p className="font-semibold text-slate-900">{option.label}</p>
                                  <p className="text-xs text-slate-500">{option.sublabel}</p>
                                </button>
                              ))}
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Response Time */}
                    <FormField
                      control={form2.control}
                      name="response_time"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>How fast do you respond to web leads?</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select average time" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {RESPONSE_TIME_OPTIONS.map(opt => (
                                <SelectItem key={opt.value} value={opt.value}>
                                  {opt.label} {opt.sublabel}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Intelligent Missed Calls Estimator */}
                    {form2.watch('leads_per_month') && form2.watch('response_time') && formData.business_type && (
                      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                        <div className="flex items-start gap-3">
                          <Calculator className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                          <div>
                            <p className="text-sm font-medium text-blue-900 mb-2">
                              💡 Quick Estimate Helper
                            </p>
                            <p className="text-sm text-blue-800 mb-3">
                              Based on {form2.watch('leads_per_month')} leads/month and your response time, 
                              typical {getBusinessTypeLabel(formData.business_type).toLowerCase()}s miss approximately:
                            </p>
                            {(() => {
                              const estimate = estimateMissedCalls(
                                Number(form2.watch('leads_per_month')),
                                form2.watch('response_time'),
                                formData.business_type
                              );
                              return (
                                <>
                                  <div className="bg-white rounded-lg p-3 border border-blue-100 mb-3">
                                    <p className="text-2xl font-bold text-blue-600 mb-1">
                                      {estimate.low} - {estimate.high}
                                    </p>
                                    <p className="text-xs text-blue-600">
                                      calls/week go unanswered
                                    </p>
                                  </div>
                                  <p className="text-xs text-blue-700">
                                    This accounts for calls during patient care, lunch breaks, after-hours, and busy periods.
                                    {selectedMissedCalls !== estimate.suggestedRange && (
                                      <span className="block mt-1 font-medium">
                                        💡 We suggest selecting "{estimate.suggestedRange}" based on your inputs
                                      </span>
                                    )}
                                  </p>
                                </>
                              );
                            })()}
                          </div>
                        </div>
                      </div>
                    )}
                  </CardContent>
                  <CardFooter className="flex gap-4">
                    <Button type="button" variant="outline" onClick={goBack}>
                      <ArrowLeft className="w-4 h-4 mr-2" />
                      Back
                    </Button>
                    <Button type="submit" className="flex-1">
                      Next Step <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </CardFooter>
                </form>
              </Form>
            )}

            {/* Step 3 Form - Quick Estimates with Smart Defaults */}
            {step === 3 && (
              <Form {...form3}>
                <form onSubmit={form3.handleSubmit(onStep3Submit)}>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <TrendingUp className="w-5 h-5 text-primary" />
                      Quick Estimates
                    </CardTitle>
                    <p className="text-sm text-slate-600">
                      We'll use industry benchmarks + your inputs for accuracy
                    </p>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Average Customer Value */}
                    <FormField
                      control={form3.control}
                      name="avg_value"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>What's your average customer value?</FormLabel>
                          <FormDescription>First visit or typical 30-day value</FormDescription>
                          <FormControl>
                            <div className="relative">
                              <span className="absolute left-3 top-2.5 text-slate-500">$</span>
                              <Input 
                                type="number" 
                                className="pl-8" 
                                placeholder="e.g. 1500" 
                                {...field} 
                              />
                            </div>
                          </FormControl>
                          {field.value && formData.business_type && (
                            <p className="text-xs text-slate-500 mt-2">
                              <Info className="w-3 h-3 inline mr-1" />
                              Average {getBusinessTypeLabel(formData.business_type)} customer value is ${benchmarks.avgValue.min}-${benchmarks.avgValue.max}
                            </p>
                          )}
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Smart Defaults Box */}
                    <div className="p-6 bg-slate-50 rounded-lg border border-slate-200">
                      <div className="flex items-start gap-3 mb-4">
                        <Info className="w-5 h-5 text-blue-500 mt-0.5 shrink-0" />
                        <div>
                          <h3 className="font-semibold text-slate-900 mb-1">
                            We'll use industry benchmarks for your calculations
                          </h3>
                          <p className="text-sm text-slate-600">
                            Based on 500+ {getBusinessTypeLabel(formData.business_type || "other")} practices we've analyzed:
                          </p>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <p className="text-slate-500">Contact Rate</p>
                          <p className="font-semibold text-slate-900">~{benchmarks.contact}%</p>
                        </div>
                        <div>
                          <p className="text-slate-500">Booking Rate</p>
                          <p className="font-semibold text-slate-900">~{benchmarks.booking}%</p>
                        </div>
                        <div>
                          <p className="text-slate-500">Show Rate</p>
                          <p className="font-semibold text-slate-900">~{benchmarks.show}%</p>
                        </div>
                        <div>
                          <p className="text-slate-500">Close Rate</p>
                          <p className="font-semibold text-slate-900">~{benchmarks.close}%</p>
                        </div>
                      </div>

                      {/* Adjust Manually Toggle */}
                      <button
                        type="button"
                        className="mt-4 text-sm text-blue-600 hover:text-blue-700 font-medium"
                        onClick={() => setShowAdvancedRates(!showAdvancedRates)}
                      >
                        {showAdvancedRates ? "← Use benchmarks" : "My numbers are very different → Adjust manually"}
                      </button>
                    </div>

                    {/* Advanced Rate Sliders (Only if user clicks "Adjust manually") */}
                    {showAdvancedRates && (
                      <div className="p-6 border border-amber-200 bg-amber-50 rounded-lg space-y-4">
                        <h4 className="font-semibold text-slate-900">Manual Adjustments</h4>
                        
                        <FormField
                          control={form3.control}
                          name="contact_rate"
                          render={({ field }) => (
                            <FormItem>
                              <div className="flex justify-between">
                                <FormLabel className="text-sm">Contact Rate</FormLabel>
                                <span className="text-sm font-mono">{field.value}%</span>
                              </div>
                              <Slider
                                value={[field.value || benchmarks.contact]}
                                onValueChange={(val) => field.onChange(val[0])}
                                max={100}
                                step={5}
                              />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form3.control}
                          name="booking_rate"
                          render={({ field }) => (
                            <FormItem>
                              <div className="flex justify-between">
                                <FormLabel className="text-sm">Booking Rate</FormLabel>
                                <span className="text-sm font-mono">{field.value}%</span>
                              </div>
                              <Slider
                                value={[field.value || benchmarks.booking]}
                                onValueChange={(val) => field.onChange(val[0])}
                                max={100}
                                step={5}
                              />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form3.control}
                          name="show_rate"
                          render={({ field }) => (
                            <FormItem>
                              <div className="flex justify-between">
                                <FormLabel className="text-sm">Show Rate</FormLabel>
                                <span className="text-sm font-mono">{field.value}%</span>
                              </div>
                              <Slider
                                value={[field.value || benchmarks.show]}
                                onValueChange={(val) => field.onChange(val[0])}
                                max={100}
                                step={5}
                              />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form3.control}
                          name="close_rate"
                          render={({ field }) => (
                            <FormItem>
                              <div className="flex justify-between">
                                <FormLabel className="text-sm">Close Rate</FormLabel>
                                <span className="text-sm font-mono">{field.value}%</span>
                              </div>
                              <Slider
                                value={[field.value || benchmarks.close]}
                                onValueChange={(val) => field.onChange(val[0])}
                                max={100}
                                step={5}
                              />
                            </FormItem>
                          )}
                        />
                      </div>
                    )}

                    {/* Final CTA Preview */}
                    <div className="text-center pt-4 border-t">
                      <div className="inline-block p-2 bg-green-100 rounded-full mb-4">
                        <CheckCircle className="w-6 h-6 text-green-600" />
                      </div>
                      <h3 className="font-semibold text-slate-900 mb-2">You're all set!</h3>
                      <p className="text-sm text-slate-600 mb-4">Your custom report will show:</p>
                      <ul className="text-left max-w-xs mx-auto space-y-2 text-sm text-slate-600">
                        <li className="flex items-start gap-2">
                          <Check className="w-4 h-4 text-green-500 mt-0.5 shrink-0" />
                          <span>Exact revenue leaking from your funnel</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <Check className="w-4 h-4 text-green-500 mt-0.5 shrink-0" />
                          <span>Your #1 highest-priority fix</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <Check className="w-4 h-4 text-green-500 mt-0.5 shrink-0" />
                          <span>ROI projection for fixing it</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <Check className="w-4 h-4 text-green-500 mt-0.5 shrink-0" />
                          <span>Implementation plan specific to {getBusinessTypeLabel(formData.business_type || "other")}</span>
                        </li>
                      </ul>
                    </div>
                  </CardContent>
                  <CardFooter className="flex flex-col gap-4">
                    <div className="flex gap-4 w-full">
                      <Button type="button" variant="outline" onClick={goBack}>
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Back
                      </Button>
                      <Button type="submit" className="flex-1 py-6 text-lg">
                        Show Me My Revenue Leaks
                        <ArrowRight className="w-5 h-5 ml-2" />
                      </Button>
                    </div>
                    <p className="text-xs text-slate-500 text-center">
                      No credit card • No commitment • Instant access
                    </p>
                  </CardFooter>
                </form>
              </Form>
            )}
          </Card>
        )}
      </div>
    </div>
  );
}
