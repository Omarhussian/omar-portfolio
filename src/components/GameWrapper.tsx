"use client";

import { useState, useCallback } from "react";
import SnakeGame from "@/components/SnakeGame";
import FloatingGameButton from "@/components/FloatingGameButton";
import { useKonamiCode } from "@/components/KonamiCode";

export default function GameWrapper() {
  const [showGame, setShowGame] = useState(false);

  const handleKonami = useCallback(() => {
    setShowGame(true);
  }, []);

  useKonamiCode(handleKonami);

  return (
    <>
      <FloatingGameButton onClick={() => setShowGame(true)} />
      <SnakeGame isOpen={showGame} onClose={() => setShowGame(false)} />
    </>
  );
}
