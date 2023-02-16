import React, { Suspense, useState } from "react";
import { PeerConnections } from "./peer_communication/PeerContext";
import LoadingIndicator from "./ui_components/LoadingIndicator";

const App = () => {

  const [gameStarted, setGameStarted] = useState(false);
  const Lobby = React.lazy(() => import('./views/Lobby'));
  const Game = React.lazy(() => import('./views/Game'));
  return (
    <div className="h-screen w-screen bg-slate-800">
      <Suspense fallback={<LoadingIndicator/>}>
        <PeerConnections>
          { gameStarted ?
          <Game /> :
          <Lobby startGame={() => setGameStarted(true)} /> }
        </PeerConnections>
      </Suspense>
    </div>
  );
};

export default App;
