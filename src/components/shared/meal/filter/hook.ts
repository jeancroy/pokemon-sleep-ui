import {useFilterInput} from '@/components/input/filter/hook';
import {MealInputFilter} from '@/components/shared/meal/filter/type';
import {isMealIncludedFromFilter} from '@/components/shared/meal/filter/utils';
import {IngredientMap} from '@/types/game/ingredient';
import {Meal, MealDetails, MealId} from '@/types/game/meal/main';
import {RecipeLevelData} from '@/types/game/meal/recipeLevel';
import {CalculatedConfigBundle} from '@/types/userData/config/bundle';
import {toMealDetailsList} from '@/utils/game/meal/details';


type UseMealInputFilterOpts<TFilter extends MealInputFilter> = {
  ingredientMap: IngredientMap,
  recipeLevelData: RecipeLevelData[],
  meals: Meal[],
  calculatedConfigBundle: CalculatedConfigBundle,
  initialFilter: TFilter,
};

export const useMealInputFilter = <TFilter extends MealInputFilter>({
  ingredientMap,
  recipeLevelData,
  meals,
  calculatedConfigBundle,
  initialFilter,
}: UseMealInputFilterOpts<TFilter>) => {
  const {
    mapMultiplier,
    strengthMultiplier,
  } = calculatedConfigBundle.calculatedUserConfig.bonus;

  return useFilterInput<TFilter, MealDetails, MealId>({
    data: (filter) => toMealDetailsList({
      meals,
      recipeLevel: filter.recipeLevel,
      ingredientMap,
      recipeLevelData,
      mapMultiplier,
      strengthMultiplier: strengthMultiplier.cooking,
    }),
    dataToId: ({meal}) => meal.id,
    dataDeps: [ingredientMap, meals, calculatedConfigBundle],
    initialFilter,
    isDataIncluded: (filter, mealDetails) => (
      isMealIncludedFromFilter({filter, mealDetails})
    ),
  });
};
