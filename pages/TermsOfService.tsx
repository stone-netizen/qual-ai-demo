import React from 'react';
import { BRAND } from '../constants';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

const TermsOfService: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-24">
      <Card>
        <CardHeader>
          <CardTitle className="text-4xl">Terms of Service</CardTitle>
          <CardDescription className="uppercase tracking-widest text-sm font-bold">
            Last Updated: October 2023
          </CardDescription>
        </CardHeader>
        <CardContent className="prose prose-slate max-w-none">
          <section>
            <h2 className="text-xl font-semibold mt-8 mb-4 text-navy-900">1. Acceptance of Terms</h2>
            <p className="text-muted-foreground mb-4">
              By accessing {BRAND.domain} or applying for our Automated Booking Pilot, you agree to be bound by these Terms of Service. If you do not agree, please do not use our services.
            </p>
          </section>

          <Separator className="my-6" />

          <section>
            <h2 className="text-xl font-semibold mt-8 mb-4 text-navy-900">2. Pilot Program Participation</h2>
            <p className="text-muted-foreground mb-4">
              The Qual AI Pilot is a limited-release program. We reserve the right to accept or reject any application at our sole discretion. Participants in the pilot agree to provide feedback and allow {BRAND.name} to monitor system performance for quality assurance.
            </p>
          </section>

          <Separator className="my-6" />

          <section>
            <h2 className="text-xl font-semibold mt-8 mb-4 text-navy-900">3. Use of AI and Automation</h2>
            <p className="text-muted-foreground mb-4">
              Qual AI utilizes artificial intelligence and automated systems to communicate with leads. You acknowledge that while we strive for accuracy, these systems are not infallible. {BRAND.name} is not liable for errors in scheduling or communication caused by automated logic.
            </p>
          </section>

          <Separator className="my-6" />

          <section>
            <h2 className="text-xl font-semibold mt-8 mb-4 text-navy-900">4. Compliance with Laws</h2>
            <p className="text-muted-foreground mb-4">
              You agree to use our systems in compliance with all local, state, and federal laws, including the TCPA and TSR. You are responsible for ensuring that your own business practices comply with relevant data protection regulations.
            </p>
          </section>

          <Separator className="my-6" />

          <section>
            <h2 className="text-xl font-semibold mt-8 mb-4 text-navy-900">5. Limitation of Liability</h2>
            <p className="text-muted-foreground mb-4">
              In no event shall {BRAND.legalName} be liable for any indirect, incidental, special, consequential, or punitive damages, including loss of profits, data, or goodwill, arising out of your use of our system.
            </p>
          </section>

          <Separator className="my-6" />

          <div className="p-8 bg-gray-50 border border-gray-200 rounded-2xl">
            <h3 className="font-bold text-navy-900 mb-2">Governing Law</h3>
            <p className="text-sm text-muted-foreground">These terms are governed by the laws of the State of Texas, without regard to its conflict of law principles.</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TermsOfService;
