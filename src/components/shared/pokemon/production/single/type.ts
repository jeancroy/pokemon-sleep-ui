import React from 'react';

import {PokemonProductionProps} from '@/components/shared/pokemon/production/type';
import {ProductionByCalculatedStates} from '@/types/game/producing/rate/base';
import {ProducingStateCalculated} from '@/types/game/producing/state';
import {Dimension} from '@/types/style';


export const pokemonProductionSingleDisplay = [
  'item',
  'total',
] as const;

export type PokemonProductionSingleDisplay = typeof pokemonProductionSingleDisplay[number];

export type UsePokemonProductionSingleDisplayReturn = {
  display: PokemonProductionSingleDisplay,
  setDisplay: (updated: PokemonProductionSingleDisplay) => void,
};

export type PokemonProductionSingleProps = PokemonProductionProps & {
  rate: ProductionByCalculatedStates | null,
  getIcon: (dimension: Dimension) => React.ReactNode,
  display: PokemonProductionSingleDisplay,
  infoAtTotal?: React.ReactNode,
  dailyTotalEnergy?: number,
  state?: ProducingStateCalculated,
};
