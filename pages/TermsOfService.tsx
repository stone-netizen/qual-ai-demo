
import React from 'react';
import { BRAND } from '../constants';

const TermsOfService: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-24 prose prose-blue">
      <h1 className="text-4xl font-bold text-navy-950 mb-8 font-heading">Terms of Service</h1>
      <p className="text-gray-500 mb-12 uppercase tracking-widest text-sm font-bold">Last Updated: January 21, 2026</p>

      <p className="text-gray-600 leading-relaxed mb-8">
        By opting in to receive SMS and text messages from QualAI (a DBA of SNL Growth Systems LLC),
        you agree to the following terms:
      </p>

      <section className="mb-12">
        <h2 className="text-2xl font-bold text-navy-900 mb-4 font-heading">1. Message Frequency & Type</h2>
        <ul className="list-disc pl-6 text-gray-600 space-y-2">
          <li>You will receive SMS messages, marketing communications, and service-related updates from QualAI</li>
          <li>Frequency may vary depending on promotions and campaigns</li>
          <li>Message and data rates may apply depending on your mobile carrier</li>
        </ul>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold text-navy-900 mb-4 font-heading">2. Consent to Communicate</h2>
        <ul className="list-disc pl-6 text-gray-600 space-y-2">
          <li>By providing your phone number and confirming your consent, you authorize QualAI to send you text messages to the number you provide</li>
          <li>You confirm that you own or have authority to provide this phone number</li>
          <li>You are at least 18 years old and authorized to opt in to receive these messages</li>
        </ul>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold text-navy-900 mb-4 font-heading">3. Standard Messaging Rates Apply</h2>
        <ul className="list-disc pl-6 text-gray-600 space-y-2">
          <li>Your mobile carrier's standard message and data rates will apply</li>
          <li>QualAI is not responsible for any carrier charges</li>
          <li>Carriers may charge for incoming and outgoing messages</li>
        </ul>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold text-navy-900 mb-4 font-heading">4. Withdrawal of Consent</h2>
        <ul className="list-disc pl-6 text-gray-600 space-y-2">
          <li>You can opt out at any time by replying STOP to any message</li>
          <li>To unsubscribe from all messages, reply STOP to any SMS from QualAI</li>
          <li>Your opt-out will be processed within one business day</li>
          <li>After opting out, you will no longer receive promotional messages, but may continue to receive transactional messages (e.g., account alerts)</li>
        </ul>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold text-navy-900 mb-4 font-heading">5. Two-Way Messaging</h2>
        <ul className="list-disc pl-6 text-gray-600 space-y-2">
          <li>QualAI may respond to your SMS messages</li>
          <li>If you reply to our messages, you are initiating two-way communication and authorize QualAI to respond</li>
          <li>Standard messaging rates apply to your replies</li>
        </ul>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold text-navy-900 mb-4 font-heading">6. Compliance</h2>
        <ul className="list-disc pl-6 text-gray-600 space-y-2">
          <li>All messages sent are in compliance with TCPA (Telephone Consumer Protection Act) regulations</li>
          <li>QualAI uses secure channels for all communications</li>
          <li>You may receive messages sent via automated dialing systems</li>
        </ul>
      </section>

      <div className="p-8 bg-gray-50 border border-gray-200 rounded-2xl">
        <h3 className="font-bold text-navy-900 mb-2">7. Contact for Issues</h3>
        <p className="text-sm text-gray-600 mb-4">
          If you have questions or wish to revoke consent, contact us at {BRAND.supportEmail} or reply HELP to any message.
        </p>
        <p className="text-sm text-gray-600 font-bold">Business operated by {BRAND.legalName}</p>
      </div>
    </div>
  );
};

export default TermsOfService;
