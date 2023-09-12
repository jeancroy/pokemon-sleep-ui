import {useFilterInput} from '@/components/input/filter/hook';
import {isFilterIncludingSome, isFilterMismatchOnSingle} from '@/components/input/filter/utils/check';
import {Meal, MealId} from '@/types/game/meal';
import {UserPreloadedData} from '@/types/userData/main';
import {MealFilter} from '@/ui/meal/index/type';
import {getMealRequiredQuantity} from '@/utils/game/meal';
import {migrate} from '@/utils/migrate/main';
import {mealFilterMigrators} from '@/utils/migrate/mealFilter/migrators';


type UseFilteredMealsOpts = {
  data: Meal[],
  preloaded: UserPreloadedData['cooking'],
};

export const useFilteredMeals = ({data, preloaded}: UseFilteredMealsOpts) => {
  return useFilterInput<MealFilter, Meal, MealId>({
    data,
    dataToId: ({id}) => id,
    initialFilter: migrate({
      original: {
        mealType: {},
        mealLevel: 1,
        ingredient: {},
        potCapacity: null,
        showEnergy: true,
        version: 1,
      },
      override: {
        mealType: preloaded?.mealType ? {[preloaded.mealType]: true} : {},
        ingredient: preloaded?.ingredients,
        potCapacity: preloaded?.potCapacity,
        showEnergy: preloaded?.showEnergy,
      },
      migrators: mealFilterMigrators,
      migrateParams: {},
    }),
    isDataIncluded: (filter, data) => {
      if (!isFilterIncludingSome({filter, filterKey: 'ingredient', ids: data.ingredients.map(({id}) => id)})) {
        return false;
      }

      if (filter.potCapacity !== null && getMealRequiredQuantity(data) > filter.potCapacity) {
        return false;
      }

      return !isFilterMismatchOnSingle({filter, filterKey: 'mealType', id: data.type});
    },
  });
};
