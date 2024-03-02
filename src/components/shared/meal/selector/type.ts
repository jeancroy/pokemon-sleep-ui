import {RecipeLevel} from '@/types/game/cooking/meal';
import {MealId, MealTypeId} from '@/types/game/meal/main';


export type MealSelectorLevelUpdatingProps = {
  mealType: MealTypeId,
  maxRecipeLevel: number,
} & ({
  recipeLevel: RecipeLevel,
  onLevelUpdated: (id: MealId, level: number) => void,
} | {
  recipeLevel?: never,
  onLevelUpdated?: never,
});
