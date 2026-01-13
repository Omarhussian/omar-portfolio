"use client";

import { motion } from "framer-motion";
import { MapPin, Calendar } from "lucide-react";
import HeroScene from "./HeroScene";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-zinc-950">
      {/* Particle Background */}
      <HeroScene />

      <div className="max-w-5xl mx-auto px-6 py-20 text-center relative z-10 pointer-events-none">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <p className="text-zinc-400 text-sm font-medium tracking-[0.3em] uppercase mb-6">
            Senior Front-End Engineer
          </p>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-5xl md:text-7xl lg:text-8xl font-bold text-white tracking-tight mb-8"
          style={{
            textShadow: "0 0 80px rgba(139, 92, 246, 0.3)",
          }}
        >
          Omar Hussain
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-lg md:text-xl text-zinc-300 max-w-2xl mx-auto mb-12 leading-relaxed"
        >
          Bridging the gap between{" "}
          <span className="text-cyan-400 font-medium">complex engineering</span> and{" "}
          <span className="text-pink-400 font-medium">fluid UI</span>. Specializing in
          Fintech, Travel solutions, and AI-integrated dashboards.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="flex flex-wrap items-center justify-center gap-4 text-sm pointer-events-auto"
        >
          <motion.div
            whileHover={{ scale: 1.05, y: -2 }}
            className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 text-zinc-300 hover:border-purple-500/50 hover:text-white transition-all duration-300"
          >
            <MapPin className="w-4 h-4 text-purple-400" />
            <span>Cairo, Egypt</span>
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.05, y: -2 }}
            className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 text-zinc-300 hover:border-cyan-500/50 hover:text-white transition-all duration-300"
          >
            <Calendar className="w-4 h-4 text-cyan-400" />
            <span>Since 2019</span>
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
          className="absolute bottom-0 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="flex flex-col items-center gap-2"
          >
            <span className="text-xs text-zinc-500 tracking-widest uppercase">Scroll</span>
            <div className="w-6 h-10 rounded-full border-2 border-zinc-600/50 flex justify-center pt-2">
              <motion.div
                animate={{ opacity: [0.5, 1, 0.5], y: [0, 4, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="w-1 h-2 bg-purple-400 rounded-full"
              />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
