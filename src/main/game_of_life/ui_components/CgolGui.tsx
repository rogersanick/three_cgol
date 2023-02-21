import React, { useContext, useState } from 'react';
import { convertToTailWind, gameColors } from '../../color';
import { GameEngineContext } from '../game_engine/GameEngine';

const CgolGui: React.FC = () => {
  const [open, setOpen] = useState(true);

  const { currentOrganismIndex, isDrawing, setIsDrawing,
    setCurrentOrganismIndex, requestNextGameState } = useContext(GameEngineContext);

  // Increment the color by one or resent to 0
  const changeColor = (index: number) => {
    setCurrentOrganismIndex(index);
  }

  return (
    <div className={`transition-all ${open ? "" : "translate-x-full"} absolute bottom-0 w-screen z-10 h-min flex justify-center align-center content-between`}>
      <button className='w-4 h-4 border-gray-300 bg-gray-500 rounded-full text-white self-end text-xs text-center' onClick={() => setOpen(false)}>x</button>
      <div className="h-48 w-10/12 container rounded bg-gray-100 bg-opacity-50 mx-2 my-2 p-6 flex flex-col justify-around">
          <div className="flex flex-row justify-start w-full overflow-x-scroll">
            { gameColors.map((color, index) => {
              const tsClass = convertToTailWind(color)
              return (
                <button key={index} onClick={() => {
                  changeColor(index);
                }} className={`${tsClass} text-white active:bg-red-600 font-bold uppercase text-s px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150`}>{index}</button>
              );
            })}
          </div>
          <div className="flex flex-row items-center justify-around">
            <button onClick={() => {
              setIsDrawing(!isDrawing);
            }} className="rounded-full bg-indigo-600 py-2 px-4 text-sm font-medium text-white">
              {isDrawing ? "Click to Orbit the camera" : "Click to Create Life"}
            </button>
            <button onClick={() => {
              requestNextGameState();
            }} className="rounded-full bg-indigo-600 py-2 px-4 text-sm font-medium text-white">Advance Generation</button>
          </div>
      </div>
    </div>

  );
};

export default CgolGui;