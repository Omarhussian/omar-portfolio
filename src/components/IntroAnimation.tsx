"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface IntroAnimationProps {
  onComplete: () => void;
}

export default function IntroAnimation({ onComplete }: IntroAnimationProps) {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase(1), 500),   // Show text
      setTimeout(() => setPhase(2), 1500),  // Animate out
      setTimeout(() => onComplete(), 2200), // Complete
    ];

    return () => timers.forEach(clearTimeout);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {phase < 2 && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-zinc-950"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Background gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-zinc-950 via-zinc-900 to-zinc-950" />
          
          {/* Animated glow */}
          <motion.div
            className="absolute w-[600px] h-[600px] bg-purple-600/20 rounded-full blur-[150px]"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.2, 0.4, 0.2],
            }}
            transition={{ duration: 2, repeat: Infinity }}
          />

          <div className="relative z-10 text-center">
            {/* Logo/Initials */}
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={phase >= 1 ? { scale: 1, opacity: 1 } : {}}
              transition={{ duration: 0.5, type: "spring", stiffness: 200 }}
              className="mb-6"
            >
              <span className="text-7xl md:text-9xl font-bold bg-gradient-to-r from-purple-400 via-violet-400 to-purple-400 bg-clip-text text-transparent">
                {"<OH/>"}
              </span>
            </motion.div>

            {/* Name */}
            <motion.h1
              initial={{ y: 20, opacity: 0 }}
              animate={phase >= 1 ? { y: 0, opacity: 1 } : {}}
              transition={{ delay: 0.2, duration: 0.4 }}
              className="text-2xl md:text-3xl font-medium text-white mb-2"
            >
              Omar Hussain
            </motion.h1>

            {/* Title */}
            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={phase >= 1 ? { y: 0, opacity: 1 } : {}}
              transition={{ delay: 0.4, duration: 0.4 }}
              className="text-zinc-500 tracking-widest uppercase text-sm"
            >
              Senior Front-End Engineer
            </motion.p>

            {/* Loading bar */}
            <motion.div
              initial={{ scaleX: 0, opacity: 0 }}
              animate={phase >= 1 ? { scaleX: 1, opacity: 1 } : {}}
              transition={{ delay: 0.6, duration: 0.8, ease: "easeInOut" }}
              className="mt-8 mx-auto w-48 h-0.5 bg-gradient-to-r from-transparent via-purple-500 to-transparent origin-left"
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
