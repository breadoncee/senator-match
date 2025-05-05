/**
 * Global type declarations for the application
 */

// Google Analytics gtag function
interface Window {
  gtag: (
    command: "config" | "event" | "set" | "js",
    targetId: string,
    config?: Record<string, any>
  ) => void;
  dataLayer: any[];
}
