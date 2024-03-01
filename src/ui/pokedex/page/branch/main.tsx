import React from 'react';

import ArrowDownIcon from '@heroicons/react/24/outline/ArrowDownIcon';
import ArrowRightIcon from '@heroicons/react/24/outline/ArrowRightIcon';
import ShareIcon from '@heroicons/react/24/outline/ShareIcon';

import {UsePokemonLinkPopupReturn} from '@/components/shared/pokemon/linkPopup/type';
import {PokemonBranchPortrait} from '@/ui/pokedex/page/branch/portrait';
import {PokemonTitledLayout} from '@/ui/pokedex/page/layout/titled';
import {PokemonDataProps} from '@/ui/pokedex/page/type';
import {isNotNullish} from '@/utils/type';


type Props = PokemonDataProps & UsePokemonLinkPopupReturn;

export const PokemonBranches = ({pokemon, pokemonBranch, pokedexMap, ...props}: Props) => {
  if (!pokemonBranch) {
    return null;
  }

  const {pokemonId, branches} = pokemonBranch;

  return (
    <PokemonTitledLayout title={<ShareIcon className="size-6"/>} className="!gap-5 lg:flex-row">
      <PokemonBranchPortrait
        pokemon={pokedexMap[pokemonId]}
        clickable={pokemonId !== pokemon.id}
        {...props}
      />
      <div className="size-7 shrink-0">
        <ArrowDownIcon className="block lg:hidden"/>
        <ArrowRightIcon className="hidden lg:block"/>
      </div>
      {branches.map((pokemonId) => pokedexMap[pokemonId]).filter(isNotNullish).map((branch) => (
        <PokemonBranchPortrait
          key={branch.id}
          pokemon={branch}
          clickable={pokemon.id !== branch.id}
          {...props}
        />
      ))}
    </PokemonTitledLayout>
  );
};
