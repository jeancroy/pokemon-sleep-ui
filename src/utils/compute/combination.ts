import {factorial} from '@/utils/number/factorial';


export function* combineIterator<T>(arr: T[], count: number): Generator<T[]> {
  if (count === 1) {
    for (const a of arr) {
      yield [a];
    }
    return;
  }

  for (let i = 0; i <= arr.length - count; i++) {
    for (const c of combineIterator(arr.slice(i + 1), count - 1)) {
      yield [arr[i], ...c];
    }
  }
}

export const getCombinationCount = (objects: number, sample: number): number => {
  return factorial(objects) / (factorial(sample) * factorial(objects - sample));
};

export function* combineWithRepetitionIterator<T>(arr: T[], count: number): Generator<T[]> {
  if (!count) {
    yield [];
    return;
  }

  for (const [i, val] of arr.entries()) {
    for (const rest of combineWithRepetitionIterator(arr.slice(i), count - 1)) {
      yield [val, ...rest];
    }
  }
}
