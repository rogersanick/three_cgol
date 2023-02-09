import Peer, { DataConnection } from 'peerjs';
import React, { ReactNode, useState } from 'react';

// This is the interface for the context
interface PeerConnectionsContextType {
  id: string;
  peerClient: Peer;
  peerConnections: {[key: string]: DataConnection};
  addPeer: (peerId: string) => void;
}

// Instantiate context for tracking peers
const PeerConnectionsContext = React.createContext<PeerConnectionsContextType>({
  id: '',
  peerClient: {} as any,
  peerConnections: {},
  addPeer: (_: string) => {},
});

const PeerConnections: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [ peerClient ] = useState<Peer>(new Peer());
  const [ id ] = useState<string>(peerClient.id);
  const [ peerConnections, setPeerConnections ] = useState<{[key: string]: DataConnection}>({});

  // Add a peer
  const addPeer = (peerId: string) => {
    const connection = peerClient.connect(peerId);
    console.log(connection)
    setPeerConnections({ ...peerConnections, [peerId]: connection });
  };

  // Receive a peer
  peerClient.on('connection', (connection) => {
    setPeerConnections({ ...peerConnections, [connection.peer]: connection });
  })

  return (
    <PeerConnectionsContext.Provider value={{ peerClient, id, peerConnections, addPeer }}>
      {children}
    </PeerConnectionsContext.Provider>
  );
};

export { PeerConnections, PeerConnectionsContext };