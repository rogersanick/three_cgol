// @/src/main/gameLogic/workers/cgolPhaseWorker.ts

/// <reference lib="webworker" />
declare const self: DedicatedWorkerGlobalScope;

import { cgolGelatinousCubeTransition, slimePathTransition } from "../gamePhases";

self.addEventListener("message", ({ data }) => {
  gamePhaseWorker(data);
});

export const gamePhaseWorker = (input: {
  gelatinousCubes: (number | null)[][],
  slimePaths: (number | null)[][]
}) => {
  const { gelatinousCubes, slimePaths } = input;
  const newGelatinousCubes = cgolGelatinousCubeTransition(gelatinousCubes);
  const newSlimePaths = slimePathTransition(newGelatinousCubes, slimePaths);
  self.postMessage({ gelatinousCubes: newGelatinousCubes, slimePaths: newSlimePaths });
};