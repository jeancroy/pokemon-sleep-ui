import {useFilterInput} from '@/components/input/filter/hook';
import {isFilterIncludingAllOfData} from '@/components/input/filter/utils/match';
import {defaultUserCookingSettings} from '@/const/user/cooking';
import {Meal, MealId} from '@/types/game/meal/main';
import {CookingServerDataProps} from '@/ui/cooking/common/type';
import {generateCookingCommonFilter} from '@/ui/cooking/common/utils/main';
import {MealMakerFilter} from '@/ui/cooking/make/type';
import {getMealIngredientCount} from '@/utils/game/meal/count';
import {isNotNullish} from '@/utils/type';


export const useMealMakerFilter = ({mealMap, preloaded}: CookingServerDataProps) => {
  const preloadedCooking = preloaded.cooking;

  return useFilterInput<MealMakerFilter, Meal, MealId>({
    data: Object.values(mealMap).filter(isNotNullish),
    dataToId: ({id}) => id,
    initialFilter: {
      ...generateCookingCommonFilter(preloadedCooking),
      type: preloadedCooking?.mealType ?? defaultUserCookingSettings.mealType,
      capacity: preloadedCooking?.potCapacity ?? defaultUserCookingSettings.potCapacity,
      ingredient: {},
      showUnmakeableRecipe: preloadedCooking?.showUnmakeableRecipe ?? defaultUserCookingSettings.showUnmakeableRecipe,
    },
    isDataIncluded: (filter, meal) => {
      if (filter.type !== meal.type) {
        return false;
      }

      if (!isFilterIncludingAllOfData({
        filter,
        filterKey: 'ingredient',
        ids: meal.ingredients.map(({id}) => id),
      })) {
        return false;
      }

      return getMealIngredientCount(meal) <= filter.capacity;
    },
  });
};
