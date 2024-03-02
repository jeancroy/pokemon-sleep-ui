import React from 'react';

import {useCommonServerData} from '@/contexts/data/common/hook';
import {PokemonKeyLevel} from '@/types/game/pokemon/level';
import {toNumericPokemonKeyLevel} from '@/utils/game/pokemon/keyLevel';


export const usePokemonKeyLevelConverter = () => {
  const {pokemonMaxLevel} = useCommonServerData();

  return React.useCallback(
    (level: PokemonKeyLevel | number): number => toNumericPokemonKeyLevel({level, pokemonMaxLevel}),
    [],
  );
};
