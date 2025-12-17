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
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Check, ArrowRight, Loader2, Building2, Phone, TrendingUp } from "lucide-react";
import { Progress } from "@/components/ui/progress";

// Schema Definitions
const step1Schema = z.object({
  business_type: z.string().min(1, "Please select a business type"),
  clinic_name: z.string().min(2, "Clinic name is required"),
  city: z.string().min(2, "City is required"),
  role: z.string().min(1, "Role is required"),
  website: z.string().optional(),
});

const step2Schema = z.object({
  leads_per_month: z.coerce.number().min(1, "Please enter lead volume"),
  missed_calls_week: z.coerce.number().min(0, "Please enter missed calls"),
  response_time: z.string().min(1, "Select response time"),
});

const step3Schema = z.object({
  contact_rate: z.coerce.number().min(0).max(100),
  booking_rate: z.coerce.number().min(0).max(100),
  show_rate: z.coerce.number().min(0).max(100),
  close_rate: z.coerce.number().min(0).max(100),
  avg_value: z.coerce.number().min(1, "Average value is required"),
  process_description: z.string().optional(),
});

type Step1Data = z.infer<typeof step1Schema>;
type Step2Data = z.infer<typeof step2Schema>;
type Step3Data = z.infer<typeof step3Schema>;

export default function ApplyPage() {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [, setLocation] = useLocation();
  const [formData, setFormData] = useState<Partial<Step1Data & Step2Data & Step3Data>>({});

  // Forms
  const form1 = useForm<Step1Data>({ resolver: zodResolver(step1Schema) });
  const form2 = useForm<Step2Data>({ resolver: zodResolver(step2Schema) });
  const form3 = useForm<Step3Data>({ 
    resolver: zodResolver(step3Schema),
    defaultValues: {
      contact_rate: 50,
      booking_rate: 40,
      show_rate: 70,
      close_rate: 30,
    }
  });

  const onStep1Submit = (data: Step1Data) => {
    setFormData(prev => ({ ...prev, ...data }));
    setStep(2);
    window.scrollTo(0, 0);
  };

  const onStep2Submit = (data: Step2Data) => {
    setFormData(prev => ({ ...prev, ...data }));
    setStep(3);
    window.scrollTo(0, 0);
  };

  const onStep3Submit = async (data: Step3Data) => {
    setFormData(prev => ({ ...prev, ...data }));
    setLoading(true);
    
    // Simulate AI Processing
    await new Promise(resolve => setTimeout(resolve, 2500));
    
    // In real app: POST to backend
    // const result = await api.post('/applications', { ...formData, ...data });
    
    setLocation("/report/demo-123");
  };

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4">
      <div className="max-w-2xl mx-auto space-y-8">
        
        {/* Progress Header */}
        <div className="text-center space-y-4">
          <h1 className="text-2xl font-bold text-slate-900">
            {step === 1 && "Tell us about your clinic"}
            {step === 2 && "Lead Volume & Speed"}
            {step === 3 && "Funnel Performance"}
            {loading && "Generating your report..."}
          </h1>
          {!loading && (
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-medium text-slate-500 uppercase tracking-wide">
                <span className={step >= 1 ? "text-primary" : ""}>Basics</span>
                <span className={step >= 2 ? "text-primary" : ""}>Volume</span>
                <span className={step >= 3 ? "text-primary" : ""}>Performance</span>
              </div>
              <Progress value={(step / 3) * 100} className="h-2" />
            </div>
          )}
        </div>

        {/* Loading State */}
        {loading ? (
          <Card className="border-primary/20 shadow-lg">
            <CardContent className="pt-12 pb-12 flex flex-col items-center text-center space-y-6">
              <div className="relative">
                <div className="w-16 h-16 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                    <span className="font-bold text-primary text-xs">AI</span>
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-bold text-slate-900">Analyzing your funnel...</h3>
                <p className="text-slate-500">Calculating revenue leakage and identifying bottlenecks.</p>
              </div>
              <div className="max-w-xs w-full space-y-1">
                 <div className="text-xs text-slate-400 flex justify-between">
                   <span>Benchmarking response time...</span>
                   <Check className="w-3 h-3 text-green-500" />
                 </div>
                 <div className="text-xs text-slate-400 flex justify-between">
                   <span>Estimating recoverable revenue...</span>
                   <Loader2 className="w-3 h-3 animate-spin" />
                 </div>
              </div>
            </CardContent>
          </Card>
        ) : (
          <Card className="border-none shadow-xl">
            {/* Step 1 Form */}
            {step === 1 && (
              <Form {...form1}>
                <form onSubmit={form1.handleSubmit(onStep1Submit)}>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Building2 className="w-5 h-5 text-primary" />
                      Business Basics
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <FormField
                      control={form1.control}
                      name="business_type"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Business Type</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select type" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="medspa">MedSpa</SelectItem>
                              <SelectItem value="dental">Dental / Ortho</SelectItem>
                              <SelectItem value="chiro">Chiropractic</SelectItem>
                              <SelectItem value="other">Other</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <div className="grid grid-cols-2 gap-4">
                      <FormField
                        control={form1.control}
                        name="clinic_name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Clinic Name</FormLabel>
                            <FormControl>
                              <Input placeholder="Acme Dental" {...field} />
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
                              <Input placeholder="New York" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form1.control}
                      name="role"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Your Role</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select role" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="owner">Owner / Founder</SelectItem>
                              <SelectItem value="manager">Practice Manager</SelectItem>
                              <SelectItem value="marketer">Marketing Director</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form1.control}
                      name="website"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Website (Optional)</FormLabel>
                          <FormControl>
                            <Input placeholder="www.example.com" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </CardContent>
                  <CardFooter>
                    <Button type="submit" className="w-full">
                      Next Step <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </CardFooter>
                </form>
              </Form>
            )}

            {/* Step 2 Form */}
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
                    <FormField
                      control={form2.control}
                      name="leads_per_month"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Total New Leads / Month</FormLabel>
                          <FormDescription>Include calls, web forms, and DMs.</FormDescription>
                          <FormControl>
                            <Input type="number" placeholder="e.g. 150" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form2.control}
                      name="missed_calls_week"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Missed Calls / Week</FormLabel>
                          <FormDescription>Estimate how many calls go to voicemail/hangup.</FormDescription>
                          <FormControl>
                            <Input type="number" placeholder="e.g. 15" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form2.control}
                      name="response_time"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Average Response Time (Web Leads)</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select average time" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="under_5">Under 5 mins (World Class)</SelectItem>
                              <SelectItem value="5_to_30">5 - 30 mins</SelectItem>
                              <SelectItem value="30_to_120">30 mins - 2 hours</SelectItem>
                              <SelectItem value="hours_plus">2+ hours (or end of day)</SelectItem>
                              <SelectItem value="next_day">Next Day</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </CardContent>
                  <CardFooter className="flex gap-4">
                    <Button type="button" variant="outline" onClick={() => setStep(1)}>Back</Button>
                    <Button type="submit" className="flex-1">
                      Next Step <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </CardFooter>
                </form>
              </Form>
            )}

            {/* Step 3 Form */}
            {step === 3 && (
              <Form {...form3}>
                <form onSubmit={form3.handleSubmit(onStep3Submit)}>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <TrendingUp className="w-5 h-5 text-primary" />
                      Funnel Performance
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        control={form3.control}
                        name="contact_rate"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Contact Rate (%)</FormLabel>
                            <FormDescription>% of leads you actually speak to</FormDescription>
                            <div className="flex items-center gap-4">
                              <Slider 
                                value={[field.value]} 
                                onValueChange={(val) => field.onChange(val[0])} 
                                max={100} step={5}
                                className="flex-1"
                              />
                              <span className="w-12 text-right font-mono text-sm">{field.value}%</span>
                            </div>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form3.control}
                        name="booking_rate"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Booking Rate (%)</FormLabel>
                            <FormDescription>% of contacts who book</FormDescription>
                            <div className="flex items-center gap-4">
                              <Slider 
                                value={[field.value]} 
                                onValueChange={(val) => field.onChange(val[0])} 
                                max={100} step={5}
                                className="flex-1"
                              />
                              <span className="w-12 text-right font-mono text-sm">{field.value}%</span>
                            </div>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form3.control}
                        name="show_rate"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Show Rate (%)</FormLabel>
                            <FormDescription>% of bookings who show up</FormDescription>
                            <div className="flex items-center gap-4">
                              <Slider 
                                value={[field.value]} 
                                onValueChange={(val) => field.onChange(val[0])} 
                                max={100} step={5}
                                className="flex-1"
                              />
                              <span className="w-12 text-right font-mono text-sm">{field.value}%</span>
                            </div>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form3.control}
                        name="close_rate"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Close Rate (%)</FormLabel>
                            <FormDescription>% of shows who buy</FormDescription>
                            <div className="flex items-center gap-4">
                              <Slider 
                                value={[field.value]} 
                                onValueChange={(val) => field.onChange(val[0])} 
                                max={100} step={5}
                                className="flex-1"
                              />
                              <span className="w-12 text-right font-mono text-sm">{field.value}%</span>
                            </div>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form3.control}
                      name="avg_value"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Average Client Value ($)</FormLabel>
                          <FormDescription>First visit or 30-day value</FormDescription>
                          <FormControl>
                            <div className="relative">
                              <span className="absolute left-3 top-2.5 text-slate-500">$</span>
                              <Input type="number" className="pl-7" placeholder="e.g. 500" {...field} />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form3.control}
                      name="process_description"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>What happens after a missed call? (Optional)</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="e.g. We try to call back when front desk is free, but sometimes it takes a few hours..." 
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                  </CardContent>
                  <CardFooter className="flex gap-4">
                    <Button type="button" variant="outline" onClick={() => setStep(2)}>Back</Button>
                    <Button type="submit" className="flex-1 bg-primary hover:bg-teal-700">
                      Generate Lost Revenue Report
                    </Button>
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
