import {useFilterInput} from '@/components/input/filter/hook';
import {isFilterIncludingSome} from '@/components/input/filter/utils/match';
import {Meal, MealId} from '@/types/game/meal/main';
import {UserPreloadedData} from '@/types/userData/main';
import {MealFilter} from '@/ui/meal/index/type';
import {getMealIngredientCount} from '@/utils/game/meal/count';
import {migrate} from '@/utils/migrate/main';
import {mealFilterMigrators} from '@/utils/migrate/mealFilter/migrators';


type UseMealFilterOpts = {
  data: Meal[],
  preloaded: UserPreloadedData['cookingConfig'],
};

export const useMealFilter = ({data, preloaded}: UseMealFilterOpts) => {
  return useFilterInput<MealFilter, Meal, MealId>({
    data,
    dataToId: ({id}) => id,
    initialFilter: migrate({
      original: {
        mealType: null,
        mealLevel: 1,
        ingredient: {},
        potCapacity: null,
        showEnergy: true,
        // FIXME: Might not need migration
        version: mealFilterMigrators.length,
      },
      override: {
        mealType: preloaded?.mealType ?? null,
        ingredient: preloaded?.ingredients,
        potCapacity: preloaded?.potCapacity,
        showEnergy: preloaded?.showEnergy,
      },
      migrators: mealFilterMigrators,
      migrateParams: {},
    }),
    isDataIncluded: (filter, meal) => {
      if (!isFilterIncludingSome({filter, filterKey: 'ingredient', ids: meal.ingredients.map(({id}) => id)})) {
        return false;
      }

      if (filter.potCapacity !== null && getMealIngredientCount(meal) > filter.potCapacity) {
        return false;
      }

      return filter.mealType === null || filter.mealType === meal.type;
    },
  });
};
