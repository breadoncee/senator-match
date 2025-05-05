"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { useUTM } from "@/context/utm-context";
import { sendPageView, sendEvent } from "@/services/analytics-service";

/**
 * Hook for using analytics with UTM parameter tracking
 */
export const useAnalytics = () => {
  const pathname = usePathname();
  const { utmParams } = useUTM();

  // Track page views automatically when pathname changes
  useEffect(() => {
    if (pathname) {
      sendPageView({
        path: pathname,
        utmParams,
      });
    }
  }, [pathname, utmParams]);

  // Function to track custom events
  const trackEvent = (
    category: string,
    action: string,
    label?: string,
    value?: number,
    nonInteraction = false
  ) => {
    sendEvent({
      category,
      action,
      label,
      value,
      nonInteraction,
      utmParams,
    });
  };

  return { trackEvent };
};
