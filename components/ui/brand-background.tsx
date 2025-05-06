import React, { useEffect, useState } from "react";
import { motion, useAnimation } from "framer-motion";
import { useSurvey } from "@/context/survey-context";

export function BrandBackground({
  className = "",
  screenType,
}: {
  className?: string;
  screenType?: string;
}) {
  // Use try/catch to handle the case when this component is used outside of a SurveyProvider
  let currentScreen = screenType || "default";
  let currentQuestionIndex = 0;

  try {
    // If this doesn't throw, we're inside a SurveyProvider
    const survey = useSurvey();
    currentScreen = survey.currentScreen;
    currentQuestionIndex = survey.currentQuestionIndex || 0;
  } catch (e) {
    // We're outside a SurveyProvider, use the provided screenType or default
  }

  const controls1 = useAnimation();
  const controls2 = useAnimation();
  const controls3 = useAnimation();
  const controls4 = useAnimation();
  const controls5 = useAnimation();
  const controls6 = useAnimation();
  const controls7 = useAnimation();
  const controls8 = useAnimation();

  // Additional mini controls for more floating elements
  const miniControls1 = useAnimation();
  const miniControls2 = useAnimation();
  const miniControls3 = useAnimation();
  const miniControls4 = useAnimation();
  const miniControls5 = useAnimation();
  const miniControls6 = useAnimation();
  const miniControls7 = useAnimation();
  const miniControls8 = useAnimation();

  // Track previous screen to trigger animations on screen change
  const [prevScreen, setPrevScreen] = useState(currentScreen);
  const [prevQuestion, setPrevQuestion] = useState(currentQuestionIndex);

  // Animate mini elements with random paths for collision effect
  useEffect(() => {
    // Create gentler floating motions
    const animateMiniElements = () => {
      const randomPath = () => {
        // Use consistent movement range for all screens for uniformity
        const size = Math.random() * 25 + 10; // Consistent range (10-35px)
        const randomRotation = Math.random() * 90; // Consistent rotation
        const randomDuration = Math.random() * 7 + 10; // Consistent durations (10-17s)

        // Create more gentle and graceful easing
        const easings = ["easeInOut", "circInOut", "circOut"];
        const randomEasing =
          easings[Math.floor(Math.random() * easings.length)];

        // Uniform gentle paths across all screens
        return {
          x: [
            0,
            Math.random() > 0.5 ? size : -size,
            Math.random() > 0.5 ? size / 2 : -size / 2,
            0,
          ],
          y: [
            0,
            Math.random() > 0.5 ? size : -size,
            Math.random() > 0.5 ? -size / 2 : size / 2,
            0,
          ],
          rotate: [0, randomRotation / 2, randomRotation, 0],
          scale: [1, Math.random() * 0.15 + 0.9, Math.random() * 0.1 + 0.95, 1], // Subtle scaling
          transition: {
            duration: randomDuration,
            repeat: Infinity,
            repeatType: "mirror" as const,
            ease: randomEasing as any,
          },
        };
      };

      // Apply random paths with more staggered timing to create natural flow
      miniControls1.start(randomPath());
      miniControls2.start(randomPath());
      miniControls3.start(randomPath());
      miniControls4.start(randomPath());
      miniControls5.start(randomPath());
      miniControls6.start(randomPath());
      miniControls7.start(randomPath());
      miniControls8.start(randomPath());

      // Stagger the animations for main elements
      setTimeout(() => controls1.start(randomPath()), 200);
      setTimeout(() => controls2.start(randomPath()), 400);
      setTimeout(() => controls3.start(randomPath()), 600);
      setTimeout(() => controls4.start(randomPath()), 800);
      setTimeout(() => controls5.start(randomPath()), 1000);
      setTimeout(() => controls6.start(randomPath()), 1200);
      setTimeout(() => controls7.start(randomPath()), 1400);
      setTimeout(() => controls8.start(randomPath()), 1600);
    };

    animateMiniElements();
    // Start on mount and restart every 30 seconds to create varied motion
    const interval = setInterval(animateMiniElements, 30000);

    return () => clearInterval(interval);
  }, [
    miniControls1,
    miniControls2,
    miniControls3,
    miniControls4,
    miniControls5,
    miniControls6,
    miniControls7,
    miniControls8,
    controls1,
    controls2,
    controls3,
    controls4,
    controls5,
    controls6,
    controls7,
    controls8,
    currentScreen,
  ]);

  useEffect(() => {
    // When screen changes, animate elements in different ways
    if (prevScreen !== currentScreen) {
      setPrevScreen(currentScreen);

      // Reset all elements with a subtle transition
      const resetAllElements = async () => {
        await Promise.all([
          controls1.start({ scale: 1.03, transition: { duration: 0.5 } }),
          controls2.start({ scale: 1.03, transition: { duration: 0.5 } }),
          controls3.start({ scale: 1.03, transition: { duration: 0.5 } }),
          controls4.start({ scale: 1.03, transition: { duration: 0.5 } }),
          controls5.start({ scale: 1.03, transition: { duration: 0.5 } }),
          controls6.start({ scale: 1.03, transition: { duration: 0.5 } }),
          controls7.start({ scale: 1.03, transition: { duration: 0.5 } }),
          controls8.start({ scale: 1.03, transition: { duration: 0.5 } }),
        ]);

        // Then reset back and continue animations
        await Promise.all([
          controls1.start({ scale: 1, transition: { duration: 0.7 } }),
          controls2.start({ scale: 1, transition: { duration: 0.7 } }),
          controls3.start({ scale: 1, transition: { duration: 0.7 } }),
          controls4.start({ scale: 1, transition: { duration: 0.7 } }),
          controls5.start({ scale: 1, transition: { duration: 0.7 } }),
          controls6.start({ scale: 1, transition: { duration: 0.7 } }),
          controls7.start({ scale: 1, transition: { duration: 0.7 } }),
          controls8.start({ scale: 1, transition: { duration: 0.7 } }),
        ]);
      };

      resetAllElements();
    }

    // When question changes, AVOID jumps - just let elements continue floating
    if (prevQuestion !== currentQuestionIndex && currentScreen === "survey") {
      setPrevQuestion(currentQuestionIndex);

      // No need to add extra ripple animations on question change
      // This prevents the jump effect when moving between survey questions
    }
  }, [
    currentScreen,
    currentQuestionIndex,
    prevScreen,
    prevQuestion,
    controls1,
    controls2,
    controls3,
    controls4,
    controls5,
    controls6,
    controls7,
    controls8,
  ]);

  // New effect: occasional gentle ripple animation across all elements
  useEffect(() => {
    // Function to create a ripple effect across all elements
    const createRippleEffect = async () => {
      // Start with mini elements with staggered timing
      const staggerDelay = 200; // Uniform delay

      // Consistent subtle scale effect
      const scaleAmount = 1.03;

      // First wave - outward ripple with all elements
      const rippleControllers = [
        miniControls1,
        miniControls2,
        miniControls3,
        miniControls4,
        miniControls5,
        miniControls6,
        miniControls7,
        miniControls8,
        controls1,
        controls2,
        controls3,
        controls4,
        controls5,
        controls6,
        controls7,
        controls8,
      ];

      for (let i = 0; i < rippleControllers.length; i++) {
        setTimeout(() => {
          rippleControllers[i].start({
            scale: [1, scaleAmount, 1],
            transition: {
              duration: 3,
              ease: "easeInOut",
            },
          });
        }, i * staggerDelay);
      }
    };

    // Create ripple effect periodically
    const rippleInterval = setInterval(createRippleEffect, 40000); // Every 40 seconds

    // Run once on mount after a delay
    setTimeout(createRippleEffect, 8000); // Initial ripple after 8 seconds

    return () => clearInterval(rippleInterval);
  }, [
    miniControls1,
    miniControls2,
    miniControls3,
    miniControls4,
    miniControls5,
    miniControls6,
    miniControls7,
    miniControls8,
    controls1,
    controls2,
    controls3,
    controls4,
    controls5,
    controls6,
    controls7,
    controls8,
  ]);

  // Uniform positions across all screens
  const getPositionStyles = () => {
    // Create a single uniform layout independent of screen type for consistent background
    return {
      circle1: "top-[8%] left-[6%]",
      triangle: "right-[7%] top-[10%]",
      square: "bottom-[15%] left-[12%]",
      smallCircle: "top-[25%] right-[15%]",
      rectangle: "bottom-[20%] right-[10%]",
      diamond: "bottom-[18%] left-[45%]",
      smallTriangle: "top-[35%] left-[20%]",
      tinyCircle: "bottom-[35%] right-[25%]",
      // Mini elements - well spread throughout
      mini1: "top-[40%] left-[25%]",
      mini2: "top-[60%] left-[70%]",
      mini3: "bottom-[40%] left-[40%]",
      mini4: "top-[20%] right-[40%]",
      mini5: "bottom-[30%] right-[30%]",
      mini6: "top-[50%] right-[20%]",
      mini7: "bottom-[55%] left-[60%]",
      mini8: "top-[75%] right-[55%]",
    };
  };

  const positions = getPositionStyles();

  // Uniform opacity for all screens
  const getOpacityLevel = () => {
    // Consistent 20% opacity across all screens
    return { base: "15", accent: "20" };
  };

  const opacity = getOpacityLevel();

  return (
    <div
      className={`fixed inset-0 overflow-hidden z-[5] pointer-events-none ${className}`}
    >
      {/* Mini floating elements - first set */}
      <motion.div
        className={`absolute w-3 h-3 rounded-full bg-primary/${opacity.accent} ${positions.mini1}`}
        animate={miniControls1}
      />

      <motion.div
        className={`absolute w-4 h-4 bg-secondary/${opacity.accent} rotate-45 ${positions.mini2}`}
        animate={miniControls2}
      />

      <motion.div
        className={`absolute ${positions.mini3}`}
        animate={miniControls3}
      >
        <svg width="15" height="15" viewBox="0 0 15 15">
          <polygon
            points="7.5,0 15,15 0,15"
            fill={`rgb(248, 113, 113, 0.${Math.max(
              15,
              parseInt(opacity.accent)
            )})`}
          />
        </svg>
      </motion.div>

      <motion.div
        className={`absolute w-3 h-6 bg-primary/${opacity.base} rounded-sm ${positions.mini4}`}
        animate={miniControls4}
      />

      {/* Additional mini floating elements */}
      <motion.div
        className={`absolute w-4 h-4 rounded-full bg-accent/${opacity.accent} ${positions.mini5}`}
        animate={miniControls5}
      />

      <motion.div
        className={`absolute w-3 h-3 bg-primary/${opacity.accent} ${positions.mini6}`}
        animate={miniControls6}
      />

      <motion.div
        className={`absolute ${positions.mini7}`}
        animate={miniControls7}
      >
        <svg width="12" height="12" viewBox="0 0 12 12">
          <rect
            x="0"
            y="0"
            width="12"
            height="12"
            fill={`rgb(59, 130, 246, 0.${Math.max(
              15,
              parseInt(opacity.accent)
            )})`}
          />
        </svg>
      </motion.div>

      <motion.div
        className={`absolute w-6 h-2 bg-secondary/${opacity.accent} rounded-sm ${positions.mini8}`}
        animate={miniControls8}
      />

      {/* Primary color circle */}
      <motion.div
        className={`absolute ${positions.circle1}`}
        animate={controls1}
        initial={{
          y: 0,
          x: 0,
          scale: 1,
        }}
        whileInView={{
          y: [0, 5, -2, 3, 0],
          x: [0, 3, -2, 1, 0],
          scale: [1, 1.02, 0.99, 1.01, 1],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut",
        }}
      >
        <svg width="100" height="100" viewBox="0 0 100 100">
          <circle
            cx="50"
            cy="50"
            r="50"
            fill={`rgb(59, 130, 246, 0.${Math.max(
              15,
              parseInt(opacity.base)
            )})`}
          />
        </svg>
      </motion.div>

      {/* Secondary color triangle */}
      <motion.div
        className={`absolute ${positions.triangle}`}
        animate={controls2}
        initial={{
          y: 0,
          rotate: 45,
        }}
        whileInView={{
          y: [0, -7, 2, -4, 0],
          rotate: [0, 5, -2, 3, 0],
          scale: [1, 1.01, 0.99, 1.005, 1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut",
        }}
      >
        <svg width="80" height="80" viewBox="0 0 80 80">
          <polygon
            points="40,0 80,80 0,80"
            fill={`rgb(16, 185, 129, 0.${Math.max(
              15,
              parseInt(opacity.base)
            )})`}
          />
        </svg>
      </motion.div>

      {/* Accent color square */}
      <motion.div
        className={`absolute ${positions.square}`}
        animate={controls3}
        initial={{
          y: 0,
          rotate: 0,
        }}
        whileInView={{
          y: [0, 6, -3, 2, 0],
          rotate: [0, 3, -1, 2, 0],
          scale: [1, 1.015, 0.99, 1.005, 1],
        }}
        transition={{
          duration: 22,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut",
        }}
      >
        <svg width="60" height="60" viewBox="0 0 60 60">
          <rect
            x="5"
            y="5"
            width="50"
            height="50"
            rx="5"
            fill={`rgb(248, 113, 113, 0.${Math.max(
              15,
              parseInt(opacity.base)
            )})`}
          />
        </svg>
      </motion.div>

      {/* Primary small circle */}
      <motion.div
        className={`absolute ${positions.smallCircle}`}
        animate={controls4}
        initial={{
          x: 0,
          y: 0,
        }}
        whileInView={{
          x: [0, 5, -3, 2, 0],
          y: [0, -4, 2, -1, 0],
          scale: [1, 1.03, 0.98, 1.01, 1],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut",
        }}
      >
        <svg width="30" height="30" viewBox="0 0 30 30">
          <circle
            cx="15"
            cy="15"
            r="15"
            fill={`rgb(59, 130, 246, 0.${Math.max(
              15,
              parseInt(opacity.accent)
            )})`}
          />
        </svg>
      </motion.div>

      {/* Secondary small rectangle */}
      <motion.div
        className={`absolute w-20 h-10 bg-secondary/${opacity.accent} ${positions.rectangle} rounded-md`}
        animate={controls5}
        initial={{
          y: 0,
          x: 0,
          rotate: 0,
        }}
        whileInView={{
          y: [0, 3, 0],
          x: [0, -3, 0],
          rotate: [0, -2, 0],
        }}
        transition={{
          duration: 7,
          repeat: Infinity,
          repeatType: "reverse",
        }}
      />

      {/* Accent diamond */}
      <motion.div
        className={`absolute w-16 h-16 bg-accent/${opacity.accent} ${positions.diamond} rotate-45`}
        animate={controls6}
        initial={{
          y: 0,
          rotate: 45,
        }}
        whileInView={{
          y: [0, -7, 0],
          rotate: [45, 42, 45],
        }}
        transition={{
          duration: 9,
          repeat: Infinity,
          repeatType: "reverse",
        }}
      />

      {/* Small triangle */}
      <motion.div
        className={`absolute w-0 h-0 border-l-[8px] border-r-[8px] border-b-[16px] border-l-transparent border-r-transparent border-b-primary/${opacity.accent} ${positions.smallTriangle}`}
        animate={controls7}
        initial={{
          y: 0,
          rotate: 0,
        }}
        whileInView={{
          y: [0, 5, 0],
          rotate: [0, 10, 0],
        }}
        transition={{
          duration: 11,
          repeat: Infinity,
          repeatType: "reverse",
        }}
      />

      {/* Tiny circle */}
      <motion.div
        className={`absolute w-6 h-6 rounded-full bg-secondary/${opacity.accent} ${positions.tinyCircle}`}
        animate={controls8}
        initial={{
          x: 0,
          y: 0,
          scale: 1,
        }}
        whileInView={{
          x: [0, -3, 0],
          y: [0, 3, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          repeatType: "reverse",
        }}
      />
    </div>
  );
}
