import {FilterInclusionMap} from '@/components/input/filter/type';
import {IngredientId} from '@/types/game/ingredient';
import {MealTypeId} from '@/types/game/meal/main';


export type MealInputFilter = {
  mealType: MealTypeId | null,
  ingredientExclusion: FilterInclusionMap<IngredientId>,
  ingredientInclusion: FilterInclusionMap<IngredientId>,
  minBonusPercent: number | null,
  recipeLevel: number,
  showStats: boolean,
};
