
import React from 'react';
import VSLSection from '../components/VSLSection';
import { BRAND } from '../constants';

const Contact: React.FC = () => {

  React.useEffect(() => {
    const script = document.createElement('script');
    script.src = "https://link.msgsndr.com/js/form_embed.js";
    script.async = true;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div className="animate-in fade-in duration-700">
      <section className="bg-gray-50 py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-start mb-12">
            <h1 className="text-4xl lg:text-5xl font-bold text-navy-950 mb-2 font-heading tracking-tight">Get Started with QualAI</h1>
            <p className="text-xl text-gray-600">
              Join thousands getting marketing insights via SMS
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
            {/* Left Column - 40% */}
            <div className="lg:col-span-5 p-8 bg-blue-50 border border-blue-100 rounded-3xl">
              <div className="flex items-center gap-2 mb-8">
                <div className="w-10 h-10 bg-navy-900 rounded flex items-center justify-center">
                  <span className="text-white font-bold text-xl">Q</span>
                </div>
                <span className="text-2xl font-bold tracking-tight text-navy-950 font-heading">
                  Qual <span className="text-[#2180E8] text-lg">AI</span>
                </span>
              </div>
              <h3 className="text-2xl font-bold text-blue-900 mb-8 font-heading">Contact QualAI</h3>

              <div className="space-y-8">
                <div>
                  <h4 className="text-sm font-bold text-blue-800 uppercase tracking-widest mb-1">Phone</h4>
                  <p className="text-navy-900 font-bold text-lg">{BRAND.supportPhone}</p>
                  <p className="text-blue-700 text-sm">Monday-Friday, 9 AM - 5 PM PST</p>
                </div>

                <div>
                  <h4 className="text-sm font-bold text-blue-800 uppercase tracking-widest mb-1">Email</h4>
                  <p className="text-navy-900 font-bold text-lg">{BRAND.supportEmail}</p>
                  <p className="text-blue-700 text-sm">Average response time: 24 hours</p>
                </div>

                <div>
                  <h4 className="text-sm font-bold text-blue-800 uppercase tracking-widest mb-1">Address</h4>
                  <p className="text-navy-900 font-medium text-lg leading-relaxed">{BRAND.address}</p>
                  <p className="text-navy-900 font-medium text-lg leading-relaxed">United States</p>
                </div>

                <div className="pt-6 border-t border-blue-200">
                  <h4 className="text-sm font-bold text-blue-800 uppercase tracking-widest mb-2">Questions about SMS?</h4>
                  <p className="text-blue-900 font-medium">Reply HELP to any message for instant support</p>
                  <p className="text-blue-900 font-medium">Reply STOP to unsubscribe at any time</p>
                </div>
              </div>
            </div>

            {/* Right Column - 60% */}
            <div className="lg:col-span-7 space-y-6">
              <div className="bg-white rounded-[2rem] shadow-lg p-8 border border-gray-100">
                <div className="mb-6">
                  <h3 className="text-2xl font-bold text-navy-950 mb-2 font-heading">Opt-In for SMS Updates</h3>
                  <p className="text-gray-500 text-sm">Sign up to receive exclusive marketing insights, special offers, and service updates via SMS. We respect your privacy and will never share your number.</p>
                </div>

                {/* Message & Data Rates Disclosure Box */}
                <div className="bg-gray-100 border-2 border-gray-300 rounded-xl p-6 mb-6">
                  <p className="text-navy-950 font-bold text-sm mb-3">
                    📱 Message & Data Rates Disclosure
                  </p>
                  <p className="text-gray-700 text-sm leading-relaxed mb-3">
                    By opting in below, you consent to receive recurring automated marketing text messages from QualAI at the phone number provided. Consent is not a condition of purchase. Message frequency varies. Message & data rates may apply. Reply HELP for help or STOP to cancel.
                  </p>
                  <p className="text-gray-600 text-xs italic">
                    By opting in below, you acknowledge receipt of this disclosure and agree to our <a href="/terms" className="text-blue-600 underline">Terms of Service</a> and <a href="/privacy" className="text-blue-600 underline">Privacy Policy</a>.
                  </p>
                </div>

                <iframe
                  src="https://api.leadconnectorhq.com/widget/form/02d8zYtPNibOOpOUKhSf"
                  style={{ width: '100%', height: '100%', border: 'none', borderRadius: '3px' }}
                  id="inline-02d8zYtPNibOOpOUKhSf"
                  data-layout="{'id':'INLINE'}"
                  data-trigger-type="alwaysShow"
                  data-trigger-value=""
                  data-activation-type="alwaysActivated"
                  data-activation-value=""
                  data-deactivation-type="neverDeactivate"
                  data-deactivation-value=""
                  data-form-name="Pilot Discovery"
                  data-height="946"
                  data-layout-iframe-id="inline-02d8zYtPNibOOpOUKhSf"
                  data-form-id="02d8zYtPNibOOpOUKhSf"
                  title="Pilot Discovery"
                />
              </div>

              {/* FAQ Section */}
              <div className="bg-white rounded-[2rem] shadow-lg p-8 border border-gray-100">
                <h3 className="text-2xl font-bold text-navy-950 mb-6 font-heading">Frequently Asked Questions</h3>
                <div className="space-y-6">
                  <div>
                    <h4 className="font-bold text-navy-900 mb-2">Q: How often will I receive messages?</h4>
                    <p className="text-gray-600">Frequency varies by promotions and campaigns. You'll only receive relevant updates and offers.</p>
                  </div>
                  <div>
                    <h4 className="font-bold text-navy-900 mb-2">Q: How do I unsubscribe?</h4>
                    <p className="text-gray-600">Reply STOP to any message and you'll be unsubscribed within one business day.</p>
                  </div>
                  <div>
                    <h4 className="font-bold text-navy-900 mb-2">Q: Is my information secure?</h4>
                    <p className="text-gray-600">Yes. All transmissions are encrypted and secure. We never sell your personal information.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
