import { GamePieces } from "../gameEngine/GameEngineContext";
import { duplicateArrayOfArrays } from "../utils";

// Utility function to add organisms
const addNewOrganism = (gamePieces: GamePieces, boardSize: number) => {
  const { gelatinousCubes, slimePaths } = gamePieces;
  const newGelatinousCubes = duplicateArrayOfArrays(gelatinousCubes);
  const newSlimePaths = duplicateArrayOfArrays(slimePaths);
  // Determine if a new organism will spawn
  const newOrganismXCenter = Math.round(Math.random() * boardSize - 2) + 1
  const newOrgamismZCenter = Math.round(Math.random() * boardSize - 2) + 1
  const randomPlayerNumber = Math.round(Math.random() * 6)
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (gelatinousCubes[newOrganismXCenter + i] && gelatinousCubes[newOrganismXCenter + i][newOrgamismZCenter + j] === null) {
        if (Math.random() > 0.25) {
          newGelatinousCubes[newOrganismXCenter + i][newOrgamismZCenter + j] = randomPlayerNumber;
          newSlimePaths[newOrganismXCenter + i][newOrgamismZCenter + j] = randomPlayerNumber;
        }
      }
    }
  }
  return { gelatinousCubes: newGelatinousCubes, slimePaths: newSlimePaths };
}

export { addNewOrganism }
