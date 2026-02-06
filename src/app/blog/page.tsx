import { Metadata } from "next";
import { getAllPosts } from "@/lib/mdx";
import BlogCard from "@/components/blog/BlogCard";
import Newsletter from "@/components/blog/Newsletter";
import BlogHero from "@/components/blog/BlogHero";

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
      <BlogHero />

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
