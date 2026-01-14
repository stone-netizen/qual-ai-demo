
import React from 'react';

const CookiePolicy: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-24 prose prose-blue">
      <h1 className="text-4xl font-bold text-navy-950 mb-8 font-heading">Cookie Policy</h1>
      
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-navy-900 mb-4 font-heading">What are cookies?</h2>
        <p className="text-gray-600 leading-relaxed">
          Cookies are small text files stored on your device that help websites function properly and provide analytics to the site owner.
        </p>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold text-navy-900 mb-4 font-heading">How we use cookies</h2>
        <p className="text-gray-600 mb-4">Qual AI uses cookies for:</p>
        <ul className="list-disc pl-6 text-gray-600 space-y-2">
          <li><strong>Essential Functions:</strong> Keeping you logged in or remembering form progress.</li>
          <li><strong>Analytics:</strong> Understanding which pages are most helpful to HVAC owners.</li>
          <li><strong>Advertising:</strong> Measuring the effectiveness of our marketing campaigns (e.g., Meta Pixel).</li>
        </ul>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold text-navy-900 mb-4 font-heading">Managing cookies</h2>
        <p className="text-gray-600 leading-relaxed">
          You can disable cookies in your browser settings at any time. Note that some parts of our website may not function correctly if cookies are disabled.
        </p>
      </section>
    </div>
  );
};

export default CookiePolicy;
