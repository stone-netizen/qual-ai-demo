
import React from 'react';
import { Link } from 'react-router-dom';
import { ROUTES, BRAND } from '../constants';

const Footer: React.FC = () => {
  return (
    <footer className="bg-navy-950 text-gray-400 py-16 border-t border-navy-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-1 md:col-span-1">
            <Link to={ROUTES.HOME} className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 bg-white rounded flex items-center justify-center">
                <span className="text-navy-950 font-bold text-lg">Q</span>
              </div>
              <span className="text-xl font-bold tracking-tight text-white font-heading">
                Qual <span className="text-accent text-sm">AI</span>
              </span>
            </Link>
            <p className="text-sm leading-relaxed mb-6">
              Automated booking systems designed specifically for HVAC operators. Not an agency—a system.
            </p>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-6">Platform</h4>
            <ul className="space-y-4 text-sm">
              <li><Link to={ROUTES.HOW_IT_WORKS} className="hover:text-white transition-colors">How It Works</Link></li>
              <li><Link to={ROUTES.DEMO} className="text-accent font-bold hover:text-blue-400 transition-colors">Element Voice Demo</Link></li>
              <li><Link to={ROUTES.CONTACT} className="hover:text-white transition-colors">Book a Call</Link></li>
              <li><Link to={ROUTES.POST_BOOKING} className="hover:text-white transition-colors">Post-Booking VSL (Preview)</Link></li>
              <li><Link to={ROUTES.SECURITY} className="hover:text-white transition-colors">Data & Security</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-6">Compliance</h4>
            <ul className="space-y-4 text-sm">
              <li><Link to={ROUTES.PRIVACY} className="hover:text-white transition-colors">Privacy Policy</Link></li>
              <li><Link to={ROUTES.TERMS} className="hover:text-white transition-colors">Terms of Service</Link></li>
              <li><Link to={ROUTES.SMS_TERMS} className="hover:text-white transition-colors">SMS Terms & Policy</Link></li>
              <li><Link to={ROUTES.COOKIE_POLICY} className="hover:text-white transition-colors">Cookie Policy</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-6">Contact</h4>
            <ul className="space-y-4 text-sm">
              <li>{BRAND.supportEmail}</li>
              <li>{BRAND.supportPhone}</li>
              <li>{BRAND.address}</li>
            </ul>
          </div>
        </div>

        {/* Trust Badges */}
        <div className="pt-8 mb-8 flex flex-wrap justify-center gap-6">
          <div className="flex items-center gap-2 px-4 py-2 bg-navy-900/50 rounded-lg border border-navy-800">
            <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
            <span className="text-xs font-medium text-gray-300">SSL Secured</span>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 bg-navy-900/50 rounded-lg border border-navy-800">
            <svg className="w-5 h-5 text-blue-400" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" /></svg>
            <span className="text-xs font-medium text-gray-300">TCPA Compliant</span>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 bg-navy-900/50 rounded-lg border border-navy-800">
            <svg className="w-5 h-5 text-purple-400" fill="currentColor" viewBox="0 0 20 20"><path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z"/><path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd" /></svg>
            <span className="text-xs font-medium text-gray-300">SOC 2 Practices</span>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 bg-navy-900/50 rounded-lg border border-navy-800">
            <svg className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" /></svg>
            <span className="text-xs font-medium text-gray-300">Data Encrypted</span>
          </div>
        </div>

        <div className="pt-8 border-t border-navy-900 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-xs">
            &copy; {new Date().getFullYear()} {BRAND.legalName}. All rights reserved.
          </div>
          <div className="text-[10px] text-gray-500 max-w-xl text-center md:text-right">
            Disclaimer: Results vary by market and operator capacity. Qual AI does not guarantee specific revenue outcomes. Message and data rates may apply. Reply STOP to opt out of SMS communications.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
