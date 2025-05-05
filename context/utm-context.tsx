"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { getUTMParamsFromStorage } from "../utils/utm-utils";

// Define the UTM context type
type UTMContextType = {
  utmParams: Record<string, string>;
  hasUTM: boolean;
};

// Create the UTM context with default values
const UTMContext = createContext<UTMContextType>({
  utmParams: {},
  hasUTM: false,
});

// Hook to use the UTM context
export const useUTM = () => useContext(UTMContext);

// UTM Provider props
type UTMProviderProps = {
  children: ReactNode;
};

// UTM Provider component
export const UTMProvider = ({ children }: UTMProviderProps) => {
  const [utmParams, setUtmParams] = useState<Record<string, string>>({});
  const [hasUTM, setHasUTM] = useState(false);

  // Load UTM parameters from session storage on client side
  useEffect(() => {
    const storedParams = getUTMParamsFromStorage();
    setUtmParams(storedParams);
    setHasUTM(Object.keys(storedParams).length > 0);

    // Add event listener for storage changes (in case another tab updates UTM params)
    const handleStorageChange = () => {
      const updatedParams = getUTMParamsFromStorage();
      setUtmParams(updatedParams);
      setHasUTM(Object.keys(updatedParams).length > 0);
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  return (
    <UTMContext.Provider value={{ utmParams, hasUTM }}>
      {children}
    </UTMContext.Provider>
  );
};
