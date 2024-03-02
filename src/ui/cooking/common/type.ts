import {RecipeLevel} from '@/types/game/cooking';
import {IngredientCounter} from '@/types/game/ingredient';
import {MealsMarked} from '@/types/game/meal/main';


export type CookingCommonFilter = {
  recipeLevel: RecipeLevel,
  inventory: IngredientCounter,
  mealsMarked: MealsMarked,
};
