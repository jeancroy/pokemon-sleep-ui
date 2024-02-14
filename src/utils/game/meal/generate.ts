import {Meal, MealMap, MealTypeId} from '@/types/game/meal/main';
import {CookingUserSettings} from '@/types/userData/settings/cooking';
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

type GenerateUserCookingSettingsFromAllTargetMealsOpts = GenerateTargetMealsOpts & {
  predefined: Omit<CookingUserSettings, 'targetMeals'>,
};

export function* generateUserCookingSettingsFromAllTargetMeals({
  predefined,
  ...opts
}: GenerateUserCookingSettingsFromAllTargetMealsOpts): Generator<CookingUserSettings> {
  for (const targetMeals of generateTargetMeals(opts)) {
    yield {
      ...predefined,
      targetMeals,
    };
  }
}
