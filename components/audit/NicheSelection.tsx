
import React from 'react';
import { Industry } from '../../lib/audit-types';
import { INDUSTRY_CONFIGS } from '../../lib/audit-constants';
import * as Icons from 'lucide-react';
import { Badge } from '../ui/badge';
import { Card } from '../ui/card';

interface Props {
  onSelect: (industry: Industry) => void;
}

const NicheSelection: React.FC<Props> = ({ onSelect }) => {
  return (
    <div className="p-8 md:p-12">
      <div className="text-center mb-10">
        <Badge variant="outline" className="bg-blue-50 border-blue-100 text-blue-700 font-black text-[10px] uppercase tracking-[0.2em] mb-8 inline-flex items-center gap-2 px-4 py-1.5">
          <div className="w-2 h-2 rounded-full bg-blue-600"></div>
          Qual AI Audit
        </Badge>
        <h1 className="text-4xl md:text-5xl font-black text-slate-900 mb-6 leading-tight tracking-tight">
          How Much Revenue Is Your <br/>
          <span className="text-blue-600">Business Leaking?</span>
        </h1>
        <p className="text-lg text-slate-500 font-medium max-w-md mx-auto leading-relaxed">
          Select your industry to begin your customized revenue recovery analysis.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-10">
        {(Object.entries(INDUSTRY_CONFIGS) as [Industry, typeof INDUSTRY_CONFIGS.hvac][]).map(([key, config]) => {
          const IconComponent = (Icons as any)[config.icon];
          return (
            <Card
              key={key}
              className="flex flex-col items-center p-6 rounded-[2rem] border-slate-100 bg-white hover:border-blue-600 hover:shadow-xl hover:shadow-blue-600/5 transition-all group text-center cursor-pointer"
              onClick={() => onSelect(key)}
            >
              <div className="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center mb-4 group-hover:bg-blue-600 group-hover:scale-110 transition-all duration-300">
                <IconComponent className="w-7 h-7 text-slate-400 group-hover:text-white" />
              </div>
              <span className="font-bold text-slate-600 group-hover:text-blue-700 tracking-tight">{config.label}</span>
            </Card>
          );
        })}
      </div>

      <div className="flex justify-center gap-8 py-8 border-t border-slate-50">
        <div className="flex items-center gap-2 text-slate-400 text-[10px] font-black uppercase tracking-[0.2em]">
          <Icons.Zap className="w-4 h-4 text-blue-600" /> Instant Results
        </div>
        <div className="flex items-center gap-2 text-slate-400 text-[10px] font-black uppercase tracking-[0.2em]">
          <Icons.ShieldCheck className="w-4 h-4 text-blue-600" /> Secure Analysis
        </div>
      </div>
    </div>
  );
};

export default NicheSelection;
