"use client";

import { ReactNode } from "react";
import { useAnalytics } from "@/hooks/use-analytics";

type AnalyticsProviderProps = {
  children: ReactNode;
};

/**
 * Analytics Provider Component
 *
 * This component doesn't render anything visual but sets up the analytics tracking
 * for the application, including automatic page view tracking with UTM parameters.
 */
export const AnalyticsProvider = ({ children }: AnalyticsProviderProps) => {
  // Initialize analytics hook (this sets up page view tracking)
  useAnalytics();

  // Just render children as this is a non-visual provider
  return <>{children}</>;
};
