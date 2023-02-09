import React, { useContext, useState } from 'react';
import { PeerConnectionsContext } from './PeerContext';

const PeerGui: React.FC = () => {

  const [peerId, setPeerId] = useState('');
  const { addPeer } = useContext(PeerConnectionsContext);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setPeerId('');
    addPeer(peerId);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={peerId}
        onChange={(event) => setPeerId(event.target.value)}
      />
      <button type="submit">Submit</button>
    </form>
  );
};

export default PeerGui;