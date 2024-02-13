import {PokemonItemStatsCalcResult} from '@/components/shared/pokemon/icon/itemStats/type';
import {Meal} from '@/types/game/meal/main';


export type ToSortedMealContentCoverageItemDataOpts = {
  meal: Meal,
  itemStats: PokemonItemStatsCalcResult[],
};
