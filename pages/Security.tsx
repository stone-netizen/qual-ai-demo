
import React from 'react';
import { BRAND } from '../constants';

const Security: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-24 prose prose-blue">
      <h1 className="text-4xl font-bold text-navy-950 mb-8 font-heading">Data Security & Handling</h1>
      
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-navy-900 mb-4 font-heading">Operator Trust First</h2>
        <p className="text-gray-600 leading-relaxed">
          At {BRAND.name}, we understand that your customer list and leads are the lifeblood of your HVAC business. We treat your data with the highest level of security.
        </p>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold text-navy-900 mb-4 font-heading">1. Encryption</h2>
        <p className="text-gray-600 leading-relaxed">
          All data transmitted between your team, your leads, and our servers is encrypted using 256-bit SSL/TLS encryption. Data at rest is stored in secure, SOC2-compliant data centers.
        </p>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold text-navy-900 mb-4 font-heading">2. Access Control</h2>
        <p className="text-gray-600 leading-relaxed">
          Access to your business account is restricted to your authorized personnel and our system engineers only for the purpose of troubleshooting and system optimization.
        </p>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold text-navy-900 mb-4 font-heading">3. No Selling of Data</h2>
        <p className="text-gray-600 leading-relaxed font-bold">
          We never sell your customer lists, lead data, or business metrics to third parties, competitors, or lead-generation brokers. Your data belongs to you.
        </p>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold text-navy-900 mb-4 font-heading">4. Compliance</h2>
        <p className="text-gray-600 leading-relaxed">
          Our automated systems are regularly audited to ensure compliance with TCPA and local privacy regulations.
        </p>
      </section>
    </div>
  );
};

export default Security;
