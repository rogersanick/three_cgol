import { lazy, Suspense, useContext } from "react";
import LoadingIndicator from "./shared_ui_components/LoadingIndicator";
import { ViewSelectorContext } from "./views/ViewContext";

const App = () => {

  const { view }  = useContext(ViewSelectorContext);
  const Landing = lazy(() => import('./views/Landing'));
  const CgolGame = lazy(() => import('./views/CgolGame'));
  const VideoBackground = lazy(() => import('./shared_ui_components/VideoBackground'))

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
      <div className="h-screen w-screen overflow-hidden">
      <Suspense fallback={<LoadingIndicator/>}>
        <Suspense fallback={<div className="absolute -z-20 animate-gradient-xy bg-gradient-to-br from-blue-800 via-slate-900 to-indigo-700 h-screen w-screen"></div>}>
          <VideoBackground />
        </Suspense>
        { getView() }
      </Suspense>
    </div>
  );
};

export default App;
