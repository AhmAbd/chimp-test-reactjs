import React from "react";
import { useGameStore } from "../stores/store";

export default function Menu() {
  let store = useGameStore();

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "55px",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "10px",
        }}
      >
        <span style={{ fontWeight: "bold", fontSize: 60 }}>Chimp Test</span>
        <span style={{ fontSize: 18, opacity: 0.5 }}>
          Tap the numbers in the correct order as they appear
        </span>
      </div>
      <button
        onClick={() => store.setGameStarted(true)}
        style={{
          width: "fit-content",
        }}
      >
        START
      </button>
    </div>
  );
}
