import {Meal, MealMap, MealTypeId} from '@/types/game/meal/main';
import {CookingTarget} from '@/types/userData/config/cooking/target';
import {isNotNullish} from '@/utils/type';


export type ToTargetMealsOpts = {
  mealType: MealTypeId | null,
  target: CookingTarget,
  mealMap: MealMap,
};

export const toTargetMeals = ({mealType, target, mealMap}: ToTargetMealsOpts): Meal[] => {
  if (mealType === null) {
    return [];
  }

  return Object
    .values(target[mealType] ?? {})
    .filter(isNotNullish)
    .map((mealId) => mealMap[mealId])
    .filter(isNotNullish);
};
