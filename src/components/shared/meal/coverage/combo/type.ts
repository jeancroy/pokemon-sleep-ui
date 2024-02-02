import {MealCoverage} from '@/types/game/cooking';
import {IngredientCounter} from '@/types/game/ingredient';
import {Meal, MealId, MealMap, MealTypeId} from '@/types/game/meal/main';
import {ProductionPeriod} from '@/types/game/producing/display';


export type MealCoverageComboCommonProps = {
  mealMap: MealMap,
  ingredientProduction: IngredientCounter,
  period: ProductionPeriod,
};

export type MealCoverageComboInput = {
  mealType: MealTypeId,
  resultCount: number,
};

export type MealCoverageComboData = {
  coverage: MealCoverage,
  meals: Meal[],
  mealIngredientCounts: {
    byMeal: {[id in MealId]: number},
    total: number,
  },
};
