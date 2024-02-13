import {ToSortedMealContentCoverageItemDataOpts} from '@/ui/meal/page/content/coverage/calc/type';
import {MealContentCoverageItemData} from '@/ui/meal/page/content/coverage/type';
import {getMealCoverage} from '@/utils/game/cooking';
import {toIngredientProductionCounterFromPokemonRate} from '@/utils/game/producing/ingredient/utils';


export const toSortedMealContentCoverageItemData = ({
  meal,
  itemStats,
}: ToSortedMealContentCoverageItemDataOpts) => {
  return itemStats
    .map((calcResult): MealContentCoverageItemData => {
      const {pokemonRate} = calcResult;

      return {
        calcResult,
        coverage: getMealCoverage({
          meals: [meal, meal, meal],
          ingredientProduction: toIngredientProductionCounterFromPokemonRate({pokemonRate, state: 'equivalent'}),
          period: 'daily',
        }),
      };
    })
    .filter(({coverage}) => coverage.total > 0)
    .sort((a, b) => b.coverage.total - a.coverage.total);
};
