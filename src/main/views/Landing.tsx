import { useState } from "react";
import { GameEngine } from "../game_of_life/game_engine/GameEngine";
import GameBoard from "../game_of_life/three_components/CgolGameBoard";

// Props for the lobby componet
interface LandingProps {
  startGame: () => void;
}

// A lobby component that allows users to join a game
const Landing = (props: LandingProps) => {

  // Game state transitioning
  const { startGame } = props;
  const [transitioning, setTransitioning] = useState(false);

  return (
    <div className={`transition-all duration-500 ease-in ${transitioning ? "translate-y-full" : ""} flex flex-col items-center h-screen`}>
      <div className="container flex flex-col justify-center align-center h-1/2 mx-6 p-6 w-full">
        <h1 className="mt-6 text-4xl font-bold text-white">ThreeCGoL</h1>
        <h2 className="mt-6 text-xl font-bold text-white">An implementation of Conway's Game of Life using Three.js</h2>
        <h4 className="mt-6 text-sm font-bold text-white">Also using R3F, React Spring, Web Workers, Tailwind CSS (and ChatGPT 👀)</h4>
      </div>
      <div className="container mt-4 h-3/4">
        <GameEngine boardSize={30} isDemo={true}>
          <GameBoard />
        </GameEngine>
      </div>
      <div className="h-1/2 flex flex-col justify-center">
        <button onClick={() => {
          setTransitioning(true);
          setTimeout(() => {
            startGame();
          }, 500);
        }} className="rounded-lg bg-indigo-600 my-6 py-2 px-4 text-md font-medium text-white">Start</button>
      </div>
    </div> 
  );
}

export default Landing;