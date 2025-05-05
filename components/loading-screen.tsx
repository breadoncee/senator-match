"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

type LoadingScreenProps = {
  status?: "preparing" | "sending" | "matching" | "analyzing" | "complete";
};

export default function LoadingScreen({
  status = "preparing",
}: LoadingScreenProps) {
  const [showTimeoutMessage, setShowTimeoutMessage] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState(0);

  // Status messages for each stage of the process
  const statusMessages = {
    preparing: "Preparing your responses...",
    sending: "Sending your data to our matching service...",
    matching: "Finding senators who align with your values...",
    analyzing: "Analyzing compatibility scores...",
    complete: "Match complete! Preparing your results...",
  };

  // Progress ranges for each status
  const progressRanges = {
    preparing: { min: 0, max: 25 },
    sending: { min: 25, max: 45 },
    matching: { min: 45, max: 70 },
    analyzing: { min: 70, max: 90 },
    complete: { min: 90, max: 100 },
  };

  useEffect(() => {
    // Show timeout message after 10 seconds
    const timer = setTimeout(() => {
      setShowTimeoutMessage(true);
    }, 10000);

    // Set progress based on current status
    const currentRange = progressRanges[status];

    // Only reset to min if we're moving to a higher stage
    // This prevents the progress from jumping backward
    setLoadingProgress((prev) => {
      // If we're in a new status with a higher min than the current progress,
      // start from that min; otherwise, keep the current progress
      return prev < currentRange.min ? currentRange.min : prev;
    });

    // Simulate more continuous progress within the current status range
    const interval = setInterval(() => {
      setLoadingProgress((prev) => {
        // Calculate next progress within the current range
        // Smaller, more consistent increments for smoother animation
        const range = currentRange.max - currentRange.min;
        // More consistent, smaller increment
        const increment = range / 30 + Math.random() * (range / 40);
        const next = prev + increment;

        // Don't exceed the max for the current status
        return Math.min(next, currentRange.max);
      });
    }, 300); // More frequent updates for smoother animation

    return () => {
      clearTimeout(timer);
      clearInterval(interval);
    };
  }, [status]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-blue-50 to-white px-4">
      <motion.div
        className="text-center max-w-md"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="mb-8 relative">
          <svg
            className="w-24 h-24 mx-auto text-blue-500"
            viewBox="0 0 100 100"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle
              cx="50"
              cy="50"
              r="45"
              fill="none"
              stroke="#E2E8F0"
              strokeWidth="8"
            />
            <motion.circle
              cx="50"
              cy="50"
              r="45"
              fill="none"
              stroke="currentColor"
              strokeWidth="8"
              strokeLinecap="round"
              strokeDasharray="283"
              strokeDashoffset="283"
              animate={{
                strokeDashoffset: 283 - (283 * loadingProgress) / 100,
              }}
              transition={{ duration: 0.5 }}
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-xl font-bold text-blue-600">
              {Math.round(loadingProgress)}%
            </span>
          </div>
        </div>

        <h2 className="text-2xl font-bold mb-4">Finding your perfect match…</h2>

        <motion.p
          className="text-gray-600 mb-4"
          key={status}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {statusMessages[status]}
        </motion.p>

        {showTimeoutMessage && (
          <motion.p
            className="text-gray-600 mt-6 p-4 bg-blue-50 rounded-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            Still working—thanks for your patience! Our matching algorithm is
            making sure to find the best candidates for you.
          </motion.p>
        )}
      </motion.div>
    </div>
  );
}
