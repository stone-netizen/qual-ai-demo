import React from 'react';
import { BRAND } from '../constants';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

const Security: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-24">
      <Card>
        <CardHeader>
          <CardTitle className="text-4xl font-heading">Data Security & Handling</CardTitle>
        </CardHeader>
        <CardContent className="prose prose-slate max-w-none">
          <section>
            <h2 className="text-xl font-semibold mt-8 mb-4 text-navy-900 font-heading">Operator Trust First</h2>
            <p className="text-muted-foreground mb-4">
              At {BRAND.name}, we understand that your customer list and leads are the lifeblood of your HVAC business. We treat your data with the highest level of security.
            </p>
          </section>

          <Separator className="my-6" />

          <section>
            <h2 className="text-xl font-semibold mt-8 mb-4 text-navy-900 font-heading">1. Encryption</h2>
            <p className="text-muted-foreground mb-4">
              All data transmitted between your team, your leads, and our servers is encrypted using 256-bit SSL/TLS encryption. Data at rest is stored in secure, SOC2-compliant data centers.
            </p>
          </section>

          <Separator className="my-6" />

          <section>
            <h2 className="text-xl font-semibold mt-8 mb-4 text-navy-900 font-heading">2. Access Control</h2>
            <p className="text-muted-foreground mb-4">
              Access to your business account is restricted to your authorized personnel and our system engineers only for the purpose of troubleshooting and system optimization.
            </p>
          </section>

          <Separator className="my-6" />

          <section>
            <h2 className="text-xl font-semibold mt-8 mb-4 text-navy-900 font-heading">3. No Selling of Data</h2>
            <p className="text-muted-foreground font-bold mb-4">
              We never sell your customer lists, lead data, or business metrics to third parties, competitors, or lead-generation brokers. Your data belongs to you.
            </p>
          </section>

          <Separator className="my-6" />

          <section>
            <h2 className="text-xl font-semibold mt-8 mb-4 text-navy-900 font-heading">4. Compliance</h2>
            <p className="text-muted-foreground mb-4">
              Our automated systems are regularly audited to ensure compliance with TCPA and local privacy regulations.
            </p>
          </section>
        </CardContent>
      </Card>
    </div>
  );
};

export default Security;
