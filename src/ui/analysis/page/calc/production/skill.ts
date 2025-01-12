import {PokemonInfo} from '@/types/game/pokemon';
import {PokemonProduction} from '@/types/game/producing/rate/main';
import {getAnalysisStatsOfContinuous} from '@/ui/analysis/page/calc/continuous';
import {PokemonAnalysisRateInfo} from '@/ui/analysis/page/calc/production/type';
import {isRateOfPokemonSame} from '@/ui/analysis/page/calc/production/utils';


export type ToAnalysisSkillTriggerProducingStatsOpts = {
  pokemon: PokemonInfo,
  current: PokemonProduction,
  rateOfAllPokemon: PokemonAnalysisRateInfo[],
};

export const toAnalysisSkillTriggerCountProducingStats = ({
  pokemon,
  current,
  rateOfAllPokemon,
}: ToAnalysisSkillTriggerProducingStatsOpts) => {
  const currentSkillTriggerCount = current.skill.qty.equivalent;

  return getAnalysisStatsOfContinuous({
    samples: rateOfAllPokemon
      .filter((rateOfPokemon) => rateOfPokemon.pokemon.skill === pokemon.skill)
      .map((rateOfPokemon) => ({
        ...rateOfPokemon,
        skillTriggerCount: rateOfPokemon.rate.skill.qty.equivalent,
      })),
    getPokemonId: ({pokemon}) => pokemon.id,
    getValue: ({skillTriggerCount}) => skillTriggerCount,
    getLinkedData: ({skillTriggerCount}) => skillTriggerCount,
    isLinked: ({skillTriggerCount}) => skillTriggerCount >= currentSkillTriggerCount,
    isCurrentRank: (sample) => isRateOfPokemonSame(sample, {pokemon, rate: current}),
    currentValue: currentSkillTriggerCount,
  });
};
