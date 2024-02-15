import React from 'react';

import {GenericIcon} from '@/components/shared/icon/common/main';
import {IconProps} from '@/components/shared/icon/type';
import {PokemonTypeId} from '@/types/game/pokemon';


type Props = IconProps & {
  pokemonType: PokemonTypeId,
};

export const PokemonIncenseIcon = ({pokemonType, ...props}: Props) => {
  return <GenericIcon src={`/images/incense/pokemon/${pokemonType}.png`} noInvert {...props}/>;
};
