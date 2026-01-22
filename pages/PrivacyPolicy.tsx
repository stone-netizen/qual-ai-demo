
import React from 'react';
import { BRAND } from '../constants';

const PrivacyPolicy: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-24 prose prose-blue">
      <h1 className="text-4xl font-bold text-navy-950 mb-8 font-heading">Privacy Policy</h1>
      <p className="text-gray-500 mb-12 uppercase tracking-widest text-sm font-bold">Last Updated: January 21, 2026</p>

      <section className="mb-12">
        <p className="text-gray-600 leading-relaxed">
          QualAI, a DBA of SNL Growth Systems LLC, is committed to protecting your privacy. This Privacy
          Policy explains how we collect, use, and protect your personal information when you opt in to
          receive SMS messages.
        </p>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold text-navy-900 mb-4 font-heading">1. Information We Collect</h2>
        <ul className="list-disc pl-6 text-gray-600 space-y-2">
          <li>Phone number (required for SMS delivery)</li>
          <li>First and last name (optional)</li>
          <li>Email address (optional)</li>
          <li>Any additional information you provide in messages or communications</li>
          <li>Carrier information (automatically detected)</li>
          <li>Timestamp and frequency of messages sent and received</li>
        </ul>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold text-navy-900 mb-4 font-heading">2. How We Use Your Information</h2>
        <ul className="list-disc pl-6 text-gray-600 space-y-2">
          <li>To deliver SMS messages you've requested</li>
          <li>To improve our messaging service and customer experience</li>
          <li>To comply with legal obligations and regulations</li>
          <li>To prevent fraud and secure your account</li>
          <li>To respond to your inquiries and customer service requests</li>
          <li>To send transactional messages (account confirmations, service updates)</li>
        </ul>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold text-navy-900 mb-4 font-heading">3. Data Storage & Security</h2>
        <ul className="list-disc pl-6 text-gray-600 space-y-2">
          <li>Your information is stored in secure servers with encryption</li>
          <li>We implement industry-standard security measures to protect against unauthorized access</li>
          <li>Access to your data is limited to authorized personnel only</li>
          <li>Data is retained for the duration of your opt-in status plus 90 days (for compliance records)</li>
        </ul>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold text-navy-900 mb-4 font-heading">4. Third-Party Sharing</h2>
        <ul className="list-disc pl-6 text-gray-600 space-y-2">
          <li><strong className="text-navy-950">We do NOT sell your personal information</strong></li>
          <li><strong className="text-navy-950">We do NOT share your phone number with third parties for marketing purposes</strong></li>
          <li>We may share information with service providers necessary to deliver SMS (carriers, SMS platforms)</li>
          <li>We may disclose information if required by law or to protect our rights</li>
        </ul>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold text-navy-900 mb-4 font-heading">5. Your Rights</h2>
        <ul className="list-disc pl-6 text-gray-600 space-y-2">
          <li>Right to access: You can request a copy of the information we have about you</li>
          <li>Right to delete: You can request deletion of your personal information (subject to legal retention requirements)</li>
          <li>Right to opt-out: You can unsubscribe from messages at any time by replying STOP</li>
          <li>Right to know: You can ask what data we collect and how it's used</li>
        </ul>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold text-navy-900 mb-4 font-heading">6. GDPR & CCPA Compliance</h2>
        <ul className="list-disc pl-6 text-gray-600 space-y-2">
          <li>If you are located in the EU: Your rights under GDPR are respected. We process data only with your explicit consent.</li>
          <li>If you are located in California: Your rights under CCPA are respected. You can opt out of "sales" of personal information.</li>
        </ul>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold text-navy-900 mb-4 font-heading">7. Changes to This Policy</h2>
        <ul className="list-disc pl-6 text-gray-600 space-y-2">
          <li>We may update this Privacy Policy periodically</li>
          <li>Continued use of our SMS service constitutes acceptance of updates</li>
          <li>Major changes will be communicated via SMS notification</li>
        </ul>
      </section>

      <div className="p-8 bg-gray-50 border border-gray-200 rounded-2xl">
        <h3 className="font-bold text-navy-900 mb-2">8. Questions or Requests</h3>
        <p className="text-sm text-gray-600 mb-4">Contact us at {BRAND.supportEmail} for any privacy inquiries.</p>
        <p className="text-sm text-gray-600">
          <strong>Legal Entity:</strong> {BRAND.legalName}<br />
          <strong>Business Address:</strong> {BRAND.address}
        </p>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
