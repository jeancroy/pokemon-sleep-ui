import React from 'react';

import {clsx} from 'clsx';
import {useTranslations} from 'next-intl';

import {Flex} from '@/components/layout/flex/common';
import {
  extraTastyInfoUnitContainerStyle,
  extraTastyInfoUnitIconDimension,
} from '@/components/shared/cooking/extraTasty/infoUnit/const';
import {ExtraTastyInfoUnitStyleSize} from '@/components/shared/cooking/extraTasty/infoUnit/type';
import {ExtraTastyIcon} from '@/components/shared/icon/extraTasty';
import {StrengthIcon} from '@/components/shared/icon/strength';
import {ExtraTastyInfoUnit} from '@/types/game/cooking/extraTasty';
import {formatFloat, formatFloat4} from '@/utils/number/format/regular';


type Props = {
  unit: ExtraTastyInfoUnit,
  size?: ExtraTastyInfoUnitStyleSize,
  className?: string,
};

export const ExtraTastyInfoUnitUI = ({
  unit,
  size = 'normal',
  className,
}: Props) => {
  const {rate, multiplier} = unit;

  const t = useTranslations('UI.Pokemon.Stats');
  const t2 = useTranslations('UI.Common');

  return (
    <Flex direction="row" center noFullWidth className={clsx(
      'items-center',
      extraTastyInfoUnitContainerStyle[size],
      className,
    )}>
      <ExtraTastyIcon alt={t('ExtraTasty.Rate')} dimension={extraTastyInfoUnitIconDimension[size]}/>
      <span>{formatFloat(rate * 100)}%</span>
      <StrengthIcon alt={t2('Strength')} dimension={extraTastyInfoUnitIconDimension[size]} className="scale-105"/>
      <span>{formatFloat4(multiplier)}x</span>
    </Flex>
  );
};
