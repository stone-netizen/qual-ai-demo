interface AnalyticsPayload {
  [key: string]: unknown;
}

type AnalyticsEvent =
  | "leak_why_opened"
  | "leak_why_closed"
  | "diagnostic_section_viewed"
  | "diagnostic_auto_opened";

export function useAnalytics() {
  const trackEvent = (event: AnalyticsEvent, payload?: AnalyticsPayload) => {
    try {
      const analytics = (window as unknown as { analytics?: { track?: (e: string, p?: AnalyticsPayload) => void } }).analytics;
      if (analytics?.track) {
        analytics.track(event, payload);
      } else {
        // Fallback to console for now
        // eslint-disable-next-line no-console
        console.debug(`[analytics] ${event}`, payload);
      }
    } catch {
      // Swallow errors to avoid blocking UI
    }
  };

  return { trackEvent };
}

