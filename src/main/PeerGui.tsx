import React, { useContext, useState } from 'react';
import { PeerConnectionsContext } from './PeerContext';

const PeerGui: React.FC = () => {

  const [peerId, setPeerId] = useState('');
  const { addPeer, peerConnections } = useContext(PeerConnectionsContext);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setPeerId('');
    addPeer(peerId);
  };

  return (
    <div className="absolute bottom-0 w-screen z-10 flex justify-center">
      <div className="w-10/12 container bg-gray-100 bg-opacity-75 mx-2 my-2 px-2 py-2 flex flex-col ">
          <input
            className="bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            type="text"
            value={peerId}
            onChange={(event) => setPeerId(event.target.value)}
          />
          <button className="rounded-md bg-indigo-600 py-2 px-4 text-sm font-medium text-white"onClick={handleSubmit}>Submit</button>
        {Object.keys(peerConnections).map((peerId) => (
          <div key={peerId}>{peerId}</div>
        ))}
      </div>
    </div>

  );
};

export default PeerGui;