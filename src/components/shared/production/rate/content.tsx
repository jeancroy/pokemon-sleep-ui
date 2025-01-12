import React from 'react';

import {clsx} from 'clsx';
import {useTranslations} from 'next-intl';

import {Flex} from '@/components/layout/flex/common';
import {ColoredStrengthIcon} from '@/components/shared/icon/strengthColored';
import {ProductionContentCommonProps} from '@/components/shared/production/rate/type';
import {Dimension} from '@/types/style';
import {formatFloat} from '@/utils/number/format/regular';


type Props = ProductionContentCommonProps & {
  dailyRate: number | undefined,
  className?: string,
} & ({
  isEnergy: true,
  getIcon?: never,
} | {
  isEnergy?: false,
  getIcon: (dimension: Dimension) => React.ReactNode,
});

export const ProductionContent = ({dailyRate, className, isEnergy, getIcon, normalSize}: Props) => {
  const t = useTranslations('UI.Common');
  const dimension: Dimension = normalSize ? 'size-5' : 'size-4';

  return (
    <Flex direction="row" noFullWidth className={clsx(
      'items-center gap-0.5',
      !normalSize && 'text-sm',
      className,
    )}>
      {getIcon ?
        getIcon(dimension) :
        <ColoredStrengthIcon dimension={dimension} alt={t('Strength')}/>}
      <div className={clsx(isEnergy && 'text-energy')}>
        {dailyRate ? formatFloat(dailyRate) : '-'}
      </div>
    </Flex>
  );
};
