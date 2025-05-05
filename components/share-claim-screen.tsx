"use client";

import type React from "react";

import { useState } from "react";
import { useSurvey } from "@/context/survey-context";
import { Button } from "@/components/ui/button";
// import {
//   Dialog,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
//   DialogDescription,
// } from "@/components/ui/dialog";
import { useToast } from "@/components/ui/use-toast";
import { Toaster } from "@/components/ui/toaster";
import { motion } from "framer-motion";
import { Copy, ArrowLeft, Share2 } from "lucide-react";
import { Input } from "./ui/input";

export default function ShareClaimScreen() {
  const { sessionId, setCurrentScreen, matches } = useSurvey();
  const { toast } = useToast();
  // const [isModalOpen, setIsModalOpen] = useState(false);
  // const [email, setEmail] = useState("");
  // const [isSubmitting, setIsSubmitting] = useState(false);
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

  // const handleOpenModal = () => {
  //   setIsModalOpen(true);
  // };

  // const handleCloseModal = () => {
  //   setIsModalOpen(false);
  // };

  // const handleSubmitEmail = async (e: React.FormEvent) => {
  //   e.preventDefault();
  //   setIsSubmitting(true);

  //   // Simulate API call
  //   await new Promise((resolve) => setTimeout(resolve, 1500));

  //   toast({
  //     title: "Magic link sent!",
  //     description: "Check your email for a link to access your results.",
  //   });

  //   setIsSubmitting(false);
  //   setIsModalOpen(false);
  // };

  const handleBackToResults = () => {
    setCurrentScreen("results");
  };

  return (
    <div className="h-full bg-gradient-to-b from-blue-50 to-white px-4 py-12">
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
          className="mb-8 flex items-center text-gray-600 hover:text-blue-600"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Results
        </Button>

        <div className="text-center mb-10">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="w-16 h-16 mx-auto mb-4 bg-blue-500 rounded-full flex items-center justify-center text-white"
          >
            <Share2 className="h-8 w-8" />
          </motion.div>
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
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
                className={isCopied ? "text-green-600 border-green-600" : ""}
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
        </div>

        <p className="text-sm text-gray-500 text-center mt-10">
          Your data is secure and will only be used to provide you with updates
          about your matched senators.
        </p>
      </motion.div>

      {/* TODO: Add back in when we have a backend */}
      {/* <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Save Your Results</DialogTitle>
            <DialogDescription>
              Enter your email to save your results and access them anytime.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmitEmail} className="space-y-4 mt-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-1">
                Email address
              </label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="your@email.com"
                className="w-full"
              />
            </div>

            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? "Sending..." : "Send Magic Link"}
            </Button>
          </form>
        </DialogContent>
      </Dialog> */}

      <Toaster />
    </div>
  );
}
