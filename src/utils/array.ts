export const toUnique = <T>(arr: T[]): T[] => Array.from(new Set(arr));

type ToUniqueWithKeyOpts<TData, TKey> = {
  arr: TData[],
  getKey: (data: TData) => TKey,
};

export const toUniqueWithKey = <TData, TKey>({arr, getKey}: ToUniqueWithKeyOpts<TData, TKey>): TData[] => {
  const map = new Map<TKey, TData>();

  for (const element of arr) {
    map.set(getKey(element), element);
  }

  return [...map.values()];
};

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
