import {extraTastyMultiplier} from '@/const/game/cooking';
import {ExtraTastyTiming} from '@/types/game/cooking/extraTasty';
import {cookingMeals} from '@/types/userData/config/cooking/meal';
import {ExtraTastySkillBoostPercentByMeal} from '@/utils/game/cooking/extraTasty/type';


export const getExtraTastyTiming = (mealIdx: number): ExtraTastyTiming => mealIdx >= 18 ? 'weekend' : 'weekday';

type GetExtraTastyAvgMultiplierOpts = {
  mealExtraTastyRate: number,
  extraTastyTiming: ExtraTastyTiming,
};

export const getExtraTastyAvgMultiplier = ({
  mealExtraTastyRate,
  extraTastyTiming,
}: GetExtraTastyAvgMultiplierOpts): number => {
  return (1 - mealExtraTastyRate) + mealExtraTastyRate * extraTastyMultiplier[extraTastyTiming];
};

type GetCurrentExtraTastySkillBoostPercentOpts = {
  skillBoostPercentByMeal: ExtraTastySkillBoostPercentByMeal,
  mealIdx: number,
};

export const getCurrentExtraTastySkillBoostPercent = ({
  skillBoostPercentByMeal,
  mealIdx,
}: GetCurrentExtraTastySkillBoostPercentOpts): number => {
  return skillBoostPercentByMeal[cookingMeals[mealIdx % cookingMeals.length]];
};
