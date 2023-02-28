import { useContext, useState } from "react";
import { GameEngine } from "../game_of_life/game_engine/GameEngine";
import { PeerConnectionsContext } from "../peer_communication/PeerContext";
import GameBoard from "../game_of_life/three_components/CgolGameBoard";

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
        <div className="mt-2 font-bold text-white py-4">{`Your name is: ${id}, you Slimey Slime.`}</div>
        <div className="container mt-4 h-3/4">
          <GameEngine boardSize={50} startDemo={true}>
            <GameBoard />
          </GameEngine>
        </div>
      </div>
      <div className="h-1/2 flex flex-col justify-center">
        <div className="container rounded bg-gray-100 bg-opacity-75 mx-6 px-12 py-12 w-fit">
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
        }} className="rounded-md bg-gradient-to-br from-blue-800 via-slate-900 to-indigo-700 my-6 py-2 px-4 text-sm font-medium text-white">Start Game</button>
      </div>
    </div> 
  );
}

export default Lobby;