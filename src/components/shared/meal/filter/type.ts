import {FilterInclusionMap} from '@/components/input/filter/type';
import {IngredientId, IngredientMap} from '@/types/game/ingredient';
import {Meal, MealTypeId} from '@/types/game/meal/main';


export type MealInputFilter = {
  mealType: MealTypeId | null,
  ingredientExclusion: FilterInclusionMap<IngredientId>,
  ingredientInclusion: FilterInclusionMap<IngredientId>,
  minBonusPercent: number | null,
  recipeLevel: number,
  showStats: boolean,
};

export type MealFilterRequiredData = {
  meals: Meal[],
  ingredientMap: IngredientMap,
  maxRecipeLevel: number,
};
