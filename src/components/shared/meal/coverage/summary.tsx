import React from 'react';

import {clsx} from 'clsx';
import {useTranslations} from 'next-intl';

import {Flex} from '@/components/layout/flex/common';
import {MealCoverageIcon} from '@/components/shared/icon/mealCoverage';
import {MealCoverage} from '@/types/game/cooking';
import {Dimension} from '@/types/style';
import {formatFloat3} from '@/utils/number/format';


type Props = {
  coverage: MealCoverage,
  dimension?: Dimension,
  className?: string,
};

export const MealCoverageSummary = ({coverage, dimension, className}: Props) => {
  const t = useTranslations('UI.Common');

  return (
    <Flex direction="row" noFullWidth className={clsx('items-center gap-1', className)}>
      <MealCoverageIcon alt={t('MealCoverage')} dimension={dimension ?? 'size-6'}/>
      <div>{formatFloat3(coverage.total * 100)}%</div>
    </Flex>
  );
};
