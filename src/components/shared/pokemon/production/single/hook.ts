import React from 'react';


import {
  PokemonProductionSingleDisplay,
  UsePokemonProductionSingleDisplayReturn,
} from '@/components/shared/pokemon/production/single/type';


export const usePokemonProductionSingleDisplay = (): UsePokemonProductionSingleDisplayReturn => {
  const [
    display,
    setDisplay,
  ] = React.useState<PokemonProductionSingleDisplay>('item');

  return {
    display,
    setDisplay,
  };
};
