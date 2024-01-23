import React from 'react';

import {GenericIcon} from '@/components/shared/icon/common/main';
import {IconProps} from '@/components/shared/icon/type';
import {PokemonGender} from '@/types/game/pokemon/gender';


type Props = IconProps & {
  gender: PokemonGender,
};

export const GenderIcon = ({gender, ...props}: Props) => {
  return <GenericIcon src={`/images/gender/${gender}.png`} noInvert {...props}/>;
};
