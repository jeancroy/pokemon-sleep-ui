import React from 'react';

import {clsx} from 'clsx';
import {useTranslations} from 'next-intl';

import {Flex} from '@/components/layout/flex/common';
import {NextImageProps} from '@/components/shared/common/image/main';
import {ColoredStrengthIcon} from '@/components/shared/icon/strengthColored';
import {productionPeriodI18nId} from '@/const/game/production/i18n';
import {ProductionPeriod} from '@/types/game/producing/display';
import {Production} from '@/types/game/producing/rate/base';
import {toProductionOfPeriod} from '@/utils/game/producing/convert';
import {formatFloat} from '@/utils/number/format/regular';


export type TeamAnalysisRateLayoutProps = {
  rate: Production | null,
  period: ProductionPeriod,
  showQuantity: boolean,
  larger?: boolean,
  icon?: React.ReactElement<NextImageProps>,
};

export const TeamAnalysisSummaryProductionLayout = ({
  rate,
  period,
  showQuantity,
  larger,
  icon,
}: TeamAnalysisRateLayoutProps) => {
  const t = useTranslations('UI.Producing.Period');
  const t2 = useTranslations('UI.Common');

  const titleClass = clsx('whitespace-nowrap', !larger && 'text-xs');
  const textClass = clsx(larger && 'text-xl');
  const dimension = larger ? 'size-6' : 'size-5';

  const calculatedRate = rate && toProductionOfPeriod({rate, period});

  return (
    <Flex direction="row" noFullWidth center className="gap-0.5">
      <div className={titleClass}>
        {t(productionPeriodI18nId[period])}
      </div>
      {
        icon &&
        <div className={clsx('relative', dimension)}>
          {icon}
        </div>
      }
      {
        showQuantity && calculatedRate &&
        <div className={textClass}>
          x{formatFloat(calculatedRate.qty)}
        </div>
      }
      <ColoredStrengthIcon dimension={dimension} alt={t2('Strength')}/>
      <div className={clsx('text-energy', textClass)}>
        {calculatedRate ? formatFloat(calculatedRate.strength) : '-'}
      </div>
    </Flex>
  );
};
