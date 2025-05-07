import type React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { UTMProvider } from "../context/utm-context";
import { AnalyticsProvider } from "../context/analytics-provider";
import { GoogleAnalytics } from "@next/third-parties/google";
import { SurveyProvider } from "@/context/survey-context";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "SenatorMatch | Find Your Perfect Senator Match",
  description:
    "Answer a quick survey—no login required—and get your top 3 senator recommendations.",
  generator: "v0.dev",
  icons: {
    icon: [{ url: "/logo.png", type: "image/png" }, { url: "/favicon.ico" }],
    apple: [{ url: "/logo.png", sizes: "180x180", type: "image/png" }],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-white h-screen`}>
        <GoogleAnalytics gaId="G-LHF2QKMRK2" />
        <UTMProvider>
          <AnalyticsProvider>
            <SurveyProvider>{children}</SurveyProvider>
          </AnalyticsProvider>
        </UTMProvider>
      </body>
    </html>
  );
}
