"use client";

import { useEffect } from "react";

const KONAMI_CODE = [
  "ArrowUp", "ArrowUp",
  "ArrowDown", "ArrowDown",
  "ArrowLeft", "ArrowRight",
  "ArrowLeft", "ArrowRight",
  "KeyB", "KeyA"
];

export function useKonamiCode(callback: () => void) {
  useEffect(() => {
    let index = 0;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === KONAMI_CODE[index]) {
        index++;
        if (index === KONAMI_CODE.length) {
          callback();
          index = 0;
        }
      } else {
        index = 0;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [callback]);
}
