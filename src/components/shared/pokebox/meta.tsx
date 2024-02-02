import React from 'react';

import {clsx} from 'clsx';

import {PokemonName} from '@/components/shared/pokemon/name/main';
import {pokeInBoxFavoriteStyle} from '@/styles/game/pokebox';
import {PokemonInfo} from '@/types/game/pokemon';
import {PokeInBox} from '@/types/userData/pokebox/main';


type Props = {
  pokeInBox: PokeInBox,
  pokemon: PokemonInfo,
};

export const PokeInBoxMeta = ({pokemon, pokeInBox}: Props) => {
  const {isFavorite} = pokeInBox;

  return (
    <PokemonName
      size="base"
      pokemon={pokemon}
      override={pokeInBox.name}
      className={clsx('w-fit', isFavorite && pokeInBoxFavoriteStyle)}
    />
  );
};
