"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Trophy, RotateCcw } from "lucide-react";

interface Position {
  x: number;
  y: number;
}

type Direction = "UP" | "DOWN" | "LEFT" | "RIGHT";

const GRID_SIZE = 20;
const CELL_SIZE = 20;
const INITIAL_SPEED = 150;

const CODE_SYMBOLS = ["{", "}", "[", "]", "<", ">", "(", ")", "/", "*"];
const FOOD_ITEMS = ["⚛️", "🔷", "💜", "🟣", "⬡", "◆"];

interface SnakeGameProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SnakeGame({ isOpen, onClose }: SnakeGameProps) {
  const [snake, setSnake] = useState<Position[]>([{ x: 10, y: 10 }]);
  const [food, setFood] = useState<Position>({ x: 15, y: 15 });
  const [direction, setDirection] = useState<Direction>("RIGHT");
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [foodSymbol, setFoodSymbol] = useState("⚛️");
  
  const directionRef = useRef<Direction>("RIGHT");
  const gameLoopRef = useRef<NodeJS.Timeout | null>(null);

  const generateFood = useCallback(() => {
    const newFood = {
      x: Math.floor(Math.random() * GRID_SIZE),
      y: Math.floor(Math.random() * GRID_SIZE),
    };
    setFood(newFood);
    setFoodSymbol(FOOD_ITEMS[Math.floor(Math.random() * FOOD_ITEMS.length)]);
  }, []);

  const resetGame = useCallback(() => {
    setSnake([{ x: 10, y: 10 }]);
    setDirection("RIGHT");
    directionRef.current = "RIGHT";
    setGameOver(false);
    setScore(0);
    setIsPaused(false);
    generateFood();
  }, [generateFood]);

  const moveSnake = useCallback(() => {
    if (gameOver || isPaused) return;

    setSnake((prevSnake) => {
      const head = { ...prevSnake[0] };
      const currentDirection = directionRef.current;

      switch (currentDirection) {
        case "UP":
          head.y -= 1;
          break;
        case "DOWN":
          head.y += 1;
          break;
        case "LEFT":
          head.x -= 1;
          break;
        case "RIGHT":
          head.x += 1;
          break;
      }

      // Check wall collision
      if (head.x < 0 || head.x >= GRID_SIZE || head.y < 0 || head.y >= GRID_SIZE) {
        setGameOver(true);
        setHighScore((prev) => Math.max(prev, score));
        return prevSnake;
      }

      // Check self collision
      if (prevSnake.some((segment) => segment.x === head.x && segment.y === head.y)) {
        setGameOver(true);
        setHighScore((prev) => Math.max(prev, score));
        return prevSnake;
      }

      const newSnake = [head, ...prevSnake];

      // Check food collision
      if (head.x === food.x && head.y === food.y) {
        setScore((prev) => prev + 10);
        generateFood();
      } else {
        newSnake.pop();
      }

      return newSnake;
    });
  }, [gameOver, isPaused, food, score, generateFood]);

  // Game loop
  useEffect(() => {
    if (!isOpen || gameOver || isPaused) return;

    gameLoopRef.current = setInterval(moveSnake, INITIAL_SPEED);
    return () => {
      if (gameLoopRef.current) clearInterval(gameLoopRef.current);
    };
  }, [isOpen, gameOver, isPaused, moveSnake]);

  // Keyboard controls
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (gameOver) {
        if (e.code === "Space" || e.code === "Enter") {
          resetGame();
        }
        return;
      }

      switch (e.code) {
        case "ArrowUp":
        case "KeyW":
          if (directionRef.current !== "DOWN") {
            directionRef.current = "UP";
            setDirection("UP");
          }
          break;
        case "ArrowDown":
        case "KeyS":
          if (directionRef.current !== "UP") {
            directionRef.current = "DOWN";
            setDirection("DOWN");
          }
          break;
        case "ArrowLeft":
        case "KeyA":
          if (directionRef.current !== "RIGHT") {
            directionRef.current = "LEFT";
            setDirection("LEFT");
          }
          break;
        case "ArrowRight":
        case "KeyD":
          if (directionRef.current !== "LEFT") {
            directionRef.current = "RIGHT";
            setDirection("RIGHT");
          }
          break;
        case "Space":
          setIsPaused((prev) => !prev);
          break;
        case "Escape":
          onClose();
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, gameOver, resetGame, onClose]);

  // Initialize game when opened
  useEffect(() => {
    if (isOpen) {
      resetGame();
    }
  }, [isOpen, resetGame]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm"
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="relative bg-zinc-900 border border-purple-500/30 rounded-2xl p-6 shadow-2xl shadow-purple-500/20"
        >
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-4">
              <h2 className="text-xl font-bold text-white font-mono">
                {"<Snake/>"}
              </h2>
              <span className="text-purple-400 font-mono text-sm">
                // Easter Egg Unlocked!
              </span>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-lg hover:bg-zinc-800 text-zinc-400 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Score */}
          <div className="flex items-center justify-between mb-4 px-2">
            <div className="flex items-center gap-2 text-purple-400 font-mono">
              <span>Score:</span>
              <span className="text-white font-bold">{score}</span>
            </div>
            <div className="flex items-center gap-2 text-amber-400 font-mono">
              <Trophy className="w-4 h-4" />
              <span className="text-white font-bold">{highScore}</span>
            </div>
          </div>

          {/* Game Board */}
          <div
            className="relative border-2 border-purple-500/50 rounded-lg overflow-hidden"
            style={{
              width: GRID_SIZE * CELL_SIZE,
              height: GRID_SIZE * CELL_SIZE,
              background: "linear-gradient(135deg, #18181b 0%, #0f0f12 100%)",
            }}
          >
            {/* Grid lines */}
            <div
              className="absolute inset-0 opacity-10"
              style={{
                backgroundImage: `
                  linear-gradient(to right, #a855f7 1px, transparent 1px),
                  linear-gradient(to bottom, #a855f7 1px, transparent 1px)
                `,
                backgroundSize: `${CELL_SIZE}px ${CELL_SIZE}px`,
              }}
            />

            {/* Snake */}
            {snake.map((segment, index) => (
              <motion.div
                key={index}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute flex items-center justify-center font-mono text-xs font-bold"
                style={{
                  left: segment.x * CELL_SIZE,
                  top: segment.y * CELL_SIZE,
                  width: CELL_SIZE,
                  height: CELL_SIZE,
                  backgroundColor: index === 0 ? "#a855f7" : "#7c3aed",
                  borderRadius: index === 0 ? "4px" : "2px",
                  boxShadow: index === 0 ? "0 0 10px #a855f7" : "none",
                }}
              >
                <span className="text-white/80">
                  {CODE_SYMBOLS[index % CODE_SYMBOLS.length]}
                </span>
              </motion.div>
            ))}

            {/* Food */}
            <motion.div
              key={`${food.x}-${food.y}`}
              initial={{ scale: 0 }}
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ repeat: Infinity, duration: 1 }}
              className="absolute flex items-center justify-center text-lg"
              style={{
                left: food.x * CELL_SIZE,
                top: food.y * CELL_SIZE,
                width: CELL_SIZE,
                height: CELL_SIZE,
              }}
            >
              {foodSymbol}
            </motion.div>

            {/* Game Over Overlay */}
            {gameOver && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="absolute inset-0 bg-black/80 flex flex-col items-center justify-center"
              >
                <h3 className="text-2xl font-bold text-red-400 font-mono mb-2">
                  {"// Game Over"}
                </h3>
                <p className="text-zinc-400 mb-4">
                  Final Score: <span className="text-purple-400 font-bold">{score}</span>
                </p>
                <button
                  onClick={resetGame}
                  className="flex items-center gap-2 px-4 py-2 bg-purple-500 hover:bg-purple-600 text-white rounded-lg font-mono transition-colors"
                >
                  <RotateCcw className="w-4 h-4" />
                  Restart
                </button>
              </motion.div>
            )}

            {/* Paused Overlay */}
            {isPaused && !gameOver && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="absolute inset-0 bg-black/60 flex items-center justify-center"
              >
                <h3 className="text-xl font-bold text-yellow-400 font-mono">
                  {"// Paused"}
                </h3>
              </motion.div>
            )}
          </div>

          {/* Controls */}
          <div className="mt-4 text-center text-zinc-500 text-sm font-mono">
            <p>↑↓←→ or WASD to move • Space to pause • Esc to close</p>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
