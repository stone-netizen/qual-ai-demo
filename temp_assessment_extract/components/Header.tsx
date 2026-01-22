
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="sticky top-0 z-50 bg-white border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-[#003399] rounded-xl flex items-center justify-center shadow-lg">
            <span className="text-white font-black text-xl">Q</span>
          </div>
          <div className="flex flex-col -space-y-1">
            <span className="text-xl font-black tracking-tighter text-slate-900 uppercase">QualAI</span>
            <span className="text-[10px] font-black tracking-widest text-[#0062FF] uppercase">Diagnostic Toolkit</span>
          </div>
        </div>
        
        <div className="hidden md:flex items-center gap-4">
          <div className="px-4 py-1.5 bg-green-50 text-green-700 text-[10px] font-black uppercase tracking-widest rounded-full border border-green-100">
            System Online
          </div>
          <div className="h-8 w-px bg-slate-100 mx-2"></div>
          <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Internal Access Only</span>
        </div>
      </div>
    </header>
  );
};

export default Header;
