import React from 'react';

import {PokemonKeyLevel, pokemonStaticNumericKeyLevels} from '@/types/game/pokemon/level';


export const useSortedPokemonKeyLevels = (): PokemonKeyLevel[] => {
  return React.useMemo(() => {
    const sortedStaticKeyLevels = [...pokemonStaticNumericKeyLevels].sort((a, b) => a - b);

    return [
      ...sortedStaticKeyLevels,
      'max',
    ];
  }, []);
};
