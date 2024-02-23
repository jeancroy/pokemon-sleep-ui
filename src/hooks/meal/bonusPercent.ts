import React from 'react';

import {IngredientMap} from '@/types/game/ingredient';
import {Meal} from '@/types/game/meal/main';
import {toUnique} from '@/utils/array';
import {getMealStrengthBonusMultiplier} from '@/utils/game/meal/strength/bonusMultiplier';


type UseUniqueMealStrengthBonusPercentOpts = {
  meals: Meal[],
  ingredientMap: IngredientMap,
};

export const useUniqueMealStrengthBonusPercent = ({
  meals,
  ingredientMap,
}: UseUniqueMealStrengthBonusPercentOpts): number[] => React.useMemo(
  () => toUnique(meals.map((meal) => getMealStrengthBonusMultiplier({meal, ingredientMap}).recipeBonusPercent))
    .sort((a, b) => a - b),
  [meals, ingredientMap],
);
