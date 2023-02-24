import { lazy, Suspense, useContext } from "react";
import LoadingIndicator from "./shared_ui_components/LoadingIndicator";
import { ViewSelectorContext } from "./views/ViewContext";

const App = () => {

  const { view }  = useContext(ViewSelectorContext);
  const Landing = lazy(() => import('./views/Landing'));
  const CgolGame = lazy(() => import('./views/CgolGame'));

  const getView = () => {
    switch (view) {
      case 'landing':
        return <Landing />
      case 'game':
        return <CgolGame />
      default:
        return <div>You've found a bug</div>
    }
  }

  return (
      <div className="animate-gradient-xy bg-gradient-to-br from-blue-800 via-slate-900 to-indigo-700 h-screen w-screen z-30 overflow-hidden">
      <Suspense fallback={<LoadingIndicator/>}>
        <video autoPlay muted loop playsInline className="opacity-20 z-0 w-full h-full absolute top-0 left-0 object-cover">
          <source src="/app_background.mp4" type="video/mp4" />
        </video>
        { getView() }
      </Suspense>
    </div>
  );
};

export default App;
