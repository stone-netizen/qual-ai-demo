/**
 * SocialProof Component - Enhanced
 * 
 * 3 testimonials with specific results
 * Plus aggregate stats bar for credibility
 */

import { Card, CardContent } from "@/components/ui/card";

const TESTIMONIALS = [
  {
    initials: 'SC',
    name: 'Dr. Sarah Chen',
    business: 'Radiant MedSpa, SF',
    quote: '"We went from missing 30+ calls a week to zero. Contact rate jumped from 40% to 92%."',
    result: '+$15k/month',
    timeline: '90 days',
    color: 'blue'
  },
  {
    initials: 'MR',
    name: 'Mike Rodriguez',
    business: 'Smile Dental, LA',
    quote: '"Response time went from 2 hours to 2 seconds. Our booking rate improved dramatically."',
    result: '+$22k/month',
    timeline: '60 days',
    color: 'purple'
  },
  {
    initials: 'JW',
    name: 'Dr. James Wilson',
    business: 'Peak Chiro, SD',
    quote: '"The AI follows up at night when leads are searching. We\'re booking while we sleep."',
    result: '+$18k/month',
    timeline: '45 days',
    color: 'green'
  }
];

const AGGREGATE_STATS = [
  { value: '500+', label: 'Active Practices' },
  { value: '$12.5M', label: 'Revenue Recovered' },
  { value: '95%', label: 'Avg Contact Rate' },
  { value: '<1s', label: 'Response Time' }
];

export function SocialProof() {
  const getColorClasses = (color: string) => {
    const colors: Record<string, { bg: string; text: string }> = {
      blue: { bg: 'bg-blue-100', text: 'text-blue-600' },
      purple: { bg: 'bg-purple-100', text: 'text-purple-600' },
      green: { bg: 'bg-green-100', text: 'text-green-600' }
    };
    return colors[color] || colors.blue;
  };

  return (
    <section className="max-w-4xl mx-auto px-4 py-12">
      
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-slate-900 mb-2">
          What Happens When You Fix This
        </h2>
        <p className="text-slate-600">
          Real results from practices like yours
        </p>
      </div>

      {/* 3 Testimonials */}
      <div className="grid md:grid-cols-3 gap-6 mb-8">
        {TESTIMONIALS.map((t, i) => {
          const colors = getColorClasses(t.color);
          return (
            <Card key={i} className="bg-white border-slate-200">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className={`w-12 h-12 rounded-full ${colors.bg} flex items-center justify-center ${colors.text} font-bold`}>
                    {t.initials}
                  </div>
                  <div>
                    <p className="font-semibold text-slate-900 text-sm">{t.name}</p>
                    <p className="text-xs text-slate-500">{t.business}</p>
                  </div>
                </div>
                <p className="text-sm text-slate-700 mb-4">{t.quote}</p>
                <div className="pt-4 border-t border-slate-100">
                  <p className="text-xs text-green-600 font-medium">
                    {t.result} • {t.timeline}
                  </p>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Aggregate Stats */}
      <div className="bg-slate-50 rounded-lg p-6">
        <div className="grid grid-cols-4 gap-6 text-center">
          {AGGREGATE_STATS.map((stat, i) => (
            <div key={i}>
              <p className="text-2xl font-bold text-slate-900">{stat.value}</p>
              <p className="text-xs text-slate-600">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>

    </section>
  );
}
