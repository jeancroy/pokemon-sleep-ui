import React from 'react';

import {Flex} from '@/components/layout/flex/common';
import {EnergyIcon} from '@/components/shared/icon/energy';
import {IconProps} from '@/components/shared/icon/type';
import {formatInt} from '@/utils/number/format/regular';


type Props = IconProps & {
  stamina: number,
};

export const StaminaCurrent = ({stamina, ...props}: Props) => {
  return (
    <Flex direction="row" noFullWidth className="items-center gap-1">
      <EnergyIcon {...props}/>
      <span>{formatInt(stamina)}</span>
    </Flex>
  );
};
