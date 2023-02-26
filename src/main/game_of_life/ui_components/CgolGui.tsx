import { useContext, useState } from 'react';
import { gameColors } from '../../color';
import { GameEngineContext } from '../game_engine/GameEngine';
import { GiRabbit, GiSeaTurtle } from 'react-icons/gi';
import { ViewSelectorContext } from '../../views/ViewContext';

const CgolGui: React.FC = () => {
  const [open] = useState(true);

  const { 
    isDrawing, currentOrganismIndex, isPlaying, isDemo, animationDuration, showPerf,
    setAnimationDuration, setIsDrawing, setCurrentOrganismIndex, setIsDemo,
    setIsPlaying, requestNextGameState, setShowPerf } = useContext(GameEngineContext);

  // Increment the color by one or resent to 0
  const changeColor = (index: number) => {
    setCurrentOrganismIndex(index);
  }
  
  const handleAnimationDurationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAnimationDuration(parseFloat(e.target.value));
  }

  const {setView} = useContext(ViewSelectorContext);

  return (
    <>
      <div className={`transition-all ${open ? "" : "translate-x-full"} absolute bottom-10 w-screen z-10 h-min flex justify-center content-between`}>
        <button onClick={() => {
          setView("landing");
        }} className="fixed top-5 left-5 z-100 bg-gray-500/50 rounded-full border-solid border-2 border-white py-2 px-4 text-xs md:text-md text-white">Go Back</button>
        <div className="w-11/12 container rounded bg-gray-100/50 px-2 py-2 flex flex-col justify-around">
            <div className="h-full flex flex-row flex-nowrap overflow-scroll snap-start">
              { gameColors.map((color, index) => {
                const { mainClassName, lightClassHover, darkClassActive } = color;
                return (
                  <button key={index} onClick={() => {
                    changeColor(index);
                  }} className={`${currentOrganismIndex === index ? "border-solid border-4 border-gray-500" : ""} ${mainClassName} text-white ${lightClassHover} ${darkClassActive} rounded shadow hover:shadow-md mx-1 my-1 h-8 basis-24 max-w-sm min-w-[3rem] ease-linear transition-all duration-150`}> </button>
                );
              })}
            </div>
            <div className="w-full flex flex-row items-center justify-between mt-2 self-center">
              <div className="w-2/3 flex flex-row items-center mt-2 self-center">
                <GiRabbit className="mx-2" size={"2rem"}/>
                <input id="generation_speed" type="range" min="50" max="800" step="50" 
                  onChange={handleAnimationDurationChange}
                  value={animationDuration} className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"></input>
                <GiSeaTurtle className="mx-2" size={"2rem"}/>
              </div>  
              <button onClick={() => {
                showPerf ? setShowPerf(false) : setShowPerf(true);
              }} className="bg-gray-500/50 rounded-full border-solid border-2 border-white py-2 px-4 text-xs md:text-md text-white">{showPerf ? "Hide Perf" : "Show Perf"}</button>
            </div>
            <div className="flex flex-row items-center justify-evenly mt-2">
              <button onClick={() => {
                setIsDrawing(!isDrawing);
              }} className="bg-gray-500/50 rounded-full border-solid border-2 border-white py-2 px-4 text-xs md:text-md text-white">
                {isDrawing ? "Orbit" : "Create"}
              </button>
              <button onClick={() => {
                requestNextGameState();
              }} className="bg-gray-500/50 rounded-full border-solid border-2 border-white py-2 px-4 text-xs md:text-md text-white">Decay</button>
              <button onClick={() => {
                setIsPlaying(!isPlaying);
              }} className="bg-gray-500/50 rounded-full border-solid border-2 border-white py-2 px-4 text-xs md:text-md text-white">{isPlaying ? "⏸️" : "▶️"}</button>
              <button onClick={() => {
                if (isDemo) {
                  setIsPlaying(false);
                }
                setIsDemo(!isDemo);
              }} className="bg-gray-500/50 rounded-full border-solid border-2 border-white py-2 px-4 text-xs md:text-md text-white">{isDemo ? "Pause ⏸️" : "Demo ▶️"}</button>
            </div>
        </div>
      </div>
    </>
    

  );
};

export default CgolGui;