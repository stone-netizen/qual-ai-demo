import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ROUTES, BRAND } from '../constants';
import { fadeInUp } from '../lib/animations';

const NotFound: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-navy-950 px-4">
      <motion.div
        className="text-center max-w-md"
        initial="hidden"
        animate="visible"
        variants={fadeInUp}
      >
        <h1 className="text-8xl font-bold text-white mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-white mb-4">Page Not Found</h2>
        <p className="text-gray-400 mb-8">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Link
          to={ROUTES.HOME}
          className="inline-flex items-center justify-center px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-xl transition-colors duration-200"
        >
          Back to {BRAND.name}
        </Link>
      </motion.div>
    </div>
  );
};

export default NotFound;
