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
    <div className={`transition-all duration-500 ease-in ${transitioning ? "translate-y-full" : ""} flex flex-col items-center h-full w-full`}>
      <div className="container flex flex-col md:items-center h-2/3 mx-6 px-6 max-w-[60rem]">
        <h1 className="mt-8 text-4xl font-bold text-white mb-6">ThreeCGoL</h1>
        <img className="w-1/6 md:w-2/6 rounded-xl md:m-10" src="/pink_slime.png"/>
        <h2 className="mt-8 text-2xl text-white">Multi-Organism Conway's Game of Life using Three.js</h2>
        <h4 className="mt-8 text-s text-white">Stay tuned for the full game:&#13;Flourish and Decay 👀</h4>
      </div>
      <button onClick={() => {
          setTransitioning(true);
          setTimeout(() => {
            startGame();
          }, 500);
        }} className="z-40 rounded-full bg-indigo-600 mt-12 w-24 h-20 text-xl text-white">Start</button>
      <div className="container h-3/4 w-screen -mt-16">
        <GameEngine boardSize={30} isDemo={true}>
          <GameBoard />
        </GameEngine>
      </div>
    </div> 
  );
}

export default Landing;