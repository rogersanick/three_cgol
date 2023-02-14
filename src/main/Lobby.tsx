import { useContext, useState } from "react";
import { DemoGameEngine } from "./DemoGameEngineContext";
import GameGraphics from "./GameGraphics";
import { PeerConnectionsContext } from "./PeerContext";

// Props for the lobby componet
interface LobbyProps {
  startGame: () => void;
}

// A lobby component that allows users to join a game
const Lobby = (props: LobbyProps) => {

  // Game state transitioning
  const { startGame } = props;
  const [transitioning, setTransitioning] = useState(false);

  // Adding peers
  const { peerConnections, peerConnectionStatus, addPeer } = useContext(PeerConnectionsContext);
  const [newPeerId, setNewPeerId] = useState("");
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    addPeer(newPeerId);
    setNewPeerId('');
  };

  // My ID
  const { id } = useContext(PeerConnectionsContext);

  return (
    <div className={`transition-all duration-500 ease-in ${transitioning ? "translate-y-full" : ""} flex flex-col items-center h-screen`}>
      <div className="container flex flex-col justify-center align-center h-1/2 mx-6 p-6 w-screen">
        <h1 className="mt-6 text-4xl font-bold text-white">Lobby</h1>
        <div className="container border mt-4 h-3/4">
          <DemoGameEngine boardSize={50}>
            <GameGraphics monitorPerf={false} isDemo={true} />
          </DemoGameEngine>
        </div>
        <div className="mt-2 font-bold text-white py-4">{`Your name is: ${id}, you Slimey Slime.`}</div>
      </div>
      <div className="h-1/4 container rounded bg-gray-100 bg-opacity-75 mx-6 px-12 py-12 w-fit">
          <div className="max-h-32 overflow-y-auto">
            {Object.keys(peerConnections).map((peerId) => (
              <>
                <div key={peerId}>{peerId}</div>
                <div>{peerConnectionStatus[peerId]}</div>
              </>
            ))}
          </div>
          <div className="h-2/5 container flex flex-col">
            <input
              className="bg-white my-1 rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              type="text"
              value={newPeerId}
              onChange={(event) => setNewPeerId(event.target.value)}
            />
            <button className="rounded-md bg-indigo-600 my-1 py-1 px-2 text-sm font-medium text-white" onClick={handleSubmit}>Add Player</button>
          </div>
      </div>
      <button onClick={() => {
        setTransitioning(true);
        setTimeout(() => {
          startGame();
        }, 500);
      }} className="rounded-md bg-indigo-600 mb-6 py-2 px-4 text-sm font-medium text-white">Start Game</button>
    </div>
  );
}

export default Lobby;