import groupBy from 'lodash/groupBy';

import {IngredientMap} from '@/types/game/ingredient';
import {IngredientProduction, IngredientProductionAtLevels} from '@/types/game/pokemon/ingredient';
import {ProducingRateCommonParams, ProducingRateOfBranchByState} from '@/types/game/producing/rate';
import {getEffectiveIngredientLevels} from '@/utils/game/ingredient/level';
import {getIngredientProducingRate} from '@/utils/game/producing/branch/ingredient/single';
import {getMergedItemRateByState} from '@/utils/game/producing/rateReducer';
import {isNotNullish} from '@/utils/type';


export type GetIngredientProducingRatesOpts = ProducingRateCommonParams & {
  ingredients: IngredientProduction[],
  ingredientMap: IngredientMap,
};

// Note that `ingredients` does not care about `level`
// Even if `level` is 1, if `ingredients` got 2 elements, it still calculates as if 2 ingredients are unlocked
export const getIngredientProducingRates = ({
  level,
  pokemon,
  ingredients,
  ingredientMap,
  ...opts
}: GetIngredientProducingRatesOpts): ProducingRateOfBranchByState[] => {
  const grouped = groupBy(
    ingredients
      .map(({id, qty}) => getIngredientProducingRate({
        level,
        pokemon,
        ingredient: ingredientMap[id],
        count: qty,
        picks: ingredients.length,
        ...opts,
      }))
      .filter(isNotNullish),
    (item) => item.id,
  );

  return Object.values(grouped).map((rates) => getMergedItemRateByState({
    rates,
    frequencyMultiplier: ingredients.length,
  }));
};
