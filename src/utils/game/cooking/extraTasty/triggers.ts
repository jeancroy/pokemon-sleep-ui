import {CookingMeal, cookingMeals} from '@/types/userData/config/cooking/meal';
import {ExtraTastySkillBoostPercentByMeal} from '@/utils/game/cooking/extraTasty/type';


export type GetExtraTastySkillBoostPercentByMealOpts = {
  // This is "before" the meal being cooked
  triggersPerMeal: {[meal in CookingMeal]: number},
  percentBoostPerSkill: number,
};

export const getExtraTastySkillBoostPercentByMeal = ({
  triggersPerMeal,
  percentBoostPerSkill,
}: GetExtraTastySkillBoostPercentByMealOpts): ExtraTastySkillBoostPercentByMeal => {
  return Object.fromEntries(cookingMeals.map((cookingMeal) => [
    cookingMeal,
    triggersPerMeal[cookingMeal] * percentBoostPerSkill,
  ])) as ExtraTastySkillBoostPercentByMeal;
};
