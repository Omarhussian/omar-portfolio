"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function BlogHero() {
  return (
    <section className="relative bg-gradient-to-b from-zinc-900 to-zinc-950 border-b border-zinc-800 overflow-hidden">
      {/* Subtle animated background gradient */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 via-transparent to-cyan-500/20 animate-pulse" />
      </div>
      
      <div className="max-w-6xl mx-auto px-6 py-24 md:py-32 relative z-10">
        <div className="max-w-3xl">
          {/* Back to Home */}
          <motion.div
            initial={{ opacity: 0, x: -13 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-sm text-zinc-400 hover:text-white transition-colors group"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              <span>Back to Home</span>
            </Link>
          </motion.div>
          
          <motion.p 
            initial={{ opacity: 0, y: 13 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.618 }}
            className="text-zinc-400 text-sm font-medium tracking-[0.3em] uppercase mb-6"
          >
            Blog & Insights
          </motion.p>
          
          <motion.h1 
            initial={{ opacity: 0, y: 21 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.618, delay: 0.2 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 leading-tight"
          >
            Thoughts on
          </motion.h1>
          
          {/* Animated "Engineering Excellence" on its own line */}
          <motion.div
            initial={{ opacity: 0, y: 21 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.618, delay: 0.4 }}
            className="mb-8"
          >
            <span className="relative inline-block text-4xl md:text-5xl lg:text-6xl font-bold">
              {/* Shine overlay */}
              <span 
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent bg-[length:200%_100%] bg-clip-text animate-shine"
                style={{
                  backgroundSize: '200% 100%',
                }}
              />
              {/* Main gradient text */}
              <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent animate-gradient-x">
                Engineering Excellence
              </span>
            </span>
          </motion.div>
          
          <motion.p 
            initial={{ opacity: 0, y: 21 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.618, delay: 0.6 }}
            className="text-lg md:text-xl text-zinc-400 leading-relaxed"
          >
            Deep dives into architecture, security patterns, design systems, and performance.
            Lessons learned from building products for millions of users.
          </motion.p>
        </div>
      </div>
    </section>
  );
}
