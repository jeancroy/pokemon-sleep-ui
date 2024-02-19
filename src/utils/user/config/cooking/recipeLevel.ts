import {MealId} from '@/types/game/meal/main';
import {CalculatedCookingConfig} from '@/types/userData/config/cooking/main';


type GetRecipeLevelFromCalculatedCookingConfigOpts = {
  calculatedCookingConfig: CalculatedCookingConfig,
  mealId: MealId,
};

export const getRecipeLevelFromCalculatedCookingConfig = ({
  calculatedCookingConfig,
  mealId,
}: GetRecipeLevelFromCalculatedCookingConfigOpts): number => {
  const {overrideRecipeLevel, recipeLevel} = calculatedCookingConfig;

  return overrideRecipeLevel ?? recipeLevel[mealId] ?? 1;
};
