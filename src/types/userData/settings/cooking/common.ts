import {MealId, MealTypeId} from '@/types/game/meal/main';


export const userCookingMeals = [
  'breakfast',
  'lunch',
  'dinner',
] as const;

export type UserCookingMeal = typeof userCookingMeals[number];

export type UserCookingTargetOfType = {[meal in UserCookingMeal]?: MealId | null};

export type UserCookingTarget = {[mealType in MealTypeId]?: UserCookingTargetOfType};
