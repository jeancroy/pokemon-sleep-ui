import React from 'react';

import ArrowDownIcon from '@heroicons/react/24/outline/ArrowDownIcon';
import ArrowRightIcon from '@heroicons/react/24/outline/ArrowRightIcon';
import ChevronDoubleUpIcon from '@heroicons/react/24/solid/ChevronDoubleUpIcon';

import {PokemonImage} from '@/components/shared/pokemon/image/main';
import {UsePokemonLinkPopupReturn} from '@/components/shared/pokemon/linkPopup/type';
import {PokemonEvolutionNextStage} from '@/ui/pokedex/page/evolution/next';
import {PokemonEvolutionPortrait} from '@/ui/pokedex/page/evolution/portrait';
import {PokemonTitledLayout} from '@/ui/pokedex/page/layout/titled';
import {PokemonDataProps} from '@/ui/pokedex/page/type';


export const PokemonEvolution = ({pokedex, pokemon, showPokemon}: PokemonDataProps & UsePokemonLinkPopupReturn) => {
  const {evolution} = pokemon;

  return (
    <PokemonTitledLayout title={<ChevronDoubleUpIcon className="h-6 w-6"/>} className="!gap-5 lg:flex-row">
      <PokemonEvolutionPortrait
        dimension="h-40 w-40"
        pokemon={evolution.previous ? pokedex[evolution.previous] : undefined}
        showPokemon={showPokemon}
      />
      <div className="h-7 w-7 shrink-0">
        <ArrowDownIcon className="block lg:hidden"/>
        <ArrowRightIcon className="hidden lg:block"/>
      </div>
      <div className="relative h-52 w-52 shrink-0">
        <PokemonImage pokemonId={pokemon.id} image={{type: 'default', image: 'portrait'}} isShiny={false}/>
      </div>
      {
        !!evolution.next.length &&
        <>
          <div className="h-7 w-7 shrink-0">
            <ArrowDownIcon className="block lg:hidden"/>
            <ArrowRightIcon className="hidden lg:block"/>
          </div>
          <PokemonEvolutionNextStage pokedex={pokedex} evolutions={evolution.next} showPokemon={showPokemon}/>
        </>
      }
    </PokemonTitledLayout>
  );
};
