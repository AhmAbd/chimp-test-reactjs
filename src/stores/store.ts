import { create } from "zustand";

interface GameState {
  gameOver: boolean;
  highscore: number;
  gameStarted: boolean;
  setGameOver: (value: boolean) => void;
  setGameStarted: (value: boolean) => void;
  setHighscore: (value: number) => void;
}

export const useGameStore = create<GameState>((set) => ({
  gameOver: false,
  gameStarted: false,
  highscore: 0,
  setGameOver: (value: boolean) => set({ gameOver: value }),
  setHighscore: (value: number) => set({ highscore: value }),
  setGameStarted: (value: boolean) => set({ gameStarted: value }),
}));
