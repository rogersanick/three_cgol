import { PeerConnections } from "./PeerContext";
import { GameEngine } from "./GameEngineContext";
import GameGui from "./GameGui";
import PeerGui from "./PeerGui";

const App = () => {
  return (
    <PeerConnections>
      <GameEngine boardSize={50}>
        <PeerGui />
        <GameGui />
      </GameEngine>
    </PeerConnections>
  );
};

export default App;
