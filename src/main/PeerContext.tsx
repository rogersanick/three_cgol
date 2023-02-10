import Peer, { DataConnection } from 'peerjs';
import React, { ReactNode, useEffect, useState } from 'react';

// This is the interface for the context
interface PeerConnectionsContextType {
  id: string;
  peerClient: Peer;
  peerConnections: {[key: string]: DataConnection};
  peerConnectionStatus: {[key: string]: 'CONNECTING' | 'OPEN' };
  addPeer: (peerId: string) => void;
  sendMessage: (peerId: string, message: string) => void;
}

// Instantiate context for tracking peers
const PeerConnectionsContext = React.createContext<PeerConnectionsContextType>({
  id: '',
  peerClient: {} as any,
  peerConnections: {},
  peerConnectionStatus: {},
  addPeer: (_: string) => {},
  sendMessage: (_: string, __: string) => {},
});

const PeerConnections: React.FC<{ children: ReactNode }> = ({ children }) => {

  // Setup current users peer client
  const [ peerClient ] = useState<Peer>(new Peer());
  const [ id, setId ] = useState<string>('UNKNOWN');
  peerClient.on('open', (id) => {
    setId(id);
  });

  // Define storage for connections to peers
  const [ peerConnections, setPeerConnections ] = useState<{[key: string]: DataConnection}>({});
  const [ peerConnectionStatus, setPeerConnectionStatus ] = useState({});

  // Add a peer
  const addPeer = (peerId: string) => {
    const connection = peerClient.connect(peerId);
    setPeerConnections({ ...peerConnections, [peerId]: connection });
    setPeerConnectionStatus({ ...peerConnectionStatus, [peerId]: 'CLOSED' })
    connection.on('open', () => {
      setPeerConnectionStatus({ ...peerConnectionStatus, [peerId]: 'OPEN' });
    })
    connection.on('data', (data) => {
      console.log('Received', data);
    })
  };

  const sendMessage = (peerId: string, message: string) => {
    peerConnections[peerId].send(message);
  }

  // Listen for INCOMING connections
  useEffect(() => {
    peerClient.on('connection', (connection) => {
      setPeerConnections({ ...peerConnections, [connection.peer]: connection });
      setPeerConnectionStatus({ ...peerConnectionStatus, [connection.peer]: 'OPEN' });
    });
  });

  return (
    <PeerConnectionsContext.Provider value={{ peerClient, id, peerConnections, peerConnectionStatus, addPeer, sendMessage }}>
      {children}
    </PeerConnectionsContext.Provider>
  );
};

export { PeerConnections, PeerConnectionsContext };