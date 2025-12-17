/**
 * PriorityLeak Component
 * 
 * Shows ONE priority leak with step-by-step story
 * Collapsible section for other leaks (progressive disclosure)
 */

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronDown } from "lucide-react";
import { formatCurrency } from "@/lib/calculations-v2";
import { motion, AnimatePresence } from "framer-motion";

interface Leak {
  name: string;
  monthly_loss_estimate: number;
  why: string;
}

interface PriorityLeakProps {
  primaryLeak: Leak;
  otherLeaks: Leak[];
  avgValue: number;
  missedCallsPerWeek: number;
}

// Step-by-step story for each leak type
function getLeakStory(leakName: string, missedCallsPerWeek: number): string[] {
  const stories: Record<string, string[]> = {
    'Missed Call Recovery': [
      'Lead calls your number while researching providers',
      'Goes to voicemail because staff is busy with existing patient',
      'Lead immediately calls next provider on Google',
      'They answer in 30 seconds → lead books with them instead'
    ],
    'Response Time Improvement': [
      'Lead fills out your web form at 9pm',
      'Form sits in inbox until staff arrives next morning',
      'By then, lead has already called 3 competitors',
      'First responder wins → you lose the sale'
    ],
    'Contact Rate Improvement': [
      'Your team attempts to call the lead once',
      'Lead is busy and misses the call',
      'No follow-up sequence in place',
      'Lead forgets about you and books elsewhere'
    ],
    'After-Hours Coverage': [
      'Lead searches for providers at 8pm after work',
      'Calls your number, gets voicemail',
      'Calls competitor who has 24/7 coverage',
      'They book on the spot while you sleep'
    ]
  };
  return stories[leakName] || [
    'Lead reaches out to your business',
    'Response is delayed or missed',
    'Lead moves on to competitor',
    'Revenue is lost permanently'
  ];
}

function getFixDescription(leakName: string): string {
  const fixes: Record<string, string> = {
    'Missed Call Recovery': 'AI receptionist answers every call in under 5 seconds, 24/7. Qualifies the lead and books consultation while they\'re still interested.',
    'Response Time Improvement': 'AI responds to web forms instantly with personalized messages. Qualifies leads and schedules callbacks automatically.',
    'Contact Rate Improvement': 'Automated 8-touch follow-up sequence ensures no lead slips through. AI persists until they respond or opt out.',
    'After-Hours Coverage': 'AI handles all inquiries 24/7/365. Books appointments, answers questions, and captures leads while you sleep.'
  };
  return fixes[leakName] || 'AI automation ensures every lead gets immediate, consistent follow-up until they convert.';
}

export function PriorityLeak({
  primaryLeak,
  otherLeaks,
  avgValue,
  missedCallsPerWeek
}: PriorityLeakProps) {
  const [showOtherLeaks, setShowOtherLeaks] = useState(false);
  
  const story = getLeakStory(primaryLeak.name, missedCallsPerWeek);
  const fixDescription = getFixDescription(primaryLeak.name);

  return (
    <section className="py-16 px-6 bg-white">
      <div className="max-w-4xl mx-auto">
        
        <h2 className="text-3xl font-bold text-slate-900 mb-4 text-center">
          Your #1 Revenue Leak
        </h2>
        
        <p className="text-center text-slate-600 mb-12">
          Based on your lead volume and response time
        </p>

        {/* Primary Leak Card */}
        <div className="bg-slate-50 border-l-4 border-l-red-500 rounded-r-2xl p-6 md:p-8 mb-8 hover:shadow-md transition-shadow duration-200">
          
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 mb-6">
            <div>
              <h3 className="text-2xl font-bold text-slate-900 mb-2">
                {primaryLeak.name}
              </h3>
              <p className="text-slate-600">
                {primaryLeak.why}
              </p>
            </div>
            <div className="text-left md:text-right flex-shrink-0">
              <p className="text-sm text-slate-500 uppercase tracking-wide mb-1">
                Monthly Cost
              </p>
              <p className="text-4xl font-bold text-red-600 tabular-nums">
                {formatCurrency(primaryLeak.monthly_loss_estimate)}
              </p>
            </div>
          </div>

          {/* What's Really Happening */}
          <div className="bg-white rounded-lg p-6 mb-6">
            <p className="text-slate-700 font-medium mb-4">
              What's really happening:
            </p>
            <ul className="space-y-3 text-sm text-slate-600">
              {story.map((step, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="text-red-500 font-semibold mt-0.5">{i + 1}.</span>
                  <span>{step}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* The Fix */}
          <div className="bg-green-50 border border-green-200 rounded-lg p-6">
            <p className="text-sm font-medium text-green-800 mb-2">
              The Fix:
            </p>
            <p className="text-sm text-green-700">
              {fixDescription}
            </p>
          </div>

        </div>

        {/* Other Leaks (Collapsible) */}
        {otherLeaks.length > 0 && (
          <div className="text-center">
            <Button 
              variant="ghost" 
              onClick={() => setShowOtherLeaks(!showOtherLeaks)}
              className="text-slate-600 hover:text-slate-900"
            >
              <span className="text-sm">
                {showOtherLeaks ? 'Hide' : 'View'} {otherLeaks.length} other revenue leaks
              </span>
              <ChevronDown className={`w-4 h-4 ml-2 transition-transform ${showOtherLeaks ? 'rotate-180' : ''}`} />
            </Button>

            <AnimatePresence>
              {showOtherLeaks && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="mt-6 space-y-4"
                >
                  {otherLeaks.map((leak, i) => (
                    <Card key={i} className="bg-white border-slate-200 text-left hover:shadow-md hover:-translate-y-0.5 transition-all duration-200">
                      <CardContent className="p-5">
                        <div className="flex items-center justify-between">
                          <div className="flex-1">
                            <h4 className="font-semibold text-slate-900 mb-1">{leak.name}</h4>
                            <p className="text-sm text-slate-500">{leak.why}</p>
                          </div>
                          <div className="text-right ml-4">
                            <p className="text-xl font-bold text-red-600 tabular-nums">
                              {formatCurrency(leak.monthly_loss_estimate)}
                            </p>
                            <p className="text-xs text-slate-400">per month</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}

      </div>
    </section>
  );
}

