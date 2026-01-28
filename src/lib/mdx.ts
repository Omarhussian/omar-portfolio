import fs from "fs";
import path from "path";
import matter from "gray-matter";
import readingTime from "reading-time";
import { Post, PostMetadata } from "@/types/blog";

const postsDirectory = path.join(process.cwd(), "content/posts");

/**
 * Get all blog posts sorted by date (newest first)
 */
export async function getAllPosts(): Promise<PostMetadata[]> {
  // Ensure directory exists
  if (!fs.existsSync(postsDirectory)) {
    return [];
  }

  const fileNames = fs.readdirSync(postsDirectory);
  const allPostsData = fileNames
    .filter((fileName) => fileName.endsWith(".mdx"))
    .map((fileName) => {
      const slug = fileName.replace(/\.mdx$/, "");
      const fullPath = path.join(postsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, "utf8");
      const { data, content } = matter(fileContents);

      // Calculate reading time
      const { text: readTime } = readingTime(content);

      return {
        slug,
        title: data.title,
        date: data.date,
        description: data.description,
        author: data.author || "Omar Hussain",
        category: data.category,
        tags: data.tags || [],
        readTime,
        image: data.image,
      } as PostMetadata;
    });

  // Sort posts by date (newest first)
  return allPostsData.sort((a, b) => {
    if (new Date(a.date) < new Date(b.date)) {
      return 1;
    } else {
      return -1;
    }
  });
}

/**
 * Get a single post by slug with full content
 */
export async function getPostBySlug(slug: string): Promise<Post | null> {
  try {
    const fullPath = path.join(postsDirectory, `${slug}.mdx`);
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data, content } = matter(fileContents);

    // Calculate reading time
    const { text: readTime } = readingTime(content);

    return {
      slug,
      title: data.title,
      date: data.date,
      description: data.description,
      author: data.author || "Omar Hussain",
      category: data.category,
      tags: data.tags || [],
      readTime,
      image: data.image,
      content,
    };
  } catch (error) {
    console.error(`Error loading post ${slug}:`, error);
    return null;
  }
}

/**
 * Get all post slugs for static generation
 */
export async function getPostSlugs(): Promise<string[]> {
  if (!fs.existsSync(postsDirectory)) {
    return [];
  }

  const fileNames = fs.readdirSync(postsDirectory);
  return fileNames
    .filter((fileName) => fileName.endsWith(".mdx"))
    .map((fileName) => fileName.replace(/\.mdx$/, ""));
}
