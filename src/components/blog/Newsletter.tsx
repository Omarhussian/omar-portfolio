"use client";

import { useState } from "react";
import { Mail, CheckCircle2, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface NewsletterProps {
  variant?: "default" | "compact";
}

export default function Newsletter({ variant = "default" }: NewsletterProps) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "submitting" | "success">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setStatus("submitting");

    // Simulate API call (UI only for now)
    await new Promise((resolve) => setTimeout(resolve, 1000));

    setStatus("success");
    setEmail("");

    // Reset after 3 seconds
    setTimeout(() => setStatus("idle"), 3000);
  };

  const isCompact = variant === "compact";

  return (
    <div
      className={`relative ${
        isCompact ? "p-6" : "p-8 md:p-12"
      } rounded-3xl bg-gradient-to-br from-purple-500/10 via-pink-500/10 to-cyan-500/10 border border-zinc-800 overflow-hidden`}
    >
      {/* Glassmorphism overlay */}
      <div className="absolute inset-0 bg-zinc-900/80 backdrop-blur-sm" />

      {/* Animated background gradient */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-0 left-0 w-64 h-64 bg-purple-500 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-cyan-500 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      {/* Content */}
      <div className="relative z-10">
        <div className={`${isCompact ? "text-center" : "max-w-2xl mx-auto text-center"}`}>
          {/* Icon */}
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-purple-500/20 to-cyan-500/20 border border-purple-500/30 mb-4">
            <Sparkles className="w-6 h-6 text-purple-400" />
          </div>

          {/* Heading */}
          <h3 className={`${isCompact ? "text-xl" : "text-2xl md:text-3xl"} font-bold text-white mb-3`}>
            {isCompact ? "Stay Updated" : "Join the Newsletter"}
          </h3>
          <p className={`${isCompact ? "text-sm" : "text-base"} text-zinc-400 mb-6`}>
            {isCompact
              ? "Get insights on building high-scale systems"
              : "Get weekly insights on building secure, high-scale systems for Fintech, AI, and beyond."}
          </p>

          {/* Form */}
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <div className="flex-1 relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                disabled={status !== "idle"}
                className="w-full pl-12 pr-4 py-3 rounded-full bg-zinc-800/80 border border-zinc-700 text-white placeholder:text-zinc-500 focus:outline-none focus:border-purple-500/50 focus:ring-2 focus:ring-purple-500/20 transition-all disabled:opacity-50"
                required
              />
            </div>
            <motion.button
              type="submit"
              disabled={status !== "idle"}
              whileHover={status === "idle" ? { scale: 1.05 } : {}}
              whileTap={status === "idle" ? { scale: 0.95 } : {}}
              className="px-6 py-3 rounded-full bg-gradient-to-r from-purple-500 to-cyan-500 text-white font-medium hover:from-purple-600 hover:to-cyan-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 whitespace-nowrap"
            >
              <AnimatePresence mode="wait">
                {status === "idle" && <span key="idle">Subscribe</span>}
                {status === "submitting" && (
                  <motion.span
                    key="submitting"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    Subscribing...
                  </motion.span>
                )}
                {status === "success" && (
                  <motion.span
                    key="success"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex items-center gap-2"
                  >
                    <CheckCircle2 className="w-5 h-5" />
                    Subscribed!
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.button>
          </form>

          {/* Coming soon note */}
          {!isCompact && (
            <p className="text-xs text-zinc-600 mt-4">
              Newsletter launching soon. Be among the first to get exclusive content!
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
