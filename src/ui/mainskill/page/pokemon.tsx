'use client';
import React from 'react';

import {Flex} from '@/components/layout/flex/common';
import {PokemonClickableIcons} from '@/components/shared/pokemon/icon/clickable/main';
import {PokemonInfo} from '@/types/game/pokemon';


type Props = {
  pokemonList: PokemonInfo[],
};

export const MainSkillAvailablePokemon = ({pokemonList}: Props) => {
  return (
    <Flex className="info-section">
      <PokemonClickableIcons pokemonList={pokemonList} dimension="size-16"/>
    </Flex>
  );
};
