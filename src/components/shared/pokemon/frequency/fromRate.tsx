import React from 'react';

import {PokemonFrequency} from '@/components/shared/pokemon/frequency/main';
import {PokemonFrequencyProps} from '@/components/shared/pokemon/frequency/type';
import {PokemonProduction} from '@/types/game/producing/rate/main';
import {getFrequencyOfStateFromPokemonRate} from '@/utils/game/producing/frequency';


type Props = PokemonFrequencyProps & {
  pokemonRate: PokemonProduction,
};

export const PokemonFrequencyFromProduction = ({pokemonRate, ...props}: Props) => {
  return (
    <PokemonFrequency
      frequency={getFrequencyOfStateFromPokemonRate({rate: pokemonRate, state: 'equivalent'})}
      {...props}
    />
  );
};
