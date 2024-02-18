import {defaultNeutralOpts} from '@/const/game/production/defaults';
import {PokemonInfo} from '@/types/game/pokemon';
import {PokemonProducingParamsMap} from '@/types/game/pokemon/producing';
import {PokemonProducingRate} from '@/types/game/producing/rate';
import {getAnalysisStatsOfContinuous} from '@/ui/analysis/page/calc/continuous';
import {PokemonAnalysisRateInfo} from '@/ui/analysis/page/calc/producingRate/type';
import {isRateOfPokemonSame} from '@/ui/analysis/page/calc/producingRate/utils';
import {getSkillTriggerValue} from '@/utils/game/mainSkill/utils';
import {getPokemonProducingParams} from '@/utils/game/producing/params';


export type ToAnalysisSkillTriggerProducingStatsOpts = {
  pokemonProducingParamsMap: PokemonProducingParamsMap,
  pokemon: PokemonInfo,
  current: PokemonProducingRate,
  rateOfAllPokemon: PokemonAnalysisRateInfo[],
};

export const toAnalysisSkillTriggerProducingStats = ({
  pokemonProducingParamsMap,
  pokemon,
  current,
  rateOfAllPokemon,
}: ToAnalysisSkillTriggerProducingStatsOpts) => {
  const pokemonProducingParams = getPokemonProducingParams({
    pokemonId: pokemon.id,
    pokemonProducingParamsMap,
  });

  const currentSkillTriggerValue = getSkillTriggerValue({
    ...defaultNeutralOpts,
    rate: current,
    skillValue: pokemonProducingParams.skillValue,
  });

  return getAnalysisStatsOfContinuous({
    samples: rateOfAllPokemon
      .filter((rateOfPokemon) => rateOfPokemon.pokemon.skill === pokemon.skill)
      .map((rateOfPokemon) => ({
        ...rateOfPokemon,
        skillTriggerValue: getSkillTriggerValue({
          ...defaultNeutralOpts,
          rate: rateOfPokemon.rate,
          skillValue: getPokemonProducingParams({
            pokemonId: rateOfPokemon.pokemon.id,
            pokemonProducingParamsMap,
          }).skillValue,
        }),
      })),
    getPokemonId: ({pokemon}) => pokemon.id,
    getValue: ({skillTriggerValue}) => skillTriggerValue,
    getLinkedData: ({skillTriggerValue}) => skillTriggerValue,
    isLinked: ({skillTriggerValue}) => skillTriggerValue >= currentSkillTriggerValue,
    isCurrentRank: (sample) => isRateOfPokemonSame(sample, {pokemon, rate: current}),
    currentValue: currentSkillTriggerValue,
  });
};
