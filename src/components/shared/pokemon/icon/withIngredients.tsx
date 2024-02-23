import React from 'react';

import {IngredientIcons} from '@/components/shared/ingredient/icons/main';
import {PokemonImage} from '@/components/shared/pokemon/image/main';
import {PokemonId} from '@/types/game/pokemon';
import {IngredientProduction} from '@/types/game/pokemon/ingredient';


type Props = {
  pokemon: PokemonId,
  ingredients: IngredientProduction[],
};

export const PokemonIconWithIngredients = ({pokemon, ingredients}: Props) => {
  return (
    <div className="relative size-12">
      <PokemonImage
        pokemonId={pokemon}
        image={{type: 'default', image: 'icon'}}
        isShiny={false}
        className="rounded-lg"
      />
      <IngredientIcons
        ingredients={[ingredients]}
        dimension="size-3.5"
        className="absolute bottom-0 w-full justify-center rounded-lg bg-slate-300/50 dark:bg-slate-700/50"
        noQuantity
        noLink
      />
    </div>
  );
};
