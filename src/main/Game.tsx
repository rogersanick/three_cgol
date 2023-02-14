import { GameEngine } from "./gameEngine/GameEngineContext"
import GameGraphics from "./GameGraphics"
import GameGui from "./GameGui"

const Game = () => {
  return <GameEngine boardSize={100} isDemo={false}>
    <GameGui />
    <GameGraphics monitorPerf={false} />
  </GameEngine>
}

export default Game