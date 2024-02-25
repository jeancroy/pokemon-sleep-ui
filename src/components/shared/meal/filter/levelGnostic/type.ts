import {
  MealFilterAgnosticRequiredData,
  MealInputFilterLevelAgnostic,
} from '@/components/shared/meal/filter/levelAgnostic/type';


export type MealInputFilterLevelGnostic = MealInputFilterLevelAgnostic & {
  recipeLevel: number,
};

export type MealFilterGnosticRequiredData = MealFilterAgnosticRequiredData & {
  maxRecipeLevel: number,
};
