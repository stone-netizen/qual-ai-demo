import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ROUTES } from '../constants';
import CRMLogos from '../components/CRMLogos';
import {
  fadeInUp,
  fadeIn,
  staggerContainer,
  defaultViewport,
  hoverLift,
  buttonVariants,
} from '../lib/animations';

const HowItWorks: React.FC = () => {
  const steps = [
    {
      number: '01',
      title: 'Lead Capture',
      description:
        'Homeowners searching for HVAC services find your custom pilot landing page. We capture their details instantly using high-intent forms.',
      icon: (
        <svg
          className="w-8 h-8"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122"
          />
        </svg>
      ),
    },
    {
      number: '02',
      title: 'AI Qualification',
      description:
        'Our AI immediately texts the lead to identify their specific problem (Repair, Install, Maintenance) and confirms they are in your service area.',
      icon: (
        <svg
          className="w-8 h-8"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
          />
        </svg>
      ),
    },
    {
      number: '03',
      title: 'Direct Booking',
      description:
        'Qualified leads are presented with your real-time availability. They pick a slot, and it appears on your dispatch calendar automatically.',
      icon: (
        <svg
          className="w-8 h-8"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
          />
        </svg>
      ),
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Hero Section */}
      <section className="bg-navy-950 py-24 text-white text-center">
        <motion.div
          className="max-w-4xl mx-auto px-4"
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
          <motion.h1
            variants={fadeInUp}
            className="text-4xl lg:text-6xl font-bold mb-6 font-heading"
          >
            The Booking Ecosystem
          </motion.h1>
          <motion.p
            variants={fadeInUp}
            className="text-xl text-blue-100 opacity-80 leading-relaxed"
          >
            Eliminating the gap between a "Lead" and a "Customer" with automated
            precision.
          </motion.p>
        </motion.div>
      </section>

      {/* Steps Section */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="grid grid-cols-1 lg:grid-cols-3 gap-12"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={defaultViewport}
          >
            {steps.map((step, idx) => (
              <motion.div
                key={idx}
                variants={fadeInUp}
                whileHover={hoverLift}
                className="relative group"
              >
                <div className="text-8xl font-black text-gray-100 absolute -top-10 -left-4 -z-10 group-hover:text-blue-50 transition-colors">
                  {step.number}
                </div>
                <div className="bg-white p-10 rounded-3xl border border-gray-100 shadow-xl group-hover:shadow-2xl transition-all h-full">
                  <div className="w-16 h-16 bg-navy-900 text-white rounded-2xl flex items-center justify-center mb-8">
                    {step.icon}
                  </div>
                  <h3 className="text-2xl font-bold text-navy-950 mb-4 font-heading">
                    {step.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CRM Integrations */}
      <CRMLogos />

      {/* Transparency Section */}
      <section className="py-24 bg-gray-50 border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={defaultViewport}
          >
            <motion.div variants={fadeInUp}>
              <h2 className="text-3xl font-bold text-navy-950 mb-8 font-heading">
                Full Transparency for HVAC Owners
              </h2>
              <p className="text-gray-600 mb-6 leading-relaxed">
                We believe in simple, operator-first communication. Our system
                provides you with a dashboard where you can see every text
                message and every phone call our AI makes.
              </p>
              <ul className="space-y-4 mb-10">
                <li className="flex gap-3">
                  <div className="w-6 h-6 bg-green-100 text-green-600 rounded-full flex items-center justify-center shrink-0">
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <span className="text-gray-700">
                    Real-time SMS transcripts accessible 24/7
                  </span>
                </li>
                <li className="flex gap-3">
                  <div className="w-6 h-6 bg-green-100 text-green-600 rounded-full flex items-center justify-center shrink-0">
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <span className="text-gray-700">
                    Detailed source tracking (Know exactly which ads work)
                  </span>
                </li>
                <li className="flex gap-3">
                  <div className="w-6 h-6 bg-green-100 text-green-600 rounded-full flex items-center justify-center shrink-0">
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <span className="text-gray-700">
                    No hidden fees or "marketing cloud" markups
                  </span>
                </li>
              </ul>
              <div className="flex flex-wrap gap-4">
                <Link
                  to={ROUTES.CONTACT}
                  className="inline-block bg-navy-900 text-white px-8 py-4 rounded-xl font-bold hover:bg-navy-800 transition-all"
                >
                  Request Pilot Access
                </Link>
                <Link
                  to={ROUTES.DEMO}
                  className="inline-flex items-center gap-2 bg-accent/10 text-accent px-8 py-4 rounded-xl font-bold hover:bg-accent/20 transition-all"
                >
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3z" />
                    <path d="M17 11c0 2.76-2.24 5-5 5s-5-2.24-5-5H5c0 3.53 2.61 6.43 6 6.92V21h2v-3.08c3.39-.49 6-3.39 6-6.92h-2z" />
                  </svg>
                  Try Voice Demo
                </Link>
              </div>
            </motion.div>

            <motion.div
              variants={fadeIn}
              className="bg-navy-900 rounded-[3rem] p-12 shadow-2xl"
            >
              <div className="space-y-6">
                <div className="flex gap-4 items-start">
                  <div className="w-10 h-10 rounded-full bg-blue-500 shrink-0"></div>
                  <div className="bg-navy-800 p-4 rounded-2xl rounded-tl-none text-white text-sm max-w-[80%]">
                    Hi! I noticed you were looking for AC repair in Austin.
                    Would you like to check our tech's availability for today?
                  </div>
                </div>
                <div className="flex gap-4 items-start justify-end">
                  <div className="bg-blue-600 p-4 rounded-2xl rounded-tr-none text-white text-sm max-w-[80%]">
                    Yes, it stopped blowing cold an hour ago. Do you have
                    anything around 2pm?
                  </div>
                  <div className="w-10 h-10 rounded-full bg-gray-500 shrink-0"></div>
                </div>
                <div className="flex gap-4 items-start">
                  <div className="w-10 h-10 rounded-full bg-blue-500 shrink-0"></div>
                  <div className="bg-navy-800 p-4 rounded-2xl rounded-tl-none text-white text-sm max-w-[80%]">
                    We have a 2:30pm slot open with our senior tech. I've sent a
                    calendar link to your email to confirm!
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </motion.div>
  );
};

export default HowItWorks;
