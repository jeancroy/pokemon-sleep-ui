import React from 'react';

import {clsx} from 'clsx';
import {useTranslations} from 'next-intl';

import {Flex} from '@/components/layout/flex/common';
import {ColoredEnergyIcon} from '@/components/shared/icon/energyColored';
import {MealCoverageIcon} from '@/components/shared/icon/mealCoverage';
import {MealCoverageSummaryCommonProps} from '@/components/shared/meal/coverage/type';
import {Dimension} from '@/types/style';
import {formatFloat, formatInt} from '@/utils/number/format';


type Props = MealCoverageSummaryCommonProps & {
  dimension?: Dimension,
};

export const MealCoverageSummary = ({coverage, coveredStrength, dimension, className}: Props) => {
  const t = useTranslations('UI.Common');
  const t2 = useTranslations('UI.Component.MealCoverageCombo');

  return (
    <Flex direction="row" noFullWidth className={clsx('items-center gap-2', className)}>
      {
        !!coveredStrength &&
        <Flex direction="row" noFullWidth className="items-center gap-0.5">
          <ColoredEnergyIcon dimension={dimension ?? 'size-6'} alt={t2('CoveredStrength')}/>
          <span>{formatInt(coveredStrength)}</span>
        </Flex>
      }
      <Flex direction="row" noFullWidth className="items-center gap-1">
        <MealCoverageIcon alt={t('MealCoverage')} dimension={dimension ?? 'size-6'}/>
        <span>{formatFloat(coverage.total * 100)}%</span>
      </Flex>
    </Flex>
  );
};
