import React, { useContext, useState } from 'react';
import { gameColors } from '../../color';
import { GameEngineContext } from '../game_engine/GameEngine';

const CgolGui: React.FC = () => {
  const [open, setOpen] = useState(true);

  const { 
    isDrawing, currentOrganismIndex, isPlaying, 
    setIsDrawing, setCurrentOrganismIndex, setIsPlaying,
    requestNextGameState } = useContext(GameEngineContext);

  // Increment the color by one or resent to 0
  const changeColor = (index: number) => {
    setCurrentOrganismIndex(index);
  }

  return (
    <div className={`transition-all ${open ? "" : "translate-x-full"} absolute bottom-10 w-screen z-10 h-min flex justify-center content-between`}>
      <button className='w-4 h-4 border-gray-300 bg-gray-500 rounded-full text-white self-end text-xs text-center' onClick={() => setOpen(false)}>x</button>
      <div className="w-10/12 container rounded bg-gray-100 bg-opacity-50 px-2 py-2 flex flex-col justify-around">
          <div className="h-full grid grid-cols-9 overflow-scroll snap-start">
            { gameColors.map((color, index) => {
              const { mainClassName, lightClassHover, darkClassActive } = color;
              return (
                <button key={index} onClick={() => {
                  changeColor(index);
                }} className={`${currentOrganismIndex === index ? "border-solid border-4 border-gray-500" : ""} ${mainClassName} text-white ${lightClassHover} ${darkClassActive} rounded shadow hover:shadow-md mx-1 my-1 h-8 w-auto max-w-sm ease-linear transition-all duration-150`}> </button>
              );
            })}
          </div>
          <div className="flex flex-row items-center justify-around mt-6">
            <button onClick={() => {
              setIsDrawing(!isDrawing);
            }} className="rounded-full bg-indigo-600 py-2 px-4 text-sm font-medium text-white">
              {isDrawing ? "Camera" : "Create"}
            </button>
            <button onClick={() => {
              requestNextGameState();
            }} className="rounded-full bg-indigo-600 py-2 px-4 text-sm font-medium text-white">Decay</button>
            <button onClick={() => {
              setIsPlaying(!isPlaying);
            }} className="rounded-full bg-indigo-600 py-2 px-4 text-sm font-medium text-white">{isPlaying ? "Pause" : "Play"}</button>
          </div>
      </div>
    </div>

  );
};

export default CgolGui;