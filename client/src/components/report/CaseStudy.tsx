/**
 * CaseStudy Component
 * 
 * ONE detailed case study with video placeholder
 * Shows specific numbers and timeline
 * Replaces 3 vague testimonials
 */

import { Play } from "lucide-react";

export function CaseStudy() {
  return (
    <section className="py-16 px-6 bg-slate-50">
      <div className="max-w-4xl mx-auto">
        
        <h2 className="text-3xl font-bold text-slate-900 mb-12 text-center">
          How Dr. Sarah Chen Recovered $180K/Year
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          
          {/* Video / Image Side */}
          <div className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200">
            
            {/* Video Placeholder */}
            <div className="aspect-video bg-gradient-to-br from-slate-200 to-slate-300 flex items-center justify-center cursor-pointer hover:from-slate-300 hover:to-slate-400 transition-colors group">
              <div className="w-20 h-20 bg-white/90 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                <Play className="w-8 h-8 text-slate-700 ml-1" />
              </div>
            </div>
            
            {/* Profile */}
            <div className="p-6">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-14 h-14 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-xl">
                  SC
                </div>
                <div>
                  <p className="font-semibold text-slate-900 text-lg">Dr. Sarah Chen</p>
                  <p className="text-sm text-slate-500">Radiant MedSpa, San Francisco</p>
                </div>
              </div>
              <p className="text-slate-600 italic leading-relaxed">
                "We were losing 30-40 calls a week. Didn't realize how much revenue 
                that was until we saw this report. Implemented the AI receptionist 
                and saw results in the first week."
              </p>
            </div>
          </div>

          {/* Numbers Side */}
          <div className="space-y-8">
            
            {/* The Problem */}
            <div>
              <p className="text-sm text-slate-500 uppercase tracking-wide mb-3 font-medium">
                The Problem
              </p>
              <ul className="space-y-2 text-slate-700">
                <li className="flex items-center gap-3">
                  <span className="w-2 h-2 bg-red-400 rounded-full"></span>
                  35 missed calls/week
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-2 h-2 bg-red-400 rounded-full"></span>
                  2-4 hour response time on web forms
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-2 h-2 bg-red-400 rounded-full"></span>
                  40% contact rate
                </li>
              </ul>
            </div>

            {/* Implementation */}
            <div>
              <p className="text-sm text-slate-500 uppercase tracking-wide mb-3 font-medium">
                Implementation Timeline
              </p>
              <ul className="space-y-2 text-slate-700">
                <li className="flex items-center gap-3">
                  <span className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 text-xs font-bold">1</span>
                  Day 1: AI receptionist activated
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 text-xs font-bold">7</span>
                  Day 7: First measurable results
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 text-xs font-bold">30</span>
                  Day 30: Full optimization complete
                </li>
              </ul>
            </div>

            {/* Results */}
            <div>
              <p className="text-sm text-green-600 uppercase tracking-wide mb-3 font-medium">
                Results After 90 Days
              </p>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white rounded-lg p-4 border border-slate-200 hover:border-slate-300 transition-colors">
                  <p className="text-2xl md:text-3xl font-bold text-slate-900">0</p>
                  <p className="text-xs text-slate-500">Missed calls/week</p>
                </div>
                <div className="bg-white rounded-lg p-4 border border-slate-200 hover:border-slate-300 transition-colors">
                  <p className="text-2xl md:text-3xl font-bold text-slate-900">92%</p>
                  <p className="text-xs text-slate-500">Contact rate</p>
                </div>
                <div className="bg-white rounded-lg p-4 border border-green-200 col-span-2 hover:border-green-300 transition-colors">
                  <p className="text-4xl font-bold text-green-600">+$15K/mo</p>
                  <p className="text-xs text-slate-500">Additional revenue</p>
                </div>
              </div>
            </div>

          </div>

        </div>

        {/* Disclaimer */}
        <p className="text-xs text-slate-400 text-center mt-8">
          Results based on actual client data. Individual results vary based on implementation and market conditions.
        </p>

      </div>
    </section>
  );
}

