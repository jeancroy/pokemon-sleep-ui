'use client';
import React from 'react';

import {PokemonClickableIcons} from '@/components/shared/pokemon/icon/clickable/main';
import {PokemonInfo} from '@/types/game/pokemon';


type Props = {
  pokemonList: PokemonInfo[],
};

export const EvolutionIconPokemon = ({pokemonList}: Props) => {
  return (
    <PokemonClickableIcons pokemonList={pokemonList} dimension="size-16"/>
  );
};
