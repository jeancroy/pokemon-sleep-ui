import {Meal, MealMap, MealTypeId} from '@/types/game/meal/main';
import {CookingTarget} from '@/types/userData/config/cooking/target';
import {isNotNullish} from '@/utils/type';


export type ToTargetMealsOpts = {
  mealType: MealTypeId,
  target: CookingTarget,
  mealMap: MealMap,
};

export const toTargetMeals = ({mealType, target, mealMap}: ToTargetMealsOpts): Meal[] => Object
  .values(target[mealType] ?? {})
  .filter(isNotNullish)
  .map((mealId) => mealMap[mealId])
  .filter(isNotNullish);
