"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowUpRight, Clock, Calendar } from "lucide-react";
import { PostMetadata } from "@/types/blog";

interface BlogCardProps {
  post: PostMetadata;
  featured?: boolean;
}

const categoryColors: Record<string, { gradient: string; iconColor: string; hoverColor: string }> = {
  Fintech: {
    gradient: "from-emerald-500/20 to-teal-500/20",
    iconColor: "text-emerald-400",
    hoverColor: "hover:border-emerald-500/50",
  },
  Travel: {
    gradient: "from-blue-500/20 to-indigo-500/20",
    iconColor: "text-blue-400",
    hoverColor: "hover:border-blue-500/50",
  },
  AI: {
    gradient: "from-purple-500/20 to-pink-500/20",
    iconColor: "text-purple-400",
    hoverColor: "hover:border-purple-500/50",
  },
  Architecture: {
    gradient: "from-cyan-500/20 to-blue-500/20",
    iconColor: "text-cyan-400",
    hoverColor: "hover:border-cyan-500/50",
  },
  Leadership: {
    gradient: "from-pink-500/20 to-rose-500/20",
    iconColor: "text-pink-400",
    hoverColor: "hover:border-pink-500/50",
  },
  Engineering: {
    gradient: "from-violet-500/20 to-purple-500/20",
    iconColor: "text-violet-400",
    hoverColor: "hover:border-violet-500/50",
  },
};

export default function BlogCard({ post, featured = false }: BlogCardProps) {
  const colors = categoryColors[post.category] || categoryColors.Engineering;
  const formattedDate = new Date(post.date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <Link href={`/blog/${post.slug}`} className="group block">
      <div
        className={`relative ${
          featured ? "p-8 h-full" : "p-6"
        } rounded-3xl bg-gradient-to-br ${colors.gradient} border border-zinc-800 ${
          colors.hoverColor
        } hover:border-zinc-700 transition-all duration-500 hover:shadow-2xl hover:shadow-${
          post.category.toLowerCase()
        }-500/10 overflow-hidden`}
      >
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-zinc-900/90 to-zinc-900/70" />

        {/* Content */}
        <div className={`relative z-10 ${featured ? "h-full flex flex-col" : ""}`}>
          {/* Header */}
          <div className="flex items-start justify-between mb-4">
            <span
              className={`text-xs font-medium tracking-wider uppercase ${colors.iconColor} bg-zinc-800/80 px-3 py-1.5 rounded-full`}
            >
              {post.category}
            </span>
            <ArrowUpRight className="w-5 h-5 text-zinc-600 group-hover:text-white group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300" />
          </div>

          {/* Title */}
          <h3
            className={`${
              featured ? "text-2xl" : "text-xl"
            } font-bold text-white mb-3 group-hover:${colors.iconColor} transition-colors line-clamp-2`}
          >
            {post.title}
          </h3>

          {/* Description */}
          <p
            className={`text-zinc-400 ${featured ? "text-base" : "text-sm"} leading-relaxed mb-4 ${
              featured ? "flex-grow line-clamp-4" : "line-clamp-3"
            }`}
          >
            {post.description}
          </p>

          {/* Footer meta */}
          <div className="flex flex-wrap items-center gap-3 text-xs text-zinc-500">
            <div className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5" />
              <span>{formattedDate}</span>
            </div>
            {post.readTime && (
              <div className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5" />
                <span>{post.readTime}</span>
              </div>
            )}
          </div>

          {/* Tags */}
          {post.tags && post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-4">
              {post.tags.slice(0, 3).map((tag, i) => (
                <span
                  key={i}
                  className="px-2.5 py-1 text-xs font-medium bg-zinc-800/60 text-zinc-400 rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}
