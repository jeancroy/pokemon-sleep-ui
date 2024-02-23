import {MealStrengthInfo} from '@/types/game/meal/info';
import {getRecipeLevelDataAtLevel} from '@/utils/game/meal/level';
import {getMealStrengthBonusMultiplier} from '@/utils/game/meal/strength/bonusMultiplier';
import {GetMealStrengthOpts} from '@/utils/game/meal/strength/type';


export const getMealBaseStrength = ({
  level,
  meal,
  ingredientMap,
  recipeLevelData,
}: GetMealStrengthOpts): MealStrengthInfo => {
  const bonusMultiplier = getMealStrengthBonusMultiplier({meal, ingredientMap});
  const {
    strengthAfterBonus,
    multiplier,
  } = bonusMultiplier;
  const levelBonus = (
    1 +
    // If the meal doesn't have any ingredient, then it should not have any level bonus
    (meal.ingredients.length ? (getRecipeLevelDataAtLevel({recipeLevelData, level})?.bonus ?? 0) : 0)
  );

  return {
    level,
    bonus: {
      level: levelBonus,
      rarity: multiplier,
      total: levelBonus * multiplier,
    },
    strengthFinal: Math.round(strengthAfterBonus * levelBonus),
    ...bonusMultiplier,
  };
};
