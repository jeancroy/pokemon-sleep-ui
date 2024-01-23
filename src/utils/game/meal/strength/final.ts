import {MealStrengthInfo} from '@/types/game/meal/info';
import {MealIngredient} from '@/types/game/meal/main';
import {getMealBaseStrength, GetMealBaseStrengthOpts} from '@/utils/game/meal/strength/base';
import {getMealIngredientStrength} from '@/utils/game/meal/strength/utils';


type GetMealFinalStrengthCommonOpts = {
  filler: MealIngredient[],
  mapMultiplier: number,
};

type GetMealFinalStrengthOpts = GetMealBaseStrengthOpts & GetMealFinalStrengthCommonOpts;

export const getMealFinalStrength = ({
  filler,
  mapMultiplier,
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
    strengthFinal: Math.floor((strengthFinal + strengthFromFiller) * mapMultiplier),
  };
};

type GetMealFinalStrengthOfNonRecipeOpts =
  Pick<GetMealBaseStrengthOpts, 'ingredientMap'> &
  GetMealFinalStrengthCommonOpts;

export const getMealFinalStrengthOfNonRecipe = ({
  ingredientMap,
  filler,
  mapMultiplier,
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
    strengthFinal: strengthBase * mapMultiplier,
  };
};
