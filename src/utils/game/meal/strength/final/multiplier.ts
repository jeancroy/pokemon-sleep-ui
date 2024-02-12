import {GetMealFinalStrengthCommonOpts} from '@/utils/game/meal/strength/type';


type GetMealFinalStrengthMultiplierOpts = GetMealFinalStrengthCommonOpts;

export const getMealFinalStrengthMultiplier = ({
  mapMultiplier,
  strengthMultiplier,
}: GetMealFinalStrengthMultiplierOpts): number => {
  return mapMultiplier * strengthMultiplier;
};
