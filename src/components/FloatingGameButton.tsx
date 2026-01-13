"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Gamepad2 } from "lucide-react";

interface FloatingGameButtonProps {
  onClick: () => void;
}

export default function FloatingGameButton({ onClick }: FloatingGameButtonProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className="fixed bottom-6 right-6 z-40"
      initial={{ opacity: 0, scale: 0, y: 50 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ delay: 2, duration: 0.5, type: "spring" }}
    >
      <motion.button
        onClick={onClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className="relative flex items-center gap-2 px-4 py-3 bg-gradient-to-r from-purple-600 to-violet-600 text-white rounded-full shadow-lg shadow-purple-500/30 hover:shadow-purple-500/50 transition-shadow"
      >
        <motion.div
          animate={{ rotate: isHovered ? [0, -10, 10, 0] : 0 }}
          transition={{ duration: 0.4 }}
        >
          <Gamepad2 className="w-5 h-5" />
        </motion.div>
        
        <AnimatePresence>
          {isHovered && (
            <motion.span
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: "auto", opacity: 1 }}
              exit={{ width: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="text-sm font-medium whitespace-nowrap overflow-hidden"
            >
              Play Snake
            </motion.span>
          )}
        </AnimatePresence>

        {/* Pulse animation */}
        <motion.div
          className="absolute inset-0 rounded-full bg-purple-500"
          animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0, 0.5] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          style={{ zIndex: -1 }}
        />
      </motion.button>
    </motion.div>
  );
}
