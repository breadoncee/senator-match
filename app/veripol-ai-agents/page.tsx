"use client";

import GptToolsSection from "@/components/GptToolsSection";
import { BrandBackground } from "@/components/ui/brand-background";
import { Footer } from "@/components/ui/footer";
import { motion } from "framer-motion";

export const VeripolAiAgentsPage = () => {
  return (
    <div className="h-full w-screen flex flex-col relative overflow-y-auto">
      <BrandBackground screenType="veripol-ai-agents" />
      <div className="w-full flex-1 flex flex-col items-center justify-center container mx-auto relative z-10 px-4 py-12 pt-20 md:pt-28 text-center">
        {/* Page Title Area */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-6 md:mb-8"
        >
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            <span role="img" aria-label="brain emoji" className="mr-2">
              🧠
            </span>
            Explore VeriPol GPTs
          </h1>
        </motion.div>

        <motion.p
          className="text-lg md:text-xl text-gray-700 max-w-2xl mx-auto mb-10 md:mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Smarter voting starts here. We built AI-powered assistants to help you
          make informed decisions for the 2025 Philippine Elections.
        </motion.p>

        {/* GPT Tools Section */}
        <div className="w-full max-w-5xl mb-10 md:mb-12">
          <GptToolsSection isPage={true} />
        </div>

        {/* Concluding Text */}
        <motion.div
          className="max-w-2xl mx-auto text-sm text-gray-600 space-y-3"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }} // Delay after GptToolsSection (assuming it also animates in)
        >
          <p>Built by volunteers to support informed, values-driven voting.</p>
          <p>
            These GPTs are free to use and built for public service. Always
            cross-check, and use them as a starting point—not the final word.
          </p>
        </motion.div>
      </div>
      <Footer />
    </div>
  );
};

export default VeripolAiAgentsPage;
