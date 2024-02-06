import {RecipeLevel} from '@/types/game/cooking';
import {IngredientCounter, IngredientMap} from '@/types/game/ingredient';
import {MealsMarked} from '@/types/game/meal/main';
import {RecipeLevelData} from '@/types/game/meal/recipeLevel';
import {UserPreloadedData} from '@/types/userData/main';
import {UserSettings, UserSettingsBundle, UserSettingsRequiredData} from '@/types/userData/settings/main';


export type CookingPreloadedData = {
  cooking: UserPreloadedData['cooking'],
  settings: UserSettings,
};

export type CookingServerDataProps = UserSettingsRequiredData & {
  ingredientMap: IngredientMap,
  recipeLevelData: RecipeLevelData[],
  preloaded: UserSettingsBundle,
};

export type CookingCommonFilter = {
  recipeLevel: RecipeLevel,
  inventory: IngredientCounter,
  mealsMarked: MealsMarked,
};
