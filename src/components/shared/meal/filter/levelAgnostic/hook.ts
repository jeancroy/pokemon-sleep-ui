import {useFilterInput} from '@/components/input/filter/hook';
import {UseMealInputFilterOpts} from '@/components/shared/meal/filter/common/type';
import {
  MealInputFilterLevelAgnostic,
} from '@/components/shared/meal/filter/levelAgnostic/type';
import {isMealIncludedFromMealInputFilterLevelAgnostic} from '@/components/shared/meal/filter/levelAgnostic/utils';
import {MealDetails, MealId} from '@/types/game/meal/main';
import {toMealDetailsList} from '@/utils/game/meal/details';


export const useMealInputFilterLevelAgnostic = <TFilter extends MealInputFilterLevelAgnostic>({
  ingredientMap,
  meals,
  recipeLevelData,
  calculatedConfigBundle,
  initialFilter,
}: UseMealInputFilterOpts<TFilter>) => {
  const {
    mapMultiplier,
    strengthMultiplier,
  } = calculatedConfigBundle.calculatedUserConfig.bonus;

  return useFilterInput<TFilter, MealDetails, MealId>({
    data: () => toMealDetailsList({
      meals,
      recipeLevel: 1,
      ingredientMap,
      recipeLevelData,
      mapMultiplier,
      strengthMultiplier: strengthMultiplier.cooking,
    }),
    dataToId: ({meal}) => meal.id,
    dataDeps: [ingredientMap, meals, recipeLevelData, calculatedConfigBundle],
    initialFilter,
    isDataIncluded: (filter, mealDetails) => (
      isMealIncludedFromMealInputFilterLevelAgnostic({filter, mealDetails})
    ),
  });
};
