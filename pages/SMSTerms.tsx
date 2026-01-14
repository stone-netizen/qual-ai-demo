
import React from 'react';
import { BRAND, ROUTES } from '../constants';
import { Link } from 'react-router-dom';

const SMSTerms: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-24 prose prose-blue">
      <h1 className="text-4xl font-bold text-navy-950 mb-8 font-heading">SMS Terms & Messaging Policy</h1>
      <p className="text-gray-500 mb-12 uppercase tracking-widest text-sm font-bold">A2P 10DLC Compliance Document</p>
      
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-navy-900 mb-4 font-heading">1. Program Description</h2>
        <p className="text-gray-600 leading-relaxed">
          {BRAND.name} provides automated booking systems for HVAC companies. By opting in via our website forms, you agree to receive SMS/MMS messages regarding your pilot application status, system notifications, and marketing updates.
        </p>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold text-navy-900 mb-4 font-heading">2. Opt-In Methods</h2>
        <p className="text-gray-600 mb-4">Users may opt-in through:</p>
        <ul className="list-disc pl-6 text-gray-600 space-y-2">
          <li>Checking the explicit consent box on our contact forms.</li>
          <li>Texting START or JOIN to our business number.</li>
          <li>Verbal consent recorded during an onboarding call.</li>
        </ul>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold text-navy-900 mb-4 font-heading">3. Message Frequency</h2>
        <p className="text-gray-600 leading-relaxed">
          Message frequency varies based on your interaction with our system. During active pilot evaluation, you may receive 2-5 messages per week.
        </p>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold text-navy-900 mb-4 font-heading">4. Opt-Out & Help</h2>
        <p className="text-gray-600 mb-4">You have full control over your communications:</p>
        <ul className="list-disc pl-6 text-gray-600 space-y-2">
          <li><strong>STOP:</strong> To stop receiving messages, reply STOP to any text. You will receive one final confirmation message.</li>
          <li><strong>HELP:</strong> For assistance, reply HELP or email {BRAND.supportEmail}.</li>
        </ul>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold text-navy-900 mb-4 font-heading">5. Cost</h2>
        <p className="text-gray-600 leading-relaxed">
          Message and data rates may apply depending on your mobile carrier plan.
        </p>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold text-navy-900 mb-4 font-heading">6. Data Privacy</h2>
        <p className="text-gray-600 leading-relaxed">
          Your mobile information is never shared with third parties or affiliates for marketing or promotional purposes. All other categories exclude text messaging originator opt-in data and consent; this information will not be shared with any third parties. See our <Link to={ROUTES.PRIVACY} className="text-accent hover:underline">Privacy Policy</Link> for more details.
        </p>
      </section>
    </div>
  );
};

export default SMSTerms;
