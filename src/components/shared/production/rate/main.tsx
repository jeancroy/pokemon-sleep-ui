import React from 'react';

import {clsx} from 'clsx';

import {Flex} from '@/components/layout/flex/common';
import {ProducingRateContent} from '@/components/shared/production/rate/content';
import {ProducingRateContentCommonProps} from '@/components/shared/production/rate/type';
import {ProducingRate} from '@/types/game/producing/rate/base';
import {Dimension} from '@/types/style';


type Props = ProducingRateContentCommonProps & {
  rate: ProducingRate | null,
  className?: string,
  hideStrength?: boolean,
} & ({
  hideQuantity: true,
  getIcon?: never,
} | {
  hideQuantity?: false,
  getIcon: (dimension: Dimension) => React.ReactNode,
});

export const ProducingRateUI = ({rate, className, hideStrength, hideQuantity, getIcon, ...props}: Props) => {
  return (
    <Flex direction="row" noFullWidth className={clsx('gap-1', className)}>
      {!hideQuantity && <ProducingRateContent dailyRate={rate?.qty} getIcon={getIcon} {...props}/>}
      {!hideStrength && <ProducingRateContent dailyRate={rate?.strength} isEnergy {...props}/>}
    </Flex>
  );
};
