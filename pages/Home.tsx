import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ROUTES, MESSAGING } from '../constants';
import CRMLogos from '../components/CRMLogos';
import AnimatedCounter from '../components/AnimatedCounter';
import FAQAccordion from '../components/FAQAccordion';
import FloatingParticles from '../components/FloatingParticles';
import PhoneMockup from '../components/PhoneMockup';
import SocialProofToast from '../components/SocialProofToast';
import StickyCTA from '../components/StickyCTA';
import {
  fadeInUp,
  fadeIn,
  staggerContainer,
  defaultViewport,
  hoverLift,
  buttonVariants,
} from '../lib/animations';

const Home: React.FC = () => {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Social Proof Toast */}
      <SocialProofToast />

      {/* Sticky CTA */}
      <StickyCTA />

      {/* Hero Section */}
      <section className="relative pt-20 pb-24 md:pt-28 md:pb-32 bg-gradient-to-b from-white via-gray-50/30 to-gray-50 overflow-hidden">
        {/* Floating Particles Background */}
        <FloatingParticles />

        <div className="absolute inset-0 opacity-[0.02]">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                'radial-gradient(circle at 1px 1px, navy 1px, transparent 0)',
              backgroundSize: '48px 48px',
            }}
          />
        </div>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          {/* Phone Mockup - Desktop Only */}
          <PhoneMockup />

          <motion.div
            className="text-center max-w-4xl mx-auto lg:text-left lg:max-w-2xl lg:mx-0"
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
          >
            {/* Badge with Trust Signal */}
            <motion.div
              variants={fadeInUp}
              className="inline-flex items-center gap-2 px-4 py-2 bg-navy-950/5 text-navy-900 rounded-full text-xs font-semibold uppercase tracking-wider mb-8"
            >
              <span className="w-2 h-2 bg-accent rounded-full animate-pulse" />
              {MESSAGING.hero.badge}
            </motion.div>

            {/* Headline with Animated Gradient */}
            <motion.h1
              variants={fadeInUp}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold text-navy-950 leading-[1.1] mb-6 font-heading"
            >
              {MESSAGING.hero.headline}{' '}
              <span className="gradient-text-animated">{MESSAGING.hero.headlineAccent}</span>
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              variants={fadeInUp}
              className="text-lg sm:text-xl text-gray-600 mb-10 leading-relaxed max-w-2xl mx-auto lg:mx-0"
            >
              {MESSAGING.hero.subheadline}
            </motion.p>

            {/* CTA */}
            <motion.div variants={fadeInUp} className="mb-12">
              <motion.button
                onClick={() => navigate(ROUTES.CONTACT)}
                className="inline-flex items-center gap-2 bg-navy-900 text-white px-8 py-4 rounded-xl font-semibold text-lg shadow-xl shadow-navy-900/20 hover:bg-navy-800 transition-colors cta-glow"
                variants={buttonVariants}
                initial="idle"
                whileHover="hover"
                whileTap="tap"
              >
                {MESSAGING.cta.primary}
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </motion.button>
              <p className="text-sm text-gray-500 mt-4">
                {MESSAGING.cta.subtext}
              </p>
            </motion.div>

            {/* Value Props Grid - Glass Cards */}
            <motion.div
              className="grid grid-cols-2 md:grid-cols-4 gap-4"
              variants={staggerContainer}
            >
              {MESSAGING.valueProp.map((prop, i) => (
                <motion.div
                  key={i}
                  variants={fadeInUp}
                  whileHover={hoverLift}
                  className="p-4 glass-card rounded-xl"
                >
                  <div className="font-semibold text-navy-950 text-sm">
                    {prop.title}
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    {prop.description}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section with Animated Counters */}
      <section className="py-16 bg-white border-y border-gray-100">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {MESSAGING.stats.map((stat, i) => (
              <AnimatedCounter
                key={i}
                value={stat.value}
                label={stat.label}
                duration={2}
              />
            ))}
          </div>
        </div>
      </section>

      {/* CRM Integrations */}
      <CRMLogos />

      {/* How It Works */}
      <section className="py-20 md:py-28 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={defaultViewport}
            variants={fadeInUp}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-navy-950 mb-4 font-heading">
              How It Works
            </h2>
            <p className="text-lg text-gray-600 max-w-xl mx-auto">
              From lead to closed job—we handle the heavy lifting.
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={defaultViewport}
          >
            {MESSAGING.howItWorks.map((step, i) => (
              <motion.div
                key={i}
                variants={fadeInUp}
                whileHover={hoverLift}
                className="relative p-8 glass-card rounded-2xl"
              >
                <div className="absolute -top-4 left-8 w-8 h-8 bg-accent text-white rounded-lg flex items-center justify-center font-bold text-sm shadow-lg">
                  {i + 1}
                </div>
                <h3 className="text-lg font-bold text-navy-950 mb-3 mt-2 font-heading">
                  {step.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* FAQ Section with Accordion */}
      <section className="py-20 md:py-28 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-12"
            initial="hidden"
            whileInView="visible"
            viewport={defaultViewport}
            variants={fadeInUp}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-navy-950 mb-4 font-heading">
              Common Questions
            </h2>
          </motion.div>

          <FAQAccordion items={MESSAGING.faq} />
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 md:py-28 bg-navy-950 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                'radial-gradient(circle at 1px 1px, white 1px, transparent 0)',
              backgroundSize: '32px 32px',
            }}
          />
        </div>

        <motion.div
          className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative"
          initial="hidden"
          whileInView="visible"
          viewport={defaultViewport}
          variants={staggerContainer}
        >
          <motion.h2
            variants={fadeInUp}
            className="text-3xl md:text-4xl font-bold mb-6 font-heading"
          >
            Ready to Scale?
          </motion.h2>

          <motion.p
            variants={fadeInUp}
            className="text-lg text-blue-100 mb-10 leading-relaxed"
          >
            We partner with select companies ready to grow. No upfront costs, no
            retainers—just results.
          </motion.p>

          <motion.div variants={fadeIn}>
            <motion.button
              onClick={() => navigate(ROUTES.CONTACT)}
              className="inline-flex items-center gap-2 bg-white text-navy-950 px-8 py-4 rounded-xl font-semibold text-lg shadow-xl hover:bg-gray-100 transition-colors"
              variants={buttonVariants}
              initial="idle"
              whileHover="hover"
              whileTap="tap"
            >
              {MESSAGING.cta.primary}
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </motion.button>
          </motion.div>
        </motion.div>
      </section>
    </motion.div>
  );
};

export default Home;
