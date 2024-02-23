import {PokemonInfo} from '@/types/game/pokemon';
import {PokemonProduction} from '@/types/game/producing/rate/main';
import {getAnalysisStatsOfContinuous} from '@/ui/analysis/page/calc/continuous';
import {PokemonAnalysisRateInfo} from '@/ui/analysis/page/calc/production/type';
import {isRateOfPokemonSame} from '@/ui/analysis/page/calc/production/utils';
import {getTotalStrengthOfPokemonProduction} from '@/utils/game/producing/reducer/total/strength';


type ToAnalysisTotalProducingStatsOpts = {
  pokemon: PokemonInfo,
  current: PokemonProduction,
  rateOfAllPokemon: PokemonAnalysisRateInfo[],
};

export const toAnalysisTotalProducingStats = ({
  pokemon,
  current,
  rateOfAllPokemon,
}: ToAnalysisTotalProducingStatsOpts) => {
  const currentDailyTotal = getTotalStrengthOfPokemonProduction(current);

  return getAnalysisStatsOfContinuous({
    samples: rateOfAllPokemon
      .map((rateOfPokemon) => ({
        ...rateOfPokemon,
        dailyTotal: getTotalStrengthOfPokemonProduction(rateOfPokemon.rate),
      })),
    getPokemonId: ({pokemon}) => pokemon.id,
    getValue: ({dailyTotal}) => dailyTotal,
    getLinkedData: ({dailyTotal}) => dailyTotal,
    isLinked: ({dailyTotal}) => dailyTotal > currentDailyTotal,
    isCurrentRank: (sample) => isRateOfPokemonSame(sample, {pokemon, rate: current}),
    currentValue: currentDailyTotal,
  });
};
