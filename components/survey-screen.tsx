"use client";

import { useState, useEffect, useRef } from "react";
import { useSurvey } from "@/context/survey-context";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { surveyQuestions } from "@/data/survey-questions";
import {
  matchCandidates,
  generateSessionId,
} from "@/services/matching-service";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronLeft, ChevronRight, Info, X } from "lucide-react";
import { getQuestionInfo } from "@/utils/issue_translations";
import { useAnalytics } from "@/hooks/use-analytics";
import { useIsMobile } from "@/hooks/use-mobile";

export default function SurveyScreen() {
  const {
    currentQuestionIndex,
    setCurrentQuestionIndex,
    addResponse,
    setCurrentScreen,
    setMatches,
    setSessionId,
    responses,
    resetSurvey,
    setLoadingStatus,
  } = useSurvey();
  const { trackEvent } = useAnalytics();
  const isMobile = useIsMobile();

  const [currentAnswer, setCurrentAnswer] = useState<string | string[]>("");
  const [isNextEnabled, setIsNextEnabled] = useState(false);
  const [direction, setDirection] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const [showInfo, setShowInfo] = useState(false);
  const explanationRef = useRef<HTMLDivElement>(null);
  const [showButton, setShowButton] = useState(false);
  const [userChangedAnswer, setUserChangedAnswer] = useState(false);
  const motionDivRef = useRef<HTMLDivElement>(null);
  const [applyJustifyCenter, setApplyJustifyCenter] = useState(true);
  const [showScrollDownButton, setShowScrollDownButton] = useState(false);

  const currentQuestion = surveyQuestions[currentQuestionIndex];
  const questionInfo = getQuestionInfo(currentQuestion?.id || "");

  const toggleInfo = () => {
    setShowInfo(!showInfo);
  };

  // Scroll to top when question changes
  useEffect(() => {
    if (motionDivRef.current) {
      motionDivRef.current.scrollTo({
        top: 0,
        behavior: "auto",
      });
    }
  }, [currentQuestionIndex]);

  // Check if there's a saved response for this question
  useEffect(() => {
    if (currentQuestion.inputType === "checkbox") {
      setCurrentAnswer([]);
      setIsNextEnabled(false);
    }

    const savedResponse = responses.find(
      (r) => r.questionId === currentQuestion.id
    );
    if (savedResponse) {
      setCurrentAnswer(savedResponse.answer);
      setIsNextEnabled(true);
    } else {
      setCurrentAnswer(currentQuestion.inputType === "checkbox" ? [] : "");
      // For radio inputs, we need user selection before enabling next
      setIsNextEnabled(false);
    }
  }, [
    currentQuestion.id,
    currentQuestionIndex,
    responses,
    currentQuestion.inputType,
  ]);

  // Modify the useEffect that controls showButton to make it appear whenever a question has an existing answer
  useEffect(() => {
    // Show button whenever there's a saved answer for this question
    const savedResponse = responses.find(
      (r) => r.questionId === currentQuestion.id
    );

    // Set showButton to true if there's a saved answer
    // Don't rely on direction anymore
    if (savedResponse) {
      setShowButton(true);
    } else {
      setShowButton(false);
    }
  }, [currentQuestionIndex, currentQuestion.id, responses]);

  // Add keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Enter" && isNextEnabled) {
        handleNext();
      } else if (e.key === "Backspace" || e.key === "Escape") {
        handleBack();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  });

  // Reset the userChangedAnswer state when moving to a new question
  useEffect(() => {
    setUserChangedAnswer(false);
  }, [currentQuestionIndex]);

  // Effect to check for overflow in motion.div and conditionally center
  useEffect(() => {
    const checkOverflow = () => {
      if (motionDivRef.current) {
        const el = motionDivRef.current;
        if (el.scrollHeight > el.clientHeight) {
          setApplyJustifyCenter(false); // Content overflows, align to start
        } else {
          setApplyJustifyCenter(true); // Content does not overflow, center it
        }
      }
    };

    // Check initially and on resize
    // A small delay helps ensure layout is stable after content changes/animations
    const timeoutId = setTimeout(checkOverflow, 50);
    window.addEventListener("resize", checkOverflow);

    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener("resize", checkOverflow);
    };
  }, [currentQuestionIndex, currentQuestion.id, motionDivRef]);

  // Effect to manage visibility of the scroll-down button
  useEffect(() => {
    const scrollableElement = motionDivRef.current;
    if (!scrollableElement) {
      setShowScrollDownButton(false); // Ensure button is hidden if no scrollable element
      return;
    }

    const checkScrollPosition = () => {
      const isScrollable =
        scrollableElement.scrollHeight > scrollableElement.clientHeight;
      const isAtBottom =
        scrollableElement.scrollHeight -
          scrollableElement.scrollTop -
          scrollableElement.clientHeight <
        1;

      if (isScrollable && !isAtBottom) {
        setShowScrollDownButton(true);
      } else {
        setShowScrollDownButton(false);
      }
    };

    // Initial check + on resize and scroll
    const timeoutId = setTimeout(checkScrollPosition, 100); // Delay to allow layout to settle
    scrollableElement.addEventListener("scroll", checkScrollPosition);
    window.addEventListener("resize", checkScrollPosition);

    return () => {
      clearTimeout(timeoutId);
      scrollableElement.removeEventListener("scroll", checkScrollPosition);
      window.removeEventListener("resize", checkScrollPosition);
    };
  }, [currentQuestionIndex, motionDivRef, applyJustifyCenter]); // Re-check when content or layout might change

  const handleRadioChange = (value: string) => {
    setCurrentAnswer(value);
    setIsNextEnabled(true);

    // Immediately hide the button when user selects a new answer
    setShowButton(false);
    // Mark that user has made a new selection on this question
    setUserChangedAnswer(true);

    // IMPORTANT: Ensure we save the response properly and synchronously
    addResponse({
      questionId: currentQuestion.id,
      answer: value,
    });

    // For the last question, don't auto-advance but wait for user to click next
    if (currentQuestionIndex >= surveyQuestions.length - 1) {
      // Don't auto-advance the last question to ensure response is saved
      return;
    }

    // Auto-advance after a short delay for radio buttons (not for the last question)
    setTimeout(() => {
      handleNext();
    }, 800);
  };

  const handleCheckboxChange = (value: string, checked: boolean) => {
    setCurrentAnswer((prev) => {
      const prevArray = Array.isArray(prev) ? prev : [];
      if (checked) {
        return [...prevArray, value];
      } else {
        return prevArray.filter((item) => item !== value);
      }
    });
    setIsNextEnabled(true);
    setShowButton(false);
    // Mark that user has made a new selection on this question
    setUserChangedAnswer(true);
  };

  const handleNext = async () => {
    // For checkbox: Save if there are selected options
    if (
      currentQuestion.inputType === "checkbox" &&
      Array.isArray(currentAnswer) &&
      currentAnswer.length > 0
    ) {
      addResponse({
        questionId: currentQuestion.id,
        answer: currentAnswer,
      });
    }

    // For radio: Double check the current answer is saved
    if (currentQuestion.inputType === "radio" && currentAnswer) {
      // Always save the current radio answer when moving to next question
      // This ensures the last question is captured
      addResponse({
        questionId: currentQuestion.id,
        answer: currentAnswer,
      });
    }

    if (currentQuestionIndex < surveyQuestions.length - 1) {
      // Go to next question
      setDirection(1);
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      // Final verification for the last question (q19)
      const lastQuestion = surveyQuestions[surveyQuestions.length - 1];
      const lastQuestionSaved = responses.some(
        (r) => r.questionId === lastQuestion.id
      );

      if (!lastQuestionSaved && currentAnswer) {
        addResponse({
          questionId: lastQuestion.id,
          answer: currentAnswer,
        });
        // Wait for the state to update
        await new Promise((resolve) => setTimeout(resolve, 100));
      }

      // Verify all questions are answered before submission
      const answeredQuestions = new Set(responses.map((r) => r.questionId));
      const allQuestionsAnswered = surveyQuestions.every((q) =>
        answeredQuestions.has(q.id)
      );

      if (!allQuestionsAnswered) {
        // Some questions weren't answered, but we continue anyway
        // as we've already decided to show the loading screen
      }

      // Survey completed, go to loading screen
      setLoadingStatus("preparing");
      setCurrentScreen("loading");
      handleSubmitSurvey();
    }
  };

  const handleBack = () => {
    if (currentQuestionIndex > 0) {
      setDirection(-1);
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    } else {
      resetSurvey();
      setCurrentScreen("landing");
    }
  };

  const renderQuestionInput = () => {
    switch (currentQuestion.inputType) {
      case "radio":
        const isLastQuestion =
          currentQuestionIndex === surveyQuestions.length - 1;
        return (
          <div className="space-y-6 mt-8 w-full max-w-md mx-auto">
            <RadioGroup
              value={currentAnswer as string}
              onValueChange={handleRadioChange}
              className="space-y-4 w-full"
            >
              {currentQuestion.options?.map((option) => (
                <motion.div
                  key={option.value}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="w-full"
                >
                  <div
                    className={`flex items-center w-full p-3 sm:p-4 rounded-xl border-2 transition-all cursor-pointer bg-white shadow-sm hover:shadow-md ${
                      currentAnswer === option.value
                        ? "border-primary bg-primary/5"
                        : "border-gray-200 hover:border-primary/60"
                    }`}
                  >
                    <RadioGroupItem
                      value={option.value}
                      id={option.value}
                      className="mr-3"
                    />
                    <Label
                      htmlFor={option.value}
                      className="flex-grow cursor-pointer text-base sm:text-lg"
                    >
                      {option.label}
                    </Label>
                  </div>
                </motion.div>
              ))}
            </RadioGroup>

            {/* Add explicit continue button for the last question */}
            {isLastQuestion && currentAnswer && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="flex justify-center mt-8"
              >
                <Button
                  onClick={handleNext}
                  size="lg"
                  className="px-6 py-3 text-base sm:px-8 sm:py-4 sm:text-lg rounded-full bg-secondary hover:bg-secondary/90"
                >
                  Complete Survey
                </Button>
              </motion.div>
            )}
          </div>
        );

      case "checkbox":
        const selectedValues = Array.isArray(currentAnswer)
          ? currentAnswer
          : [];
        return (
          <div className="space-y-4 mt-8 w-full max-w-md mx-auto">
            {currentQuestion.options?.map((option, index) => (
              <motion.div
                key={option.value}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="w-full"
              >
                <div className="flex items-center w-full p-3 sm:p-4 rounded-xl border-2 border-gray-200 hover:border-primary/60 transition-all cursor-pointer bg-white shadow-sm hover:shadow-md">
                  <Checkbox
                    id={option.value}
                    checked={selectedValues.includes(option.value)}
                    onCheckedChange={(checked) =>
                      handleCheckboxChange(option.value, checked as boolean)
                    }
                    className="mr-3"
                  />
                  <Label
                    htmlFor={option.value}
                    className="flex-grow cursor-pointer text-base sm:text-lg"
                  >
                    {option.label}
                  </Label>
                </div>
              </motion.div>
            ))}
            <div className="flex justify-center">
              <Button
                onClick={handleNext}
                disabled={!isNextEnabled}
                size="lg"
                className="mt-6 px-6 py-3 text-base sm:px-8 sm:py-4 sm:text-lg rounded-full bg-secondary hover:bg-secondary/90"
              >
                Continue
              </Button>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  // Get section color
  const getSectionColor = () => {
    switch (currentQuestion.section) {
      case "Personal Values and Social Issues":
        return "from-primary to-secondary";
      case "Policy Priorities":
        return "from-secondary to-accent";
      case "Political Experience and Background":
        return "from-accent to-primary";
      case "Legislative Work":
        return "from-primary to-accent";
      case "Candidate Preferences":
        return "from-secondary to-primary";
      default:
        return "from-primary to-secondary";
    }
  };

  // Animation variants
  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    }),
  };

  // Animation variants for the explanation dropdown
  const dropdownVariants = {
    hidden: {
      opacity: 0,
      y: -10,
      height: 0,
      transition: {
        duration: 0.4,
        ease: "easeInOut",
      },
    },
    visible: {
      opacity: 1,
      y: 0,
      height: "auto",
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  // Extract the survey submission logic to a separate function
  const handleSubmitSurvey = async () => {
    try {
      // Track survey submission event
      trackEvent(
        "Survey",
        "Submit_Survey",
        `Completed_${responses.length}_Questions`
      );

      // Update loading status for each stage
      setLoadingStatus("preparing");

      // Short delay to show the preparing state
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setLoadingStatus("sending");

      // Short delay to show the sending state
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setLoadingStatus("matching");

      // Generate matches using our API-based service with loading status callback
      const matchResults = await matchCandidates(
        responses,
        surveyQuestions,
        (status) => {
          // Explicitly update the loading status from the callback
          setLoadingStatus(status);
        }
      );

      // Generate a session ID for sharing
      const newSessionId = await generateSessionId();
      setSessionId(newSessionId);

      // Complete the loading process
      setLoadingStatus("complete");

      // Track matching completion event
      trackEvent(
        "Survey",
        "Matching_Complete",
        `Matches_Found_${matchResults.length}`
      );

      // Short delay to show the complete state
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Set the matches and go to results screen
      setMatches(matchResults);
      setCurrentScreen("results");
    } catch (error) {
      console.error("Error generating matches:", error);
      // Handle error more specifically
      const errorMessage =
        error instanceof Error
          ? error.message
          : "There was an error generating your matches.";

      // Track error event
      trackEvent("Error", "Matching_Error", errorMessage);

      alert(`Error: ${errorMessage}\n\nPlease try again.`);
      setCurrentScreen("landing");
    }
  };

  return (
    <div className="h-full w-full flex flex-col overflow-x-hidden">
      {/* Progress bar - fixed at the very top */}
      <div className="fixed top-0 left-0 right-0 w-full z-20">
        <div className="h-1 bg-gray-200 w-full">
          <div
            className={`h-full bg-gradient-to-r ${getSectionColor()} transition-all duration-500`}
            style={{
              width: `${
                ((currentQuestionIndex + 1) / surveyQuestions.length) * 100
              }%`,
            }}
          ></div>
        </div>
        <div className="absolute top-3 right-4 text-xs font-medium text-gray-500">
          {currentQuestionIndex + 1}/{surveyQuestions.length}
        </div>
      </div>

      {/* Back button - fixed */}
      <button
        onClick={handleBack}
        className="fixed top-4 left-4 z-10 p-2 rounded-full bg-white/80 backdrop-blur-sm shadow-sm hover:bg-gray-100 transition-colors"
        aria-label="Go back"
      >
        <ChevronLeft className="h-5 w-5 text-gray-600" />
      </button>

      {/* Main scrollable container - centered both horizontally and vertically */}
      <div
        ref={containerRef}
        className="relative h-full w-full overflow-hidden md:pt-12 md:pb-12"
        style={{
          boxSizing: "border-box",
          width: "100%",
          maxWidth: "100%",
        }}
      >
        <AnimatePresence custom={direction} mode="wait">
          <motion.div
            key={currentQuestionIndex}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ type: "tween", duration: 0.5, ease: "easeInOut" }}
            ref={motionDivRef}
            className={`w-full h-full max-w-3xl mx-auto p-8 flex flex-col items-center ${
              applyJustifyCenter ? "justify-center" : ""
            } overflow-y-auto`}
          >
            {/* Section indicator */}
            {currentQuestion.section && (
              <div className="mb-6 text-center">
                <span
                  className={`inline-block px-4 py-1 rounded-full text-sm font-medium text-white bg-gradient-to-r ${getSectionColor()} shadow-md`}
                >
                  {currentQuestion.section}
                </span>
              </div>
            )}

            {/* Question with translation and explanation */}
            <div className="text-center mb-8 relative">
              <div className="flex items-center justify-center mb-2">
                <h2 className="text-3xl md:text-4xl font-bold text-center leading-tight">
                  {currentQuestion.text}
                </h2>
                <button
                  data-info-button="true"
                  onClick={toggleInfo}
                  className={`ml-2 p-1.5 rounded-full ${
                    showInfo
                      ? "bg-primary text-white"
                      : "bg-primary/10 text-primary hover:bg-primary/20"
                  } transition-colors shadow-sm`}
                  aria-label="Show explanation"
                  aria-expanded={showInfo}
                >
                  <Info className="h-5 w-5" />
                </button>
              </div>
              {questionInfo.tagalog && (
                <p className="text-lg text-gray-600 italic mt-2">
                  {questionInfo.tagalog}
                </p>
              )}

              {/* Explanation dropdown */}
              <AnimatePresence>
                {showInfo && (
                  <motion.div
                    ref={explanationRef}
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                    variants={dropdownVariants}
                    className="mt-4 mx-auto max-w-2xl bg-white rounded-lg shadow-lg border border-primary/20 overflow-hidden"
                  >
                    <div className="p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-semibold text-lg text-primary">
                          About this question
                        </h3>
                        <button
                          onClick={toggleInfo}
                          className="text-gray-500 hover:text-gray-700 rounded-full p-1 hover:bg-gray-100"
                        >
                          <X className="h-5 w-5" />
                        </button>
                      </div>
                      <p className="text-sm sm:text-base text-gray-700 mb-4 text-left">
                        {questionInfo.explanation}
                      </p>

                      <div className="bg-primary/5 p-3 rounded-md">
                        <p className="font-medium text-gray-700 mb-1 text-left">
                          Tagalog:
                        </p>
                        <p className="text-sm sm:text-base italic text-gray-600 text-left">
                          {questionInfo.tagalog}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Input */}
            {renderQuestionInput()}

            {isMobile &&
              showButton &&
              currentQuestion.inputType === "radio" &&
              !userChangedAnswer && (
                <motion.button
                  onClick={handleNext}
                  className="p-3 mt-4 rounded-full bg-secondary text-white shadow-md hover:bg-secondary/90 transition-colors z-20"
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1, y: [0, -5, 0] }}
                  exit={{ opacity: 0, scale: 0.5 }}
                  transition={{ duration: 0.5 }}
                  key={`mobile-next-${currentQuestionIndex}`}
                >
                  <ChevronRight className="h-6 w-6" />
                </motion.button>
              )}

            {/* Other buttons */}
            {currentQuestion.inputType !== "radio" &&
              currentQuestion.inputType !== "checkbox" && (
                <Button
                  onClick={handleNext}
                  disabled={!isNextEnabled}
                  size="lg"
                  className="mt-8 px-6 py-3 text-base sm:px-8 sm:py-4 sm:text-lg rounded-full bg-secondary hover:bg-secondary/90"
                >
                  Continue
                </Button>
              )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Keyboard shortcuts hint - fixed at bottom */}
      {!isMobile && (
        <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 flex items-center gap-4 text-xs text-gray-500 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-sm z-10">
          <div className="flex items-center gap-1">
            <kbd className="px-2 py-1 bg-gray-100 rounded-md">↵</kbd>
            <span>Continue</span>
          </div>
          <div className="flex items-center gap-1">
            <kbd className="px-2 py-1 bg-gray-100 rounded-md">Esc</kbd>
            <span>Back</span>
          </div>
        </div>
      )}

      {/* Next indicator - fixed at bottom - Now a scroll-to-bottom button */}
      {isMobile &&
        currentQuestion.inputType !== "radio" &&
        showScrollDownButton && (
          <div className="fixed inset-x-0 bottom-0 flex justify-center items-end pb-20 z-20 pointer-events-none">
            <motion.button
              onClick={() => {
                if (motionDivRef.current) {
                  motionDivRef.current.scrollTo({
                    top: motionDivRef.current.scrollHeight,
                    behavior: "smooth",
                  });
                }
              }}
              className="p-3 rounded-full bg-secondary text-white shadow-md hover:bg-secondary/90 transition-colors animate-bounce pointer-events-auto"
              aria-label="Scroll to bottom"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              transition={{ duration: 0.5 }}
              key={`bottom-next-${currentQuestionIndex}`}
            >
              <ChevronDown className="h-6 w-6" />
            </motion.button>
          </div>
        )}
    </div>
  );
}
