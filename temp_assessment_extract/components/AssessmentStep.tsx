
import React from 'react';
import { Question } from '../types';

interface AssessmentStepProps {
  question: Question;
  currentStep: number;
  totalSteps: number;
  onAnswer: (points: number) => void;
}

const AssessmentStep: React.FC<AssessmentStepProps> = ({ question, currentStep, totalSteps, onAnswer }) => {
  const progress = (currentStep / totalSteps) * 100;

  return (
    <div className="max-w-3xl mx-auto w-full">
      <div className="mb-16">
        <div className="flex justify-between items-end mb-4">
          <span className="text-xs font-black text-slate-400 uppercase tracking-[0.2em]">Diagnostic Progress: {currentStep}/{totalSteps}</span>
          <span className="text-xs font-black text-[#0062FF] uppercase tracking-[0.2em]">{Math.round(progress)}%</span>
        </div>
        <div className="h-4 w-full bg-slate-100 rounded-full overflow-hidden p-1 border border-slate-200">
          <div 
            className="h-full bg-gradient-to-r from-[#0062FF] to-[#00D1FF] transition-all duration-700 ease-out rounded-full" 
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <div className="space-y-12 animate-in fade-in slide-in-from-bottom-8 duration-700">
        <h2 className="text-5xl md:text-6xl font-black text-slate-900 leading-[0.95] tracking-tighter">
          {question.text}
        </h2>
        
        <div className="grid gap-5">
          {question.options.map((option, idx) => (
            <button
              key={idx}
              onClick={() => onAnswer(option.points)}
              className="group flex items-center justify-between p-8 bg-white border-4 border-slate-100 rounded-3xl hover:border-[#0062FF] hover:shadow-[0_20px_40px_rgba(0,98,255,0.1)] transition-all text-left"
            >
              <span className="text-2xl font-black text-slate-700 group-hover:text-[#0062FF] tracking-tight">
                {option.label}
              </span>
              <div className="w-8 h-8 rounded-full border-4 border-slate-200 group-hover:border-[#0062FF] flex items-center justify-center transition-all bg-white group-active:scale-90">
                <div className="w-3 h-3 rounded-full bg-[#0062FF] opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AssessmentStep;
