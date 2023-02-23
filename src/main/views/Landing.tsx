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
        <div className="mt-8 container flex flex-row flex-row-reverse justify-end md:justify-center md:flex-col items-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white">ThreeCGoL</h1>
          <img className="w-1/6 h-auto md:w-2/6 rounded-xl md:m-10 mr-4" src="/pink_slime.png"/>
        </div>
        <h2 className="mt-6 text-2xl text-white">Conway's (Multi-Organism) Game of Life</h2>
        <h4 className="mt-6 text-s text-white">
          Hi! Thanks for visitng. I'm using Three.JS (R3F) to build a decentralized board game called *Flourish and Decay* 👀. 
        </h4>
        <h4 className="mt-6 text-s text-white">
          If you've been creating long enough, you've ruined something by making it too complicated. So I'm open-sourcing 
          a 3D, multi-organism, Conway's Game of Life. Enjoy!
        </h4>
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