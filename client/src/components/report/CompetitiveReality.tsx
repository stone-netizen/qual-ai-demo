/**
 * Competitive Reality Section
 * Industry-specific "while you read this" callout to create urgency
 */

import { useMemo } from 'react';
import { Flame, Moon, Phone, Clock, AlertTriangle, Activity, Users } from "lucide-react";
import { formatCurrency } from "@/lib/calculations-v2";
import { getIndustryConfig } from "@/lib/industry-config";

interface CompetitiveRealityProps {
  businessType: string;
  city: string;
  monthlyLoss: number;
  responseTimeMinutes: number;
}

export function CompetitiveReality({
  businessType,
  city,
  monthlyLoss,
  responseTimeMinutes
}: CompetitiveRealityProps) {
  // Get industry configuration
  const config = useMemo(() => getIndustryConfig(businessType), [businessType]);
  
  // Calculate daily loss
  const dailyLoss = Math.round(monthlyLoss / 30);

  // Get industry-specific colors
  const getColors = () => {
    switch (businessType) {
      case 'medspa':
        return {
          bg: 'bg-purple-50',
          border: 'border-l-purple-500',
          iconBg: 'bg-purple-100',
          iconColor: 'text-purple-600',
          title: 'text-purple-900',
          body: 'text-purple-800',
          calloutBg: 'bg-purple-100',
          calloutText: 'text-purple-900',
          calloutValue: 'text-purple-700',
          footer: 'text-purple-700'
        };
      case 'dental':
        return {
          bg: 'bg-blue-50',
          border: 'border-l-blue-500',
          iconBg: 'bg-blue-100',
          iconColor: 'text-blue-600',
          title: 'text-blue-900',
          body: 'text-blue-800',
          calloutBg: 'bg-blue-100',
          calloutText: 'text-blue-900',
          calloutValue: 'text-blue-700',
          footer: 'text-blue-700'
        };
      case 'chiro':
        return {
          bg: 'bg-green-50',
          border: 'border-l-green-500',
          iconBg: 'bg-green-100',
          iconColor: 'text-green-600',
          title: 'text-green-900',
          body: 'text-green-800',
          calloutBg: 'bg-green-100',
          calloutText: 'text-green-900',
          calloutValue: 'text-green-700',
          footer: 'text-green-700'
        };
      case 'physio':
        return {
          bg: 'bg-indigo-50',
          border: 'border-l-indigo-500',
          iconBg: 'bg-indigo-100',
          iconColor: 'text-indigo-600',
          title: 'text-indigo-900',
          body: 'text-indigo-800',
          calloutBg: 'bg-indigo-100',
          calloutText: 'text-indigo-900',
          calloutValue: 'text-indigo-700',
          footer: 'text-indigo-700'
        };
      default:
        return {
          bg: 'bg-orange-50',
          border: 'border-l-orange-500',
          iconBg: 'bg-orange-100',
          iconColor: 'text-orange-600',
          title: 'text-orange-900',
          body: 'text-orange-800',
          calloutBg: 'bg-orange-100',
          calloutText: 'text-orange-900',
          calloutValue: 'text-orange-700',
          footer: 'text-orange-700'
        };
    }
  };

  const colors = getColors();

  // Get icon based on industry
  const getIcon = () => {
    switch (businessType) {
      case 'medspa':
        return Moon;
      case 'dental':
        return AlertTriangle;
      case 'chiro':
        return Activity;
      case 'physio':
        return Phone;
      default:
        return Flame;
    }
  };

  const IconComponent = getIcon();

  // Get industry-specific competitive reality content
  const competitiveContent = config.competitiveReality;

  return (
    <div className={`${colors.bg} ${colors.border} border-l-4 rounded-r-xl p-6 sm:p-8`}>
      <div className="flex items-start gap-4">
        <div className={`w-10 h-10 ${colors.iconBg} rounded-full flex items-center justify-center flex-shrink-0`}>
          <IconComponent className={`w-5 h-5 ${colors.iconColor}`} />
        </div>
        <div>
          <h4 className={`font-bold ${colors.title} mb-3 text-lg`}>
            {competitiveContent.headline}
          </h4>
          <p className={`${colors.body} mb-4 leading-relaxed`}>
            {competitiveContent.body}
          </p>
          <div className={`${colors.calloutBg} rounded-lg p-4 mb-4`}>
            <p className={`${colors.calloutText} font-semibold`}>
              Every day you wait = <span className={colors.calloutValue}>{formatCurrency(dailyLoss)}</span> {competitiveContent.dailyLossContext}
            </p>
          </div>
          
          {/* Industry-specific urgency triggers */}
          <div className="grid sm:grid-cols-3 gap-3 mb-4">
            {config.urgencyTriggers.slice(0, 3).map((trigger, index) => (
              <div key={index} className={`${colors.calloutBg} rounded-lg p-3 text-center`}>
                <p className={`text-2xl font-bold ${colors.calloutValue} mb-1`}>
                  {trigger.stat}
                </p>
                <p className={`text-xs ${colors.footer}`}>
                  {trigger.title}
                </p>
              </div>
            ))}
          </div>
          
          <p className={`text-sm ${colors.footer}`}>
            The longer you operate at current performance, the wider the gap becomes. 
            Competitors who adopt AI-powered response are capturing {config.language.customerPlural} you're losing.
          </p>
        </div>
      </div>
    </div>
  );
}

