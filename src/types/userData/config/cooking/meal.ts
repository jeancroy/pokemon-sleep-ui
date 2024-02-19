export const cookingMeals = [
  'breakfast',
  'lunch',
  'dinner',
] as const;

export type CookingMeal = typeof cookingMeals[number];
