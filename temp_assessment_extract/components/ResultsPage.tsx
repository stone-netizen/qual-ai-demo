
import React from 'react';
import { AssessmentResult } from '../types';
import { BOOKING_URL } from '../constants';

interface ResultsPageProps {
  result: AssessmentResult;
  onReset: () => void;
}

const ResultsPage: React.FC<ResultsPageProps> = ({ result, onReset }) => {
  const { bracket, score, isNearMiss, categoryScores } = result;

  // Configuration for the checklists to allow dynamic highlighting
  const checklistConfig = {
    HIGH: [
      { label: "$8K+ avg ticket", key: 'ticketSize' as const, minScore: 2 },
      { label: "40-60%+ close rate", key: 'closeRate' as const, minScore: 2 },
      { label: "40-60%+ margins", key: 'margins' as const, minScore: 2 },
      { label: "$150-$250 service rate", key: 'serviceRate' as const, minScore: 2 },
      { label: "<15 min follow-up", key: 'followUp' as const, minScore: 2 },
    ],
    MID: [
      { label: "$5K-$7K avg ticket", key: 'ticketSize' as const, minScore: 1 },
      { label: "20-40% close rate", key: 'closeRate' as const, minScore: 1 },
      { label: "30-40% margins", key: 'margins' as const, minScore: 1 },
      { label: "$100-$150 service rate", key: 'serviceRate' as const, minScore: 1 },
      { label: "15-60 min follow-up", key: 'followUp' as const, minScore: 1 },
    ],
    LOW: [
      { label: "Under $5K avg ticket", key: 'ticketSize' as const, minScore: 0 },
      { label: "<20% close rate", key: 'closeRate' as const, minScore: 0 },
      { label: "<30% margins", key: 'margins' as const, minScore: 0 },
      { label: "<$100 service rate", key: 'serviceRate' as const, minScore: 0 },
      { label: "1-2+ hr follow-up", key: 'followUp' as const, minScore: 0 },
    ]
  };

  // Diagnostic mapping for logic and resource allocation
  const diagnosticFactors = [
    {
      label: "Average Ticket Size",
      score: categoryScores.ticketSize,
      current: categoryScores.ticketSize === 2 ? "$8k+" : categoryScores.ticketSize === 1 ? "$5k-$7k" : "<$5k",
      target: "$8k+",
      resource: "Upselling Playbook",
      recommendation: "Implement our Upselling Playbook tailored to the offers we run to bundle high-SEER units and add-ons."
    },
    {
      label: "Profit Margins",
      score: categoryScores.margins,
      current: categoryScores.margins === 2 ? "40-60%+" : categoryScores.margins === 1 ? "30-40%" : "<30%",
      target: "40-60%+",
      resource: "Margin Optimizer",
      recommendation: "Focus on operational efficiency and inventory management to protect the bottom line on high-volume lead flow."
    },
    {
      label: "Close Rate",
      score: categoryScores.closeRate,
      current: categoryScores.closeRate === 2 ? "40-60%+" : categoryScores.closeRate === 1 ? "20-40%" : "<20%",
      target: "40-60%+",
      resource: "Tech Sales Vault",
      recommendation: "Access our Tech Close Rate resources to master on-site presentations and eliminate price-shopping."
    },
    {
      label: "Lead Velocity",
      score: categoryScores.followUp,
      current: categoryScores.followUp === 2 ? "<15 min" : categoryScores.followUp === 1 ? "15-60 min" : "1-2+ hrs",
      target: "<15 min",
      resource: "AI/SMS Booking System",
      recommendation: "We integrate our AI & SMS Booking System for free to automate sub-5 minute follow-ups during the 60-day pilot."
    },
    {
      label: "Service Hourly Rate",
      score: categoryScores.serviceRate,
      current: categoryScores.serviceRate === 2 ? "$150-$250" : categoryScores.serviceRate === 1 ? "$100-$150" : "<$100",
      target: "$150-$250",
      resource: "Pricing Matrix",
      recommendation: "Adjust service call rates to reflect the value of elite technician availability and diagnostic expertise."
    },
    {
      label: "Ad Spend Readiness",
      score: categoryScores.adSpend,
      current: categoryScores.adSpend === 2 ? "$1,500+" : categoryScores.adSpend === 1 ? "$500-$1k" : "Unwilling",
      target: "$1,500+",
      resource: "Scaling Strategy",
      recommendation: "Confidence in sales and margins leads to higher ad spend, which saturates local search volume."
    }
  ];

  const leaks = diagnosticFactors.filter(f => f.score < 2);

  const renderChecklist = (items: typeof checklistConfig.HIGH, tier: 'HIGH' | 'MID' | 'LOW') => {
    return items.map((item, i) => {
      const currentScore = categoryScores[item.key];
      const isBottleneck = (tier === 'LOW' && currentScore === 0) || (tier === 'MID' && currentScore === 1);
      const isActiveTier = bracket === tier;

      // Conditional styles based on tier highlight color
      const highlightBg = tier === 'MID' ? 'bg-yellow-50' : 'bg-red-50';
      const highlightBorder = tier === 'MID' ? 'border-yellow-200' : 'border-red-200';
      const highlightRing = tier === 'MID' ? 'ring-yellow-500' : 'ring-red-500';
      const highlightText = tier === 'MID' ? 'text-yellow-600' : 'text-red-600';
      const highlightLabelText = tier === 'MID' ? 'text-yellow-900' : 'text-red-900';

      return (
        <div 
          key={i} 
          className={`flex items-center gap-3 p-2 rounded-lg transition-all duration-500 ${
            isActiveTier && isBottleneck 
              ? `${highlightBg} border ${highlightBorder} shadow-sm scale-[1.02] ring-1 ${highlightRing}` 
              : 'text-slate-700'
          }`}
        >
          <span className={`${
            isActiveTier && isBottleneck ? highlightText : tier === 'LOW' ? 'text-red-500' : tier === 'MID' ? 'text-yellow-500' : 'text-green-500'
          } text-xl font-black`}>
            {tier === 'LOW' ? '✕' : '✓'}
          </span>
          <div className="flex flex-col">
            <span className={`font-bold text-sm ${isActiveTier && isBottleneck ? highlightLabelText : ''}`}>
              {item.label}
            </span>
            {isActiveTier && isBottleneck && (
              <span className={`text-[10px] font-black uppercase ${highlightText} tracking-tighter`}>
                Fix Immediately to Rank Up
              </span>
            )}
          </div>
        </div>
      );
    });
  };

  const renderRecommendationSection = () => {
    const nextBracketLabel = bracket === 'LOW' ? 'MID-TIER' : 'HIGH PROFIT';
    
    return (
      <div className={`mt-8 bg-slate-900 text-white rounded-[2.5rem] p-8 md:p-12 shadow-2xl relative overflow-hidden`}>
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/10 blur-[120px] rounded-full -mr-48 -mt-48"></div>
        
        <div className="relative z-10 flex flex-col lg:flex-row gap-12 items-center">
          <div className="flex-1 space-y-6">
            <h3 className="text-4xl font-black tracking-tighter leading-none">
              The Path to {bracket === 'HIGH' ? 'Market Dominance' : nextBracketLabel}
            </h3>
            
            {isNearMiss ? (
              <div className="space-y-4">
                <p className="text-xl font-medium text-blue-200 italic">
                  "You're straddling brackets—which is actually great. It means you're one dial turn away from qualifying for better terms."
                </p>
                <div className="grid grid-cols-1 gap-4">
                  <div className="p-6 bg-white/5 border border-white/10 rounded-2xl">
                    <h4 className="text-blue-400 font-black uppercase text-xs mb-2 tracking-widest">Option A: Conditional Upgrade</h4>
                    <p className="font-bold text-lg">Hit your target avg ticket in Month 1, and we'll drop the cut from 50% to 30% immediately.</p>
                  </div>
                  <div className="p-6 bg-white/5 border border-white/10 rounded-2xl">
                    <h4 className="text-blue-400 font-black uppercase text-xs mb-2 tracking-widest">Option B: Performance Trial</h4>
                    <p className="font-bold text-lg">Run the 60-day pilot on the Mid-Tier model. Beat the expectations, and you move up automatically.</p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                <p className="text-lg text-slate-400 font-medium">
                  We've identified {leaks.length} core leaks in your current operation. During our <span className="text-white font-bold">60-Day Pilot</span>, we don't just send leads—we deploy the systems to fix these gaps.
                </p>
                <div className="bg-blue-600/20 border border-blue-500/30 p-6 rounded-2xl">
                  <p className="text-blue-100 font-black text-xl mb-1">QualAI Pilot Guarantee:</p>
                  <p className="text-blue-200 font-bold italic">10 Booked Appointments Guaranteed. You don't pay us until you get paid.</p>
                </div>
              </div>
            )}

            <div className="pt-4">
               <a 
                href={BOOKING_URL} 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 px-10 py-5 bg-[#0062FF] text-white font-black rounded-2xl hover:bg-blue-600 transition-all uppercase tracking-widest shadow-xl group"
              >
                Book Pilot Onboarding
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </a>
            </div>
          </div>

          <div className="flex-1 w-full space-y-4">
            <div className="bg-white/5 p-8 rounded-3xl border border-white/10 backdrop-blur-sm">
              <h4 className="text-[#00D1FF] font-black uppercase text-sm mb-6 tracking-widest flex items-center gap-2">
                <span className="w-2 h-2 bg-[#00D1FF] rounded-full"></span>
                Integrated Systems Included
              </h4>
              <ul className="space-y-6">
                <li className="flex gap-4">
                  <div className="w-10 h-10 bg-blue-600 rounded-lg flex-shrink-0 flex items-center justify-center font-black">AI</div>
                  <div>
                    <p className="font-black text-white">AI & SMS Booking Integration</p>
                    <p className="text-sm text-slate-400 font-medium">Free setup during pilot to ensure no lead is left behind.</p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <div className="w-10 h-10 bg-slate-800 rounded-lg flex-shrink-0 flex items-center justify-center font-black">PB</div>
                  <div>
                    <p className="font-black text-white">The Upselling Playbook</p>
                    <p className="text-sm text-slate-400 font-medium">Step-by-step tech scripts to raise ticket value by 20-30%.</p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <div className="w-10 h-10 bg-slate-800 rounded-lg flex-shrink-0 flex items-center justify-center font-black">SV</div>
                  <div>
                    <p className="font-black text-white">Sales Conversion Vault</p>
                    <p className="text-sm text-slate-400 font-medium">Proprietary close-rate resources for your technicians.</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="w-full max-w-[1400px] mx-auto animate-in fade-in duration-700 pb-24 px-4">
      {/* Dynamic Header */}
      <div className="bg-[#003399] text-white py-14 px-6 rounded-t-[3rem] text-center shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-blue-500/20 blur-[100px] rounded-full -mr-40 -mt-40"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-blue-400/10 blur-[100px] rounded-full -ml-40 -mb-40"></div>
        
        <h1 className="text-5xl md:text-6xl font-black uppercase tracking-tight mb-6 relative z-10">QUALIFICATION MATRIX</h1>
        <div className="flex flex-col md:flex-row items-center justify-center gap-6 relative z-10">
          <div className="flex items-center gap-4">
            <span className="text-slate-400 font-bold uppercase tracking-widest text-sm">Bracket Result:</span>
            <span className={`px-6 py-2 rounded-xl bg-white font-black text-xl shadow-2xl ${
              bracket === 'HIGH' ? 'text-green-600' : bracket === 'MID' ? 'text-yellow-600' : 'text-red-600'
            }`}>
              {bracket === 'HIGH' ? 'HIGH PROFIT' : bracket === 'MID' ? 'MID-TIER' : 'NOT QUALIFIED'}
            </span>
          </div>
          <div className="h-10 w-px bg-white/20 hidden md:block"></div>
          <div className="flex items-center gap-2">
            <span className="text-slate-400 font-bold uppercase tracking-widest text-sm">Score:</span>
            <span className="text-3xl font-black text-[#00D1FF]">{score}/12</span>
          </div>
        </div>
      </div>

      {/* Main Matrix Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-0 border-x border-b border-slate-200 bg-white rounded-b-[3rem] overflow-hidden shadow-2xl">
        {/* HIGH PROFIT */}
        <div className={`flex flex-col border-r border-slate-100 transition-all duration-700 ${bracket !== 'HIGH' ? 'opacity-30 grayscale scale-[0.97]' : 'z-10 shadow-2xl scale-100 ring-8 ring-green-500/20 ring-inset'}`}>
          <div className="bg-green-700 text-white p-8 text-center flex flex-col items-center">
            <span className="font-black text-2xl uppercase">📈 HIGH PROFIT</span>
            <span className="text-[10px] font-black text-green-100/60 uppercase tracking-[0.2em] mt-1">Top 5% of HVAC Companies</span>
          </div>
          <div className="p-10 flex flex-col h-full space-y-10">
            <div className="text-center space-y-4">
              <div className="space-y-1">
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">Option 1: We Fund Ads</span>
                <p className="text-6xl font-black text-green-700">30%</p>
                <p className="text-sm font-bold text-slate-500">of profit per deal</p>
              </div>
              <div className="text-slate-200 font-black text-2xl">OR</div>
              <div className="space-y-1">
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">Option 2: You Fund Ads</span>
                <p className="text-6xl font-black text-slate-900">20%</p>
                <p className="text-sm font-bold text-slate-500">of profit per deal</p>
              </div>
            </div>
            <div className="pt-8 border-t border-slate-100 space-y-3 flex-grow">
              {renderChecklist(checklistConfig.HIGH, 'HIGH')}
            </div>
            {bracket === 'HIGH' && (
               <a 
                href={BOOKING_URL} 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-full py-5 bg-green-600 text-white rounded-2xl font-black text-lg hover:bg-green-700 transition-all text-center uppercase tracking-widest shadow-xl shadow-green-200"
              >
                Book High-Profit Onboarding
              </a>
            )}
          </div>
        </div>

        {/* MID TIER */}
        <div className={`flex flex-col border-r border-slate-100 transition-all duration-700 ${bracket !== 'MID' ? 'opacity-30 grayscale scale-[0.97]' : 'z-10 shadow-2xl scale-100 ring-8 ring-yellow-500/20 ring-inset'}`}>
          <div className="bg-yellow-500 text-white p-8 text-center flex flex-col items-center">
            <span className="font-black text-2xl uppercase">💰 MID-TIER</span>
            <span className="text-[10px] font-black text-yellow-100/60 uppercase tracking-[0.2em] mt-1">Top 25% of HVAC Companies</span>
          </div>
          <div className="p-10 flex flex-col h-full space-y-10">
            <div className="text-center space-y-4">
              <div className="space-y-1">
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">Option 1: We Fund Ads</span>
                <p className="text-6xl font-black text-yellow-600">50%</p>
                <p className="text-sm font-bold text-slate-500">of profit per deal</p>
              </div>
              <div className="text-slate-200 font-black text-2xl">OR</div>
              <div className="space-y-1">
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">Option 2: You Fund Ads</span>
                <p className="text-6xl font-black text-slate-900">30%</p>
                <p className="text-sm font-bold text-slate-500">of profit per deal</p>
              </div>
            </div>
            <div className="pt-8 border-t border-slate-100 space-y-3 flex-grow">
              {renderChecklist(checklistConfig.MID, 'MID')}
            </div>
            {bracket === 'MID' && (
               <a 
                href={BOOKING_URL} 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-full py-5 bg-yellow-500 text-white rounded-2xl font-black text-lg hover:bg-yellow-600 transition-all text-center uppercase tracking-widest shadow-xl shadow-yellow-100"
              >
                Book Mid-Tier Onboarding
              </a>
            )}
          </div>
        </div>

        {/* NOT QUALIFIED */}
        <div className={`flex flex-col transition-all duration-700 ${bracket !== 'LOW' ? 'opacity-30 grayscale scale-[0.97]' : 'z-10 shadow-2xl scale-100 ring-8 ring-red-500/20 ring-inset'}`}>
          <div className="bg-slate-800 text-white p-8 text-center flex flex-col items-center">
            <span className="font-black text-2xl uppercase">🚫 LOW TIER</span>
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mt-1">70% of HVAC Companies</span>
          </div>
          <div className="p-10 flex flex-col h-full space-y-10">
            <div className="bg-red-50 p-8 rounded-3xl border-2 border-dashed border-red-200 text-center space-y-4">
              <span className="text-[10px] font-black text-red-400 uppercase tracking-[0.3em]">Sole Qualification</span>
              <div className="space-y-1">
                <span className="text-xs font-black bg-slate-900 text-white px-3 py-1 rounded uppercase mb-2 inline-block">Option 2 Only</span>
                <p className="text-6xl font-black text-red-600">30%</p>
                <p className="text-sm font-bold text-red-900/60 leading-tight">Must Front Ad Spend<br/>of profit per deal</p>
              </div>
            </div>
            <div className="space-y-3 flex-grow">
              {renderChecklist(checklistConfig.LOW, 'LOW')}
            </div>
            {bracket === 'LOW' && (
               <a 
                href={BOOKING_URL} 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-full py-5 bg-slate-800 text-white rounded-2xl font-black text-lg hover:bg-slate-900 transition-all text-center uppercase tracking-widest shadow-xl"
              >
                Book Pilot Strategy Session
              </a>
            )}
          </div>
        </div>
      </div>

      {/* Strategic Recommendation Section */}
      {renderRecommendationSection()}

      <div className="mt-16 flex flex-col items-center gap-6">
        <button 
          onClick={onReset}
          className="px-16 py-6 bg-slate-900 text-white font-black rounded-2xl hover:bg-slate-800 transition-all uppercase tracking-widest flex items-center gap-4 shadow-2xl hover:scale-[1.02] active:scale-[0.98]"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          Restart Diagnostic
        </button>
        <p className="text-xs font-black text-slate-300 uppercase tracking-widest">QualAI Internal Systems Diagnostic v2.4</p>
      </div>
    </div>
  );
};

export default ResultsPage;
