
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

        <div className="pt-12 border-t border-navy-900 flex flex-col md:flex-row justify-between items-center gap-6">
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
