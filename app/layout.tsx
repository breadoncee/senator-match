import type React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

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
      <body
        className={`${inter.className} bg-gradient-to-b from-blue-50 to-white min-h-screen`}
      >
        {children}
      </body>
    </html>
  );
}
