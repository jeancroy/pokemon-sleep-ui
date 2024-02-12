import {MealIngredient} from '@/types/game/meal/main';
import {GetMealFinalStrengthCommonOpts} from '@/utils/game/meal/strength/type';


export type GetMealFinalStrengthInternalCommonOpts = GetMealFinalStrengthCommonOpts & {
  filler: MealIngredient[],
};
