
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
          <li><strong>Marketing Messages:</strong> You will receive approximately 2-3 marketing messages per week from QualAI</li>
          <li><strong>Transactional Messages:</strong> You may also receive transactional messages (account alerts, appointment confirmations) which are not subject to opt-out</li>
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
          <li>You can opt out of <strong>marketing messages</strong> at any time by replying STOP to any message</li>
          <li>Your opt-out will be processed within <strong>24 hours</strong></li>
          <li>After opting out, you will no longer receive promotional/marketing messages</li>
          <li><strong>Transactional messages cannot be opted out of</strong> as they are necessary for service delivery (appointment confirmations, account alerts, security notifications)</li>
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
        <h2 className="text-2xl font-bold text-navy-900 mb-4 font-heading">6. TCPA Compliance & Automated Systems</h2>
        <ul className="list-disc pl-6 text-gray-600 space-y-2">
          <li>All messages sent are in compliance with the <strong>Telephone Consumer Protection Act (TCPA), 47 U.S.C. § 227</strong></li>
          <li>Messages may be sent using an <strong>Automatic Telephone Dialing System (ATDS)</strong> or prerecorded/artificial voice technology</li>
          <li>By providing your phone number and consenting, you expressly agree to receive calls and texts using ATDS technology</li>
          <li>Consent to receive ATDS calls/texts is not required as a condition of purchasing any goods or services</li>
          <li>QualAI uses secure, encrypted channels for all communications</li>
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
