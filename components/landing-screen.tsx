"use client";

import { useSurvey } from "@/context/survey-context";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowRight, Info, Brain } from "lucide-react";
import Link from "next/link";
import { useAnalytics } from "@/hooks/use-analytics";

export const LandingScreen = () => {
  const { setCurrentScreen } = useSurvey();
  const { trackEvent } = useAnalytics();

  const handleStartSurvey = () => {
    trackEvent("Survey", "Start_Survey", "From_Landing_Page");
    setCurrentScreen("survey");
  };

  return (
    <div className="w-full px-4 max-w-2xl">
      <motion.div
        className="text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <motion.h1
          className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          Find Your Senator Matches
          <br />
          Just in 2 Minutes
        </motion.h1>

        <motion.p
          className="text-lg mb-8 text-gray-600"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          Answer a quick survey—no login required—and get your top 12 senator
          recommendations.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          <Button
            onClick={handleStartSurvey}
            size="lg"
            className="px-6 py-5 text-lg rounded-full group bg-secondary hover:bg-secondary/90"
          >
            Start Survey
            <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </Button>
        </motion.div>

        <motion.p
          className="text-sm text-gray-500 mt-6 flex items-center justify-center gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
        >
          <span className="inline-block w-2 h-2 bg-primary rounded-full"></span>
          No account needed
          <span className="inline-block w-2 h-2 bg-secondary rounded-full"></span>
          Anonymous
          <span className="inline-block w-2 h-2 bg-accent rounded-full"></span>
          2-minute survey
        </motion.p>

        <motion.div
          className="mt-8 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.5 }}
        >
          <Link href="/veripol-ai-agents" legacyBehavior passHref>
            <a className="inline-flex items-center text-sm font-medium text-primary hover:text-primary/80 transition-colors">
              <Brain className="mr-2 h-4 w-4" />
              Explore VeriPol&apos;s AI-Powered Voting Research Assistants
            </a>
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
};
