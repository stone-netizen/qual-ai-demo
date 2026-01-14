
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { BRAND, ROUTES } from '../constants';

const VSLSection: React.FC = () => {
  const navigate = useNavigate();

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
    <div className="w-full max-w-5xl mx-auto">
      <div className="bg-white rounded-[2.5rem] shadow-2xl overflow-hidden border border-gray-100">
        {/* Booking / Calendar Area */}
        <div className="p-8 md:p-16 lg:p-20">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-navy-950 mb-6 font-heading tracking-tight">Schedule Your Evaluation</h2>
            <p className="text-gray-500 text-lg max-w-xl mx-auto font-medium">Evaluation takes ~15 minutes. We review territory eligibility and pilot capacity.</p>
          </div>

          {/* Actual Calendar Embed */}
          <div className="w-full h-full min-h-[600px] flex flex-col items-center justify-center bg-white rounded-2xl overflow-hidden relative z-10">
            <iframe
              src="https://api.leadconnectorhq.com/widget/booking/86t1nPwKPa3V1sqBmr8t"
              style={{ width: '100%', height: '100%', border: 'none', minHeight: '600px' }}
              scrolling="no"
              id="KVsQQEIJsSSxH58TiFpy_1768363774576"
              title="Booking Calendar"
            />
          </div>
          {/* Script for resizing/interaction handling */}
          <script src="https://link.msgsndr.com/js/form_embed.js" type="text/javascript"></script>

          {/* Compliance Disclosure */}
          <div className="mt-16 max-w-2xl mx-auto px-8 py-6 bg-gray-50/50 rounded-2xl border border-gray-100">
            <p className="text-[10px] leading-relaxed text-gray-400 text-center uppercase tracking-wider font-bold mb-2">A2P 10DLC Compliance Disclosure</p>
            <p className="text-[11px] leading-relaxed text-gray-500 text-center italic">
              By scheduling, you agree to receive automated messages from {BRAND.name} regarding this inquiry. Msg/data rates apply. Reply STOP to opt out.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VSLSection;
