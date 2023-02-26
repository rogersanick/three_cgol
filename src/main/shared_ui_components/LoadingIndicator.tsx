import { useEffect, useState } from "react";

const LoadingIndicator = () => {

  const [loadingMessageIndex, setLoadingMessageIndex] = useState(0);
  const [loadingMessages] = useState([
    "Communicating with fellow slimes telepathically...",
    "Slimifying the progeny...",
    "Propagating the moulds...",
    "Synchronizing the matrices...",
    "Creating the universe...",
    "Assembling new lifeforms...",
    "Generating the new world order...",
    "Deslimifying the code...",
    "Rebooting the universe...",
    "Joining the darkside...",
    "Removing sentience from slime...",
    "Abducting world leaders",
    "Congealing thoughts into form...",
    "Stretching pseudopods for movement...",
    "Gathering organic matter for sustenance...",
    "Assimilating knowledge from surroundings...",
    "Coalescing into new shapes...",
    "Exploring environment with tentacle probes...",
    "Secreting enzymes for digestion...",
    "Absorbing light for energy...",
    "Forming symbiotic relationships...",
    "Infiltrating and overtaking other lifeforms...",
    "Adapting to changing conditions...",
    "Spreading and colonizing new territory...",
    "Forming colonies for protection...",
    "Merging with others to become stronger...",
    "Defending against predators...",
    "Evolving and mutating over time...",
    "Absorbing genetic material for diversity...",
    "Taking over and controlling other lifeforms...",
    "Expanding and dominating the ecosystem..."
  ])

  useEffect(() => {
    const interval = setInterval(() => {
      setLoadingMessageIndex(Math.round((Math.random() * loadingMessages.length)) % loadingMessages.length);
    }, Math.random() * 800 + 200);
    return () => clearInterval(interval);
  }, [loadingMessageIndex]);

  return <div role="status" className="h-screen w-screen flex flex-col justify-center items-center absolute -z-20 animate-gradient-xy bg-gradient-to-br from-blue-800 via-slate-900 to-indigo-700">
    <img className="border-2 border-white rounded-xl animate-pulse w-24 h-24 md:w-48 md:h-48 rounded-2xl mx-auto mb-6" src="/pink_slime.png"/>
    <span className="sr-only">Loading...</span> 
    <span className="w-5/6 h-1/6 mt-6 text-xl font-bold text-center text-white">{loadingMessages[loadingMessageIndex]}</span>
  </div>
}

export default LoadingIndicator;