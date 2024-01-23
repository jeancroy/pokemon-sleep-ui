import {IngredientMap} from '@/types/game/ingredient';
import {MealInfo} from '@/types/game/meal/info';
import {Meal} from '@/types/game/meal/main';
import {getRecipeLevelData} from '@/utils/game/meal/level';
import {getMealIngredientStrength} from '@/utils/game/meal/strength/utils';


type GetMealBonusOpts = {
  level: number,
  meal: Meal,
  ingredientMap: IngredientMap,
};

export const getMealInfo = ({level, meal, ingredientMap}: GetMealBonusOpts): MealInfo => {
  const strengthBase = getMealIngredientStrength({
    ingredients: meal.ingredients,
    ingredientMap,
  });
  const strengthAfterRarity = meal.baseStrength;

  const rarityBonus = strengthAfterRarity / strengthBase;
  const levelBonus = 1 + (getRecipeLevelData(level)?.bonus ?? 0);

  return {
    bonus: {
      level: levelBonus,
      rarity: rarityBonus,
      total: levelBonus * rarityBonus,
    },
    strengthBase,
    strengthAfterRarity,
  };
};
