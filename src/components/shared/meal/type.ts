import {GetMealStrengthOpts} from '@/utils/game/meal/strength/type';


export type MealLinkProps = GetMealStrengthOpts & {
  showEnergy: boolean,
  mapMultiplier: number,
};
