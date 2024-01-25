import React from 'react';

import {clsx} from 'clsx';

import {PokemonImage} from '@/components/shared/pokemon/image/main';
import {UsePokemonLinkPopupReturn} from '@/components/shared/pokemon/linkPopup/type';
import {PokemonClickablePortrait} from '@/components/shared/pokemon/portrait/main';
import {PokemonInfo} from '@/types/game/pokemon';
import {Dimension} from '@/types/style';


type Props = UsePokemonLinkPopupReturn & {
  pokemon: PokemonInfo | undefined,
  clickable: boolean,
};

export const PokemonBranchPortrait = ({pokemon, clickable, showPokemon}: Props) => {
  const dimension: Dimension = 'size-52';

  if (!pokemon) {
    return null;
  }

  if (clickable) {
    return (
      <PokemonClickablePortrait
        key={pokemon.id}
        pokemon={pokemon.id}
        dimension={dimension}
        onClick={() => showPokemon(pokemon)}
      />
    );
  }

  return (
    <div className={clsx('relative shrink-0 rounded-lg border border-slate-500', dimension)}>
      <PokemonImage pokemonId={pokemon.id} image={{type: 'default', image: 'portrait'}} isShiny={false}/>
    </div>
  );
};
