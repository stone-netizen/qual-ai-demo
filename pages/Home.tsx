import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { ROUTES, MESSAGING } from '../constants';
import CRMLogos from '../components/CRMLogos';
import AnimatedCounter from '../components/AnimatedCounter';
import FAQAccordion from '../components/FAQAccordion';
import FloatingParticles from '../components/FloatingParticles';
import PhoneMockup from '../components/PhoneMockup';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import {
  fadeInUp,
  fadeIn,
  staggerContainer,
  defaultViewport,
  hoverLift,
} from '../lib/animations';

const Home: React.FC = () => {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >

      {/* Hero Section */}
      <section className="relative pt-10 md:pt-14 pb-[380px] sm:pb-[430px] md:pb-[500px] bg-white overflow-hidden">
        {/* Floating Particles Background */}
        <FloatingParticles />

        {/* Content - Centered */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-30">
          <motion.div
            className="text-center"
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
          >
            {/* Badge with Trust Signal */}
            <motion.div variants={fadeInUp} className="mb-8">
              <Badge
                variant="secondary"
                className="bg-navy-950/5 text-navy-900 px-4 py-2 text-xs font-semibold uppercase tracking-wider"
              >
                <span className="w-2 h-2 bg-accent rounded-full animate-pulse mr-2" />
                {MESSAGING.hero.badge}
              </Badge>
            </motion.div>

            {/* Headline with Animated Gradient - tighter line height */}
            <motion.h1
              variants={fadeInUp}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-navy-950 leading-[1.1] mb-8"
            >
              {MESSAGING.hero.headline}{' '}
              <span className="gradient-text-animated gradient-text-hover">{MESSAGING.hero.headlineAccent}</span>
            </motion.h1>

            {/* Subheadline - refined typography */}
            <motion.p
              variants={fadeInUp}
              className="text-lg text-gray-600 mb-8 leading-relaxed tracking-wide max-w-2xl mx-auto font-medium"
            >
              {MESSAGING.hero.subheadline}
            </motion.p>

            {/* CTA Button */}
            <motion.div 
              variants={fadeInUp} 
              className="flex flex-col items-center"
            >
              <Button
                size="lg"
                onClick={() => navigate(ROUTES.CONTACT)}
                className="bg-blue-600 hover:bg-blue-700 text-white px-10 py-5 h-auto rounded-xl font-bold text-xl shadow-lg shadow-blue-600/30 hover:shadow-xl hover:shadow-blue-600/40 transition-all duration-300"
              >
                {MESSAGING.cta.primary}
                <ArrowRight className="w-6 h-6 ml-2" />
              </Button>
              <p className="text-base text-gray-700 mt-4 font-medium">
                {MESSAGING.cta.subtext}
              </p>
            </motion.div>
          </motion.div>
        </div>

        {/* Phone at bottom center - partially visible, lowered for content to float above */}
        <div className="absolute -bottom-16 left-1/2 -translate-x-1/2 flex justify-center pointer-events-none z-20">
          <motion.div 
            className="relative"
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5, ease: 'easeOut' }}
          >
            {/* Backdrop blur container */}
            <div className="relative">
              {/* Gradient mask container - only top 35% visible */}
              <div 
                className="relative"
                style={{ 
                  maskImage: 'linear-gradient(to bottom, black 35%, transparent 85%)',
                  WebkitMaskImage: 'linear-gradient(to bottom, black 35%, transparent 85%)'
                }}
              >
                <PhoneMockup />
              </div>
            </div>
          </motion.div>
        </div>

      </section>

      {/* Stats Section with Animated Counters */}
      <section className="py-16 bg-white">
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
            <h2 className="text-3xl md:text-4xl font-bold text-navy-950 mb-4">
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
              >
                <Card className="relative glass-card border-0 shadow-none h-full">
                  <Badge className="absolute -top-4 left-8 w-8 h-8 bg-accent text-white rounded-lg flex items-center justify-center font-bold text-sm shadow-lg p-0">
                    {i + 1}
                  </Badge>
                  <CardContent className="p-8 pt-10">
                    <h3 className="text-lg font-bold text-navy-950 mb-3">
                      {step.title}
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {step.description}
                    </p>
                  </CardContent>
                </Card>
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
            <h2 className="text-3xl md:text-4xl font-bold text-navy-950 mb-4">
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
            className="text-3xl md:text-4xl font-bold mb-6"
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
            <Button
              size="lg"
              onClick={() => navigate(ROUTES.CONTACT)}
              className="bg-white text-navy-950 px-8 py-4 h-auto rounded-xl font-semibold text-lg shadow-xl hover:bg-gray-100 transition-colors"
            >
              {MESSAGING.cta.primary}
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </motion.div>
        </motion.div>
      </section>
    </motion.div>
  );
};

export default Home;
