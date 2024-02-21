import React from 'react';

import {PokemonFrequency} from '@/components/shared/pokemon/frequency/main';
import {PokemonFrequencyProps} from '@/components/shared/pokemon/frequency/type';
import {PokemonProducingRate} from '@/types/game/producing/rate/main';
import {getFrequencyOfStateFromPokemonRate} from '@/utils/game/producing/frequency';


type Props = PokemonFrequencyProps & {
  pokemonRate: PokemonProducingRate,
};

export const PokemonFrequencyFromProducingRate = ({pokemonRate, ...props}: Props) => {
  return (
    <PokemonFrequency
      frequency={getFrequencyOfStateFromPokemonRate({rate: pokemonRate, state: 'equivalent'})}
      {...props}
    />
  );
};
