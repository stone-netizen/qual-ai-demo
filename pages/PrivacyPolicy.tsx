import React from 'react';
import { BRAND } from '../constants';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

const PrivacyPolicy: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-24">
      <Card>
        <CardHeader>
          <CardTitle className="text-4xl font-heading">Privacy Policy</CardTitle>
          <CardDescription className="uppercase tracking-widest text-sm font-bold">
            Last Updated: October 2023
          </CardDescription>
        </CardHeader>
        <CardContent className="prose prose-slate max-w-none">
          <section>
            <h2 className="text-xl font-semibold mt-8 mb-4 text-navy-900 font-heading">1. Introduction</h2>
            <p className="text-muted-foreground mb-4">
              {BRAND.legalName} ("we," "our," or "us") respects your privacy and is committed to protecting the personal data of our website visitors and pilot partners. This Privacy Policy explains how we collect, use, and share your information when you visit {BRAND.domain}.
            </p>
          </section>

          <Separator className="my-6" />

          <section>
            <h2 className="text-xl font-semibold mt-8 mb-4 text-navy-900 font-heading">2. Information We Collect</h2>
            <p className="text-muted-foreground mb-4">We collect information that you voluntarily provide to us, including:</p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground">
              <li><strong>Contact Information:</strong> Name, email address, phone number, and physical business address.</li>
              <li><strong>Business Information:</strong> Company name, service area, and technician capacity.</li>
              <li><strong>Usage Data:</strong> Information about how you use our website, including IP address, browser type, and pages visited.</li>
            </ul>
          </section>

          <Separator className="my-6" />

          <section>
            <h2 className="text-xl font-semibold mt-8 mb-4 text-navy-900 font-heading">3. How We Use Your Information</h2>
            <p className="text-muted-foreground mb-4">We use your information for the following purposes:</p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground">
              <li>To evaluate eligibility for the Automated Booking Pilot.</li>
              <li>To communicate with you via phone, email, and SMS regarding your application.</li>
              <li>To provide and maintain our services.</li>
              <li>To comply with legal obligations and prevent fraud.</li>
            </ul>
          </section>

          <Separator className="my-6" />

          <section>
            <h2 className="text-xl font-semibold mt-8 mb-4 text-navy-900 font-heading">4. SMS Communications</h2>
            <p className="text-muted-foreground mb-4">
              By providing your mobile number and opting in, you agree to receive automated text messages from {BRAND.name}. We will not sell or share your SMS opt-in consent or mobile number with third parties for their own marketing purposes. You may opt-out at any time by replying STOP.
            </p>
          </section>

          <Separator className="my-6" />

          <section>
            <h2 className="text-xl font-semibold mt-8 mb-4 text-navy-900 font-heading">5. Data Sharing & Third Parties</h2>
            <p className="text-muted-foreground mb-4">
              We do not sell your personal data. We may share information with trusted service providers (subprocessors) who assist us in operating our website, conducting our business, or servicing you, so long as those parties agree to keep this information confidential.
            </p>
          </section>

          <Separator className="my-6" />

          <section>
            <h2 className="text-xl font-semibold mt-8 mb-4 text-navy-900 font-heading">6. Your Rights</h2>
            <p className="text-muted-foreground mb-4">
              You have the right to access, correct, or delete your personal data. To exercise these rights, please contact us at {BRAND.supportEmail}.
            </p>
          </section>

          <Separator className="my-6" />

          <div className="p-8 bg-gray-50 border border-gray-200 rounded-2xl">
            <h3 className="font-bold text-navy-900 mb-2">Contact Us</h3>
            <p className="text-sm text-muted-foreground">{BRAND.legalName}<br/>{BRAND.address}<br/>{BRAND.supportEmail}</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PrivacyPolicy;
