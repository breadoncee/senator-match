"use client";

import { useEffect } from "react";
import { sendEvent } from "../services/analytics-service";

type UTMHandlerProps = {
  utmParams?: { [key: string]: string };
};

/**
 * Client component that stores UTM parameters in session storage
 * Returns null as it has no UI
 */
const UTMHandler = ({ utmParams }: UTMHandlerProps) => {
  useEffect(() => {
    // Only update storage if UTM parameters exist
    if (utmParams && Object.keys(utmParams).length > 0) {
      try {
        // Save UTM parameters to sessionStorage
        sessionStorage.setItem("utm_data", JSON.stringify(utmParams));

        // Track UTM parameters detection as an event
        sendEvent({
          category: "UTM",
          action: "UTM_Detected",
          label: JSON.stringify(utmParams),
          utmParams: utmParams,
        });

        console.info("[UTM] Parameters detected and stored:", utmParams);
      } catch (error) {
        // Handle potential storage errors
        console.error("Error storing UTM parameters:", error);
      }
    }
  }, [utmParams]); // Re-run effect only when utmParams change

  return null; // Return null as this component has no UI
};

export default UTMHandler;
