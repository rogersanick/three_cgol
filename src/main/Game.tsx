import { GameEngine } from "./GameEngineContext"
import GameGraphics from "./GameGraphics"
import GameGui from "./GameGui"

const Game = () => {
  return <GameEngine boardSize={50}>
    <GameGui />
    <GameGraphics monitorPerf={false} isDemo={true} />
  </GameEngine>
}

export default Game