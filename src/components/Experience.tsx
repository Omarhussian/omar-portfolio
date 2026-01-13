"use client";

import { motion } from "framer-motion";
import { Briefcase } from "lucide-react";

const experiences = [
  {
    title: "Senior Front-End Engineer",
    company: "Linakis.digital",
    period: "Mar 2024 - Present",
    focus: "Multi-platform development for Hertz, FabMisr, NBE, and FlexCar",
    current: true,
  },
  {
    title: "Senior Front-End Engineer",
    company: "E-Vastel",
    period: "Jun 2023 - Mar 2024",
    focus: "Integrated AI functionalities and built a reusable UI component library",
    current: false,
  },
  {
    title: "Senior Front-End / Mobile Developer",
    company: "IT-Fusion",
    period: "Mar 2022 - Jun 2023",
    focus: "React Native for Fintech/Medical apps, performance optimization",
    current: false,
  },
  {
    title: "Junior Front-End Developer",
    company: "Guardianslabs",
    period: "May 2020 - Mar 2022",
    focus: "Data-driven UX, SPA with JWT Auth",
    current: false,
  },
];

export default function Experience() {
  return (
    <section className="py-32 px-6 bg-zinc-900/50">
      <div className="max-w-4xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-sm font-medium tracking-widest uppercase text-zinc-500 mb-16"
        >
          Experience
        </motion.h2>

        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-0 md:left-8 top-0 bottom-0 w-px bg-gradient-to-b from-purple-500/50 via-zinc-700 to-zinc-800" />

          <div className="space-y-12">
            {experiences.map((exp, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="relative pl-8 md:pl-20"
              >
                {/* Timeline Dot */}
                <div
                  className={`absolute left-0 md:left-8 -translate-x-1/2 w-4 h-4 rounded-full border-2 ${
                    exp.current
                      ? "bg-purple-500 border-purple-400 shadow-lg shadow-purple-500/50"
                      : "bg-zinc-800 border-zinc-600"
                  }`}
                />

                <div className="group">
                  <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4 mb-2">
                    <h3 className="text-xl font-semibold text-white group-hover:text-purple-400 transition-colors">
                      {exp.title}
                    </h3>
                    {exp.current && (
                      <span className="inline-flex items-center px-2 py-0.5 text-xs font-medium bg-purple-500/20 text-purple-400 rounded-full w-fit">
                        Current
                      </span>
                    )}
                  </div>
                  
                  <div className="flex items-center gap-2 text-zinc-400 mb-3">
                    <Briefcase className="w-4 h-4" />
                    <span className="font-medium">{exp.company}</span>
                    <span className="text-zinc-600">•</span>
                    <span className="text-zinc-500 text-sm">{exp.period}</span>
                  </div>
                  
                  <p className="text-zinc-400 leading-relaxed">{exp.focus}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
