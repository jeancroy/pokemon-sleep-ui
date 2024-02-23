import groupBy from 'lodash/groupBy';

import {ProductionOfDrop} from '@/types/game/producing/rate/base';
import {getIngredientProductionBase} from '@/utils/game/producing/branch/ingredient/base/single';
import {GetIngredientProductionBaseListOpts} from '@/utils/game/producing/branch/ingredient/type';
import {getMergedRateOfDrop} from '@/utils/game/producing/reducer/merge/rateOfDrop';
import {isNotNullish} from '@/utils/type';


// Note that `ingredients` does not care about `level`
// Even if `level` is 1, if `ingredients` got 2 elements, it still calculates as if 2 ingredients are unlocked
export const getIngredientProductionBaseList = ({
  level,
  pokemon,
  ingredients,
  ingredientMap,
  ...opts
}: GetIngredientProductionBaseListOpts): ProductionOfDrop[] => {
  const {baseFrequency} = opts;

  const grouped = groupBy(
    ingredients
      .map(({id, qty}) => getIngredientProductionBase({
        level,
        pokemon,
        ingredient: ingredientMap[id],
        ingredientBranchCount: ingredients.length,
        qtyPerHelp: qty,
        ...opts,
      }))
      .filter(isNotNullish),
    (item) => item.id,
  );

  // `groupBy()` from `lodash` sorts the key by default
  return Object.values(grouped).map((rates) => getMergedRateOfDrop({
    rates,
    baseFrequency,
  }));
};
