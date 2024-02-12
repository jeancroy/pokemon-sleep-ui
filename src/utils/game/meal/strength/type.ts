import {IngredientMap} from '@/types/game/ingredient';
import {Meal} from '@/types/game/meal/main';
import {RecipeLevelData} from '@/types/game/meal/recipeLevel';


export type GetMealFinalStrengthCommonOpts = {
  mapMultiplier: number,
  strengthMultiplier: number,
};

export type GetMealStrengthOpts = {
  level: number,
  meal: Meal,
  ingredientMap: IngredientMap,
  recipeLevelData: RecipeLevelData[],
};
