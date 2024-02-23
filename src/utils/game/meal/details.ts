import {IngredientMap} from '@/types/game/ingredient';
import {Meal, MealDetails} from '@/types/game/meal/main';
import {RecipeLevelData} from '@/types/game/meal/recipeLevel';
import {getMealFinalStrength} from '@/utils/game/meal/strength/final/recipe';
import {GetMealFinalStrengthCommonOpts} from '@/utils/game/meal/strength/type';


type ToMealDetailsListOpts = GetMealFinalStrengthCommonOpts & {
  meals: Meal[],
  recipeLevel: number,
  ingredientMap: IngredientMap,
  recipeLevelData: RecipeLevelData[],
};

export const toMealDetailsList = ({
  meals,
  recipeLevel,
  ingredientMap,
  recipeLevelData,
  ...opts
}: ToMealDetailsListOpts): MealDetails[] => {
  return meals.map((meal) => ({
    meal,
    strengthInfo: getMealFinalStrength({
      filler: [],
      level: recipeLevel,
      meal,
      ingredientMap,
      recipeLevelData,
      ...opts,
    }),
  }));
};
