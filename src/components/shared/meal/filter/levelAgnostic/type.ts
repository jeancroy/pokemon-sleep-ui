import {FilterInclusionMap, FilterWithUpdaterProps} from '@/components/input/filter/type';
import {IngredientId, IngredientMap} from '@/types/game/ingredient';
import {Meal, MealTypeId} from '@/types/game/meal/main';


export type MealInputFilterLevelAgnostic = {
  mealType: MealTypeId | null,
  ingredientExclusion: FilterInclusionMap<IngredientId>,
  ingredientInclusion: FilterInclusionMap<IngredientId>,
  minBonusPercent: number | null,
  showStats: boolean,
};

export type MealFilterAgnosticRequiredData = {
  meals: Meal[],
  ingredientMap: IngredientMap,
};

export type MealFilterAgnosticCommonProps<TFilter> = FilterWithUpdaterProps<TFilter> & {
  meals: Meal[],
  ingredientMap: IngredientMap,
};
