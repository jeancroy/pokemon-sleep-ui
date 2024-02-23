import React from 'react';

import {Flex} from '@/components/layout/flex/common';
import {PokemonFrequencyFromProduction} from '@/components/shared/pokemon/frequency/fromRate';
import {PokeInBoxTableDetailsProps} from '@/ui/team/pokebox/content/pokeInBox/table/details/type';


export const PokeInBoxTableFrequency = ({rateOfPokemon}: PokeInBoxTableDetailsProps) => {
  return (
    <Flex center noFullWidth className="w-36">
      <PokemonFrequencyFromProduction pokemonRate={rateOfPokemon} normalText/>
    </Flex>
  );
};
