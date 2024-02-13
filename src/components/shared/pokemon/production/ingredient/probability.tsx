import React from 'react';

import {Flex} from '@/components/layout/flex/common';
import {GenericIngredientIcon} from '@/components/shared/icon/ingredient';
import {formatFloat} from '@/utils/number/format/regular';


type Props = {
  alt: string,
  probabilityRate: number,
};

export const PokemonIngredientProbability = ({alt, probabilityRate}: Props) => {
  return (
    <Flex direction="row" noFullWidth className="items-center text-sm">
      <GenericIngredientIcon alt={alt} dimension="size-4"/>
      <span>{formatFloat(probabilityRate * 100)}%</span>
    </Flex>
  );
};
