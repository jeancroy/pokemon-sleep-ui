import {IngredientMap} from '@/types/game/ingredient';
import {Meal} from '@/types/game/meal/main';
import {MealStrengthBonusMultiplier} from '@/utils/game/meal/strength/type';
import {getMealIngredientStrength} from '@/utils/game/meal/strength/utils';


type GetMealStrengthBonusMultiplierOpts = {
  meal: Meal,
  ingredientMap: IngredientMap,
};

export const getMealStrengthBonusMultiplier = ({
  meal,
  ingredientMap,
}: GetMealStrengthBonusMultiplierOpts): MealStrengthBonusMultiplier => {
  if (!meal.baseStrength) {
    return {
      strengthBase: 0,
      strengthAfterBonus: 0,
      multiplier: 1,
      recipeBonusPercent: 0,
    };
  }

  const strengthBase = getMealIngredientStrength({
    ingredients: meal.ingredients,
    ingredientMap,
  });
  const strengthAfterBonus = meal.baseStrength;
  const multiplier = strengthAfterBonus / strengthBase;

  return {
    strengthBase,
    strengthAfterBonus,
    multiplier,
    recipeBonusPercent: Math.round(multiplier * 100 - 100),
  };
};
