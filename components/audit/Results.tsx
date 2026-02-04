
import React, { useEffect } from 'react';
import { CalculationResult, AuditData } from '../../lib/audit-types';
import { TrendingDown, Clock, MousePointer2, Ghost, CheckCircle, ShieldAlert, ArrowDown } from 'lucide-react';
import { LABELS, INDUSTRY_CONFIGS } from '../../lib/audit-constants';
import { Card, CardContent } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Separator } from '../ui/separator';

interface Props {
  results: CalculationResult;
  data: AuditData;
}

const Results: React.FC<Props> = ({ results, data }) => {
  const config = INDUSTRY_CONFIGS[data.industry];
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  });

  // Load LeadConnector form embed script
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://link.msgsndr.com/js/form_embed.js';
    script.async = true;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const scrollToCalendar = () => {
    const el = document.getElementById('calendar');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const cards = [
    {
      title: 'Omnichannel Leakage',
      tag: 'LEAK #1',
      icon: <MousePointer2 className="w-5 h-5 text-red-500" />,
      loss: results.omnichannelLoss,
      context: `Happening "${data.missedCallsFreq}" across acquisition points.`,
    },
    {
      title: 'Speed-to-Lead Gap',
      tag: 'LEAK #2',
      icon: <Clock className="w-5 h-5 text-blue-600" />,
      loss: results.speedToLeadLoss,
      context: `Current speed "${data.responseTime ? LABELS[data.responseTime] : 'unknown'}" costs conversion rate.`,
    },
    {
      title: 'Follow-Up Failure',
      tag: 'LEAK #3',
      icon: <TrendingDown className="w-5 h-5 text-blue-600" />,
      loss: results.followUpLoss,
      context: 'Missing the 5-7 touch nurture benchmark kills ROI.',
    },
    {
      title: 'CRM Graveyard',
      tag: 'GAP #4',
      icon: <Ghost className="w-5 h-5 text-slate-400" />,
      loss: results.reactivationLoss,
      context: 'Recoverable profit identified in your existing database.',
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Hero */}
        <div className="text-center mb-12">
          <Badge variant="outline" className="bg-red-50 border-red-100 text-red-600 font-black text-[10px] uppercase tracking-[0.3em] mb-6 inline-flex items-center gap-2 px-4 py-1">
            <ShieldAlert className="w-3.5 h-3.5 text-red-500" />
            Critical Revenue Loss
          </Badge>
          <h2 className="text-4xl font-black text-slate-900 leading-tight uppercase tracking-tighter italic">
            REVENUE <span className="text-blue-600">LEAKAGE</span> REPORT
          </h2>
          <p className="text-slate-400 mt-2 font-bold uppercase text-[10px] tracking-widest">Client Sector: {config.label}</p>
        </div>

        {/* Total Loss Section */}
        <div className="bg-blue-600 rounded-[3.5rem] p-12 text-center shadow-2xl shadow-blue-600/20 relative overflow-hidden mb-8">
          <div className="relative z-10">
            <p className="text-blue-100 font-black uppercase tracking-[0.5em] text-[10px] mb-8">TOTAL MONTHLY LOSS</p>
            <div className="text-7xl md:text-9xl font-black text-white mb-8 tracking-tighter italic leading-none">
              {formatter.format(results.totalMonthly)}
            </div>

            <div className="bg-white/10 text-white px-10 py-4 rounded-2xl border border-white/20 inline-block mb-10 backdrop-blur-sm">
              <span className="text-3xl font-black tracking-tighter uppercase italic">
                {formatter.format(results.totalAnnual)} LEAKING / YR
              </span>
            </div>

            <p className="text-blue-100 text-sm font-bold max-w-sm mx-auto uppercase tracking-widest leading-relaxed">
              "Your lead flow has structural failures. Qual AI identifies and patches these gaps automatically."
            </p>
          </div>

          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-black/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>
        </div>

        {/* Primary CTA */}
        <div className="text-center mb-12">
          <Button
            onClick={scrollToCalendar}
            size="lg"
            className="group bg-slate-900 hover:bg-black text-white font-black py-8 px-12 rounded-[3rem] text-2xl shadow-xl transition-all transform hover:scale-[1.02] active:scale-95 uppercase tracking-tighter italic"
          >
            Book My Recovery Call
            <ArrowDown className="w-6 h-6 ml-3 group-hover:translate-y-1 transition-transform" />
          </Button>
        </div>

        <Separator className="my-8" />

        {/* Loss Cards */}
        <div className="space-y-6 mb-16">
          {cards.map((card, idx) => (
            <Card key={idx} className="rounded-[2.5rem] hover:shadow-xl hover:shadow-blue-600/5 transition-all group overflow-hidden border-slate-100">
              <CardContent className="p-8 relative">
                <Badge variant="secondary" className="absolute top-4 right-4 text-[10px] font-black uppercase tracking-[0.4em] text-slate-400 italic bg-slate-100 border-0">
                  {card.tag}
                </Badge>

                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                  <div className="flex items-center gap-5">
                    <div className="w-14 h-14 bg-slate-50 rounded-2xl shadow-sm flex items-center justify-center group-hover:bg-white">
                      {card.icon}
                    </div>
                    <div>
                      <h3 className="font-black text-slate-900 text-xl uppercase tracking-tighter italic">{card.title}</h3>
                      <p className="text-slate-500 text-xs font-medium max-w-xs mt-1 leading-relaxed">{card.context}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-3xl font-black text-red-500 tracking-tighter italic">
                      -{formatter.format(card.loss)}
                      <span className="text-[10px] text-slate-400 ml-1 italic">/MO</span>
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Separator className="my-8" />

        {/* Video Embed Section */}
        <div className="mb-16">
          <h3 className="text-2xl font-black text-slate-900 text-center mb-6 uppercase tracking-tighter italic">
            Here's How We <span className="text-blue-600">Plug These Leaks</span>
          </h3>
          <div className="max-w-3xl mx-auto">
            <div className="bg-slate-100 rounded-3xl p-1.5 shadow-xl">
              <div className="relative aspect-video bg-slate-900 rounded-[1.25rem] overflow-hidden">
                <iframe
                  src="about:blank"
                  title="How we plug revenue leaks"
                  className="w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </div>
            <p className="text-center text-slate-400 text-sm mt-4 italic">
              Video walkthrough of the Qual AI recovery system
            </p>
          </div>
        </div>

        <Separator className="my-8" />

        {/* Calendar Embed Section */}
        <div id="calendar" className="mb-16">
          <h3 className="text-2xl font-black text-slate-900 text-center mb-6 uppercase tracking-tighter italic">
            Book Your <span className="text-blue-600">Recovery Call</span>
          </h3>
          <div className="bg-white rounded-3xl shadow-lg border border-slate-100 overflow-hidden">
            <iframe
              src="https://api.leadconnectorhq.com/widget/booking/86t1nPwKPa3V1sqBmr8t"
              title="Book a recovery call"
              className="w-full border-0"
              style={{ minHeight: '600px' }}
              scrolling="no"
            />
          </div>
          <p className="text-center text-slate-400 text-xs mt-4">
            By booking, you agree to receive SMS/MMS messages. Msg & data rates may apply. Reply STOP to opt out.
            This service complies with A2P 10DLC messaging regulations.
          </p>
        </div>

        {/* Trust Footer */}
        <div className="flex flex-wrap items-center justify-center gap-10 text-slate-400 font-black uppercase tracking-[0.3em] text-[10px] mb-8">
          <span className="flex items-center gap-3"><CheckCircle className="w-4 h-4 text-blue-600" /> Lead Flow Logic</span>
          <span className="flex items-center gap-3"><CheckCircle className="w-4 h-4 text-blue-600" /> Profit Recovery</span>
          <span className="flex items-center gap-3"><CheckCircle className="w-4 h-4 text-blue-600" /> Trust Matrix</span>
        </div>

        <footer className="text-center text-slate-400 text-[10px] font-black uppercase tracking-[0.3em] pb-20 md:pb-8">
          Qual AI &copy; {new Date().getFullYear()} • Plug The Leak
        </footer>
      </div>

      {/* Sticky Mobile CTA */}
      <div className="fixed bottom-0 left-0 right-0 md:hidden bg-white/90 backdrop-blur-sm border-t border-slate-200 p-4 z-50">
        <Button
          onClick={scrollToCalendar}
          className="w-full font-black py-6 rounded-2xl text-base uppercase tracking-tighter italic shadow-lg"
          size="lg"
        >
          Book My Recovery Call
        </Button>
      </div>
    </div>
  );
};

export default Results;
