import React from 'react';
import { ArrowRight, Play, PhoneMissed, Clock, Database, ShieldCheck, Zap, Lock } from 'lucide-react';
import { Button } from '../ui/button';
import { Card, CardContent } from '../ui/card';
import { Badge } from '../ui/badge';

interface Props {
  onStart: () => void;
}

const LeakAuditLanding: React.FC<Props> = ({ onStart }) => {
  return (
    <div className="bg-white min-h-screen">
      {/* Hero Section */}
      <div className="px-8 md:px-12 lg:px-16 pt-6 pb-4 md:pt-8 md:pb-6 text-center">
        {/* Headline */}
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 leading-tight mb-6">
          Your Business Is Leaking Revenue.
          <br />
          <span className="text-blue-600">Want to Know Where?</span>
        </h1>

        {/* Subheadline */}
        <p className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto mb-10 leading-relaxed">
          9 out of 10 service businesses lose thousands in missed calls, slow replies, and unmonetized leads.
          <span className="font-semibold text-slate-800"> This free audit shows what it's costing you.</span>
        </p>

        {/* Primary CTA */}
        <Button
          onClick={onStart}
          size="lg"
          className="group bg-blue-600 hover:bg-blue-700 text-white font-bold py-6 px-14 rounded-2xl text-2xl shadow-2xl shadow-blue-600/30 transition-all transform hover:scale-[1.02] active:scale-95 mb-2"
        >
          Start My Leak Audit
          <ArrowRight className="w-6 h-6 ml-2 group-hover:translate-x-1 transition-transform" />
        </Button>

        <p className="text-slate-400 text-sm font-medium">
          Takes 90 seconds. No sign-up needed.
        </p>

        {/* Trust Icons */}
        <div className="flex flex-wrap items-center justify-center gap-6 mt-4 text-slate-400 text-xs font-bold uppercase tracking-wider">
          <span className="flex items-center gap-2">
            <Lock className="w-4 h-4 text-blue-600" /> Private
          </span>
          <span className="flex items-center gap-2">
            <Zap className="w-4 h-4 text-blue-600" /> Instant
          </span>
          <span className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-blue-600" /> No Sales Pitch
          </span>
        </div>
      </div>

      {/* Video Section */}
      <div className="px-8 md:px-12 lg:px-16 pb-8">
        <div className="max-w-3xl mx-auto">
          <div className="bg-slate-100 rounded-3xl p-1.5 shadow-xl">
            <div className="relative aspect-video bg-slate-900 rounded-[1.25rem] flex flex-col items-center justify-center group cursor-pointer overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&q=80&w=1200&h=675"
                alt="Audit Explanation"
                className="absolute inset-0 w-full h-full object-cover opacity-30 group-hover:opacity-40 transition-opacity"
              />
              <div className="relative z-10 flex flex-col items-center">
                <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-2xl mb-4 group-hover:scale-110 transition-transform">
                  <Play className="w-8 h-8 text-blue-600 fill-blue-600 ml-1" />
                </div>
                <span className="text-white font-bold text-lg drop-shadow-lg">
                  Watch: Why You're Losing Leads
                </span>
                <span className="text-white/60 text-sm mt-1">1:30</span>
              </div>
            </div>
          </div>
          <p className="text-center text-slate-500 text-sm mt-4 italic">
            "You're not losing leads because your ads suck... you're losing them because the bucket is cracked. We created a system that plugs every leak in your revenue flow using AI follow-up and instant engagement. This quick audit shows how bad the leaks are — and what you'd gain from fixing them."
          </p>
        </div>
      </div>

      {/* Why It Matters Section */}
      <div className="bg-slate-50 px-8 md:px-12 lg:px-16 py-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-black text-slate-900 text-center mb-12">
            Most Business Owners Don't Know What's Missing.
          </h2>

          {/* Leak Points */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <Card className="text-center hover:shadow-lg transition-shadow rounded-2xl">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-red-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <PhoneMissed className="w-8 h-8 text-red-500" />
                </div>
                <h3 className="font-bold text-slate-900 text-lg mb-2">Missed calls / slow replies</h3>
                <p className="text-slate-500 text-sm">Every unanswered call goes straight to your competitor.</p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow rounded-2xl">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-orange-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Database className="w-8 h-8 text-orange-500" />
                </div>
                <h3 className="font-bold text-slate-900 text-lg mb-2">Lost leads in your CRM</h3>
                <p className="text-slate-500 text-sm">Thousands in revenue sitting untouched in your database.</p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow rounded-2xl">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Clock className="w-8 h-8 text-blue-500" />
                </div>
                <h3 className="font-bold text-slate-900 text-lg mb-2">Dead DMs or contact forms</h3>
                <p className="text-slate-500 text-sm">Leads reach out and never hear back in time.</p>
              </CardContent>
            </Card>
          </div>

          <p className="text-center text-slate-600 max-w-2xl mx-auto">
            Whether you're HVAC, roofing, or pest control — the biggest loss isn't ads... it's lead conversion. This audit scans your systems and shows what you're really losing.
          </p>
        </div>
      </div>

      {/* Trust + Final CTA Section */}
      <div className="px-8 md:px-12 lg:px-16 py-16 text-center">
        <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-4">
          Backed by Real Performance Math, Not Guesswork.
        </h2>
        <p className="text-slate-600 max-w-xl mx-auto mb-10 text-lg">
          We don't sell software. We recover lost profit. Our tools are built to show you exactly what's broken — and fix it, without monthly fees or sales fluff.
        </p>

        <Button
          onClick={onStart}
          size="lg"
          className="group bg-slate-900 hover:bg-black text-white font-bold py-5 px-10 rounded-2xl text-xl shadow-xl transition-all transform hover:scale-[1.02] active:scale-95"
        >
          Run My Audit Now
          <ArrowRight className="w-6 h-6 ml-2 group-hover:translate-x-1 transition-transform" />
        </Button>

      </div>

      {/* Footer */}
      <div className="border-t border-slate-100 py-8 text-center">
        <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">
          Qual AI &copy; {new Date().getFullYear()} • Revenue Recovery Systems
        </p>
      </div>
    </div>
  );
};

export default LeakAuditLanding;
