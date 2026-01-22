
import React, { useState } from 'react';
import AssessmentStep from './components/AssessmentStep';
import ResultsPage from './components/ResultsPage';
import { QUESTIONS } from './constants';
import { AssessmentResult, BracketType } from './types';

enum FunnelStep {
  DASHBOARD,
  ASSESSMENT,
  RESULTS
}

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<FunnelStep>(FunnelStep.DASHBOARD);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [result, setResult] = useState<AssessmentResult | null>(null);

  const handleStart = () => {
    setCurrentView(FunnelStep.ASSESSMENT);
    setQuestionIndex(0);
    setAnswers([]);
    setResult(null);
  };

  const calculateBracket = (score: number): BracketType => {
    if (score >= 10) return 'HIGH';
    if (score >= 6) return 'MID';
    return 'LOW';
  };

  const handleAnswer = (points: number) => {
    const newAnswers = [...answers, points];
    setAnswers(newAnswers);

    if (questionIndex < QUESTIONS.length - 1) {
      setQuestionIndex(prev => prev + 1);
    } else {
      const totalScore = newAnswers.reduce((acc, curr) => acc + curr, 0);
      const bracket = calculateBracket(totalScore);
      
      // Detect "Near Miss" - one point away from the next bracket
      const isNearMiss = totalScore === 5 || totalScore === 9;

      setResult({
        score: totalScore,
        bracket: bracket,
        isNearMiss: isNearMiss,
        categoryScores: {
          ticketSize: newAnswers[0],
          margins: newAnswers[1],
          closeRate: newAnswers[2],
          followUp: newAnswers[3],
          serviceRate: newAnswers[4],
          adSpend: newAnswers[5]
        }
      });
      setCurrentView(FunnelStep.RESULTS);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleReset = () => {
    setResult(null);
    setCurrentView(FunnelStep.DASHBOARD);
    setQuestionIndex(0);
    setAnswers([]);
  };

  return (
    <div className="min-h-screen flex flex-col bg-white font-['Inter']">
      <main className="flex-grow flex flex-col">
        {currentView === FunnelStep.DASHBOARD && (
          <section className="flex-grow flex items-center justify-center px-4 py-20">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-slate-100 text-slate-800 rounded-lg text-sm font-black mb-8 tracking-widest uppercase border border-slate-200">
                QualAI Internal Closer Toolkit
              </div>
              <h1 className="text-6xl md:text-8xl font-black text-slate-900 tracking-tighter leading-[0.9] mb-10">
                HVAC CLIENT <br/>
                <span className="text-[#0062FF]">QUALIFICATION</span>
              </h1>
              <p className="text-xl md:text-2xl text-slate-500 mb-12 max-w-2xl mx-auto font-medium">
                Diagnostic tool for determining partnership tiers based on ticket size, margins, and operational capacity.
              </p>
              <div className="space-y-6">
                <button 
                  onClick={handleStart}
                  className="group relative inline-flex items-center gap-4 px-12 py-6 bg-slate-900 text-white rounded-2xl font-black text-2xl hover:bg-slate-800 transition-all shadow-2xl active:scale-95 uppercase tracking-tighter"
                >
                  Launch Diagnostic
                  <svg className="w-8 h-8 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </button>
              </div>
            </div>
          </section>
        )}

        {(currentView === FunnelStep.ASSESSMENT || currentView === FunnelStep.RESULTS) && (
          <section className={`flex-grow px-4 ${currentView === FunnelStep.RESULTS ? 'py-8 md:py-12' : 'py-20 md:py-32'}`}>
            <div className={currentView === FunnelStep.RESULTS ? 'w-full' : 'max-w-5xl mx-auto'}>
              {currentView === FunnelStep.ASSESSMENT && (
                <AssessmentStep 
                  question={QUESTIONS[questionIndex]}
                  currentStep={questionIndex + 1}
                  totalSteps={QUESTIONS.length}
                  onAnswer={handleAnswer}
                />
              )}
              {currentView === FunnelStep.RESULTS && result && (
                <ResultsPage result={result} onReset={handleReset} />
              )}
            </div>
          </section>
        )}
      </main>
    </div>
  );
};

export default App;
