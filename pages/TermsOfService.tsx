
import React from 'react';
import { BRAND } from '../constants';

const TermsOfService: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-24 prose prose-blue">
      <h1 className="text-4xl font-bold text-navy-950 mb-8 font-heading">Terms of Service</h1>
      <p className="text-gray-500 mb-12 uppercase tracking-widest text-sm font-bold">Last Updated: October 2023</p>
      
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-navy-900 mb-4 font-heading">1. Acceptance of Terms</h2>
        <p className="text-gray-600 leading-relaxed">
          By accessing {BRAND.domain} or applying for our Automated Booking Pilot, you agree to be bound by these Terms of Service. If you do not agree, please do not use our services.
        </p>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold text-navy-900 mb-4 font-heading">2. Pilot Program Participation</h2>
        <p className="text-gray-600 leading-relaxed">
          The Qual AI Pilot is a limited-release program. We reserve the right to accept or reject any application at our sole discretion. Participants in the pilot agree to provide feedback and allow {BRAND.name} to monitor system performance for quality assurance.
        </p>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold text-navy-900 mb-4 font-heading">3. Use of AI and Automation</h2>
        <p className="text-gray-600 leading-relaxed">
          Qual AI utilizes artificial intelligence and automated systems to communicate with leads. You acknowledge that while we strive for accuracy, these systems are not infallible. {BRAND.name} is not liable for errors in scheduling or communication caused by automated logic.
        </p>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold text-navy-900 mb-4 font-heading">4. Compliance with Laws</h2>
        <p className="text-gray-600 leading-relaxed">
          You agree to use our systems in compliance with all local, state, and federal laws, including the TCPA and TSR. You are responsible for ensuring that your own business practices comply with relevant data protection regulations.
        </p>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold text-navy-900 mb-4 font-heading">5. Limitation of Liability</h2>
        <p className="text-gray-600 leading-relaxed">
          In no event shall {BRAND.legalName} be liable for any indirect, incidental, special, consequential, or punitive damages, including loss of profits, data, or goodwill, arising out of your use of our system.
        </p>
      </section>

      <div className="p-8 bg-gray-50 border border-gray-200 rounded-2xl">
        <h3 className="font-bold text-navy-900 mb-2">Governing Law</h3>
        <p className="text-sm text-gray-600">These terms are governed by the laws of the State of Texas, without regard to its conflict of law principles.</p>
      </div>
    </div>
  );
};

export default TermsOfService;
