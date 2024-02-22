import React from 'react';

import {GenericBerryIcon} from '@/components/shared/icon/berry';
import {GenericMainSkillIcon} from '@/components/shared/icon/mainSkill/generic';
import {PotIcon} from '@/components/shared/icon/pot';
import {IconProps} from '@/components/shared/icon/type';
import {StrengthMultiplierType} from '@/types/game/bonus/strength';


type Props = IconProps & {
  type: StrengthMultiplierType,
};

export const StrengthMultiplierTypeIcon = ({type, ...props}: Props) => {
  if (type === 'berry') {
    return <GenericBerryIcon {...props}/>;
  }

  if (type === 'cooking') {
    return <PotIcon {...props}/>;
  }

  if (type === 'skill') {
    return <GenericMainSkillIcon {...props}/>;
  }

  throw new Error(`Unhandled strength multiplier type [${type satisfies never}] for showing the icon`);
};
