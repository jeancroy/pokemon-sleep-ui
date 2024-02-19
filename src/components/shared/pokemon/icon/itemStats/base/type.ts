import React from 'react';

import {PokemonInfo, PokemonSpecialtyId} from '@/types/game/pokemon';
import {PokemonProducingRate, ProducingRateByCalculatedStates} from '@/types/game/producing/rate';
import {Dimension} from '@/types/style';


export type PokemonItemStatsCommonProps = {
  getItemRate: (pokemonRate: PokemonProducingRate) => ProducingRateByCalculatedStates | undefined,
  getIcon: (pokemon: PokemonInfo, dimension: Dimension) => React.ReactNode,
  targetSpecialty: PokemonSpecialtyId,
};
