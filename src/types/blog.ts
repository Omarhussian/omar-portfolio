export interface PostMetadata {
  title: string;
  date: string;
  description: string;
  author: string;
  category: PostCategory;
  tags: string[];
  readTime?: string;
  slug: string;
  image?: string;
}

export interface Post extends PostMetadata {
  content: string;
}

export type PostCategory = "Fintech" | "AI" | "Travel" | "Architecture" | "Leadership" | "Engineering";

export const POST_CATEGORIES: PostCategory[] = [
  "Fintech",
  "AI",
  "Travel",
  "Architecture",
  "Leadership",
  "Engineering",
];
