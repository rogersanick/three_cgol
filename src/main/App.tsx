import { lazy, Suspense, useState } from "react";
import LoadingIndicator from "./shared_ui_components/LoadingIndicator";

const App = () => {

  const [cgolGameStarted, setCgolGameStarted] = useState(false);
  // const Lobby = React.lazy(() => import('./views/Lobby'));
  const Landing = lazy(() => import('./views/Landing'));
  const CgolGame = lazy(() => import('./views/CgolGame'));
  return (
      <div className="animate-gradient-xy bg-gradient-to-tr from-purple-900 via-slate-900 to-purple-900 h-screen w-screen z-30 overflow-hidden">
      <Suspense fallback={<LoadingIndicator/>}>
        { !cgolGameStarted && <video autoPlay muted loop className="opacity-40 z-0 w-full h-full absolute top-0 left-0 object-cover">
            <source src="/app_background.mp4" type="video/mp4" />
          </video>
        }
        { cgolGameStarted ?
        <CgolGame /> :
        <Landing startGame={() => setCgolGameStarted(true)} /> }
      </Suspense>
    </div>
  );
};

export default App;
