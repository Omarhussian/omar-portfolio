import { notFound } from "next/navigation";
import { Metadata } from "next";
import { getAllPosts, getPostBySlug, getPostSlugs } from "@/lib/mdx";
import PostLayout from "@/components/blog/PostLayout";
import { MDXRemote } from "next-mdx-remote/rsc";
import rehypeHighlight from "rehype-highlight";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import remarkGfm from "remark-gfm";
import "highlight.js/styles/github-dark.css";

interface PostPageProps {
  params: Promise<{
    slug: string;
  }>;
}

// Generate static params for all blog posts
export async function generateStaticParams() {
  const slugs = await getPostSlugs();
  return slugs.map((slug) => ({
    slug,
  }));
}

// Generate metadata for SEO
export async function generateMetadata({ params }: PostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    return {
      title: "Post Not Found",
    };
  }

  const siteUrl = process.env.NEXT_PUBLIC_URL || "https://omarhussain.vercel.app";

  return {
    title: post.title,
    description: post.description,
    authors: [{ name: post.author }],
    keywords: post.tags,
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      publishedTime: post.date,
      authors: [post.author],
      tags: post.tags,
      url: `${siteUrl}/blog/${slug}`,
      images: post.image
        ? [
            {
              url: `${siteUrl}${post.image}`,
              width: 1200,
              height: 630,
              alt: post.title,
            },
          ]
        : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
      images: post.image ? [`${siteUrl}${post.image}`] : undefined,
    },
  };
}

// MDX Components for custom styling
const mdxComponents = {
  h1: (props: any) => <h1 className="text-4xl font-bold mt-8 mb-4" {...props} />,
  h2: (props: any) => <h2 className="text-3xl font-bold mt-12 mb-6" {...props} />,
  h3: (props: any) => <h3 className="text-2xl font-bold mt-8 mb-4" {...props} />,
  p: (props: any) => <p className="mb-6 leading-relaxed" {...props} />,
  ul: (props: any) => <ul className="list-disc list-inside mb-6 space-y-2" {...props} />,
  ol: (props: any) => <ol className="list-decimal list-inside mb-6 space-y-2" {...props} />,
  code: (props: any) => {
    // Inline code
    if (!props.className) {
      return <code className="text-cyan-400 bg-zinc-800 px-1.5 py-0.5 rounded text-sm" {...props} />;
    }
    // Code block (handled by pre)
    return <code {...props} />;
  },
  pre: (props: any) => (
    <pre className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 overflow-x-auto mb-6" {...props} />
  ),
  blockquote: (props: any) => (
    <blockquote
      className="border-l-4 border-purple-500 bg-zinc-900/50 py-4 px-6 rounded-r-lg my-6 italic"
      {...props}
    />
  ),
  a: (props: any) => (
    <a className="text-purple-400 hover:text-purple-300 hover:underline transition-colors" {...props} />
  ),
};

export default async function PostPage({ params }: PostPageProps) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <PostLayout post={post}>
      <MDXRemote
        source={post.content}
        components={mdxComponents}
        options={{
          mdxOptions: {
            remarkPlugins: [remarkGfm],
            rehypePlugins: [
              rehypeHighlight,
              rehypeSlug,
              [
                rehypeAutolinkHeadings,
                {
                  behavior: "wrap",
                  properties: {
                    className: ["anchor"],
                  },
                },
              ],
            ],
          },
        }}
      />
    </PostLayout>
  );
}
