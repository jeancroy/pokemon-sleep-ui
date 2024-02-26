import React from 'react';

import {clsx} from 'clsx';

import {FilterTextInput} from '@/components/input/filter/preset/text';
import {LevelIcon} from '@/components/shared/icon/lv';
import {iconFilterButtonStyle} from '@/styles/input';
import {pokemonKeyLevels} from '@/types/game/pokemon/level';


type Props = {
  onLevelSelected: (level: number) => void,
};

export const TeamQuickActionGlobalLevel = ({onLevelSelected}: Props) => {
  return (
    <FilterTextInput
      title={<LevelIcon/>}
      ids={[...pokemonKeyLevels].sort((a, b) => a - b)}
      idToText={(level) => level.toString()}
      onClick={onLevelSelected}
      isActive={() => false}
      className={clsx(iconFilterButtonStyle, 'text-sm')}
    />
  );
};
