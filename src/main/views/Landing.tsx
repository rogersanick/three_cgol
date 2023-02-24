import { useContext, useEffect, useState } from "react";
import { TypeAnimation } from "react-type-animation";
import { GameEngine } from "../game_of_life/game_engine/GameEngine";
import GameBoard from "../game_of_life/three_components/CgolGameBoard";
import { ViewSelectorContext } from "./ViewContext";

// A lobby component that allows users to join a game
const Landing = () => {

  // Game state transitioning
  const { setView } = useContext(ViewSelectorContext)
  const [transitioning, setTransitioning] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.src = "/orange_slime.png"
  })


  return (
    <div className={`transition-all duration-500 ease-in ${transitioning ? "translate-y-full" : ""} flex flex-col items-center h-screen w-full`}>
      <div className="flex flex-col items-center justify-between h-3/4 w-screen mx-6 px-6 max-w-[60rem] z-40">
        <div className="mt-8 flex flex-row flex-row-reverse justify-end md:justify-center md:flex-col items-center">
          <div className="flex flex-col justify-center md:items-center py-2">
            <h1 className="text-3xl md:text-6xl font-bold text-white">ThreeCGoL</h1>
            <h2 className="text-xl md:mt-6 md:text-4xl text-white">Three.JS + Conway's Game of Life</h2>
          </div>
          <img className="w-2/6 h-auto md:w-2/6 max-w-[6rem] md:max-w-[15rem] border-2 border-white rounded-xl md:m-10 mr-4" src="/pink_slime.png"/>
        </div>
        <div className="my-10 px-2 border-solid border border-white rounded-md w-4/5 max-w-[40rem] h-1/2 flex justify-center items-center bg-blue-800/50">
          <TypeAnimation
            sequence={[
              1500,
              "Hi!",
              1000,
              "My name is Nick Rogers.",
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
            className="text-s md:text-xl text-white text-left"
          />
        </div>
         <button onClick={() => {
          setTransitioning(true);
          setTimeout(() => {
            setView('game');
          }, 500);
        }} className="z-30 border-solid border-2 border-white rounded-full mt-12 w-24 h-16 text-xl text-white">Start</button>
      </div>
      <div className="container h-2/3 w-screen -mt-16">
        <GameEngine boardSize={30} startDemo={true}>
          <GameBoard />
        </GameEngine>
      </div>
    </div> 
  );
}

export default Landing;