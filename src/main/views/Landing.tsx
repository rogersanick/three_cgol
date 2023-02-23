import { useEffect, useState } from "react";
import { GameEngine } from "../game_of_life/game_engine/GameEngine";
import GameBoard from "../game_of_life/three_components/CgolGameBoard";
import FlourishAndDecaySummary from "./FlourishAndDecaySummary";

// Props for the lobby componet
interface LandingProps {
  startGame: () => void;
}

// A lobby component that allows users to join a game
const Landing = (props: LandingProps) => {

  // Game state transitioning
  const { startGame } = props;
  const [transitioning, setTransitioning] = useState(false);
  const [displayGameDescription, setDisplayGameDescription] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.src = "/orange_slime.png"
  })


  return (
    <div className={`transition-all duration-500 ease-in ${transitioning ? "translate-y-full" : ""} flex flex-col items-center h-screen w-full`}>
      <div className="flex flex-col md:items-center h-2/3 w-screen mx-6 px-6 max-w-[60rem] z-40">
        <div className="mt-8 flex flex-row flex-row-reverse justify-end md:justify-center md:flex-col items-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white">ThreeCGoL</h1>
          <img className="w-1/6 h-auto md:w-2/6 max-w-[15rem] rounded-xl md:m-10 mr-4" src="/pink_slime.png"/>
        </div>
        <h2 className="mt-6 text-2xl md:text-4xl text-white">Conway's (Multi-Organism) Game of Life</h2>
        <h4 className="mt-4 text-s text-white md:text-lg md:text-center">
          Hi! Thanks for visiting. I'm using Three.js (R3F) to build a decentralized board game called: 
          <button onClick={() => setDisplayGameDescription(true)}><u>&nbsp;Flourish and Decay 👀.</u></button>
        </h4>
        <h4 className="mt-4 text-s text-white md:text-center">
          If you've been creating long enough, you've ruined something by making it too complicated. So I'm open-sourcing 
          a 3D, multi-organism version of Conway's Game of Life. Enjoy!
        </h4>
      </div>
      {displayGameDescription && <FlourishAndDecaySummary close={() => setDisplayGameDescription(false)}/>}
      <button onClick={() => {
          setTransitioning(true);
          setTimeout(() => {
            startGame();
          }, 500);
        }} className="z-30 border-solid border-2 border-white animate-gradient-x rounded-full mt-12 w-24 h-20 text-xl text-white">Start</button>
      <div className="container h-2/3 w-screen -mt-16">
        <GameEngine boardSize={30} isDemo={true}>
          <GameBoard />
        </GameEngine>
      </div>
    </div> 
  );
}

export default Landing;