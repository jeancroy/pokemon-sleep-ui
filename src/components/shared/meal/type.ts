import {GetMealFinalStrengthCommonOpts, GetMealStrengthOpts} from '@/utils/game/meal/strength/type';


export type MealLinkProps = GetMealStrengthOpts & GetMealFinalStrengthCommonOpts & {
  showEnergy: boolean,
};
