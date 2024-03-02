import {RecipeLevel} from '@/types/game/cooking/meal';
import {IngredientCounter} from '@/types/game/ingredient';
import {MealsMarked} from '@/types/game/meal/main';


export type CookingCommonFilter = {
  recipeLevel: RecipeLevel,
  inventory: IngredientCounter,
  mealsMarked: MealsMarked,
};
