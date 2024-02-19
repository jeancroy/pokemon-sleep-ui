import {FilterInclusionMap} from '@/components/input/filter/type';
import {RecipeLevel} from '@/types/game/cooking';
import {IngredientCounter, IngredientId} from '@/types/game/ingredient';
import {MealCounter, MealsMarked, MealTypeId} from '@/types/game/meal/main';
import {UserCookingTarget} from '@/types/userData/settings/cooking/common';


export type UserCookingSettings = {
  mealType: MealTypeId,
  target: UserCookingTarget,
  potCapacity: number,
  ingredients: FilterInclusionMap<IngredientId>,
  unlockedIngredients: FilterInclusionMap<IngredientId>,
  showEnergy: boolean,
  showUnmakeableRecipe: boolean,
  ingredientCount: IngredientCounter,
  recipeLevel: RecipeLevel,
  mealsWanted: MealCounter,
  mealsMarked: MealsMarked,
};
