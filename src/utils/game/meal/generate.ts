import {Meal, MealMap, MealTypeId} from '@/types/game/meal/main';
import {CalculatedCookingConfig} from '@/types/userData/config/cooking/main';
import {combineWithRepetitionIterator} from '@/utils/compute/combination';
import {isNotNullish} from '@/utils/type';


type GenerateTargetMealsOpts = {
  mealType: MealTypeId | null,
  mealMap: MealMap,
  maxIngredientCount?: number,
};

export function* generateTargetMeals({
  mealType,
  mealMap,
  maxIngredientCount,
}: GenerateTargetMealsOpts): Generator<Meal[]> {
  let possibleMeals = Object.values(mealMap)
    .filter(isNotNullish)
    .filter(({type}) => mealType === null || mealType === type);

  if (!!maxIngredientCount) {
    possibleMeals = possibleMeals.filter(({ingredientCount}) => ingredientCount <= maxIngredientCount);
  }

  for (const targetMeals of combineWithRepetitionIterator(possibleMeals, 3)) {
    // Skip invalid combination that crosses different meal type
    if (new Set(targetMeals.map(({type}) => type)).size > 1) {
      continue;
    }

    yield targetMeals;
  }
}

type GenerateCalculatedCookingConfigFromAllTargetMealsOpts = GenerateTargetMealsOpts & {
  predefined: Omit<CalculatedCookingConfig, 'targetMeals'>,
};

export function* generateCalculatedCookingConfigFromAllTargetMeals({
  predefined,
  ...opts
}: GenerateCalculatedCookingConfigFromAllTargetMealsOpts): Generator<CalculatedCookingConfig> {
  for (const targetMeals of generateTargetMeals(opts)) {
    yield {
      ...predefined,
      targetMeals,
    };
  }
}
