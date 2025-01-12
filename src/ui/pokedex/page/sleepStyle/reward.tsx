import React from 'react';

import {Flex} from '@/components/layout/flex/common';
import {GenericIconLarger} from '@/components/shared/icon/common/larger';
import {formatInt} from '@/utils/number/format/regular';


type Props = {
  iconSrc: string,
  iconAlt: string,
  value: number,
  noInvert?: boolean,
  classImage?: string,
};

export const PokemonSleepStyleRewardCell = ({iconSrc, iconAlt, value, noInvert, classImage}: Props) => {
  return (
    <Flex direction="row" center className="gap-0.5">
      <GenericIconLarger src={iconSrc} alt={iconAlt} noInvert={noInvert ?? true} className={classImage}/>
      <div>{formatInt(value)}</div>
    </Flex>
  );
};
