import React from 'react';

import {clsx} from 'clsx';

import {Flex} from '@/components/layout/flex/common';
import {PokemonBerryIcon} from '@/components/shared/pokemon/berry/icon';
import {PokemonIngredientRate} from '@/components/shared/pokemon/production/params/ingredient';
import {PokemonMainSkillTriggerRate} from '@/components/shared/pokemon/production/params/skillRate';
import {PokemonSleepTypeIcon} from '@/components/shared/pokemon/sleepType/icon';
import {specialtyIdMap} from '@/const/game/pokemon';
import {useCommonServerData} from '@/contexts/data/common/hook';
import {PokeInBoxGridDetailsProps} from '@/ui/team/pokebox/content/pokeInBox/grid/details/type';
import {getPokemonProducingParams} from '@/utils/game/producing/params';


export const PokeInBoxGridPokemon = ({pokemon}: PokeInBoxGridDetailsProps) => {
  const {id, specialty, sleepType, berry} = pokemon;

  const {pokemonProducingParamsMap} = useCommonServerData();

  const pokemonProducingParams = getPokemonProducingParams({
    pokemonId: id,
    pokemonProducingParamsMap,
  });

  return (
    <Flex direction="row" noFullWidth className="items-center gap-1">
      <Flex noFullWidth center className="gap-1.5">
        <PokemonSleepTypeIcon sleepType={sleepType} dimension="size-5" className="invert-hoverable-dark"/>
        <Flex direction="row" noFullWidth className={clsx(
          'items-center gap-1 px-1.5',
          specialty === specialtyIdMap.berry && 'info-highlight',
        )}>
          <PokemonBerryIcon id={berry.id}/>
          <div>{berry.quantity}</div>
        </Flex>
      </Flex>
      <Flex noFullWidth className="gap-1 text-sm">
        <PokemonIngredientRate params={pokemonProducingParams} dimension="size-6"/>
        <PokemonMainSkillTriggerRate params={pokemonProducingParams} dimension="size-6"/>
      </Flex>
    </Flex>
  );
};
