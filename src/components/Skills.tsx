"use client";

import { motion } from "framer-motion";

const skillCategories = [
  {
    title: "Core",
    skills: ["JavaScript (ES6+)", "TypeScript", "React.js", "Next.js", "React Native"],
  },
  {
    title: "State & Testing",
    skills: ["Redux", "Context API", "Cypress", "Jest"],
  },
  {
    title: "Styling & Tools",
    skills: ["Tailwind CSS", "AntDesign", "Bootstrap", "Webpack", "Vite", "Git/Agile"],
  },
];

export default function Skills() {
  return (
    <section className="py-32 px-6 bg-zinc-900/50">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="text-sm font-medium tracking-widest uppercase text-zinc-500 mb-4">
            The Arsenal
          </h2>
          <p className="text-xl text-zinc-400">Technologies I work with daily</p>
        </motion.div>

        <div className="space-y-12">
          {skillCategories.map((category, categoryIndex) => (
            <motion.div
              key={categoryIndex}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: categoryIndex * 0.1 }}
              viewport={{ once: true }}
            >
              <h3 className="text-lg font-semibold text-white mb-4">
                {category.title}
              </h3>
              <div className="flex flex-wrap gap-3">
                {category.skills.map((skill, skillIndex) => (
                  <motion.span
                    key={skillIndex}
                    whileHover={{ scale: 1.05, y: -2 }}
                    className="px-4 py-2 text-sm font-medium bg-zinc-800/80 text-zinc-300 rounded-full border border-zinc-700/50 hover:border-zinc-600 hover:text-white hover:bg-zinc-700/50 transition-colors cursor-default"
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
