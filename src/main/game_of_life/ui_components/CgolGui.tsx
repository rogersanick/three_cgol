import { useContext, useState } from 'react';
import { gameColors } from '../../color';
import { GameEngineContext } from '../game_engine/GameEngine';
import { GiRabbit, GiSeaTurtle } from 'react-icons/gi';

const CgolGui: React.FC = () => {
  const [open] = useState(true);

  const { 
    isDrawing, currentOrganismIndex, isPlaying, animationDuration,
    setAnimationDuration, setIsDrawing, setCurrentOrganismIndex, 
    setIsPlaying, requestNextGameState } = useContext(GameEngineContext);

  // Increment the color by one or resent to 0
  const changeColor = (index: number) => {
    setCurrentOrganismIndex(index);
  }
  
  const handleAnimationDurationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAnimationDuration(parseFloat(e.target.value));
  }

  return (
    <div className={`transition-all ${open ? "" : "translate-x-full"} absolute bottom-10 w-screen z-10 h-min flex justify-center content-between`}>
      <div className="w-10/12 container rounded bg-gray-100 bg-opacity-50 px-2 py-2 flex flex-col justify-around">
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
          <div className="w-2/3 flex flex-row items-center mt-2 self-center">
            <GiRabbit className="mx-2" size={"2rem"}/>
            <input id="generation_speed" type="range" min="50" max="800" step="50" 
              onChange={handleAnimationDurationChange}
              value={animationDuration} className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"></input>
            <GiSeaTurtle className="mx-2" size={"2rem"}/>
          </div>  
          <div className="flex flex-row items-center justify-around mt-2">
            <button onClick={() => {
              setIsDrawing(!isDrawing);
            }} className="rounded-full bg-indigo-600 py-2 px-4 text-sm font-medium text-white">
              {isDrawing ? "Click to Look" : "Click to Create"}
            </button>
            <button onClick={() => {
              requestNextGameState();
            }} className="rounded-full bg-indigo-600 py-2 px-4 text-sm font-medium text-white">Decay</button>
            <button onClick={() => {
              setIsPlaying(!isPlaying);
            }} className="rounded-full bg-indigo-600 py-2 px-4 text-sm font-medium text-white">{isPlaying ? "⏸️" : "▶️"}</button>
          </div>
      </div>
    </div>

  );
};

export default CgolGui;