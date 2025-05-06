/**
 * Analytics service handling Google Analytics events with UTM parameters using Next.js third-parties
 */
import { sendGAEvent } from "@next/third-parties/google";

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

/**
 * Send a page view event to Google Analytics
 */
export const sendPageView = ({
  path,
  title,
  utmParams,
}: PageViewProps): void => {
  // Create page view params
  const pageViewParams: { [key: string]: any } = {
    page_path: path,
    page_title:
      title || (typeof document !== "undefined" ? document.title : ""),
    send_page_view: true,
  };

  // Add UTM parameters if available
  if (utmParams && Object.keys(utmParams).length > 0) {
    Object.entries(utmParams).forEach(([key, value]) => {
      pageViewParams[key] = value;
    });
  }

  // Use Next.js GA event function
  sendGAEvent({ name: "page_view", params: pageViewParams });
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
  const eventParams: { [key: string]: any } = {
    event_category: category,
    event_label: label,
  };

  // Only add properties if they exist
  if (value !== undefined) eventParams.value = value;
  if (nonInteraction !== undefined)
    eventParams.non_interaction = nonInteraction;

  // Add UTM parameters if available
  if (utmParams && Object.keys(utmParams).length > 0) {
    Object.entries(utmParams).forEach(([key, value]) => {
      eventParams[key] = value;
    });
  }

  // Use Next.js GA event function
  sendGAEvent({ name: action, params: eventParams });
};
