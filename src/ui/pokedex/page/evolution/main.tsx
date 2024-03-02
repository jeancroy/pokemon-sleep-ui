import React from 'react';

import ArrowDownIcon from '@heroicons/react/24/outline/ArrowDownIcon';
import ArrowRightIcon from '@heroicons/react/24/outline/ArrowRightIcon';
import ChevronDoubleUpIcon from '@heroicons/react/24/solid/ChevronDoubleUpIcon';

import {PokemonImage} from '@/components/shared/pokemon/image/main';
import {UsePokemonLinkPopupReturn} from '@/components/shared/pokemon/linkPopup/type';
import {useCommonServerData} from '@/contexts/data/common/hook';
import {PokemonEvolutionNextStage} from '@/ui/pokedex/page/evolution/next';
import {PokemonEvolutionPortrait} from '@/ui/pokedex/page/evolution/portrait';
import {PokemonTitledLayout} from '@/ui/pokedex/page/layout/titled';
import {PokemonDataProps} from '@/ui/pokedex/page/type';


export const PokemonEvolution = ({pokemon, showPokemon}: PokemonDataProps & UsePokemonLinkPopupReturn) => {
  const {pokedexMap} = useCommonServerData();

  const {evolution} = pokemon;

  return (
    <PokemonTitledLayout title={<ChevronDoubleUpIcon className="size-6"/>} className="!gap-5 lg:flex-row">
      <PokemonEvolutionPortrait
        dimension="size-40"
        pokemon={evolution.previous ? pokedexMap[evolution.previous] : undefined}
        showPokemon={showPokemon}
      />
      <div className="size-7 shrink-0">
        <ArrowDownIcon className="block lg:hidden"/>
        <ArrowRightIcon className="hidden lg:block"/>
      </div>
      <div className="relative size-52 shrink-0">
        <PokemonImage pokemonId={pokemon.id} image={{type: 'default', image: 'portrait'}} isShiny={false}/>
      </div>
      {
        !!evolution.next.length &&
        <>
          <div className="size-7 shrink-0">
            <ArrowDownIcon className="block lg:hidden"/>
            <ArrowRightIcon className="hidden lg:block"/>
          </div>
          <PokemonEvolutionNextStage pokedexMap={pokedexMap} evolutions={evolution.next} showPokemon={showPokemon}/>
        </>
      }
    </PokemonTitledLayout>
  );
};
