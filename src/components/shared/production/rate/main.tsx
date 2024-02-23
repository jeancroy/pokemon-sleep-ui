import React from 'react';

import {clsx} from 'clsx';

import {Flex} from '@/components/layout/flex/common';
import {ProductionContent} from '@/components/shared/production/rate/content';
import {ProductionContentCommonProps} from '@/components/shared/production/rate/type';
import {Production} from '@/types/game/producing/rate/base';
import {Dimension} from '@/types/style';


type Props = ProductionContentCommonProps & {
  rate: Production | null,
  className?: string,
  hideStrength?: boolean,
} & ({
  hideQuantity: true,
  getIcon?: never,
} | {
  hideQuantity?: false,
  getIcon: (dimension: Dimension) => React.ReactNode,
});

export const ProductionUI = ({rate, className, hideStrength, hideQuantity, getIcon, ...props}: Props) => {
  return (
    <Flex direction="row" noFullWidth className={clsx('gap-1', className)}>
      {!hideQuantity && <ProductionContent dailyRate={rate?.qty} getIcon={getIcon} {...props}/>}
      {!hideStrength && <ProductionContent dailyRate={rate?.strength} isEnergy {...props}/>}
    </Flex>
  );
};
