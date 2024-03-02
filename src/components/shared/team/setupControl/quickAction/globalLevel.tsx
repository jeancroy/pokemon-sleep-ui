import React from 'react';

import {clsx} from 'clsx';

import {FilterTextInput} from '@/components/input/filter/preset/text';
import {LevelIcon} from '@/components/shared/icon/lv';
import {usePokemonKeyLevelConverter} from '@/hooks/pokemon/keyLevel/convert';
import {useSortedPokemonKeyLevels} from '@/hooks/pokemon/keyLevel/sorted';
import {iconFilterButtonStyle} from '@/styles/input';
import {formatPokemonKeyLevel} from '@/utils/game/rating/format';


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
      idToText={(level) => formatPokemonKeyLevel(level)}
      onClick={(level) => onLevelSelected(convertPokemonKeyLevel(level))}
      isActive={() => false}
      className={clsx(iconFilterButtonStyle, 'text-sm')}
    />
  );
};
