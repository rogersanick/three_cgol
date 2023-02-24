import { createContext, ReactNode, useState } from 'react';

// This is the interface for the context
interface ViewSelectorContextType {
  view: "landing" | "game";
  setView: (view: "landing" | "game") => void;
}

// Instantiate context for tracking peers
const ViewSelectorContext = createContext<ViewSelectorContextType>({
  view: 'landing',
  setView: (_: "landing" | "game") => {},
});

const ViewSelector: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [ view, setView ] = useState<"landing" | "game">('landing');

  return (
    <ViewSelectorContext.Provider value={{ view, setView }}>
      {children}
    </ViewSelectorContext.Provider>
  );
};

export { ViewSelector, ViewSelectorContext };