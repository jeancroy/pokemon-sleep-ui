import {FilterInclusionMap} from '@/components/input/filter/type';
import {MealCoverage} from '@/types/game/cooking';
import {IngredientCounter, IngredientId} from '@/types/game/ingredient';
import {Meal, MealId, MealMap, MealTypeId} from '@/types/game/meal/main';
import {ProductionPeriod} from '@/types/game/producing/display';


export const mealCoverageComboSort = [
  'ingredientCoverage',
  'coveredStrength',
] as const;

export type MealCoverageComboSort = typeof mealCoverageComboSort[number];

export type MealCoverageComboCommonProps = {
  mealMap: MealMap,
  ingredientProduction: IngredientCounter,
  period: ProductionPeriod,
};

export type MealCoverageComboInput = {
  mealType: MealTypeId,
  ingredientExclusion: FilterInclusionMap<IngredientId>,
  sort: MealCoverageComboSort,
  resultCount: number,
};

export type MealCoverageComboData = {
  coverage: MealCoverage,
  meals: Meal[],
  mealIngredientCounts: {
    byMeal: {[id in MealId]: number},
    total: number,
  },
  coveredStrength: number,
};
