
import React, { useState, useEffect } from 'react';
import { AuditData, CalculationResult, LeadChannel } from '../../lib/audit-types';
import { ArrowLeft, CheckCircle2, Check, Loader2 } from 'lucide-react';
import { LABELS, INDUSTRY_CONFIGS, CHANNEL_LABELS } from '../../lib/audit-constants';
import { Button } from '../ui/button';
import { Progress } from '../ui/progress';
import { Badge } from '../ui/badge';

interface Props {
  data: AuditData;
  setData: React.Dispatch<React.SetStateAction<AuditData>>;
  onFinish: () => void;
  results: CalculationResult;
}

const Calculator: React.FC<Props> = ({ data, setData, onFinish, results }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [compiling, setCompiling] = useState(false);
  const config = INDUSTRY_CONFIGS[data.industry];

  const updateData = (key: keyof AuditData, value: AuditData[keyof AuditData]) => {
    setData(prev => ({ ...prev, [key]: value }));
  };

  const toggleChannel = (channel: LeadChannel) => {
    const current = data.channels || [];
    const updated = current.includes(channel)
      ? current.filter(c => c !== channel)
      : [...current, channel];
    updateData('channels', updated);
  };

  const next = () => {
    if (currentStep < 7) setCurrentStep(prev => prev + 1);
    else onFinish();
  };

  const prev = () => {
    if (currentStep > 0) setCurrentStep(prev => prev - 1);
  };

  // Auto-advance on step 8 (compiling step)
  useEffect(() => {
    if (currentStep === 7 && !compiling) {
      setCompiling(true);
    }
  }, [currentStep, compiling]);

  useEffect(() => {
    if (compiling) {
      const timer = setTimeout(() => {
        onFinish();
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [compiling, onFinish]);

  const questions = [
    {
      title: 'Leak Identification',
      description: '"Someone reaches out via phone or DM but doesn\'t get an instant response—by the time your team follows up, they\'ve already moved on."',
      component: (
        <div className="space-y-6">
          <div className="grid grid-cols-1 gap-3">
            {(['rarely', 'sometimes', 'often', 'very-often', 'all-time'] as const).map(opt => (
              <button
                key={opt}
                onClick={() => updateData('missedCallsFreq', opt)}
                className={`text-left p-6 rounded-[1.5rem] border-2 transition-all font-bold ${
                  data.missedCallsFreq === opt
                  ? 'bg-blue-50 border-blue-600 text-blue-800 shadow-sm'
                  : 'bg-white border-slate-100 text-slate-500 hover:border-blue-200'
                }`}
              >
                {LABELS[opt]}
              </button>
            ))}
          </div>
          <Button
            onClick={next}
            disabled={!data.missedCallsFreq}
            className="w-full py-6 rounded-[2rem] font-black shadow-lg uppercase tracking-tighter italic text-base"
            size="lg"
          >
            CONTINUE
          </Button>
        </div>
      )
    },
    {
      title: 'Active Channels',
      description: 'Which channels are currently live? Each is a potential point of revenue failure.',
      component: (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {(Object.entries(CHANNEL_LABELS) as [LeadChannel, string][]).map(([key, label]) => (
              <button
                key={key}
                onClick={() => toggleChannel(key)}
                className={`flex items-center justify-between p-5 rounded-[1.5rem] border-2 transition-all font-bold text-sm ${
                  data.channels.includes(key)
                  ? 'bg-blue-50 border-blue-600 text-blue-800'
                  : 'bg-white border-slate-100 text-slate-500 hover:border-slate-200'
                }`}
              >
                <span>{label}</span>
                <div className={`w-5 h-5 rounded-lg border-2 flex items-center justify-center ${data.channels.includes(key) ? 'bg-blue-600 border-blue-600' : 'border-slate-200'}`}>
                  {data.channels.includes(key) && <Check className="w-3.5 h-3.5 text-white" />}
                </div>
              </button>
            ))}
          </div>
          <Button
            onClick={next}
            disabled={data.channels.length === 0}
            className="w-full py-6 rounded-[2rem] font-black shadow-lg uppercase tracking-tighter italic text-base"
            size="lg"
          >
            CONTINUE AUDIT
          </Button>
        </div>
      )
    },
    {
      title: 'Response Velocity',
      description: `When a ${config.customerType} reaches out, how fast is your standard engagement?`,
      component: (
        <div className="space-y-6">
          <div className="space-y-4">
            {(['under-5', '5-30', '30-120', '2-6h', '6h-plus'] as const).map(opt => (
              <button
                key={opt}
                onClick={() => updateData('responseTime', opt)}
                className={`w-full text-left p-6 rounded-[1.5rem] border-2 font-bold transition-all ${
                  data.responseTime === opt
                  ? 'bg-blue-50 border-blue-600 text-blue-800 shadow-sm'
                  : 'bg-white border-slate-100 text-slate-500 hover:border-blue-200'
                }`}
              >
                {LABELS[opt]}
              </button>
            ))}
          </div>
          <Button
            onClick={next}
            disabled={!data.responseTime}
            className="w-full py-6 rounded-[2rem] font-black shadow-lg uppercase tracking-tighter italic text-base"
            size="lg"
          >
            CONTINUE
          </Button>
        </div>
      )
    },
    {
      title: 'Job Valuation',
      description: `What is the standard revenue per successful ${config.unit} for your firm?`,
      component: (
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {config.jobValueRanges.map(opt => (
              <button
                key={opt.label}
                onClick={() => updateData('jobValue', opt.value)}
                className={`p-6 rounded-[1.5rem] border-2 font-bold transition-all ${
                  data.jobValue === opt.value
                  ? 'bg-blue-50 border-blue-600 text-blue-800 shadow-sm'
                  : 'bg-white border-slate-100 text-slate-500 hover:border-blue-200'
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
          <Button
            onClick={next}
            disabled={data.jobValue === null}
            className="w-full py-6 rounded-[2rem] font-black shadow-lg uppercase tracking-tighter italic text-base"
            size="lg"
          >
            CONTINUE
          </Button>
        </div>
      )
    },
    {
      title: 'Persistence Analysis',
      description: "How many automated touches occur if a lead doesn't book instantly?",
      component: (
        <div className="space-y-6">
          <div className="space-y-4">
            {(['automated', 'manual-1-2', 'one-attempt', 'nothing'] as const).map(opt => (
              <button
                key={opt}
                onClick={() => updateData('followUpProcess', opt)}
                className={`w-full text-left p-6 rounded-[1.5rem] border-2 font-bold transition-all ${
                  data.followUpProcess === opt
                  ? 'bg-blue-50 border-blue-600 text-blue-800 shadow-sm'
                  : 'bg-white border-slate-100 text-slate-500 hover:border-blue-200'
                }`}
              >
                {LABELS[opt]}
              </button>
            ))}
          </div>
          <Button
            onClick={next}
            disabled={!data.followUpProcess}
            className="w-full py-6 rounded-[2rem] font-black shadow-lg uppercase tracking-tighter italic text-base"
            size="lg"
          >
            CONTINUE
          </Button>
        </div>
      )
    },
    {
      title: 'Database Audit',
      description: "Are you actively monetizing your 'Dead Lead Graveyard' through reactivation?",
      component: (
        <div className="space-y-6">
          <div className="space-y-4">
            {(['active', 'occasional', 'manual-slow', 'nothing'] as const).map(opt => (
              <button
                key={opt}
                onClick={() => updateData('reactivationProcess', opt)}
                className={`w-full text-left p-6 rounded-[1.5rem] border-2 font-bold transition-all ${
                  data.reactivationProcess === opt
                  ? 'bg-blue-50 border-blue-600 text-blue-800 shadow-sm'
                  : 'bg-white border-slate-100 text-slate-500 hover:border-blue-200'
                }`}
              >
                {LABELS[opt]}
              </button>
            ))}
          </div>
          <Button
            onClick={next}
            disabled={!data.reactivationProcess}
            className="w-full py-6 rounded-[2rem] font-black shadow-lg uppercase tracking-tighter italic text-base"
            size="lg"
          >
            CONTINUE
          </Button>
        </div>
      )
    },
    {
      title: 'Trust Metrics',
      description: `What is the first thing a client sees when Googling your ${config.label} firm?`,
      component: (
        <div className="space-y-6">
          <div className="space-y-4">
            {(['lots-positive', 'some-mixed', 'few-not-great', 'not-much'] as const).map(opt => (
              <button
                key={opt}
                onClick={() => updateData('googleVisibility', opt)}
                className={`w-full text-left p-6 rounded-[1.5rem] border-2 font-bold transition-all ${
                  data.googleVisibility === opt
                  ? 'bg-blue-50 border-blue-600 text-blue-800 shadow-sm'
                  : 'bg-white border-slate-100 text-slate-500 hover:border-blue-200'
                }`}
              >
                {LABELS[opt]}
              </button>
            ))}
          </div>
          <Button
            onClick={next}
            disabled={!data.googleVisibility}
            className="w-full py-6 rounded-[2rem] font-black shadow-lg uppercase tracking-tighter italic text-base"
            size="lg"
          >
            CONTINUE
          </Button>
        </div>
      )
    },
    {
      title: 'Compiling Your Report...',
      description: 'Analyzing your operational data and building your custom recovery framework.',
      component: (
        <div className="space-y-8">
          <div className="bg-slate-50 p-8 rounded-[2rem] space-y-5 border border-slate-100">
            <div className="flex items-center gap-4 text-slate-900 font-bold">
              <div className="w-8 h-8 rounded-lg bg-white shadow-sm flex items-center justify-center text-blue-600"><CheckCircle2 className="w-5 h-5" /></div>
              <span>Omnichannel Shield Framework</span>
            </div>
            <div className="flex items-center gap-4 text-slate-900 font-bold">
              <div className="w-8 h-8 rounded-lg bg-white shadow-sm flex items-center justify-center text-blue-600"><CheckCircle2 className="w-5 h-5" /></div>
              <span>Sub-60s Response Blueprint</span>
            </div>
            <div className="flex items-center gap-4 text-slate-900 font-bold">
              <div className="w-8 h-8 rounded-lg bg-white shadow-sm flex items-center justify-center text-blue-600"><CheckCircle2 className="w-5 h-5" /></div>
              <span>CRM Reactivation Sequence</span>
            </div>
          </div>
          <div className="flex items-center justify-center gap-3 text-blue-600 font-bold">
            <Loader2 className="w-5 h-5 animate-spin" />
            <span>Generating financial report...</span>
          </div>
        </div>
      )
    }
  ];

  const current = questions[currentStep];
  const progress = ((currentStep + 1) / questions.length) * 100;

  return (
    <div className="p-8 md:p-12 flex flex-col min-h-[750px]">
      <div className="mb-12">
        <div className="flex justify-between items-center mb-4">
          <Badge variant="outline" className="text-[10px] font-black text-blue-600 tracking-[0.3em] uppercase border-blue-100 bg-blue-50">
            Audit Module
          </Badge>
          <span className="text-[10px] font-bold text-slate-400">{Math.round(progress)}% Complete</span>
        </div>
        <Progress value={progress} className="h-2" />
      </div>

      <div className="flex-grow">
        <h2 className="text-3xl font-black text-slate-900 mb-3 uppercase tracking-tighter italic">{current.title}</h2>
        <p className="text-slate-500 mb-10 text-lg leading-relaxed font-medium">{current.description}</p>
        {current.component}
      </div>

      <div className="mt-12 flex items-center justify-between pt-8 border-t border-slate-50">
        <button
          onClick={prev}
          disabled={currentStep === 0}
          className={`flex items-center gap-2 font-bold uppercase text-[10px] tracking-widest ${currentStep === 0 ? 'text-slate-200' : 'text-slate-400 hover:text-blue-600 transition-colors'}`}
        >
          <ArrowLeft className="w-3 h-3" /> Back
        </button>
        <span className="text-[10px] text-slate-300 font-black uppercase tracking-widest">Question {currentStep + 1} / 8</span>
      </div>
    </div>
  );
};

export default Calculator;
