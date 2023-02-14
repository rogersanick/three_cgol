export function duplicateArrayOfArrays<T>(originalArray: T[][]): T[][] {
  return originalArray.map(arr => arr.map(elem => elem));
}