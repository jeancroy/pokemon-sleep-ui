import {PokemonInfo} from '@/types/game/pokemon';
import {PokemonProducingRate} from '@/types/game/producing/rate/main';
import {getAnalysisStatsOfContinuous} from '@/ui/analysis/page/calc/continuous';
import {PokemonAnalysisRateInfo} from '@/ui/analysis/page/calc/producingRate/type';
import {isRateOfPokemonSame} from '@/ui/analysis/page/calc/producingRate/utils';
import {getTotalStrengthOfPokemonProducingRate} from '@/utils/game/producing/reducer/total/strength';


type ToAnalysisTotalProducingStatsOpts = {
  pokemon: PokemonInfo,
  current: PokemonProducingRate,
  rateOfAllPokemon: PokemonAnalysisRateInfo[],
};

export const toAnalysisTotalProducingStats = ({
  pokemon,
  current,
  rateOfAllPokemon,
}: ToAnalysisTotalProducingStatsOpts) => {
  const currentDailyTotal = getTotalStrengthOfPokemonProducingRate(current);

  return getAnalysisStatsOfContinuous({
    samples: rateOfAllPokemon
      .map((rateOfPokemon) => ({
        ...rateOfPokemon,
        dailyTotal: getTotalStrengthOfPokemonProducingRate(rateOfPokemon.rate),
      })),
    getPokemonId: ({pokemon}) => pokemon.id,
    getValue: ({dailyTotal}) => dailyTotal,
    getLinkedData: ({dailyTotal}) => dailyTotal,
    isLinked: ({dailyTotal}) => dailyTotal > currentDailyTotal,
    isCurrentRank: (sample) => isRateOfPokemonSame(sample, {pokemon, rate: current}),
    currentValue: currentDailyTotal,
  });
};
