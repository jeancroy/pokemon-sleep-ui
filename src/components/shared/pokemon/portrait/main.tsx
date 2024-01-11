import React from 'react';

import {clsx} from 'clsx';

import {PokemonImage} from '@/components/shared/pokemon/image/main';
import {PokemonId} from '@/types/game/pokemon';
import {Dimension} from '@/types/style';


type Props = {
  pokemon: PokemonId,
  dimension: Dimension,
  onClick: () => void,
};

export const PokemonClickablePortrait = ({pokemon, dimension, onClick}: Props) => {
  return (
    <button className="button-clickable-bg" onClick={onClick}>
      <div className={clsx('relative shrink-0', dimension)}>
        <PokemonImage pokemonId={pokemon} image={{type: 'default', image: 'portrait'}} isShiny={false}/>
      </div>
    </button>
  );
};
