import React from 'react';

import FunnelIcon from '@heroicons/react/24/outline/FunnelIcon';

import {FilterWithUpdaterProps} from '@/components/input/filter/type';
import {Collapsible} from '@/components/layout/collapsible/main';
import {CollapsibleControl} from '@/components/layout/collapsible/type';
import {Flex} from '@/components/layout/flex/common';
import {GenericPokeballIcon} from '@/components/shared/icon/pokeball';
import {PokemonFilter} from '@/components/shared/pokemon/filter/main';
import {PokemonInputFilter} from '@/components/shared/pokemon/filter/type';
import {PokemonInfo} from '@/types/game/pokemon';


type Props = FilterWithUpdaterProps<PokemonInputFilter> & {
  collapsibleState: CollapsibleControl,
  pokemonList: PokemonInfo[],
};

export const PokemonCollapsibleFilter = ({collapsibleState, ...props}: Props) => {
  return (
    <Collapsible control={collapsibleState} classNameForHeight="h-72" button={
      <Flex direction="row" center className="gap-0.5">
        <GenericPokeballIcon alt="Pokemon" dimension="size-6"/>
        <FunnelIcon className="size-6"/>
      </Flex>
    }>
      <PokemonFilter className="pr-1" {...props}/>
    </Collapsible>
  );
};
