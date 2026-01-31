import React from 'react';
import { motion } from 'framer-motion';
import {
  fadeInUp,
  fadeIn,
  staggerContainer,
  scaleIn,
} from '../lib/animations';

const PostBooking: React.FC = () => {
  return (
    <motion.div
      className="bg-navy-950 min-h-screen"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              'radial-gradient(circle at 1px 1px, white 1px, transparent 0)',
            backgroundSize: '32px 32px',
          }}
        />
      </div>

      <div className="relative py-12 md:py-20 px-4 sm:px-6">
        <motion.div
          className="max-w-4xl mx-auto"
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
          {/* Success Icon */}
          <motion.div
            variants={scaleIn}
            className="flex justify-center mb-8"
          >
            <div className="w-16 h-16 bg-accent rounded-2xl flex items-center justify-center shadow-lg shadow-accent/30">
              <svg
                className="w-8 h-8 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2.5}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
          </motion.div>

          {/* Headline */}
          <motion.div variants={fadeInUp} className="text-center mb-10">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 font-heading leading-tight">
              You're Confirmed
            </h1>
            <p className="text-blue-200 text-lg">
              Watch this before our call
            </p>
          </motion.div>

          {/* Video Player */}
          <motion.div
            variants={fadeInUp}
            className="relative mb-12 group"
          >
            <div className="absolute -inset-1 bg-gradient-to-r from-accent to-blue-400 rounded-2xl md:rounded-3xl blur opacity-20 group-hover:opacity-30 transition duration-500" />
            <div className="relative bg-black rounded-xl md:rounded-2xl overflow-hidden shadow-2xl">
              <div className="aspect-video">
                <video
                  controls
                  className="w-full h-full object-cover"
                  poster="/video-thumbnail.jpg"
                  playsInline
                  ref={(video) => {
                    if (video) {
                      video.playbackRate = 1.25;
                    }
                  }}
                >
                  <source
                    src="https://nsettu1cw1vbtxot.public.blob.vercel-storage.com/copy_8D75FEF7-1701-4148-9D6C-DC742D5A1034.mp4"
                    type="video/mp4"
                  />
                  Your browser does not support the video tag.
                </video>
              </div>
            </div>
          </motion.div>

          {/* Info Cards */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mb-12"
            variants={staggerContainer}
          >
            <motion.div
              variants={fadeInUp}
              className="p-6 md:p-8 bg-white/5 backdrop-blur-sm rounded-xl md:rounded-2xl border border-white/10"
            >
              <h3 className="text-sm font-semibold text-accent uppercase tracking-wider mb-4">
                What We'll Cover
              </h3>
              <ul className="space-y-3">
                {[
                  'Your current lead generation setup',
                  'Service area and capacity',
                  'Integration with your CRM',
                  'Performance expectations',
                ].map((item, idx) => (
                  <li
                    key={idx}
                    className="flex gap-3 items-start text-sm text-blue-100"
                  >
                    <svg
                      className="w-5 h-5 text-accent flex-shrink-0 mt-0.5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              variants={fadeInUp}
              className="p-6 md:p-8 bg-white/5 backdrop-blur-sm rounded-xl md:rounded-2xl border border-white/10"
            >
              <h3 className="text-sm font-semibold text-accent uppercase tracking-wider mb-4">
                Before the Call
              </h3>
              <p className="text-blue-100 text-sm leading-relaxed mb-4">
                Have the following ready so we can determine fit quickly:
              </p>
              <ul className="space-y-2 text-sm text-blue-200">
                <li>• Current dispatch capacity</li>
                <li>• Service area boundaries</li>
                <li>• Average ticket value</li>
              </ul>
            </motion.div>
          </motion.div>

          {/* Footer Note */}
          <motion.div
            variants={fadeIn}
            className="text-center pb-8"
          >
            <p className="text-blue-300/60 text-sm">
              A calendar invite has been sent to your email.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default PostBooking;
