"use client";

import { ReactNode } from "react";
import { motion } from "framer-motion";
import { Calendar, Clock, User, ArrowLeft } from "lucide-react";
import Link from "next/link";
import ShareToLinkedIn from "./ShareToLinkedIn";
import Newsletter from "./Newsletter";
import { PostMetadata } from "@/types/blog";

interface PostLayoutProps {
  post: PostMetadata;
  children: ReactNode;
}

export default function PostLayout({ post, children }: PostLayoutProps) {
  const formattedDate = new Date(post.date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  // Category color mapping
  const categoryColors: Record<string, string> = {
    Fintech: "text-emerald-400",
    Travel: "text-blue-400",
    AI: "text-purple-400",
    Architecture: "text-cyan-400",
    Leadership: "text-pink-400",
    Engineering: "text-violet-400",
  };

  const categoryColor = categoryColors[post.category] || "text-purple-400";

  return (
    <div className="min-h-screen bg-zinc-950">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-b from-zinc-900 to-zinc-950 border-b border-zinc-800">
        <div className="max-w-4xl mx-auto px-6 py-16 md:py-24">
          {/* Back button */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-sm text-zinc-400 hover:text-white transition-colors group"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              <span>Back to Blog</span>
            </Link>
          </motion.div>

          {/* Category badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <span
              className={`inline-block text-xs font-medium tracking-wider uppercase ${categoryColor} bg-zinc-800 px-3 py-1.5 rounded-full mb-6`}
            >
              {post.category}
            </span>
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight"
          >
            {post.title}
          </motion.h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-lg md:text-xl text-zinc-400 mb-8 leading-relaxed"
          >
            {post.description}
          </motion.p>

          {/* Meta info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-wrap items-center gap-4 text-sm text-zinc-500"
          >
            <div className="flex items-center gap-2">
              <User className="w-4 h-4" />
              <span>{post.author}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              <span>{formattedDate}</span>
            </div>
            {post.readTime && (
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>{post.readTime}</span>
              </div>
            )}
          </motion.div>

          {/* Tags */}
          {post.tags && post.tags.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="flex flex-wrap gap-2 mt-6"
            >
              {post.tags.map((tag, i) => (
                <span
                  key={i}
                  className="px-3 py-1 text-xs font-medium bg-zinc-800/80 text-zinc-400 rounded-full border border-zinc-700"
                >
                  {tag}
                </span>
              ))}
            </motion.div>
          )}
        </div>
      </div>

      {/* Article Content */}
      <article className="max-w-4xl mx-auto px-6 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="prose prose-invert prose-lg max-w-none
            prose-headings:font-bold prose-headings:text-white prose-headings:tracking-tight
            prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-6 prose-h2:pb-3 prose-h2:border-b prose-h2:border-zinc-800
            prose-h3:text-2xl prose-h3:mt-8 prose-h3:mb-4
            prose-p:text-zinc-300 prose-p:leading-relaxed prose-p:mb-6
            prose-a:text-purple-400 prose-a:no-underline hover:prose-a:text-purple-300 hover:prose-a:underline
            prose-strong:text-white prose-strong:font-semibold
            prose-code:text-cyan-400 prose-code:bg-zinc-800 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:before:content-[''] prose-code:after:content-['']
            prose-pre:bg-zinc-900 prose-pre:border prose-pre:border-zinc-800 prose-pre:rounded-xl prose-pre:shadow-xl
            prose-ul:text-zinc-300 prose-ul:my-6
            prose-ol:text-zinc-300 prose-ol:my-6
            prose-li:my-2
            prose-blockquote:border-l-4 prose-blockquote:border-purple-500 prose-blockquote:bg-zinc-900/50 prose-blockquote:py-4 prose-blockquote:px-6 prose-blockquote:rounded-r-lg prose-blockquote:not-italic
            prose-img:rounded-xl prose-img:border prose-img:border-zinc-800"
        >
          {children}
        </motion.div>

        {/* Share section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="mt-16 pt-8 border-t border-zinc-800"
        >
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-lg font-semibold text-white mb-1">Found this helpful?</h3>
              <p className="text-sm text-zinc-400">Share it with your network</p>
            </div>
            <ShareToLinkedIn
              url={`${process.env.NEXT_PUBLIC_URL || "https://omarhussain.vercel.app"}/blog/${post.slug}`}
              title={post.title}
            />
          </div>
        </motion.div>

        {/* Newsletter CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1 }}
          className="mt-16"
        >
          <Newsletter />
        </motion.div>
      </article>
    </div>
  );
}
