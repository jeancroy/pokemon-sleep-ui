import {MealStrengthInfoFinal} from '@/types/game/meal/info';
import {MealIngredient} from '@/types/game/meal/main';
import {getMealBaseStrength, GetMealBaseStrengthOpts} from '@/utils/game/meal/base';
import {getMealIngredientStrength} from '@/utils/game/meal/strength';


type GetMealFinalStrengthOpts = GetMealBaseStrengthOpts & {
  filler: MealIngredient[],
  mapBonus: number,
};

export const getMealFinalStrength = ({
  filler,
  mapBonus,
  ...opts
}: GetMealFinalStrengthOpts): MealStrengthInfoFinal => {
  const {ingredientMap} = opts;

  const {strengthFinal, ...info} = getMealBaseStrength(opts);
  const strengthFromFiller = getMealIngredientStrength({
    ingredients: filler,
    ingredientMap,
  });

  const strengthWithFiller = strengthFinal + strengthFromFiller;

  return {
    ...info,
    strengthFinal: strengthWithFiller * (1 + mapBonus / 100),
    bonusRateWithFiller: strengthWithFiller / info.strengthBase,
  };
};

type GetMealFinalStrengthOfNonRecipeOpts = Pick<GetMealBaseStrengthOpts, 'ingredientMap'> & {
  filler: MealIngredient[],
  mapBonus: number,
};

export const getMealFinalStrengthOfNonRecipe = ({
  ingredientMap,
  filler,
  mapBonus,
}: GetMealFinalStrengthOfNonRecipeOpts): MealStrengthInfoFinal => {
  const strengthBase = getMealIngredientStrength({
    ingredients: filler,
    ingredientMap,
  });

  return {
    strengthBase,
    strengthAfterRarity: strengthBase,
    strengthFinal: strengthBase * (1 + mapBonus / 100),
    bonusRate: 1,
    bonusRateWithFiller: 1,
  };
};
