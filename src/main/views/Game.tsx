import { GameEngine } from "../game_engine/GameEngineContext"
import GameGraphics from "../three_components/GameGraphics"
import GameGui from "../ui_components/GameGui"

const Game = () => {
  return <GameEngine boardSize={100} isDemo={false}>
    <GameGui />
    <GameGraphics monitorPerf={false} />
  </GameEngine>
}

export default Game