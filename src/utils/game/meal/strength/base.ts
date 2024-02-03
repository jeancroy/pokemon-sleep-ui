import {MealStrengthInfo} from '@/types/game/meal/info';
import {getRecipeLevelDataAtLevel} from '@/utils/game/meal/level';
import {GetMealStrengthOpts} from '@/utils/game/meal/strength/type';
import {getMealIngredientStrength} from '@/utils/game/meal/strength/utils';


export const getMealBaseStrength = ({
  level,
  meal,
  ingredientMap,
  recipeLevelData,
}: GetMealStrengthOpts): MealStrengthInfo => {
  const strengthBase = getMealIngredientStrength({
    ingredients: meal.ingredients,
    ingredientMap,
  });
  const strengthAfterRarity = meal.baseStrength;

  const rarityBonus = strengthAfterRarity / strengthBase;
  const levelBonus = 1 + (getRecipeLevelDataAtLevel({recipeLevelData, level})?.bonus ?? 0);

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
