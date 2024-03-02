import React from 'react';

import {clsx} from 'clsx';

import {FilterTextInput} from '@/components/input/filter/preset/text';
import {LevelIcon} from '@/components/shared/icon/lv';
import {usePokemonKeyLevelConverter} from '@/hooks/pokemon/keyLevel/convert';
import {useSortedPokemonKeyLevels} from '@/hooks/pokemon/keyLevel/sorted';
import {iconFilterButtonStyle} from '@/styles/input';


type Props = {
  onLevelSelected: (level: number) => void,
};

export const TeamQuickActionGlobalLevel = ({onLevelSelected}: Props) => {
  const convertPokemonKeyLevel = usePokemonKeyLevelConverter();
  const pokemonKeyLevels = useSortedPokemonKeyLevels();

  return (
    <FilterTextInput
      title={<LevelIcon/>}
      ids={pokemonKeyLevels}
      idToText={(level) => level.toString().toUpperCase()}
      onClick={(level) => onLevelSelected(convertPokemonKeyLevel(level))}
      isActive={() => false}
      className={clsx(iconFilterButtonStyle, 'text-sm')}
    />
  );
};
