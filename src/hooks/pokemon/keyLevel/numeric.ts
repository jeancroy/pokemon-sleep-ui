import React from 'react';

import {usePokemonKeyLevelConverter} from '@/hooks/pokemon/keyLevel/convert';
import {pokemonKeyLevels} from '@/types/game/pokemon/level';
import {toUnique} from '@/utils/array';


export const useNumericPokemonKeyLevels = (): number[] => {
  const convertPokemonKeyLevel = usePokemonKeyLevelConverter();

  return React.useMemo(() => (
    toUnique([...pokemonKeyLevels].map(convertPokemonKeyLevel)).sort((a, b) => a - b)
  ), []);
};
