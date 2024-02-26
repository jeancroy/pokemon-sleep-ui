import {isFilterIncludingSome} from '@/components/input/filter/utils/match';
import {MealInputFilterLevelAgnostic} from '@/components/shared/meal/filter/levelAgnostic/type';
import {MealDetails} from '@/types/game/meal/main';
import {CookingConfig} from '@/types/userData/config/cooking/main';


export const generateEmptyMealFilterLevelAgnostic = (
  cookingConfig: CookingConfig,
): MealInputFilterLevelAgnostic => ({
  mealType: cookingConfig.mealType ?? null,
  ingredientExclusion: {},
  ingredientInclusion: {},
  minBonusPercent: null,
  showStats: true,
});

type IsMealIncludedFromFilterOpts = {
  filter: MealInputFilterLevelAgnostic,
  mealDetails: MealDetails,
};

export const isMealIncludedFromMealInputFilterLevelAgnostic = ({
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
