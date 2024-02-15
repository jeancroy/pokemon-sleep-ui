import React from 'react';

import {GenericIcon} from '@/components/shared/icon/common/main';
import {IconProps} from '@/components/shared/icon/type';
import {PokemonInfo} from '@/types/game/pokemon';


type Props = IconProps & {
  pokemon: PokemonInfo,
};

export const PokemonCandyIcon = ({pokemon, ...props}: Props) => {
  return <GenericIcon src={`/images/candy/${pokemon.evolution.initial}.png`} noInvert {...props}/>;
};
