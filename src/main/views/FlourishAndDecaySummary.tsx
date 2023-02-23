type FlourishAndDecaySummaryProps = {
  close: () => void;
};

const FlourishAndDecaySummary = (props: FlourishAndDecaySummaryProps) => {
  const { close } = props;
  return (
    <div className="z-40 flex flex-col h-5/6 w-11/12 absolute top-10 m-auto items-center p-6 bg-slate-700 text-center overflow-scroll snap-start max-w-[65rem]">
      <h1 className="text-4xl font-bold text-white">Flourish & Decay</h1>
      <img className="w-1/2 h-auto my-4 md:w-2/6 max-w-[15rem] rounded-xl md:m-10 mr-4" src="/orange_slime.png"/>
      <h2 className="text-xl text-white"><i>A Decentralized Digital Board Game</i></h2>
      <h4 className="text-s mt-2 text-white text-left mx-6 md:mx-12">
          Enter the realm of sentient slime, where players take the role of a complex organism engaged in an epic battle for dominance! Inspired by the 
          iconic 'Conway's Game of Life,' this multiplayer board game blends deck-building mechanics with cunning algorithmic strategy. Assemble your 
          deck of slimy creatures and watch as they decompose your opponents in the heat of battle. From two player duels to five-player mayhem, this game 
          offers a delightful and dynamic gaming experience for all. Sharpen your wits and prepare to conquer the board, for only the most cunning and powerful 
          organism will rise to the top in the cycle of Flourish and Decay.
      </h4>
      <button className="rounded-full bg-indigo-600 mt-12 w-24 text-s text-white" onClick={close}>Close</button>
    </div>
  )
}

export default FlourishAndDecaySummary