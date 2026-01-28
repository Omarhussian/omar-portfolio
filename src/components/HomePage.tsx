import Hero from "@/components/Hero";
import About from "@/components/About";
import Experience from "@/components/Experience";
import BentoGrid from "@/components/BentoGrid";
import Skills from "@/components/Skills";
import Footer from "@/components/Footer";
import GameWrapper from "@/components/GameWrapper";
import LatestArticles from "@/components/blog/LatestArticles";
import Newsletter from "@/components/blog/Newsletter";
import { getAllPosts } from "@/lib/mdx";

export default async function HomePage() {
  // Fetch posts on the server
  const posts = await getAllPosts();

  return (
    <>
      <main className="min-h-screen bg-zinc-950">
        <Hero />
        <About />
        <Experience />
        <BentoGrid />
        <LatestArticles posts={posts} />
        <Skills />
        <div className="max-w-6xl mx-auto px-6 pb-32">
          <Newsletter />
        </div>
        <Footer />
      </main>
      
      <GameWrapper />
    </>
  );
}
