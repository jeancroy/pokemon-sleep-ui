import {IngredientCounter} from '@/types/game/ingredient';
import {MealId} from '@/types/game/meal/main';


export type RecipeLevel = {[id in MealId]?: number};

export type MealCoverage = {
  byIngredient: IngredientCounter,
  total: number,
};
