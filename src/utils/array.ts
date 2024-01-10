export const toUnique = <T>(arr: T[]): T[] => Array.from(new Set(arr));

export const toSum = (arr: number[]): number => arr.reduce((prev, curr) => prev + curr, 0);

export function* toAccumulated(arr: number[]): Generator<number> {
  let sum = 0;
  for (const element of arr) {
    sum += element;
    yield sum;
  }
}

type ToNormalizedOpts = {
  arr: number[],
  targetSum: number,
};

export const toNormalized = ({arr, targetSum}: ToNormalizedOpts) => {
  const multiplier = targetSum / toSum(arr);

  return arr.map((num) => num * multiplier);
};

export function* generateSegments<T>(size: number, arr: T[]): Generator<T[]> {
  for (let idx = 0; idx <= arr.length; idx++) {
    yield arr.slice(idx, idx + size);
  }
}
