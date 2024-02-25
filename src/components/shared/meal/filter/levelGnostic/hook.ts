import {useFilterInput} from '@/components/input/filter/hook';
import {UseMealInputFilterOpts} from '@/components/shared/meal/filter/common/type';
import {isMealIncludedFromMealInputFilterLevelAgnostic} from '@/components/shared/meal/filter/levelAgnostic/utils';
import {MealInputFilterLevelGnostic} from '@/components/shared/meal/filter/levelGnostic/type';
import {MealDetails, MealId} from '@/types/game/meal/main';
import {toMealDetailsList} from '@/utils/game/meal/details';


export const useMealInputFilterLevelGnostic = <TFilter extends MealInputFilterLevelGnostic>({
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
    data: (filter) => toMealDetailsList({
      meals,
      recipeLevel: filter.recipeLevel,
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
