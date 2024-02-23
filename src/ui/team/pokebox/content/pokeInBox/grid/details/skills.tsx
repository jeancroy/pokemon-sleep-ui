import React from 'react';

import {LoadingText} from '@/components/icons/loading';
import {Flex} from '@/components/layout/flex/common';
import {PokemonNoSkillProbability} from '@/components/shared/pokemon/production/noSkill/main';
import {PokemonSkillProduction} from '@/components/shared/pokemon/production/skill';
import {PokeInBoxGridDetailsProps} from '@/ui/team/pokebox/content/pokeInBox/grid/details/type';
import {useCalculatePokeInBoxProduction} from '@/ui/team/pokebox/content/pokeInBox/worker/production/hook';
import {toProductionOfState} from '@/utils/game/producing/convert';


export const PokeInBoxGridSkills = (props: PokeInBoxGridDetailsProps) => {
  const {pokemon} = props;
  const {skill} = pokemon;

  const {loading, rate} = useCalculatePokeInBoxProduction(props);

  if (loading || !rate) {
    return <LoadingText dimension="size-4"/>;
  }

  return (
    <Flex direction="row" noFullWidth className="gap-3">
      <PokemonSkillProduction
        id={skill}
        rate={toProductionOfState({rate: rate.skill, state: 'equivalent'})}
        hideStrength
        normalSize
      />
      <Flex className="text-sm">
        <PokemonNoSkillProbability noSkillTriggerPercent={rate.noSkillTriggerPercent} sleepSession="primary"/>
        <PokemonNoSkillProbability noSkillTriggerPercent={rate.noSkillTriggerPercent} sleepSession="secondary"/>
      </Flex>
    </Flex>
  );
};
