import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { CheckCircle2, ArrowRight } from "lucide-react";
import { useForm } from "react-hook-form";
import { useLocation } from "wouter";
import { useToast } from "@/hooks/use-toast";

export default function ThankYouPage() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const { register, handleSubmit } = useForm();

  const onSubmit = (data: any) => {
    console.log("Pre-call answers:", data);
    // Mock sending email
    toast({
      title: "Responses saved!",
      description: "We've forwarded this to your consultant. See you soon!",
    });
    // Redirect or just show success state? 
    // Usually redirect to home or stay here.
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4">
      <div className="max-w-xl w-full space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-700">
        
        <div className="text-center space-y-4">
          <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
            <CheckCircle2 className="w-8 h-8 text-green-600" />
          </div>
          <h1 className="text-3xl font-bold text-slate-900">Consultation Booked!</h1>
          <p className="text-slate-600">
            We're excited to help you reclaim your lost revenue. <br/>
            Please answer these 3 quick questions to help us prepare.
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Pre-Call Brief</CardTitle>
            <CardDescription>Your answers help us build your custom ROI dashboard before we meet.</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="goal">What is your #1 revenue goal for this quarter?</Label>
                <Input id="goal" placeholder="e.g. Add $20k/mo in new implants" {...register("goal")} />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="tools">What CRM or Booking software do you currently use?</Label>
                <Input id="tools" placeholder="e.g. Dentrix, Salesforce, Jane App" {...register("tools")} />
              </div>

              <div className="space-y-2">
                <Label htmlFor="bottleneck">What's the biggest bottleneck in your current process?</Label>
                <Textarea id="bottleneck" placeholder="e.g. Front desk is overwhelmed, no follow up on weekends..." {...register("bottleneck")} />
              </div>

              <Button type="submit" className="w-full">
                Submit & Finish <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </form>
          </CardContent>
        </Card>

        <p className="text-center text-xs text-muted-foreground">
          A confirmation email has been sent to your inbox.
        </p>
      </div>
    </div>
  );
}
