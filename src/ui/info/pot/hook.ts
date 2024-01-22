import {useFilterInput} from '@/components/input/filter/hook';
import {isFilterMismatchOnSingle} from '@/components/input/filter/utils/match';
import {Meal, MealId} from '@/types/game/meal/main';
import {PotInfoDataProps, PotInfoFilter} from '@/ui/info/pot/type';
import {isNotNullish} from '@/utils/type';


export const usePotInfoFilter = ({mealMap, preloaded}: PotInfoDataProps) => {
  const {cooking} = preloaded;

  return useFilterInput<PotInfoFilter, Meal, MealId>({
    data: Object.values(mealMap).filter(isNotNullish),
    dataToId: ({id}) => id,
    initialFilter: {
      mealType: {},
      mealLevel: 1,
      ingredients: {},
      capacity: cooking?.potCapacity ?? null,
      showEmpty: false,
      showEnergy: cooking?.showEnergy ?? true,
    },
    isDataIncluded: (filter, meal) => {
      return !isFilterMismatchOnSingle({filter, filterKey: 'mealType', id: meal.type});
    },
  });
};
