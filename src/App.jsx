import Game from "./components/game";
import GameOver from "./components/game-over";
import Menu from "./components/menu";
import { useGameStore } from "./stores/store";

export default function App() {
  let store = useGameStore();

  return (
    <>
      {!store.gameStarted && !store.gameOver && <Menu />}
      {store.gameStarted && !store.gameOver && <Game />}
      {store.gameOver && <GameOver />}
    </>
  );
}
