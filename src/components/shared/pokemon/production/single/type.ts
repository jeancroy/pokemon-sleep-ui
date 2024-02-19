import React from 'react';

import {PokemonProducingRateProps} from '@/components/shared/pokemon/production/type';
import {ProducingRateByCalculatedStates} from '@/types/game/producing/rate';
import {ProducingStateCalculated} from '@/types/game/producing/state';
import {Dimension} from '@/types/style';


export const pokemonProducingRateSingleDisplay = [
  'item',
  'total',
] as const;

export type PokemonProducingRateSingleDisplay = typeof pokemonProducingRateSingleDisplay[number];

export type UsePokemonProducingRateSingleDisplayReturn = {
  display: PokemonProducingRateSingleDisplay,
  setDisplay: (updated: PokemonProducingRateSingleDisplay) => void,
};

export type PokemonProducingRateSingleProps = PokemonProducingRateProps & {
  rate: ProducingRateByCalculatedStates | null,
  getIcon: (dimension: Dimension) => React.ReactNode,
  display: PokemonProducingRateSingleDisplay,
  infoAtTotal?: React.ReactNode,
  dailyTotalEnergy?: number,
  state?: ProducingStateCalculated,
};
