import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { useContext, useState } from "react";
import GelatinousCube from "./GelatinousCube";
import { PeerConnectionsContext } from "./PeerContext";
import Slime from "./Slime";

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
    <div className={`transition-all duration-500 ease-in ${transitioning ? "translate-y-full" : ""} flex flex-col justify-between items-center h-screen`}>
      <div className="container flex flex-col h-1/2 mx-6">
        <h1 className="mt-6 text-4xl font-bold text-white">Lobby</h1>
        <div className="mt-2 font-bold text-white py-4">{`Your name is: ${id}, you Slimey Slime.`}</div>
        <div className="h-3/5 w-full fixed">
          <Canvas camera={{ fov: 70, position: [3, 1, 3] }}>
            <GelatinousCube playerNumber={1} position = {[0,0,0]} transparent={false}/>
            <Slime playerNumber={1} position = {[0,-0.7,0]}/>
            <OrbitControls />
            <ambientLight />
          </Canvas>
        </div>
      </div>
      <div className="h-2/6 w-10/12 container rounded bg-gray-100 bg-opacity-75 mx-2 my-2 px-2 py-2 flex flex-col justify-around">
          <div className="max-h-32 h-2/3 overflow-y-auto">
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