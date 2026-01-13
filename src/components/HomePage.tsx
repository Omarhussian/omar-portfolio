"use client";

import { useState, useCallback } from "react";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Experience from "@/components/Experience";
import BentoGrid from "@/components/BentoGrid";
import Skills from "@/components/Skills";
import Footer from "@/components/Footer";
import SnakeGame from "@/components/SnakeGame";
import FloatingGameButton from "@/components/FloatingGameButton";
import { useKonamiCode } from "@/components/KonamiCode";

export default function HomePage() {
  const [showGame, setShowGame] = useState(false);

  const handleKonami = useCallback(() => {
    setShowGame(true);
  }, []);

  useKonamiCode(handleKonami);

  return (
    <>
      <main className="min-h-screen bg-zinc-950">
        <Hero />
        <About />
        <Experience />
        <BentoGrid />
        <Skills />
        <Footer />
      </main>
      
      <FloatingGameButton onClick={() => setShowGame(true)} />
      <SnakeGame isOpen={showGame} onClose={() => setShowGame(false)} />
    </>
  );
}
