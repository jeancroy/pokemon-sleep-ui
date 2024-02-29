import React from 'react';

import {IngredientId} from '@/types/game/ingredient';
import {Meal} from '@/types/game/meal/main';
import {toUnique} from '@/utils/array';
import {isNotNullish} from '@/utils/type';


export const useIngredientIdsFromMeals = (meals: Meal[]): IngredientId[] => {
  return React.useMemo(
    () => toUnique(meals
      .filter(isNotNullish)
      .flatMap(({ingredients}) => ingredients.map(({id}) => id))
      .sort((a, b) => a - b),
    ),
    [meals],
  );
};
