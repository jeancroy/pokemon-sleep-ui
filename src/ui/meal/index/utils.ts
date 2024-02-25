import {MealDetails} from '@/types/game/meal/main';
import {MealIndexSortingBasis} from '@/ui/meal/index/type';


export const sortMealIndexRecipe = (
  sort: MealIndexSortingBasis,
) => (
  a: MealDetails, b: MealDetails,
): number => {
  const mealTypeDiff = a.meal.type - b.meal.type;
  if (mealTypeDiff !== 0) {
    return mealTypeDiff;
  }

  if (sort === 'ingredientCount') {
    return b.meal.ingredientCount - a.meal.ingredientCount;
  }

  if (sort === 'recipeBaseStrength') {
    return b.meal.baseStrength - a.meal.baseStrength;
  }

  throw new Error(`Unhandled meal index recipe sorting basis [${sort satisfies never}]`);
};
