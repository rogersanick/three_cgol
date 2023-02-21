import React, { useState } from 'react';

const CgolGui: React.FC = () => {
  const [open, setOpen] = useState(true);
  return (
    <div className={`transition-all ${open ? "" : "translate-x-full"} absolute bottom-0 w-screen z-10 h-1/6 flex justify-center content-between`}>
      <div className="w-10/12 container rounded bg-gray-100 bg-opacity-75 mx-2 my-2 px-2 py-2 flex flex-col justify-around">
          <button className='w-4 h-4 border-gray-300 bg-gray-500 rounded-full text-white self-end text-xs text-center' onClick={() => setOpen(false)}>x</button>
          <div>I will be a GUI some day</div>
      </div>
    </div>

  );
};

export default CgolGui;