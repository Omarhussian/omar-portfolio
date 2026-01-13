"use client";

import { motion } from "framer-motion";

export default function About() {
  return (
    <section className="py-32 px-6 bg-zinc-950">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <h2 className="text-sm font-medium tracking-widest uppercase text-zinc-500 mb-8">
            About
          </h2>
          <p className="text-2xl md:text-3xl lg:text-4xl text-zinc-200 leading-relaxed font-light">
            I am a Senior Engineer with a deep focus on{" "}
            <span className="text-white font-medium">usability and performance</span>. 
            Currently at <span className="text-purple-400">Linakis.digital</span>, I lead front-end 
            architectures for high-profile clients like{" "}
            <span className="text-white font-medium">Hertz</span> and{" "}
            <span className="text-white font-medium">Aegean</span>. Previously, I integrated 
            AI features at E-Vastel and built secure Fintech flows at IT-Fusion. I don&apos;t 
            just write code; I marry functional requirements with creative design to produce 
            optimal interfaces.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
