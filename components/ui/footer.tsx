import Image from "next/image";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { TermsAndConditionsContent } from "../terms-and-conditions";
import { PrivacyPolicyContent } from "../privacy-policy";

export function Footer() {
  const [isTocModalOpen, setIsTocModalOpen] = useState(false);
  const [isPrivacyModalOpen, setIsPrivacyModalOpen] = useState(false);

  const toggleTocModal = () => setIsTocModalOpen(!isTocModalOpen);
  const togglePrivacyModal = () => setIsPrivacyModalOpen(!isPrivacyModalOpen);

  const currentYear = new Date().getFullYear();

  return (
    <>
      <footer className="py-6 border-t border-gray-200 bg-gray-50 text-sm">
        <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center mb-4 md:mb-0">
            <Image
              src="/datos-pilipinas-logo.svg"
              alt="SenatorMatch Logo"
              width={100}
              height={50}
              priority
              className="w-[100px] h-[50px] mr-2"
            />
            <span className="text-sm font-semibold text-gray-700">
              SenatorMatch
            </span>
          </div>
          <div className="text-center md:text-right">
            <p className="text-xs text-gray-500 mb-2">
              © {currentYear} SenatorMatch. All rights reserved.
            </p>
            <div className="space-x-4">
              <button
                onClick={toggleTocModal}
                className="text-xs text-gray-500 hover:text-primary transition-colors"
              >
                Terms and Conditions
              </button>
              <button
                onClick={togglePrivacyModal}
                className="text-xs text-gray-500 hover:text-primary transition-colors"
              >
                Privacy Policy
              </button>
            </div>
          </div>
        </div>
      </footer>

      <AnimatePresence>
        {isTocModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 z-[100] flex items-center justify-center p-4 backdrop-blur-sm"
            onClick={toggleTocModal}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 10 }}
              transition={{ duration: 0.2 }}
              className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[85vh] overflow-y-auto p-6 relative"
              onClick={(e) => e.stopPropagation()}
            >
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
                onClick={toggleTocModal}
              >
                <X size={20} />
              </Button>
              <TermsAndConditionsContent />
              <div className="mt-6 text-right">
                <Button
                  onClick={toggleTocModal}
                  className="bg-primary hover:bg-primary/90 text-white px-4 py-2 text-sm rounded-md"
                >
                  Close
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isPrivacyModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 z-[100] flex items-center justify-center p-4 backdrop-blur-sm"
            onClick={togglePrivacyModal}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 10 }}
              transition={{ duration: 0.2 }}
              className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[85vh] overflow-y-auto p-6 relative"
              onClick={(e) => e.stopPropagation()}
            >
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
                onClick={togglePrivacyModal}
              >
                <X size={20} />
              </Button>
              <PrivacyPolicyContent />
              <div className="mt-6 text-right">
                <Button
                  onClick={togglePrivacyModal}
                  className="bg-primary hover:bg-primary/90 text-white px-4 py-2 text-sm rounded-md"
                >
                  Close
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
