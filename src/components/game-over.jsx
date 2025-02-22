import React from "react";
import { useGameStore } from "../stores/store";

export default function GameOver() {
  let store = useGameStore();

  React.useEffect(() => {
    function listener() {
      store.setGameOver(false);
    }

    addEventListener("click", listener);
    return () => removeEventListener("click", listener);
  }, []);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "55px",
        alignItems: "center",
        justifyContent: "center",
        pointerEvents: "none",
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
        <span style={{ fontWeight: "bold", fontSize: 60 }}>Game Over</span>
        <span style={{ fontSize: 18, opacity: 0.5 }}>
          Click anywhere to continue
        </span>
      </div>
    </div>
  );
}
