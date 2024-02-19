import {Meal, MealMap, MealTypeId} from '@/types/game/meal/main';
import {CalculatedCookingSettings} from '@/types/userData/settings/cooking';
import {combineWithRepetitionIterator} from '@/utils/compute/combination';
import {isNotNullish} from '@/utils/type';


type GenerateTargetMealsOpts = {
  mealType: MealTypeId,
  mealMap: MealMap,
  maxIngredientCount?: number,
};

export const generateTargetMeals = ({
  mealType,
  mealMap,
  maxIngredientCount,
}: GenerateTargetMealsOpts): Generator<Meal[]> => {
  let possibleMeals = Object.values(mealMap)
    .filter(isNotNullish)
    .filter(({type}) => type === mealType);

  if (!!maxIngredientCount) {
    possibleMeals = possibleMeals.filter(({ingredientCount}) => ingredientCount <= maxIngredientCount);
  }

  return combineWithRepetitionIterator(possibleMeals, 3);
};

type GenerateCalculatedCookingSettingsFromAllTargetMealsOpts = GenerateTargetMealsOpts & {
  predefined: Omit<CalculatedCookingSettings, 'targetMeals'>,
};

export function* generateCalculatedCookingSettingsFromAllTargetMeals({
  predefined,
  ...opts
}: GenerateCalculatedCookingSettingsFromAllTargetMealsOpts): Generator<CalculatedCookingSettings> {
  for (const targetMeals of generateTargetMeals(opts)) {
    yield {
      ...predefined,
      targetMeals,
    };
  }
}
