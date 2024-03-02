import {MealInputFilterLevelGnostic} from '@/components/shared/meal/filter/levelGnostic/type';


export const mealIndexSortingBasis = [
  'recipeBaseStrength',
  'ingredientCount',
] as const;

export type MealIndexSortingBasis = typeof mealIndexSortingBasis[number];

export type MealIndexFilter = MealInputFilterLevelGnostic & {
  sort: MealIndexSortingBasis,
};
