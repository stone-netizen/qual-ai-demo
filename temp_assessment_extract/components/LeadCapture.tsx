
import React, { useState } from 'react';

interface LeadCaptureProps {
  onSubmit: (data: { name: string; email: string; phone?: string }) => void;
}

const LeadCapture: React.FC<LeadCaptureProps> = ({ onSubmit }) => {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="max-w-xl mx-auto w-full animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="text-center mb-10">
        <h2 className="text-4xl font-black text-slate-900 mb-4 uppercase tracking-tighter">Client Identification</h2>
        <p className="text-xl text-slate-500 font-medium italic">
          Enter the client's business details to generate the Matrix result.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="bg-white p-10 rounded-[2rem] border-2 border-slate-100 shadow-[0_20px_50px_rgba(0,0,0,0.05)] space-y-8">
        <div>
          <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-3">Business / Owner Name</label>
          <input
            required
            type="text"
            placeholder="e.g. DFW Air Masters"
            className="w-full px-6 py-5 bg-slate-50 border-2 border-slate-100 rounded-2xl focus:outline-none focus:border-[#0062FF] focus:bg-white transition-all text-xl font-bold"
            value={formData.name}
            onChange={e => setFormData({ ...formData, name: e.target.value })}
          />
        </div>

        <div>
          <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-3">Primary Contact Email</label>
          <input
            required
            type="email"
            placeholder="admin@business.com"
            className="w-full px-6 py-5 bg-slate-50 border-2 border-slate-100 rounded-2xl focus:outline-none focus:border-[#0062FF] focus:bg-white transition-all text-xl font-bold"
            value={formData.email}
            onChange={e => setFormData({ ...formData, email: e.target.value })}
          />
        </div>

        <div>
          <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-3">Business Phone (Optional)</label>
          <input
            type="tel"
            placeholder="000-000-0000"
            className="w-full px-6 py-5 bg-slate-50 border-2 border-slate-100 rounded-2xl focus:outline-none focus:border-[#0062FF] focus:bg-white transition-all text-xl font-bold"
            value={formData.phone}
            onChange={e => setFormData({ ...formData, phone: e.target.value })}
          />
        </div>

        <button
          type="submit"
          className="w-full py-6 bg-[#0062FF] text-white rounded-2xl font-black text-2xl hover:bg-blue-700 shadow-xl shadow-blue-500/30 transition-all active:scale-[0.98] uppercase tracking-tighter"
        >
          Generate Matrix Result →
        </button>
      </form>
    </div>
  );
};

export default LeadCapture;
