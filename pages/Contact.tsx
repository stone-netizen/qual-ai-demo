import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { BRAND } from '../constants';
import {
  fadeInUp,
  staggerContainer,
  defaultViewport,
  hoverLift,
} from '../lib/animations';

const Contact: React.FC = () => {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://link.msgsndr.com/js/form_embed.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Booking Calendar Section */}
      <section className="bg-gray-50 py-16 md:py-24">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-12"
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
          >
            <motion.h1
              variants={fadeInUp}
              className="text-4xl md:text-5xl font-bold text-navy-950 mb-6 font-heading tracking-tight"
            >
              Schedule Your Evaluation
            </motion.h1>
            <motion.p
              variants={fadeInUp}
              className="text-lg text-gray-600 max-w-xl mx-auto"
            >
              Evaluation takes ~15 minutes. We review territory eligibility and
              pilot capacity.
            </motion.p>
          </motion.div>

          {/* Calendar Embed */}
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100"
          >
            <div className="w-full min-h-[600px] flex flex-col items-center justify-center bg-white overflow-hidden">
              <iframe
                src="https://api.leadconnectorhq.com/widget/booking/86t1nPwKPa3V1sqBmr8t"
                style={{
                  width: '100%',
                  height: '100%',
                  border: 'none',
                  minHeight: '600px',
                }}
                scrolling="no"
                id="booking-calendar-embed"
                title="Booking Calendar"
              />
            </div>
          </motion.div>

          {/* Compliance Disclosure */}
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            className="mt-8 max-w-2xl mx-auto px-6 py-5 bg-white/80 rounded-2xl border border-gray-100"
          >
            <p className="text-[10px] leading-relaxed text-gray-400 text-center uppercase tracking-wider font-bold mb-2">
              A2P 10DLC Compliance Disclosure
            </p>
            <p className="text-[11px] leading-relaxed text-gray-500 text-center">
              By scheduling, you agree to receive automated messages from{' '}
              {BRAND.name} regarding this inquiry. Msg/data rates apply. Reply
              STOP to opt out.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Info Section */}
      <section className="bg-white py-16 border-t border-gray-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-10"
            initial="hidden"
            whileInView="visible"
            viewport={defaultViewport}
            variants={fadeInUp}
          >
            <h2 className="text-2xl font-bold text-navy-950 mb-3 font-heading">
              Other Ways to Reach Us
            </h2>
            <p className="text-gray-600">
              Prefer to reach out directly? We're here to help.
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={defaultViewport}
          >
            <motion.a
              href={`mailto:${BRAND.supportEmail}`}
              variants={fadeInUp}
              whileHover={hoverLift}
              className="p-6 rounded-2xl border border-gray-100 bg-gray-50 text-center group"
            >
              <div className="w-10 h-10 bg-accent/10 rounded-xl flex items-center justify-center mx-auto mb-3 group-hover:bg-accent/20 transition-colors">
                <svg
                  className="w-5 h-5 text-accent"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <div className="text-xs font-semibold text-accent uppercase tracking-wider mb-1">
                Email
              </div>
              <div className="text-navy-950 font-medium text-sm">
                {BRAND.supportEmail}
              </div>
            </motion.a>

            <motion.a
              href={`tel:${BRAND.supportPhone.replace(/\s/g, '')}`}
              variants={fadeInUp}
              whileHover={hoverLift}
              className="p-6 rounded-2xl border border-gray-100 bg-gray-50 text-center group"
            >
              <div className="w-10 h-10 bg-accent/10 rounded-xl flex items-center justify-center mx-auto mb-3 group-hover:bg-accent/20 transition-colors">
                <svg
                  className="w-5 h-5 text-accent"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
              </div>
              <div className="text-xs font-semibold text-accent uppercase tracking-wider mb-1">
                Phone
              </div>
              <div className="text-navy-950 font-medium text-sm">
                {BRAND.supportPhone}
              </div>
            </motion.a>

            <motion.div
              variants={fadeInUp}
              whileHover={hoverLift}
              className="p-6 rounded-2xl border border-gray-100 bg-gray-50 text-center"
            >
              <div className="w-10 h-10 bg-accent/10 rounded-xl flex items-center justify-center mx-auto mb-3">
                <svg
                  className="w-5 h-5 text-accent"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              </div>
              <div className="text-xs font-semibold text-accent uppercase tracking-wider mb-1">
                Headquarters
              </div>
              <div className="text-navy-950 font-medium text-sm">
                Los Angeles, CA
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </motion.div>
  );
};

export default Contact;
