import { GameEngine } from "../game_of_life/game_engine/GameEngine"
import CgolGameBoard from "../game_of_life/three_components/CgolGameBoard"
import CgolGui from "../game_of_life/ui_components/CgolGui"

const CgolGame = () => {
  return <GameEngine boardSize={80} startDemo={false}>
    <CgolGui />
    <CgolGameBoard />
  </GameEngine>
}

export default CgolGame