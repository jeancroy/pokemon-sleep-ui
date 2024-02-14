import React from 'react';

import {clsx} from 'clsx';

import {FilterTextInput} from '@/components/input/filter/preset/text';
import {LevelIcon} from '@/components/shared/icon/lv';
import {iconFilterButtonStyle} from '@/styles/input';
import {pokemonKeyLevels} from '@/types/game/pokemon/level';
import {TeamAnalysisSetupUpdateCommonProps} from '@/ui/team/analysis/setup/control/setup/common/type';


export const TeamAnalysisQuickActionGlobalLevel = ({
  setupControl,
}: TeamAnalysisSetupUpdateCommonProps) => {
  const {setCurrentMemberReplaceAll} = setupControl;

  return (
    <FilterTextInput
      title={<LevelIcon/>}
      ids={[...pokemonKeyLevels].sort((a, b) => a - b)}
      idToText={(level) => level.toString()}
      onClick={(level) => setCurrentMemberReplaceAll({update: {level}})}
      isActive={() => false}
      className={clsx(iconFilterButtonStyle, 'text-sm')}
    />
  );
};
