import {EfficiencyIntervalsByCookingMeal} from '@/types/game/stamina/efficiency';
import {cookingMeals} from '@/types/userData/config/cooking/meal';
import {HelpCountBetweenMeals} from '@/utils/game/producing/helpCount/betweenMeals/type';
import {getHelpCountOfEfficiencyIntervals} from '@/utils/game/producing/helpCount/ofEfficiencyInterval';


type GetHelpCountBetweenMealsOpts = {
  efficiencyIntervalByMeal: EfficiencyIntervalsByCookingMeal,
  baseFrequency: number,
  multiplier?: number,
};

export const getHelpCountBetweenMeals = ({
  efficiencyIntervalByMeal,
  baseFrequency,
  multiplier = 1,
}: GetHelpCountBetweenMealsOpts): HelpCountBetweenMeals => {
  return Object.fromEntries(cookingMeals.map((cookingMeal) => [
    cookingMeal,
    getHelpCountOfEfficiencyIntervals({
      efficiencyIntervals: efficiencyIntervalByMeal[cookingMeal],
      baseFrequency,
    }) * multiplier,
  ])) as HelpCountBetweenMeals;
};
