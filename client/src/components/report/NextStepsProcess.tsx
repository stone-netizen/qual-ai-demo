/**
 * Next Steps Process Section - LEAK-FOCUSED
 * 
 * 3-step visual process - focus on fixing leaks
 */

import { FileText, Settings, Zap } from "lucide-react";

export function NextStepsProcess() {
  return (
    <section className="py-16 px-4 sm:px-8 bg-white">
      <div className="max-w-4xl mx-auto">
        
        <h2 className="text-2xl sm:text-3xl font-bold text-center text-slate-900 mb-12">
          What Happens Next
        </h2>

        <div className="grid sm:grid-cols-3 gap-8 mb-12">
          
          {/* Step 1 */}
          <div className="text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl font-bold text-blue-600">1</span>
            </div>
            <div className="flex items-center justify-center gap-2 mb-3">
              <FileText className="w-5 h-5 text-blue-600" />
              <h3 className="font-semibold text-slate-900">Review Your Leaks</h3>
            </div>
            <p className="text-sm text-slate-600">
              We'll walk through exactly where leads are slipping through and confirm the analysis
            </p>
          </div>

          {/* Step 2 */}
          <div className="text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl font-bold text-blue-600">2</span>
            </div>
            <div className="flex items-center justify-center gap-2 mb-3">
              <Settings className="w-5 h-5 text-blue-600" />
              <h3 className="font-semibold text-slate-900">Create Fix Plan</h3>
            </div>
            <p className="text-sm text-slate-600">
              Get your specific plan to plug the gaps based on your workflow, systems, and team
            </p>
          </div>

          {/* Step 3 */}
          <div className="text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl font-bold text-green-600">3</span>
            </div>
            <div className="flex items-center justify-center gap-2 mb-3">
              <Zap className="w-5 h-5 text-green-600" />
              <h3 className="font-semibold text-slate-900">Plug the Leaks</h3>
            </div>
            <p className="text-sm text-slate-600">
              Same-week activation possible. Start capturing lost leads immediately
            </p>
          </div>

        </div>

        {/* Low Pressure Note */}
        <div className="bg-slate-50 rounded-xl p-6 sm:p-8 text-center border border-slate-200">
          <p className="text-slate-700 mb-4">
            <strong>No pressure, no pitch.</strong> Just a diagnostic call to confirm 
            where leads are leaking and show you exactly how to plug the gaps.
          </p>
          <p className="text-sm text-slate-500">
            30 minutes • No commitment • Free leak analysis
          </p>
        </div>

      </div>
    </section>
  );
}
