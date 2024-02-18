import groupBy from 'lodash/groupBy';

import {IngredientCounter} from '@/types/game/ingredient';
import {toSum} from '@/utils/array';
import {isNotNullish} from '@/utils/type';


type SubtractIngredientCountOpts = {
  includeNegativeResult?: boolean,
};

export const subtractIngredientCount = (
  minuend: IngredientCounter,
  subtrahend: IngredientCounter,
  opts?: SubtractIngredientCountOpts,
): IngredientCounter => (
  Object.fromEntries(Object.entries(minuend).map(([id, count]) => {
    if (count == null) {
      return null;
    }

    const result = count - (subtrahend[parseInt(id)] ?? 0);

    if (!opts?.includeNegativeResult && result < 0) {
      return null;
    }

    return [id, result];
  }).filter(isNotNullish))
);

type ReduceIngredientCountersOpts = {
  counters: IngredientCounter[],
  reducer: (values: number[]) => number,
};

const reduceIngredientCounters = ({counters, reducer}: ReduceIngredientCountersOpts): IngredientCounter => {
  const grouped = groupBy(
    counters.flatMap((addend) => (
      Object.entries(addend)
        .map(([id, quantity]) => {
          if (quantity == null) {
            return null;
          }

          return {id: parseInt(id), quantity};
        })
        .filter(isNotNullish)
    )),
    ({id}) => id,
  );

  return Object.fromEntries(
    Object.entries(grouped).map(([id, data]) => (
      [id, reducer(data.map(({quantity}) => quantity))]
    )),
  );
};

export const addIngredientCount = (addends: IngredientCounter[]): IngredientCounter => {
  return reduceIngredientCounters({
    counters: addends,
    reducer: toSum,
  });
};

export const maxIngredientCounters = (counters: IngredientCounter[]): IngredientCounter => {
  return reduceIngredientCounters({
    counters,
    reducer: (values) => Math.max(...values),
  });
};

export const minIngredientCounters = (counters: IngredientCounter[]): IngredientCounter => {
  return reduceIngredientCounters({
    counters,
    reducer: (values) => Math.min(...values),
  });
};

export const isIngredientCounterEmpty = (counter: IngredientCounter): boolean => {
  return Object.values(counter).every((count) => !count);
};

export const applyMultiplierToIngredientCount = (multiplier: number, target: IngredientCounter): IngredientCounter => {
  return Object.fromEntries(Object.entries(target).map(([id, count]) => {
    if (!count) {
      return null;
    }

    return [id, count * multiplier];
  }).filter(isNotNullish));
};

export const getTotalIngredientCount = (counter: IngredientCounter): number => {
  return toSum(Object.values(counter).filter(isNotNullish));
};
