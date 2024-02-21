import React from 'react';

import {PokemonInfo, PokemonSpecialtyId} from '@/types/game/pokemon';
import {ProducingRateByCalculatedStates} from '@/types/game/producing/rate/base';
import {PokemonProducingRate} from '@/types/game/producing/rate/main';
import {Dimension} from '@/types/style';


export type PokemonItemStatsCommonProps = {
  getItemRate: (pokemonRate: PokemonProducingRate) => ProducingRateByCalculatedStates | undefined,
  getIcon: (pokemon: PokemonInfo, dimension: Dimension) => React.ReactNode,
  targetSpecialty: PokemonSpecialtyId,
};
