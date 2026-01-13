"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Landmark, Plane, Shield, LucideIcon } from "lucide-react";

interface Project {
  title: string;
  category: string;
  description: string;
  tech: string[];
  icon: LucideIcon;
  gradient: string;
  iconColor: string;
}

const projects: Project[] = [
  {
    title: "FabMisr, NBE & EG-Bank",
    category: "Fintech",
    description:
      "Developed sophisticated financial UIs with secure transaction flows and complex data visualization.",
    tech: ["React", "TypeScript", "Redux", "DexGuard"],
    icon: Landmark,
    gradient: "from-emerald-500/20 to-teal-500/20",
    iconColor: "text-emerald-400",
  },
  {
    title: "Hertz & Aegean",
    category: "Travel",
    description:
      "Engineered robust front-end solutions for high-traffic booking engines, optimizing responsive design across all devices.",
    tech: ["Next.js", "Responsive Design", "Performance Optimization"],
    icon: Plane,
    gradient: "from-blue-500/20 to-indigo-500/20",
    iconColor: "text-blue-400",
  },
  {
    title: "ParmaX & OSINT",
    category: "AI & Security",
    description:
      "Built advanced dashboards for security analysis, featuring Object Detection, Audio/Video analysis, and real-time intelligence gathering.",
    tech: ["React", "AI Integration", "WebSocket"],
    icon: Shield,
    gradient: "from-purple-500/20 to-pink-500/20",
    iconColor: "text-purple-400",
  },
];

function ProjectCard({
  project,
  isLarge = false,
  hoverColor = "emerald",
}: {
  project: Project;
  isLarge?: boolean;
  hoverColor?: string;
}) {
  const IconComponent = project.icon;
  
  const hoverColorClasses: Record<string, string> = {
    emerald: "group-hover:text-emerald-300",
    blue: "group-hover:text-blue-300",
    purple: "group-hover:text-purple-300",
  };

  const shadowClasses: Record<string, string> = {
    emerald: "hover:shadow-emerald-500/10",
    blue: "hover:shadow-blue-500/10",
    purple: "hover:shadow-purple-500/10",
  };

  return (
    <div
      className={`relative ${isLarge ? "p-8" : "p-6"} rounded-3xl bg-gradient-to-br ${project.gradient} border border-zinc-800 hover:border-zinc-700 transition-all duration-500 hover:shadow-2xl ${shadowClasses[hoverColor]} overflow-hidden ${isLarge ? "h-full" : ""}`}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-zinc-900/90 to-zinc-900/70" />

      <div className={`relative z-10 ${isLarge ? "h-full flex flex-col" : ""}`}>
        <div className="flex items-start justify-between mb-4">
          <div className={`p-3 rounded-2xl bg-zinc-800/80 ${project.iconColor}`}>
            <IconComponent className={isLarge ? "w-6 h-6" : "w-5 h-5"} />
          </div>
          <ArrowUpRight className="w-5 h-5 text-zinc-600 group-hover:text-white group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300" />
        </div>

        <span className="text-xs font-medium tracking-wider uppercase text-zinc-500 mb-2 block">
          {project.category}
        </span>
        <h3
          className={`${isLarge ? "text-2xl" : "text-xl"} font-bold text-white mb-3 transition-colors ${hoverColorClasses[hoverColor]}`}
        >
          {project.title}
        </h3>
        <p className={`text-zinc-400 ${isLarge ? "" : "text-sm"} leading-relaxed mb-4 ${isLarge ? "flex-grow" : ""}`}>
          {project.description}
        </p>

        <div className="flex flex-wrap gap-2">
          {project.tech.map((t, i) => (
            <span
              key={i}
              className="px-3 py-1 text-xs font-medium bg-zinc-800/80 text-zinc-400 rounded-full"
            >
              {t}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function BentoGrid() {
  return (
    <section className="py-32 px-6 bg-zinc-950">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="text-sm font-medium tracking-widest uppercase text-zinc-500 mb-4">
            Featured Projects
          </h2>
          <p className="text-xl text-zinc-400">
            A showcase of impactful work across industries
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Large Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className="md:row-span-2 group"
          >
            <ProjectCard project={projects[0]} isLarge hoverColor="emerald" />
          </motion.div>

          {/* Medium Cards */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="group"
          >
            <ProjectCard project={projects[1]} hoverColor="blue" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
            className="group"
          >
            <ProjectCard project={projects[2]} hoverColor="purple" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
