import React, { Suspense, useState } from "react";
import { PeerConnections } from "./PeerContext";
import { GameEngine } from "./GameEngineContext";

import LoadingIndicator from "./LoadingIndicator";

const App = () => {
  const [gameStarted, setGameStarted] = useState(false);

  const Lobby = React.lazy(() => import('./Lobby'));
  const GameGui = React.lazy(() => import('./GameGui'));
  const GameGraphics = React.lazy(() => import('./GameGraphics'));

  return (
    <div className="h-screen w-screen bg-slate-800 z-0">
      <Suspense fallback={<LoadingIndicator/>}>
        <PeerConnections>
          { gameStarted ?         
          <GameEngine boardSize={50}>
            <GameGui />
            <GameGraphics />
          </GameEngine> : 
          <Lobby startGame={() => setGameStarted(true)} /> }
        </PeerConnections>
      </Suspense>
    </div>
  );
};

export default App;
