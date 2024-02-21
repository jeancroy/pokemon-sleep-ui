import groupBy from 'lodash/groupBy';

import {ProducingRateOfDrop} from '@/types/game/producing/rate/base';
import {getIngredientProducingRateBase} from '@/utils/game/producing/branch/ingredient/base/single';
import {GetIngredientProducingRateBaseListOpts} from '@/utils/game/producing/branch/ingredient/type';
import {getMergedRateOfDrop} from '@/utils/game/producing/reducer/merge/rateOfDrop';
import {isNotNullish} from '@/utils/type';


// Note that `ingredients` does not care about `level`
// Even if `level` is 1, if `ingredients` got 2 elements, it still calculates as if 2 ingredients are unlocked
export const getIngredientProducingRateBaseList = ({
  level,
  pokemon,
  ingredients,
  ingredientMap,
  ...opts
}: GetIngredientProducingRateBaseListOpts): ProducingRateOfDrop[] => {
  const {baseFrequency} = opts;

  const grouped = groupBy(
    ingredients
      .map(({id, qty}) => getIngredientProducingRateBase({
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
