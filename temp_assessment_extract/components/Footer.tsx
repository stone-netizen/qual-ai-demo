
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-950 text-slate-400 py-16 px-4">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-[#0062FF] rounded flex items-center justify-center">
              <span className="text-white font-bold">Q</span>
            </div>
            <span className="text-white font-bold text-lg">QualAI</span>
          </div>
          <p className="text-sm leading-relaxed">
            Automated booking systems designed specifically for HVAC operators. Not an agency—a system.
          </p>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-6">Platform</h4>
          <ul className="space-y-3 text-sm">
            <li><a href="#" className="hover:text-[#0062FF]">How It Works</a></li>
            <li><a href="#" className="hover:text-[#0062FF] text-[#00D1FF]">Element Voice Demo</a></li>
            <li><a href="#" className="hover:text-[#0062FF]">Book a Call</a></li>
            <li><a href="#" className="hover:text-[#0062FF]">Post-Booking VSL</a></li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-6">Compliance</h4>
          <ul className="space-y-3 text-sm">
            <li><a href="#" className="hover:text-[#0062FF]">Privacy Policy</a></li>
            <li><a href="#" className="hover:text-[#0062FF]">Terms of Service</a></li>
            <li><a href="#" className="hover:text-[#0062FF]">SMS Terms & Policy</a></li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-6">Contact</h4>
          <ul className="space-y-3 text-sm">
            <li>info@qualai.co</li>
            <li>+1 949-382-4161</li>
            <li>338 S Western Ave STE C PMB 8019,<br/>Los Angeles, CA 90020</li>
          </ul>
        </div>
      </div>
      <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-slate-800 text-xs text-center">
        © 2024 Qual AI Systems LLC. All rights reserved. Results may vary.
      </div>
    </footer>
  );
};

export default Footer;
