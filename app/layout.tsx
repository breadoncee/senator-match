import type React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Script from "next/script";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "SenatorMatch | Find Your Perfect Senator Match",
  description:
    "Answer a quick survey—no login required—and get your top 3 senator recommendations.",
  generator: "v0.dev",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-LHF2QKMRK2"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-LHF2QKMRK2');
          `}
        </Script>
      </head>
      <body
        className={`${inter.className} bg-gradient-to-b from-blue-50 to-white h-screen`}
      >
        {children}
      </body>
    </html>
  );
}
