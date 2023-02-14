import React, { Suspense, useState } from "react";
import { PeerConnections } from "./PeerContext";
import { GameEngine } from "./GameEngineContext";

import LoadingIndicator from "./LoadingIndicator";

const App = () => {
  const [gameStarted, setGameStarted] = useState(false);

  const Lobby = React.lazy(() => import('./Lobby'));
  const Game = React.lazy(() => import('./Game'));
  return (
    <div className="h-screen w-screen bg-slate-800">
      <Suspense fallback={<LoadingIndicator/>}>
        <PeerConnections>
          { !gameStarted ?         
          <Game /> :
          <Lobby startGame={() => setGameStarted(true)} /> }
        </PeerConnections>
      </Suspense>
    </div>
  );
};

export default App;
