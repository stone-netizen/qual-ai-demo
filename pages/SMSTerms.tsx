import React from 'react';
import { BRAND, ROUTES } from '../constants';
import { Link } from 'react-router-dom';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

const SMSTerms: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-24">
      <Card>
        <CardHeader>
          <CardTitle className="text-4xl font-heading">SMS Terms & Messaging Policy</CardTitle>
          <CardDescription className="uppercase tracking-widest text-sm font-bold">
            A2P 10DLC Compliance Document
          </CardDescription>
        </CardHeader>
        <CardContent className="prose prose-slate max-w-none">
          <section>
            <h2 className="text-xl font-semibold mt-8 mb-4 text-navy-900 font-heading">1. Program Description</h2>
            <p className="text-muted-foreground mb-4">
              {BRAND.name} provides automated booking systems for HVAC companies. By opting in via our website forms, you agree to receive SMS/MMS messages regarding your pilot application status, system notifications, and marketing updates.
            </p>
          </section>

          <Separator className="my-6" />

          <section>
            <h2 className="text-xl font-semibold mt-8 mb-4 text-navy-900 font-heading">2. Opt-In Methods</h2>
            <p className="text-muted-foreground mb-4">Users may opt-in through:</p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground">
              <li>Checking the explicit consent box on our contact forms.</li>
              <li>Texting START or JOIN to our business number.</li>
              <li>Verbal consent recorded during an onboarding call.</li>
            </ul>
          </section>

          <Separator className="my-6" />

          <section>
            <h2 className="text-xl font-semibold mt-8 mb-4 text-navy-900 font-heading">3. Message Frequency</h2>
            <p className="text-muted-foreground mb-4">
              Message frequency varies based on your interaction with our system. During active pilot evaluation, you may receive 2-5 messages per week.
            </p>
          </section>

          <Separator className="my-6" />

          <section>
            <h2 className="text-xl font-semibold mt-8 mb-4 text-navy-900 font-heading">4. Opt-Out & Help</h2>
            <p className="text-muted-foreground mb-4">You have full control over your communications:</p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground">
              <li><strong>STOP:</strong> To stop receiving messages, reply STOP to any text. You will receive one final confirmation message.</li>
              <li><strong>HELP:</strong> For assistance, reply HELP or email {BRAND.supportEmail}.</li>
            </ul>
          </section>

          <Separator className="my-6" />

          <section>
            <h2 className="text-xl font-semibold mt-8 mb-4 text-navy-900 font-heading">5. Cost</h2>
            <p className="text-muted-foreground mb-4">
              Message and data rates may apply depending on your mobile carrier plan.
            </p>
          </section>

          <Separator className="my-6" />

          <section>
            <h2 className="text-xl font-semibold mt-8 mb-4 text-navy-900 font-heading">6. Data Privacy</h2>
            <p className="text-muted-foreground mb-4">
              Your mobile information is never shared with third parties or affiliates for marketing or promotional purposes. All other categories exclude text messaging originator opt-in data and consent; this information will not be shared with any third parties. See our <Link to={ROUTES.PRIVACY} className="text-primary hover:underline">Privacy Policy</Link> for more details.
            </p>
          </section>
        </CardContent>
      </Card>
    </div>
  );
};

export default SMSTerms;
