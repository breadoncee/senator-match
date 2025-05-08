"use client";

import type React from "react";

import { useState } from "react";
import { useSurvey } from "@/context/survey-context";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Toaster } from "@/components/ui/toaster";
import { motion } from "framer-motion";
import { Copy, ArrowLeft, Share2, Mail } from "lucide-react";
import { Input } from "./ui/input";
import { sendResultsByEmail } from "@/services/matching-service";

export default function ShareClaimScreen() {
  const { sessionId, setCurrentScreen, matches } = useSurvey();
  const { toast } = useToast();
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  // Use match_request_id from the first match if available, otherwise fall back to sessionId
  const matchRequestId =
    matches && matches.length > 0 && matches[0].match_request_id
      ? matches[0].match_request_id
      : sessionId;

  const shareableLink =
    typeof window !== "undefined"
      ? `${window.location.origin}/results/${matchRequestId}`
      : "";

  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareableLink);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);

    const copyLinkToast = toast({
      title: "Link copied!",
      description: "The shareable link has been copied to your clipboard.",
    });

    copyLinkToast.dismiss();
  };

  const handleBackToResults = () => {
    setCurrentScreen("results");
  };

  const handleSubmitEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      toast({
        title: "Email required",
        description: "Please enter your email address.",
      });
      return;
    }
    setIsSubmitting(true);

    const sendingToastControls = toast({
      title: "Sending Email...",
      description: "Processing your request. Please wait a moment.",
    });

    try {
      const responseData = await sendResultsByEmail({
        email,
        match_request_id: matchRequestId || "",
      });

      if (responseData) {
        sendingToastControls.update({
          title: "Email Sent Successfully! ✅",
          description:
            responseData.message ||
            "Your results will be sent to your email shortly.",
        });
        setEmail("");
      }
    } catch (error: any) {
      console.error("Failed to send results email:", error);
      sendingToastControls.update({
        title: "Error Sending Results ❌",
        description: error.message || "Something went wrong. Please try again.",
      });
    } finally {
      sendingToastControls.dismiss();
      setIsSubmitting(false);
    }
  };

  return (
    <div className="h-full px-4 py-12 pt-16">
      <motion.div
        className="max-w-2xl mx-auto"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Button
          variant="ghost"
          size="sm"
          onClick={handleBackToResults}
          className="mb-8 flex items-center text-gray-600 hover:text-primary"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Results
        </Button>

        <div className="text-center mb-10">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="w-16 h-16 mx-auto mb-4 bg-secondary rounded-full flex items-center justify-center text-white"
          >
            <Share2 className="h-8 w-8" />
          </motion.div>
          <h1 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Share Your Matches
          </h1>
          <p className="text-gray-600">
            Share your senator matches with friends or save them for future
            reference.
          </p>
        </div>

        <div className="space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="bg-white p-6 rounded-xl shadow-md"
          >
            <h2 className="text-lg font-semibold mb-4">Your shareable link</h2>
            <div className="flex items-center gap-2">
              <Input
                value={shareableLink}
                readOnly
                className="bg-gray-50 font-mono text-sm"
              />
              <Button
                onClick={handleCopyLink}
                variant={isCopied ? "outline" : "default"}
                className={isCopied ? "text-accent border-accent" : ""}
              >
                {isCopied ? (
                  <>
                    Copied!
                    <svg
                      className="ml-2 h-4 w-4"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M5 13L9 17L19 7"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </>
                ) : (
                  <>
                    <Copy className="mr-2 h-4 w-4" />
                    Copy
                  </>
                )}
              </Button>
            </div>
          </motion.div>

          {/* Inline Email Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25, duration: 0.5 }}
            className="bg-white p-6 rounded-xl shadow-md mt-8"
          >
            <h2 className="text-lg font-semibold mb-4">
              Save Results by Email
            </h2>
            <form onSubmit={handleSubmitEmail} className="space-y-3">
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                required
                className="bg-gray-50"
              />
              <Button
                type="submit"
                className="w-full bg-primary hover:bg-primary/90 text-white group"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  "Sending..."
                ) : (
                  <>
                    Send Magic Link
                    <Mail className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </Button>
            </form>
          </motion.div>
        </div>

        <p className="text-sm text-gray-500 text-center mt-10">
          Your data is secure and will only be used to provide you with updates
          about your matched senators.
        </p>
      </motion.div>

      <Toaster />
    </div>
  );
}
