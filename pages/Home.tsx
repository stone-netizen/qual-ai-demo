
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../constants';

const Home: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="animate-in fade-in duration-700">
      {/* Hero Section with Inline Form */}
      <section className="relative pt-16 pb-24 lg:pt-24 lg:pb-32 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Left: Headline + Value Prop */}
            <div className="lg:pt-12">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-green-50 text-green-700 rounded-full text-xs font-bold uppercase tracking-wider mb-6">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-600"></span>
                </span>
                Taking on 3 more companies this month
              </div>

              <h1 className="text-4xl lg:text-6xl font-bold text-navy-950 leading-[1.1] mb-6 font-heading">
                10 Qualified $49 Diagnostic Appointments <span className="text-accent">Every Month</span>
              </h1>

              <p className="text-xl text-gray-700 mb-8 leading-relaxed font-medium">
                You only pay when appointments convert to closed, profitable jobs—<span className="text-navy-950 font-bold">zero upfront cost, no retainer, no contract.</span>
              </p>

              {/* Risk Reversal Badges */}
              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="flex items-center gap-3 p-4 bg-white rounded-xl border border-gray-200 shadow-sm">
                  <svg className="w-6 h-6 text-green-600 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" /></svg>
                  <div>
                    <div className="font-bold text-navy-950 text-sm">$0 Upfront</div>
                    <div className="text-xs text-gray-500">No setup fees</div>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-4 bg-white rounded-xl border border-gray-200 shadow-sm">
                  <svg className="w-6 h-6 text-green-600 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" /></svg>
                  <div>
                    <div className="font-bold text-navy-950 text-sm">$0 Retainer</div>
                    <div className="text-xs text-gray-500">No monthly fees</div>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-4 bg-white rounded-xl border border-gray-200 shadow-sm">
                  <svg className="w-6 h-6 text-green-600 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" /></svg>
                  <div>
                    <div className="font-bold text-navy-950 text-sm">Pay on Results</div>
                    <div className="text-xs text-gray-500">Only when jobs close</div>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-4 bg-white rounded-xl border border-gray-200 shadow-sm">
                  <svg className="w-6 h-6 text-green-600 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" /></svg>
                  <div>
                    <div className="font-bold text-navy-950 text-sm">Cancel Anytime</div>
                    <div className="text-xs text-gray-500">30 days notice</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Simplified CTA */}
            <div className="lg:sticky lg:top-24">
              <div className="bg-white rounded-2xl shadow-2xl border border-gray-200 p-8 text-center">
                <h2 className="text-2xl font-bold text-navy-950 mb-4 font-heading">Schedule Your Qualification Call</h2>
                <p className="text-gray-600 text-sm mb-8 leading-relaxed">
                  See if your territory is available and if you qualify for our 10 diagnostic/month guarantee.
                </p>

                <button
                  onClick={() => navigate(ROUTES.CONTACT)}
                  className="w-full bg-navy-900 text-white py-4 rounded-xl font-bold hover:bg-navy-800 transition-all shadow-xl text-lg mb-4"
                >
                  Get Your Qualification Call →
                </button>

                <p className="text-xs text-gray-500">
                  No credit card required • Zero obligation
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="py-16 bg-white border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-sm font-bold text-gray-400 uppercase tracking-[0.2em]">Trusted by HVAC Companies Nationwide</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center p-6 bg-gray-50 rounded-2xl">
              <div className="text-4xl font-bold text-accent mb-2">10</div>
              <div className="text-sm text-gray-600 font-medium">Qualified Appointments/Month</div>
            </div>
            <div className="text-center p-6 bg-gray-50 rounded-2xl">
              <div className="text-4xl font-bold text-accent mb-2">40-60%</div>
              <div className="text-sm text-gray-600 font-medium">Diagnostic-to-Job Conversion</div>
            </div>
            <div className="text-center p-6 bg-gray-50 rounded-2xl">
              <div className="text-4xl font-bold text-accent mb-2">60 Sec</div>
              <div className="text-sm text-gray-600 font-medium">Average Response Time</div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works - 3 Steps */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-navy-950 mb-4 font-heading">How It Works</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">Three simple steps. You focus on closing jobs, we handle everything else.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="relative p-8 bg-white rounded-2xl border border-gray-200 shadow-sm">
              <div className="absolute -top-4 -left-4 w-12 h-12 bg-accent text-white rounded-full flex items-center justify-center font-bold text-xl shadow-lg">1</div>
              <h3 className="text-xl font-bold text-navy-950 mb-4 font-heading mt-4">You Get Qualified Leads</h3>
              <p className="text-gray-600 leading-relaxed">
                We deliver 10 qualified $49 diagnostic appointments per month. Every lead is pre-qualified via AI voice and SMS before it hits your calendar.
              </p>
            </div>

            <div className="relative p-8 bg-white rounded-2xl border border-gray-200 shadow-sm">
              <div className="absolute -top-4 -left-4 w-12 h-12 bg-accent text-white rounded-full flex items-center justify-center font-bold text-xl shadow-lg">2</div>
              <h3 className="text-xl font-bold text-navy-950 mb-4 font-heading mt-4">Your Techs Close Jobs</h3>
              <p className="text-gray-600 leading-relaxed">
                Use our proven upselling resources to maximize conversion. We provide scripts, training materials, and best practices to help your team close more.
              </p>
            </div>

            <div className="relative p-8 bg-white rounded-2xl border border-gray-200 shadow-sm">
              <div className="absolute -top-4 -left-4 w-12 h-12 bg-accent text-white rounded-full flex items-center justify-center font-bold text-xl shadow-lg">3</div>
              <h3 className="text-xl font-bold text-navy-950 mb-4 font-heading mt-4">You Pay When Jobs Close</h3>
              <p className="text-gray-600 leading-relaxed">
                Choose: 20% profit share (you pay ad spend) or 30% profit share (we pay ad spend). Either way, you only pay when appointments convert to profitable jobs.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Risk Reversal Section */}
      <section className="py-24 bg-navy-950 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-navy-900 to-navy-950 opacity-50"></div>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 font-heading">Zero Risk. All Upside.</h2>
            <p className="text-xl text-blue-200">We eat our own cooking. If we don't deliver results, we don't get paid.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-8 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20"><path d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" /></svg>
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">$0 Upfront Cost</h3>
                  <p className="text-blue-200 leading-relaxed">No setup fees, no onboarding costs, no hidden charges. We start delivering appointments immediately.</p>
                </div>
              </div>
            </div>

            <div className="p-8 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20"><path d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" /></svg>
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">$0 Monthly Retainer</h3>
                  <p className="text-blue-200 leading-relaxed">No monthly fees, no minimum commitment. You're not locked into paying us unless we deliver results.</p>
                </div>
              </div>
            </div>

            <div className="p-8 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20"><path d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" /></svg>
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Pay Only When Jobs Close</h3>
                  <p className="text-blue-200 leading-relaxed">We share in your success. If the appointments don't convert to profitable jobs, you don't pay us a dime.</p>
                </div>
              </div>
            </div>

            <div className="p-8 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20"><path d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" /></svg>
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Cancel Anytime</h3>
                  <p className="text-blue-200 leading-relaxed">Not happy? Give us 30 days notice and walk away. No penalties, no questions asked.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ - Objection Handling */}
      <section className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-navy-950 mb-12 text-center font-heading">Questions HVAC Owners Actually Ask</h2>
          <div className="space-y-6">
            <div className="p-8 rounded-2xl border border-gray-200 bg-gray-50">
              <h4 className="font-bold text-navy-900 mb-3 text-lg">What if the appointments don't convert?</h4>
              <p className="text-gray-600 leading-relaxed">
                Then you don't pay us. We only get paid when appointments convert to closed, profitable jobs. If your techs can't close them, we share that risk with you. That's why we provide upselling resources and training to maximize your conversion rates.
              </p>
            </div>

            <div className="p-8 rounded-2xl border border-gray-200 bg-gray-50">
              <h4 className="font-bold text-navy-900 mb-3 text-lg">How is this different from a marketing agency?</h4>
              <p className="text-gray-600 leading-relaxed">
                Marketing agencies charge you a retainer whether they deliver results or not. We don't. We're not just running ads—we're delivering qualified, booked appointments via AI voice and SMS. And we only get paid when those appointments turn into profitable jobs. We're incentivized to make you money, not just spend your budget.
              </p>
            </div>

            <div className="p-8 rounded-2xl border border-gray-200 bg-gray-50">
              <h4 className="font-bold text-navy-900 mb-3 text-lg">What if I can't handle the volume?</h4>
              <p className="text-gray-600 leading-relaxed">
                That's a good problem to have, but we'll work with you. We can throttle the volume up or down based on your capacity. The goal is sustainable growth, not overwhelming your team. If you need to scale up slowly, we'll adjust the appointment flow accordingly.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-red-50 text-red-700 rounded-full text-sm font-bold uppercase tracking-wider mb-6">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" /></svg>
            Limited Availability
          </div>

          <h2 className="text-4xl lg:text-5xl font-bold text-navy-950 mb-6 font-heading">
            We're Taking On 3 More HVAC Companies This Month
          </h2>

          <p className="text-xl text-gray-600 mb-10 leading-relaxed max-w-2xl mx-auto">
            We limit how many companies we work with per market to ensure quality and prevent saturation. If you're ready to add 10 qualified appointments per month with zero risk, let's talk.
          </p>

          <button
            onClick={() => navigate(ROUTES.CONTACT)}
            className="inline-block bg-navy-900 text-white px-12 py-5 rounded-xl font-bold hover:bg-navy-800 transition-all shadow-2xl text-lg"
          >
            See If You Qualify →
          </button>

          <p className="text-sm text-gray-500 mt-6">
            No credit card required • 30-second qualification • Zero obligation
          </p>
        </div>
      </section>
    </div>
  );
};

export default Home;
