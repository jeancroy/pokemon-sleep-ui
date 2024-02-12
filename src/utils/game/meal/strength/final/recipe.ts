import {MealStrengthInfo} from '@/types/game/meal/info';
import {getMealBaseStrength} from '@/utils/game/meal/strength/base';
import {getMealFinalStrengthMultiplier} from '@/utils/game/meal/strength/final/multiplier';
import {GetMealFinalStrengthInternalCommonOpts} from '@/utils/game/meal/strength/final/type';
import {GetMealStrengthOpts} from '@/utils/game/meal/strength/type';
import {getMealIngredientStrength} from '@/utils/game/meal/strength/utils';


type GetMealFinalStrengthOpts = GetMealStrengthOpts & GetMealFinalStrengthInternalCommonOpts;

export const getMealFinalStrength = ({
  filler,
  ...opts
}: GetMealFinalStrengthOpts): MealStrengthInfo => {
  const {ingredientMap} = opts;

  const {strengthFinal, ...info} = getMealBaseStrength(opts);
  const strengthFromFiller = getMealIngredientStrength({
    ingredients: filler,
    ingredientMap,
  });

  return {
    ...info,
    strengthFinal: Math.floor((strengthFinal + strengthFromFiller) * getMealFinalStrengthMultiplier(opts)),
  };
};
