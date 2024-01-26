import React from 'react';

import {Flex} from '@/components/layout/flex/common';
import {PokemonBerryIcon} from '@/components/shared/pokemon/berry/icon';
import {PokemonInfo} from '@/types/game/pokemon';


type Props = {
  pokemon: PokemonInfo,
  berryName: string,
};

export const PokemonBerryProduction = ({pokemon, berryName}: Props) => {
  const {berry} = pokemon;

  return (
    <Flex center className="gap-1">
      <Flex direction="row" center className="gap-1">
        <PokemonBerryIcon id={berry.id} dimension="size-10"/>
        <div className="whitespace-nowrap text-lg">
          {berryName} &times; {berry.quantity}
        </div>
      </Flex>
    </Flex>
  );
};
