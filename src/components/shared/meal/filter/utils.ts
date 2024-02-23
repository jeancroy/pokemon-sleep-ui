import {isFilterIncludingSome} from '@/components/input/filter/utils/match';
import {MealInputFilter} from '@/components/shared/meal/filter/type';
import {MealDetails} from '@/types/game/meal/main';


export const generateEmptyMealFilter = (): MealInputFilter => ({
  mealType: null,
  ingredientExclusion: {},
  ingredientInclusion: {},
  minBonusPercent: null,
  recipeLevel: 1,
  showStats: true,
});

type IsMealIncludedFromFilterOpts = {
  filter: MealInputFilter,
  mealDetails: MealDetails,
};

export const isMealIncludedFromFilter = ({
  filter,
  mealDetails,
}: IsMealIncludedFromFilterOpts) => {
  const {meal, strengthInfo} = mealDetails;

  const mealIngredientIds = meal.ingredients.map(({id}) => id);

  if (mealIngredientIds.some((id) => !!filter.ingredientExclusion[id])) {
    return false;
  }

  if (!isFilterIncludingSome({
    filter,
    filterKey: 'ingredientInclusion',
    ids: mealIngredientIds,
  })) {
    return false;
  }

  if (
    filter.minBonusPercent !== null &&
    strengthInfo.recipeBonusPercent < filter.minBonusPercent
  ) {
    return false;
  }

  return filter.mealType === null || filter.mealType === meal.type;
};
