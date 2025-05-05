/**
 * Analytics service for handling Google Analytics events with UTM parameters
 */

type EventProps = {
  category: string;
  action: string;
  label?: string;
  value?: number;
  nonInteraction?: boolean;
  utmParams?: Record<string, string>;
};

type PageViewProps = {
  path: string;
  title?: string;
  utmParams?: Record<string, string>;
};

// Check if gtag is available (browser environment)
const isGtagAvailable = (): boolean => {
  return typeof window !== "undefined" && typeof window.gtag !== "undefined";
};

/**
 * Send a page view event to Google Analytics
 */
export const sendPageView = ({
  path,
  title,
  utmParams,
}: PageViewProps): void => {
  if (!isGtagAvailable()) return;

  const pageViewParams: { [key: string]: any } = {
    page_path: path,
    page_title: title || document.title,
    send_page_view: true,
  };

  // Add UTM parameters if available
  if (utmParams && Object.keys(utmParams).length > 0) {
    Object.entries(utmParams).forEach(([key, value]) => {
      pageViewParams[key] = value;
    });
  }

  window.gtag("config", "G-LHF2QKMRK2", pageViewParams);
};

/**
 * Send a custom event to Google Analytics
 */
export const sendEvent = ({
  category,
  action,
  label,
  value,
  nonInteraction = false,
  utmParams,
}: EventProps): void => {
  if (!isGtagAvailable()) return;

  const eventParams: { [key: string]: any } = {
    event_category: category,
    event_label: label,
    value: value,
    non_interaction: nonInteraction,
  };

  // Add UTM parameters if available
  if (utmParams && Object.keys(utmParams).length > 0) {
    Object.entries(utmParams).forEach(([key, value]) => {
      eventParams[key] = value;
    });
  }

  window.gtag("event", action, eventParams);
};
