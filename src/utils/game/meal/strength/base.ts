import {IngredientMap} from '@/types/game/ingredient';
import {MealStrengthInfo} from '@/types/game/meal/info';
import {Meal} from '@/types/game/meal/main';
import {getRecipeLevelData} from '@/utils/game/meal/level';
import {getMealIngredientStrength} from '@/utils/game/meal/strength/utils';


export type GetMealBaseStrengthOpts = {
  level: number,
  meal: Meal,
  ingredientMap: IngredientMap,
};

// https://wikiwiki.jp/poke_sleep/%E6%96%99%E7%90%86
export const getMealBaseStrength = ({
  level,
  meal,
  ingredientMap,
}: GetMealBaseStrengthOpts): MealStrengthInfo => {
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
    strengthFinal: Math.round(strengthAfterRarity * levelBonus),
  };
};
