import { PeerConnections } from "./PeerContext";
import { GameEngine } from "./GameEngineContext";
import GameGui from "./GameGui";
import PeerGui from "./PeerGui";

const App = () => {
  return (
    <div className="h-screen w-screen bg-slate-100 dark:bg-slate-800 z-0">
      <PeerConnections>
        <GameEngine boardSize={50}>
          <PeerGui />
          <GameGui />
        </GameEngine>
      </PeerConnections>
    </div>
  );
};

export default App;
