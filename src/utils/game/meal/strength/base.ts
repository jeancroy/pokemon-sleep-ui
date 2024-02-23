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
  const {
    strengthBase,
    strengthAfterBonus,
    multiplier,
  } = getMealStrengthBonusMultiplier({meal, ingredientMap});
  const levelBonus = 1 + (getRecipeLevelDataAtLevel({recipeLevelData, level})?.bonus ?? 0);

  return {
    bonus: {
      level: levelBonus,
      rarity: multiplier,
      total: levelBonus * multiplier,
    },
    strengthBase,
    strengthAfterBonus,
    strengthFinal: Math.round(strengthAfterBonus * levelBonus),
  };
};
