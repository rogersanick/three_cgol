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
    <div className="absolute h-screen w-screen z-10">
      <div className="flex items-center justify-center container mx-auto px-4 font-sans z-20">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={peerId}
            onChange={(event) => setPeerId(event.target.value)}
          />
          <button className="rounded-md bg-indigo-600 py-2 px-4 text-sm font-medium text-white" type="submit">Submit</button>
        </form>
        {Object.keys(peerConnections).map((peerId) => (
          <div key={peerId}>{peerId}</div>
        ))}
      </div>
    </div>

  );
};

export default PeerGui;