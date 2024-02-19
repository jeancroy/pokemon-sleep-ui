import {MealId} from '@/types/game/meal/main';
import {CalculatedCookingSettings} from '@/types/userData/settings/cooking';


type GetRecipeLevelFromCalculatedCookingSettingsOpts = {
  calculatedCookingSettings: CalculatedCookingSettings,
  mealId: MealId,
};

export const getRecipeLevelFromCalculatedCookingSettings = ({
  calculatedCookingSettings,
  mealId,
}: GetRecipeLevelFromCalculatedCookingSettingsOpts): number => {
  const {overrideRecipeLevel, recipeLevel} = calculatedCookingSettings;

  return overrideRecipeLevel ?? recipeLevel[mealId] ?? 1;
};
