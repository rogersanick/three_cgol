import { PeerConnections } from "./PeerContext";
import { GameEngine } from "./GameEngineContext";
import GameGraphics from "./GameGraphics";
import GameGui from "./GameGui";
import { useState } from "react";
import Lobby from "./Lobby";

const App = () => {
  const [gameStarted, setGameStarted] = useState(false);
  return (
    <div className="h-screen w-screen bg-slate-100 dark:bg-slate-800 z-0">
      <PeerConnections>
        { gameStarted ?         
        <GameEngine boardSize={50}>
          <GameGui />
          <GameGraphics />
        </GameEngine> : 
        <Lobby startGame={() => setGameStarted(true)} /> }
      </PeerConnections>
    </div>
  );
};

export default App;
