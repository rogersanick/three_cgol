import React, { Suspense, useState } from "react";
import LoadingIndicator from "./shared_ui_components/LoadingIndicator";

const App = () => {

  const [cgolGameStarted, setCgolGameStarted] = useState(false);
  // const Lobby = React.lazy(() => import('./views/Lobby'));
  const Landing = React.lazy(() => import('./views/Landing'));
  const CgolGame = React.lazy(() => import('./views/CgolGame'));
  return (
    <div className="h-screen w-screen bg-slate-800">
      <Suspense fallback={<LoadingIndicator/>}>
        { cgolGameStarted ?
        <CgolGame /> :
        <Landing startGame={() => setCgolGameStarted(true)} /> }
      </Suspense>
    </div>
  );
};

export default App;
