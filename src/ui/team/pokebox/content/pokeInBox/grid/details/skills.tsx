import React from 'react';

import {Flex} from '@/components/layout/flex/common';
import {PokemonProbabilityOfNoSkill} from '@/components/shared/pokemon/production/noSkill';
import {PokemonSkillProduction} from '@/components/shared/pokemon/production/skill';
import {PokeInBoxGridDetailsProps} from '@/ui/team/pokebox/content/pokeInBox/grid/details/type';
import {getRateOfPokemon} from '@/ui/team/pokebox/content/pokeInBox/utils';
import {toProducingRateOfState} from '@/utils/game/producing/convert';


export const PokeInBoxGridSkills = (props: PokeInBoxGridDetailsProps) => {
  const {
    pokemon,
    pokemonProducingParams,
  } = props;
  const {skill} = pokemon;

  const rateOfPokemon = getRateOfPokemon(props);

  return (
    <Flex direction="row" noFullWidth className="gap-3">
      <PokemonSkillProduction
        id={skill}
        rate={toProducingRateOfState({rate: rateOfPokemon.skill, state: 'equivalent'})}
        hideStrength
        normalSize
      />
      <Flex className="text-sm">
        <PokemonProbabilityOfNoSkill
          rate={rateOfPokemon}
          state="sleep1Vacant"
          skillPercent={pokemonProducingParams.skillPercent}
        />
        <PokemonProbabilityOfNoSkill
          rate={rateOfPokemon}
          state="sleep2Vacant"
          skillPercent={pokemonProducingParams.skillPercent}
        />
      </Flex>
    </Flex>
  );
};
