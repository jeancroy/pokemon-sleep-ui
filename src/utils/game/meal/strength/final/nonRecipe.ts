import {IngredientMap} from '@/types/game/ingredient';
import {MealStrengthInfo} from '@/types/game/meal/info';
import {getMealFinalStrengthMultiplier} from '@/utils/game/meal/strength/final/multiplier';
import {GetMealFinalStrengthInternalCommonOpts} from '@/utils/game/meal/strength/final/type';
import {getMealIngredientStrength} from '@/utils/game/meal/strength/utils';


type GetMealFinalStrengthOfNonRecipeOpts = GetMealFinalStrengthInternalCommonOpts & {
  ingredientMap: IngredientMap,
};

export const getMealFinalStrengthOfNonRecipe = ({
  ingredientMap,
  filler,
  ...opts
}: GetMealFinalStrengthOfNonRecipeOpts): MealStrengthInfo => {
  const strengthBase = getMealIngredientStrength({
    ingredients: filler,
    ingredientMap,
  });

  return {
    bonus: {
      level: 1,
      rarity: 1,
      total: 1,
    },
    strengthBase,
    strengthAfterRarity: strengthBase,
    strengthFinal: strengthBase * getMealFinalStrengthMultiplier(opts),
  };
};
