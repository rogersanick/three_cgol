import { useContext, useEffect, useState } from "react";
import { GameEngine } from "../game_of_life/game_engine/GameEngine";
import GameBoard from "../game_of_life/three_components/CgolGameBoard";
import SocialFooter from "../shared_ui_components/SocialFooter";
import { TypingAnimationSlides } from "../shared_ui_components/TypingMessageSlider";
import { ViewSelectorContext } from "./ViewContext";

// A lobby component that allows users to join a game
const Landing = () => {

  // Game state transitioning
  const { setView } = useContext(ViewSelectorContext)
  const [transitioning, setTransitioning] = useState(false);

  // html encoded line break chracter
  
  const [messages] = useState([
    `Hi! My name is Nick Rogers.`,
    "I'm a software engineer at Google. Previously Messari / R3.",
    "Thanks for visiting.\n\nI'm using Three.js to build a decentralized board game called:\n\nFlourish and Decay.",
    "If you've been creating long enough,\n\nyou've ruined something by making it too complicated.",
    "So I'm open-sourcing a 3D, multi-organism version of Conway's Game of Life.\n\nWhich is a key component of Flourish and Decay.",
    "Click the button below to start creating digital life.\n\nEnjoy!"
  ])

  const [slimeImageIndex, setSlimeImageIndex] = useState(0);
  const [slimeImages] = useState([ "/pink_slime.png", "/orange_slime.png", "/red_slime.png", "/normal_slime.png"]
    .map((ele, i) => <img src={ele} key={ele} onClick={() => {
      setSlimeImageIndex((i + 1) % slimeImages.length)
    }} className="border-2 border-solid border-white w-2/6 aspect-square h-auto md:w-2/6 max-w-[6rem] md:max-w-[15rem] -2 borborderder-white rounded-xl md:m-10 mr-4"/>))

  useEffect(() => {
    slimeImages.map((ele) => {
      const slime = new Image()
      slime.src = ele.props.src
    })
  }, [])

  return (
    <>
      <div className={`z-10 transition-all duration-500 ease-in ${transitioning ? "translate-y-full" : ""} flex flex-col justify-between items-center w-auto h-2/3 mx-8`}>
        <div className="z-40 mt-8 flex flex-row flex-row-reverse justify-end md:justify-center md:flex-col items-center">
          <div className="flex flex-col justify-center md:items-center py-2">
            <h1 className="text-3xl md:text-6xl font-bold text-white">ThreeCGoL</h1>
            <h2 className="text-xl md:mt-6 md:text-4xl text-white">Three.JS + Conway's Game of Life</h2>
          </div>
        {slimeImages[slimeImageIndex]}
        </div>
        <div className="mt-10 flex flex-row bg-indigo-800/30 w-full h-2/3 max-w-[40rem] rounded-lg">
          <TypingAnimationSlides messages={messages}>
            <button onClick={() => {
              setTransitioning(true);
              setTimeout(() => {
                setView('game');
              }, 500);
            }} className="px-3 animate-gradient-xy bg-gradient-to-br from-blue-800/30 via-slate-900/80 to-indigo-700/70 z-40 border-solid border-2 border-white rounded-full md:mt-12 text-lg text-white">Start</button>
          </TypingAnimationSlides>
        </div>
        
      </div>
      <div className="h-2/3 w-full -mt-24 -z-10">
        <GameEngine boardSize={30} startDemo={true}>
          <GameBoard />
        </GameEngine>
      </div>
      <SocialFooter />
    </>
  );
}

export default Landing;