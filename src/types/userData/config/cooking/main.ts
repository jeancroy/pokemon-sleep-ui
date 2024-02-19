import {FilterInclusionMap} from '@/components/input/filter/type';
import {RecipeLevel} from '@/types/game/cooking';
import {IngredientCounter, IngredientId} from '@/types/game/ingredient';
import {Meal, MealCounter, MealsMarked, MealTypeId} from '@/types/game/meal/main';
import {CookingTarget} from '@/types/userData/config/cooking/target';


export type CookingConfig = {
  mealType: MealTypeId,
  target: CookingTarget,
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

export type CalculatedCookingConfig = {
  recipeLevel: RecipeLevel,
  targetMeals: Meal[],
  actualPotCapacity: number,
  overrideRecipeLevel?: number,
};
