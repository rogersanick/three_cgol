import { cgolGelatinousCubeTransition, findOrganismSize } from '../main/GamePhases';
import { expect, it, describe } from 'vitest';

describe('cgolGelatinousCubeTransition', () => {
  it ('applies the appropriate transformation for a single cell that should die', () => {
    const map = [
      [null, null, null, null, null],
      [null, null, null, null, null],
      [null, null, 1, null, null],
      [null, null, null, null, null],
      [null, null, null, null, null],
    ];
    const expected = [
      [null, null, null, null, null],
      [null, null, null, null, null],
      [null, null, null, null, null],
      [null, null, null, null, null],
      [null, null, null, null, null],
    ];
    const result = cgolGelatinousCubeTransition(map);
    expect(result).toEqual(expected);
  });

  it ('applies the appropriate transformation for two cells that should die', () => {
    const map = [
      [null, null, null, null, null],
      [null, null, null, null, null],
      [null, null, 1,    1,    null],
      [null, null, null, null, null],
      [null, null, null, null, null],
    ];
    const expected = [
      [null, null, null, null, null],
      [null, null, null, null, null],
      [null, null, null, null, null],
      [null, null, null, null, null],
      [null, null, null, null, null],
    ];
    const result = cgolGelatinousCubeTransition(map);
    expect(result).toEqual(expected);
  });

  it ('applies the appropriate transformation for three cells of the same organism that should create new life', () => {
    const map = [
      [null, null, null, null, null],
      [null, null, null, 1   , null],
      [null, null, 1,    1,    null],
      [null, null, null, null, null],
      [null, null, null, null, null],
    ];
    const expected = [
      [null, null, null, null, null],
      [null, null, 1   , 1   , null],
      [null, null, 1,    1,    null],
      [null, null, null, null, null],
      [null, null, null, null, null],
    ];
    const result = cgolGelatinousCubeTransition(map);
    expect(result).toEqual(expected);
  });

  it ('applies the appropriate transformation for three cells of two organisms that should create new life', () => {
    const map = [
      [null, null, null, null, null],
      [null, null, null, 1   , null],
      [null, null, 1,    2,    null],
      [null, null, null, null, null],
      [null, null, null, null, null],
    ];
    const expected = [
      [null, null, null, null, null],
      [null, null, 1   , 1   , null],
      [null, null, 1,    2,    null],
      [null, null, null, null, null],
      [null, null, null, null, null],
    ];
    const result = cgolGelatinousCubeTransition(map);
    expect(result).toEqual(expected);
  });

  it ('applies the appropriate transformation for three cells of three organisms of varying sizes that should create new life', () => {
    const map = [
      [null, null, null, null, null],
      [null, null, null, 1   , null],
      [null, null, 3,    2,    2   ],
      [null, null, null, null, null],
      [null, null, null, null, null],
    ];
    const expected = [
      [null, null, null, null, null],
      [null, null, 2   , 1   , 2   ],
      [null, null, 3,    2   , 2   ],
      [null, null, null, 2   , null],
      [null, null, null, null, null],
    ];
    const result = cgolGelatinousCubeTransition(map);
    expect(result).toEqual(expected);
  });

  it ('applies the appropriate transformation for three cells of three organisms of the same size that should create new life', () => {
    const map = [
      [null, null, null, null, null],
      [null, null, null, 1   , null],
      [null, null, 3,    2   , null],
      [null, null, null, null, null],
      [null, null, null, null, null],
    ];
    const expected = [
      [null, null, null, null, null],
      [null, null, 3   , 1   , null],
      [null, null, 3,    2   , null],
      [null, null, null, null, null],
      [null, null, null, null, null],
    ];
    const result = cgolGelatinousCubeTransition(map);
    expect(result).toEqual(expected);
  });
})

describe('findOrganismSize', () => {
  it('returns the size of the organmism when one exists at the given coordinate', () => {
    const map = [
      [0, 0, 1, 1, 0],
      [0, 1, 1, 0, 0],
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 1],
      [0, 0, 0, 1, 1],
    ].map(row => row.map(cell => cell === 1 ? 1 : null));
    const row = 0;
    const col = 2;
    const expected = 4;

    
    const result = findOrganismSize(1, map, row, col);

    expect(result).toEqual(expected);
  });

  it('returns 0 if there is no island at the given coordinate', () => {
    const map = [
      [0, 0, 1, 1, 0],
      [0, 1, 1, 0, 0],
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 1],
      [0, 0, 0, 1, 1],
    ];
    const x = 2;
    const y = 2;
    const expected = 0;

    const result = findOrganismSize(1, map, x, y);
    expect(result).toEqual(expected);
  });

  it('returns the correct count if there are two organisms sharing borders', () => {
    const map = [
      [2, 2, 1, 1, 0],
      [0, 1, 1, 0, 0],
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 1],
      [0, 0, 0, 1, 1],
    ];
    const x = 0;
    const y = 1;
    const expected = 2;

    const result = findOrganismSize(2, map, x, y);
    expect(result).toEqual(expected);
  });

  it('handles organism which share only diagonal connections', () => {
    const map = [
      [2, 2, 1, 1, 0],
      [0, 1, 2, 0, 0],
      [0, 0, 0, 2, 0],
      [0, 0, 0, 0, 2],
      [0, 0, 0, 1, 1],
    ];
    const x = 0;
    const y = 0;
    const expected = 5;

    const result = findOrganismSize(2, map, x, y);
    expect(result).toEqual(expected);
  });
});