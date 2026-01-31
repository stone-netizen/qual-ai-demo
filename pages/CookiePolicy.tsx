import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

const CookiePolicy: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-24">
      <Card>
        <CardHeader>
          <CardTitle className="text-4xl font-heading">Cookie Policy</CardTitle>
        </CardHeader>
        <CardContent className="prose prose-slate max-w-none">
          <section>
            <h2 className="text-xl font-semibold mt-8 mb-4 text-navy-900 font-heading">What are cookies?</h2>
            <p className="text-muted-foreground mb-4">
              Cookies are small text files stored on your device that help websites function properly and provide analytics to the site owner.
            </p>
          </section>

          <Separator className="my-6" />

          <section>
            <h2 className="text-xl font-semibold mt-8 mb-4 text-navy-900 font-heading">How we use cookies</h2>
            <p className="text-muted-foreground mb-4">Qual AI uses cookies for:</p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground">
              <li><strong>Essential Functions:</strong> Keeping you logged in or remembering form progress.</li>
              <li><strong>Analytics:</strong> Understanding which pages are most helpful to HVAC owners.</li>
              <li><strong>Advertising:</strong> Measuring the effectiveness of our marketing campaigns (e.g., Meta Pixel).</li>
            </ul>
          </section>

          <Separator className="my-6" />

          <section>
            <h2 className="text-xl font-semibold mt-8 mb-4 text-navy-900 font-heading">Managing cookies</h2>
            <p className="text-muted-foreground mb-4">
              You can disable cookies in your browser settings at any time. Note that some parts of our website may not function correctly if cookies are disabled.
            </p>
          </section>
        </CardContent>
      </Card>
    </div>
  );
};

export default CookiePolicy;
