import {MealId} from '@/types/game/meal/main';
import {CookingUserSettings} from '@/types/userData/settings/cooking';


type GetRecipeLevelFromCookingSettingsOpts = {
  cookingSettings: CookingUserSettings,
  mealId: MealId,
};

export const getRecipeLevelFromCookingSettings = ({
  cookingSettings,
  mealId,
}: GetRecipeLevelFromCookingSettingsOpts): number => {
  const {overrideRecipeLevel, recipeLevel} = cookingSettings;

  return overrideRecipeLevel ?? recipeLevel[mealId] ?? 1;
};
