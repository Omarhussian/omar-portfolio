"use client";

import { motion } from "framer-motion";
import { Github, Linkedin, Mail } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-16 px-6 bg-zinc-950 border-t border-zinc-800/50">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row items-center justify-between gap-8"
        >
          <div className="text-center md:text-left">
            <h3 className="text-xl font-bold text-white mb-2">Omar Hussain</h3>
            <p className="text-zinc-500 text-sm">
              Senior Front-End Engineer • Cairo, Egypt
            </p>
          </div>

          <div className="flex items-center gap-4">
            <motion.a
              href="https://github.com/Omarhussian"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1, y: -2 }}
              className="p-3 rounded-full bg-zinc-800/80 text-zinc-400 hover:text-white hover:bg-zinc-700 transition-colors"
            >
              <Github className="w-5 h-5" />
            </motion.a>
            <motion.a
              href="https://www.linkedin.com/in/alhussain23/"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1, y: -2 }}
              className="p-3 rounded-full bg-zinc-800/80 text-zinc-400 hover:text-white hover:bg-zinc-700 transition-colors"
            >
              <Linkedin className="w-5 h-5" />
            </motion.a>
            <motion.a
              href="mailto:omarh3795@gmail.com"
              whileHover={{ scale: 1.1, y: -2 }}
              className="p-3 rounded-full bg-zinc-800/80 text-zinc-400 hover:text-white hover:bg-zinc-700 transition-colors"
            >
              <Mail className="w-5 h-5" />
            </motion.a>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="mt-12 pt-8 border-t border-zinc-800/50 text-center"
        >
          <p className="text-zinc-600 text-sm">
            © {currentYear} Omar Hussain. Crafted with precision.
          </p>
          <p className="text-zinc-700 text-xs mt-2 font-mono">
            {"// ↑↑↓↓←→←→BA"}
          </p>
        </motion.div>
      </div>
    </footer>
  );
}
