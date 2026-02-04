import React, { useState, useMemo } from 'react';
import LeakAuditLanding from '../components/audit/LeakAuditLanding';
import NicheSelection from '../components/audit/NicheSelection';
import Calculator from '../components/audit/Calculator';
import Results from '../components/audit/Results';
import { AuditStep, AuditData, CalculationResult, Industry } from '../lib/audit-types';
import {
  MISSED_CALL_MAP,
  CHANNEL_MULTIPLIER,
  RESPONSE_TIME_LOSS,
  FOLLOW_UP_LOSS,
  REACTIVATION_GAP,
  REVIEW_LOSS_MODIFIER,
  INDUSTRY_CONFIGS
} from '../lib/audit-constants';

const Audit: React.FC = () => {
  const [step, setStep] = useState<AuditStep>('landing');
  const [data, setData] = useState<AuditData>({
    industry: 'hvac',
    missedCallsFreq: null,
    channels: [],
    responseTime: null,
    followUpProcess: null,
    reactivationProcess: null,
    jobValue: null,
    googleVisibility: null,
  });

  const results: CalculationResult = useMemo(() => {
    const baseMissedNum = data.missedCallsFreq ? MISSED_CALL_MAP[data.missedCallsFreq] : 0;
    const avgJobValue = data.jobValue || 0;
    const baseConversion = 0.4;

    const channelMult = CHANNEL_MULTIPLIER[Math.max(1, Math.min(data.channels.length, 6))];
    const adjustedMissedNum = baseMissedNum * channelMult;
    const omnichannelLoss = adjustedMissedNum * avgJobValue * baseConversion;

    const speedToLeadLoss = data.responseTime ? omnichannelLoss * RESPONSE_TIME_LOSS[data.responseTime] : 0;
    const followUpLoss = data.followUpProcess ? omnichannelLoss * FOLLOW_UP_LOSS[data.followUpProcess] : 0;

    const estimatedDbVolume = (baseMissedNum * 12) * 5;
    const reactivationLoss = estimatedDbVolume * avgJobValue * 0.05 * (data.reactivationProcess ? REACTIVATION_GAP[data.reactivationProcess] : 0.45);

    const reputationLoss = data.googleVisibility ? omnichannelLoss * REVIEW_LOSS_MODIFIER[data.googleVisibility] : 0;

    const totalMonthly = omnichannelLoss + speedToLeadLoss + followUpLoss + (reactivationLoss / 12) + reputationLoss;
    const totalAnnual = totalMonthly * 12;

    return {
      omnichannelLoss,
      speedToLeadLoss,
      followUpLoss,
      reactivationLoss: reactivationLoss / 12,
      reputationLoss,
      totalMonthly,
      totalAnnual,
      missedCallsNum: Math.round(adjustedMissedNum),
      avgJobValue,
    };
  }, [data]);

  const handleLandingStart = () => setStep('niche-selection');

  const handleNicheSelect = (industry: Industry) => {
    setData(prev => ({
      ...prev,
      industry,
      jobValue: INDUSTRY_CONFIGS[industry].jobValueRanges[1].value
    }));
    setStep('questions');
  };

  const handleQuestionsFinished = () => setStep('results');

  // Landing and Results are full-width, others are contained in a card
  if (step === 'landing') {
    return <LeakAuditLanding onStart={handleLandingStart} />;
  }

  if (step === 'results') {
    return <Results results={results} data={data} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex flex-col items-center justify-center p-4 py-12">
      <div className="w-full max-w-2xl bg-white rounded-[2.5rem] shadow-[0_20px_60px_-15px_rgba(0,102,255,0.12)] overflow-hidden border border-slate-100">
        {step === 'niche-selection' && <NicheSelection onSelect={handleNicheSelect} />}
        {step === 'questions' && (
          <Calculator
            data={data}
            setData={setData}
            onFinish={handleQuestionsFinished}
            results={results}
          />
        )}
      </div>

      <footer className="mt-8 text-center text-slate-400 text-[10px] font-black uppercase tracking-[0.3em]">
        Qual AI &copy; {new Date().getFullYear()} • Plug The Leak
      </footer>
    </div>
  );
};

export default Audit;
