import {FilterInclusionMap, FilterWithUpdaterProps} from '@/components/input/filter/type';
import {IngredientId, IngredientMap} from '@/types/game/ingredient';
import {MealStrengthInfo} from '@/types/game/meal/info';
import {Meal, MealId, MealTypeId} from '@/types/game/meal/main';
import {UserPreloadedData} from '@/types/userData/main';
import {UserSettings} from '@/types/userData/settings';
import {CookingPopupCommonProps} from '@/ui/cooking/recipe/popup/type';


export type CookingRecipeData = {
  meal: Meal,
  info: MealStrengthInfo,
};

export type CookingFilterRecipeLevel = {[id in MealId]?: number};

export type CookingIngredientCount = {[ingredient in IngredientId]?: number | null};

export type CookingFilter = {
  type: MealTypeId,
  recipeLevel: CookingFilterRecipeLevel,
  capacity: number,
  ingredient: FilterInclusionMap<IngredientId>,
  ingredientCount: CookingIngredientCount,
  showUnmakeableRecipe: boolean,
};

export type CookingPreloadedData = {
  cooking: UserPreloadedData['cooking'],
  settings: UserSettings,
};

export type CookingServerDataProps = {
  meals: Meal[],
  ingredientMap: IngredientMap,
  preloaded: CookingPreloadedData,
};

export type CookingCommonProps = FilterWithUpdaterProps<CookingFilter> & CookingPopupCommonProps & {
  meals: Meal[],
  mealTypes: MealTypeId[],
  preloaded: CookingPreloadedData['cooking'],
};
