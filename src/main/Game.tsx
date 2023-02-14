import { GameEngine } from "./GameEngineContext"
import GameGraphics from "./GameGraphics"
import GameGui from "./GameGui"

const Game = (props: any) => {
  return <GameEngine boardSize={100}>
    <GameGui />
    <GameGraphics monitorPerf={true} isDemo={false}/>
  </GameEngine>
}

export default Game