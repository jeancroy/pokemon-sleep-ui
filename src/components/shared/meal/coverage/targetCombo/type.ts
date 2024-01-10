import {IngredientCounter} from '@/types/game/ingredient';
import {MealMap, MealTypeId} from '@/types/game/meal/main';
import {ProductionPeriod} from '@/types/game/producing/display';


export type MealCoverageTargetComboCommonProps = {
  mealMap: MealMap,
  ingredientProduction: IngredientCounter,
  period: ProductionPeriod,
};

export type MealCoverageTargetComboInput = {
  mealType: MealTypeId,
  resultCount: number,
};
