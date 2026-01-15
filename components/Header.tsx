
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ROUTES, BRAND } from '../constants';

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { label: 'Home', path: ROUTES.HOME },
    { label: 'How It Works', path: ROUTES.HOW_IT_WORKS },
    { label: 'Voice Demo', path: ROUTES.DEMO },
    { label: 'Book a Call', path: ROUTES.CONTACT },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          <div className="flex items-center">
            <Link to={ROUTES.HOME} className="flex-shrink-0 flex items-center gap-2">
              <div className="w-10 h-10 bg-navy-900 rounded flex items-center justify-center">
                <span className="text-white font-bold text-xl">Q</span>
              </div>
              <span className="text-2xl font-bold tracking-tight text-navy-950 font-heading">
                Qual <span className="text-accent text-lg">AI</span>
              </span>
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`${location.pathname === item.path
                    ? 'text-accent font-semibold'
                    : 'text-navy-800 hover:text-accent font-medium'
                  } transition-colors duration-200`}
              >
                {item.label}
              </Link>
            ))}
            <Link
              to={ROUTES.CONTACT}
              className="bg-navy-900 text-white px-6 py-2.5 rounded-lg font-semibold hover:bg-navy-800 transition-all duration-200 shadow-lg shadow-navy-900/10"
            >
              Start Pilot
            </Link>
          </div>

          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-navy-800 hover:bg-gray-100 focus:outline-none"
            >
              <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                {isOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-b border-gray-100 animate-in slide-in-from-top duration-300">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setIsOpen(false)}
                className="block px-3 py-4 text-base font-medium text-navy-800 hover:bg-gray-50 border-b border-gray-50 last:border-0"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Header;
