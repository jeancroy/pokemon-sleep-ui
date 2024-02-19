import {
  PokemonItemStatsCalcResult,
  PokemonItemStatsCalcResultToDisplay,
} from '@/components/shared/pokemon/icon/itemStats/type';
import {PokemonProducingRate, ProducingRateByCalculatedStates} from '@/types/game/producing/rate';
import {isNotNullish} from '@/utils/type';


type ToSortedCalcResultOpts<TResult extends PokemonItemStatsCalcResult> = {
  producingStats: TResult[],
  getItemRate: (pokemonRate: PokemonProducingRate) => ProducingRateByCalculatedStates | undefined,
};

export const toSortedCalcResult = <TResult extends PokemonItemStatsCalcResult>({
  producingStats,
  getItemRate,
}: ToSortedCalcResultOpts<TResult>): PokemonItemStatsCalcResultToDisplay<TResult>[] => {
  return producingStats
    .map((stats) => {
      const itemRate = getItemRate(stats.pokemonRate);
      if (!itemRate) {
        return null;
      }

      return {...stats, itemRate};
    })
    .filter(isNotNullish)
    .sort((a, b) => (
      b.itemRate.strength.equivalent - a.itemRate.strength.equivalent
    ));
};
