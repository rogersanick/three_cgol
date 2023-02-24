import { useEffect, useState } from "react";
import { TypeAnimation } from "react-type-animation";
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
          <div className="flex flex-col justify-center md:items-center py-2">
            <h1 className="text-3xl md:text-6xl font-bold text-white">ThreeCGoL</h1>
            <h2 className="text-xl md:mt-6 md:text-4xl text-white">Three.JS + Conway's Game of Life</h2>
          </div>
          <img className="w-2/6 h-auto md:w-2/6 max-w-[6rem] md:max-w-[15rem] rounded-xl md:m-10 mr-4" src="/pink_slime.png"/>
        </div>
        <TypeAnimation
          sequence={[
            "Hi!",
            1000,
            "My name is Nick.",
            700, 
            "I'm a software engineer at Google.",
            800,
            "Previously Messari + R3.",
            800,
            "Thanks for visiting.",
            900,
            "I'm using Three.js (R3F) to build a decentralized board game called:",
            700,
            "Flourish and Decay.",
            1200,
            "If you've been creating long enough,",
            700,
            "you've ruined something by making it too complicated.",
            900,
            "So I'm open-sourcing a 3D, multi-organism version of Conway's Game of Life.",
            700,
            "Which is a key component of the game.",
            500,
            "Enjoy!",
            700,
            "Click the button below to start creating digital life.",
          ]} 
          cursor={true}
          wrapper="h4"
          speed={50}
          deletionSpeed={90}
          className="mt-4 text-s md:text-xl text-white md:text-center"
        />
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