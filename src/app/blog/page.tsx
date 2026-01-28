import { Metadata } from "next";
import { getAllPosts } from "@/lib/mdx";
import BlogCard from "@/components/blog/BlogCard";
import { motion } from "framer-motion";
import Newsletter from "@/components/blog/Newsletter";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Insights on building secure, scalable systems for Fintech, Travel, and AI. Learn from real-world experience architecting UIs for 1M+ users.",
  openGraph: {
    title: "Blog | Omar Hussain",
    description:
      "Insights on building secure, scalable systems for Fintech, Travel, and AI.",
  },
};

export default async function BlogPage() {
  const posts = await getAllPosts();

  return (
    <div className="min-h-screen bg-zinc-950">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-zinc-900 to-zinc-950 border-b border-zinc-800">
        <div className="max-w-6xl mx-auto px-6 py-24 md:py-32">
          <div className="max-w-3xl">
            <p className="text-zinc-400 text-sm font-medium tracking-[0.3em] uppercase mb-6">
              Blog & Insights
            </p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              Building the Future of{" "}
              <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
                Fintech & AI
              </span>
            </h1>
            <p className="text-lg md:text-xl text-zinc-400 leading-relaxed">
              Lessons learned from architecting secure, high-scale systems for millions of users.
              Deep dives into React, TypeScript, security patterns, and performance optimization.
            </p>
          </div>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="max-w-6xl mx-auto px-6 py-16 md:py-24">
        {posts.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-zinc-500 text-lg">No posts yet. Check back soon!</p>
          </div>
        ) : (
          <>
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-white mb-2">All Articles</h2>
              <p className="text-zinc-400">{posts.length} article{posts.length !== 1 ? "s" : ""}</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {posts.map((post) => (
                <BlogCard key={post.slug} post={post} />
              ))}
            </div>
          </>
        )}
      </section>

      {/* Newsletter CTA */}
      <section className="max-w-6xl mx-auto px-6 pb-24">
        <Newsletter />
      </section>
    </div>
  );
}
