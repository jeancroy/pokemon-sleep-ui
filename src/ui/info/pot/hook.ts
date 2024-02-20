import {useFilterInput} from '@/components/input/filter/hook';
import {Meal, MealId} from '@/types/game/meal/main';
import {PotInfoDataProps, PotInfoFilter} from '@/ui/info/pot/type';
import {isNotNullish} from '@/utils/type';


export const usePotInfoFilter = ({mealMap, preloaded}: PotInfoDataProps) => {
  const {cookingConfig} = preloaded;

  return useFilterInput<PotInfoFilter, Meal, MealId>({
    data: Object.values(mealMap).filter(isNotNullish),
    dataToId: ({id}) => id,
    initialFilter: {
      mealType: null,
      mealLevel: 1,
      ingredients: {},
      capacity: cookingConfig?.potCapacity ?? null,
      showEmpty: false,
      showEnergy: cookingConfig?.showEnergy ?? true,
    },
    isDataIncluded: (filter, meal) => {
      return filter.mealType === null || filter.mealType === meal.type;
    },
  });
};
