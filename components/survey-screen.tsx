"use client";

import { useState, useEffect, useRef } from "react";
import { useSurvey } from "@/context/survey-context";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { surveyQuestions } from "@/data/survey-questions";
import {
  matchCandidates,
  generateSessionId,
} from "@/services/matching-service";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronUp } from "lucide-react";

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

  const [currentAnswer, setCurrentAnswer] = useState<string | string[]>("");
  const [isNextEnabled, setIsNextEnabled] = useState(false);
  const [direction, setDirection] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const currentQuestion = surveyQuestions[currentQuestionIndex];

  // Scroll to top when question changes
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  }, [currentQuestionIndex]);

  // Check if there's a saved response for this question
  useEffect(() => {
    if (currentQuestion.inputType === "checkbox") {
      setCurrentAnswer("3");
      setIsNextEnabled(true);
    }

    const savedResponse = responses.find(
      (r) => r.questionId === currentQuestion.id
    );
    if (savedResponse) {
      setCurrentAnswer(savedResponse.answer);
      setIsNextEnabled(true);
    } else {
      setCurrentAnswer(currentQuestion.inputType === "checkbox" ? [] : "");
      setIsNextEnabled(false);
    }
  }, [currentQuestion.id, currentQuestionIndex, responses]);

  // Add keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Enter" && isNextEnabled) {
        handleNext();
      } else if (e.key === "Backspace" || e.key === "Escape") {
        console.log("backspace or escape");
        handleBack();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  });

  const handleRadioChange = (value: string) => {
    setCurrentAnswer(value);
    setIsNextEnabled(true);

    // Save the response immediately
    addResponse({
      questionId: currentQuestion.id,
      answer: value,
    });

    // Auto-advance after a short delay for radio buttons
    setTimeout(() => {
      handleNext();
    }, 800); // Slightly longer delay for better UX
  };

  const handleSliderChange = (value: number[]) => {
    setCurrentAnswer(value[0].toString());
    addResponse({
      questionId: currentQuestion.id,
      answer: value[0].toString(),
    });
    setIsNextEnabled(true);
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
  };

  const handleNext = async () => {
    if (currentQuestion.inputType === "slider") {
      if (!currentAnswer) {
        addResponse({
          questionId: currentQuestion.id,
          answer: "3",
        });
      }
    }

    if (currentQuestion.inputType === "checkbox") {
      if (Array.isArray(currentAnswer) && currentAnswer.length > 0) {
        addResponse({
          questionId: currentQuestion.id,
          answer: currentAnswer,
        });
      }
    }

    if (currentQuestionIndex < surveyQuestions.length - 1) {
      // Go to next question
      setDirection(1);
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      // Final check to ensure the last question is saved
      const lastQuestionSaved = responses.some(
        (r) => r.questionId === currentQuestion.id
      );

      if (!lastQuestionSaved) {
        // Add the last question's response if it hasn't been saved yet
        addResponse({
          questionId: currentQuestion.id,
          answer: currentAnswer,
        });

        // Small delay to ensure state is updated
        await new Promise((resolve) => setTimeout(resolve, 100));
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
        return (
          <RadioGroup
            value={currentAnswer as string}
            onValueChange={handleRadioChange}
            className="space-y-4 mt-8 w-full max-w-md mx-auto"
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
                  className={`flex items-center w-full p-4 rounded-xl border-2 transition-all cursor-pointer bg-white shadow-sm hover:shadow-md ${
                    currentAnswer === option.value
                      ? "border-blue-500 bg-blue-50"
                      : "border-gray-200 hover:border-blue-400"
                  }`}
                >
                  <RadioGroupItem
                    value={option.value}
                    id={option.value}
                    className="mr-3"
                  />
                  <Label
                    htmlFor={option.value}
                    className="flex-grow cursor-pointer text-lg"
                  >
                    {option.label}
                  </Label>
                </div>
              </motion.div>
            ))}
          </RadioGroup>
        );

      case "slider":
        const value = currentAnswer
          ? [Number.parseInt(currentAnswer as string)]
          : [3];
        return (
          <div className="space-y-8 mt-8 w-full max-w-md mx-auto">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="bg-white p-6 rounded-xl shadow-sm"
            >
              <Slider
                value={value}
                min={currentQuestion.min || 1}
                max={currentQuestion.max || 5}
                step={currentQuestion.step || 1}
                onValueChange={handleSliderChange}
                className="mt-6"
              />
              <div className="flex justify-between text-sm text-gray-500 mt-4">
                <span>Not Important</span>
                <span>Very Important</span>
              </div>
              <div className="text-center text-3xl font-medium mt-6 text-blue-600">
                {value[0]}/5
              </div>
            </motion.div>
            <div className="flex justify-center">
              <Button
                onClick={handleNext}
                size="lg"
                className="mt-4 px-8 py-6 text-lg rounded-full"
              >
                Continue
              </Button>
            </div>
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
                <div className="flex items-center w-full p-4 rounded-xl border-2 border-gray-200 hover:border-blue-400 transition-all cursor-pointer bg-white shadow-sm hover:shadow-md">
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
                    className="flex-grow cursor-pointer text-lg"
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
                className="mt-6 px-8 py-6 text-lg rounded-full"
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
        return "from-blue-500 to-blue-600";
      case "Policy Priorities":
        return "from-purple-500 to-purple-600";
      case "Political Experience and Background":
        return "from-green-500 to-green-600";
      case "Legislative Work":
        return "from-orange-500 to-orange-600";
      case "Candidate Preferences":
        return "from-red-500 to-red-600";
      default:
        return "from-blue-500 to-blue-600";
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

  // Extract the survey submission logic to a separate function
  const handleSubmitSurvey = async () => {
    try {
      // Update loading status for each stage
      setLoadingStatus("preparing");

      // Short delay to show the preparing state
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Generate matches using our API-based service with loading status callback
      const matchResults = await matchCandidates(
        responses,
        surveyQuestions,
        setLoadingStatus
      );

      // Generate a session ID for sharing
      const newSessionId = await generateSessionId();
      setSessionId(newSessionId);

      // Complete the loading process
      setLoadingStatus("complete");

      // Short delay to show the complete state
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Set the matches and go to results screen
      setMatches(matchResults);
      setCurrentScreen("results");
    } catch (error) {
      console.error("Error generating matches:", error);
      // Handle error
      alert("There was an error generating your matches. Please try again.");
      setCurrentScreen("landing");
    }
  };

  return (
    <div
      ref={containerRef}
      className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden"
    >
      {/* Progress bar - fixed at top */}
      <div className="fixed top-0 left-0 w-full z-10">
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

      {/* Back button - fixed at top left */}
      <button
        onClick={handleBack}
        className="fixed top-4 left-4 z-10 p-2 rounded-full bg-white/80 backdrop-blur-sm shadow-sm hover:bg-gray-100 transition-colors"
        aria-label="Go back"
      >
        <ChevronUp className="h-5 w-5 text-gray-600" />
      </button>

      {/* Main content */}
      <AnimatePresence custom={direction} mode="wait">
        <motion.div
          key={currentQuestionIndex}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ type: "tween", duration: 0.5, ease: "easeInOut" }}
          className="w-full max-w-3xl mx-auto px-4 py-16 flex flex-col items-center justify-center min-h-screen"
        >
          {/* Section indicator */}
          {currentQuestion.section && (
            <div className="mb-6 text-center">
              <span
                className={`inline-block px-4 py-1 rounded-full text-sm font-medium text-white bg-gradient-to-r ${getSectionColor()}`}
              >
                {currentQuestion.section}
              </span>
            </div>
          )}

          {/* Question */}
          <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center leading-tight">
            {currentQuestion.text}
          </h2>

          {/* Input */}
          {renderQuestionInput()}

          {/* Next button for radio (handled by auto-advance) and slider (has its own button) */}
          {currentQuestion.inputType !== "radio" &&
            currentQuestion.inputType !== "slider" &&
            currentQuestion.inputType !== "checkbox" && (
              <Button
                onClick={handleNext}
                disabled={!isNextEnabled}
                size="lg"
                className="mt-8 px-8 py-6 text-lg rounded-full"
              >
                Continue
              </Button>
            )}
        </motion.div>
      </AnimatePresence>

      {/* Keyboard shortcuts hint */}
      <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 flex items-center gap-4 text-xs text-gray-500 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-sm">
        <div className="flex items-center gap-1">
          <kbd className="px-2 py-1 bg-gray-100 rounded-md">↵</kbd>
          <span>Continue</span>
        </div>
        <div className="flex items-center gap-1">
          <kbd className="px-2 py-1 bg-gray-100 rounded-md">Esc</kbd>
          <span>Back</span>
        </div>
      </div>

      {/* Next indicator - fixed at bottom */}
      {isNextEnabled && currentQuestion.inputType !== "radio" && (
        <button
          onClick={handleNext}
          className="fixed bottom-16 left-1/2 transform -translate-x-1/2 p-2 rounded-full bg-blue-500 text-white shadow-md hover:bg-blue-600 transition-colors animate-bounce"
          aria-label="Next question"
        >
          <ChevronDown className="h-6 w-6" />
        </button>
      )}
    </div>
  );
}
