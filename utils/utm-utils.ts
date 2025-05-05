/**
 * Utility functions for handling UTM parameters
 */

// Define standard UTM parameter keys
export const UTM_KEYS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_term",
  "utm_content",
];

/**
 * Extract UTM parameters from search params
 */
export const extractUTMParams = (searchParams: {
  [key: string]: string | string[] | undefined;
}) => {
  const utmParams: { [key: string]: string } = {};

  // Extract only string values from query parameters
  UTM_KEYS.forEach((key) => {
    const value = searchParams[key];
    if (typeof value === "string") {
      utmParams[key] = value;
    }
  });

  return utmParams;
};

/**
 * Get UTM parameters from session storage
 */
export const getUTMParamsFromStorage = () => {
  if (typeof window === "undefined") {
    return {};
  }

  try {
    const storedParams = sessionStorage.getItem("utm_data");
    return storedParams ? JSON.parse(storedParams) : {};
  } catch (error) {
    console.error("Error retrieving UTM parameters:", error);
    return {};
  }
};

/**
 * Check if object has any UTM parameters
 */
export const hasUTMParams = (params: object) => {
  return Object.keys(params).some((key) => UTM_KEYS.includes(key));
};
