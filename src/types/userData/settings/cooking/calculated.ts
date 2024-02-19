import {RecipeLevel} from '@/types/game/cooking';
import {Meal, MealMap} from '@/types/game/meal/main';
import {StaminaCookingRecoveryData} from '@/types/game/stamina/recovery';


export type CalculatedCookingSettingsRequiredData = {
  mealMap: MealMap,
  cookingRecoveryData: StaminaCookingRecoveryData[],
};

export type CalculatedCookingSettings = {
  recipeLevel: RecipeLevel,
  targetMeals: Meal[],
  actualPotCapacity: number,
  overrideRecipeLevel?: number,
};
