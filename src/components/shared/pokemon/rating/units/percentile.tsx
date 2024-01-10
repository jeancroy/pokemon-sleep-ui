import React from 'react';

import {clsx} from 'clsx';

import {Flex} from '@/components/layout/flex/common';
import {ProgressBarSingle} from '@/components/progressBar/single';
import {ratingMarkThresholdByPr} from '@/components/shared/pokemon/rating/const';
import {classOfMarkStyle} from '@/styles/text/mark/style';
import {getMarkByThreshold} from '@/styles/text/mark/utils';
import {formatInt} from '@/utils/number/format';


type Props = {
  percentile: number,
  classOfMark: `text-${string}`,
  classOfValue: `text-${string}`,
  classBarHeight?: `h-${number}`,
  className?: string,
  noFullWidth?: boolean,
};

export const RankingResultPercentile = ({
  percentile,
  classOfMark,
  classOfValue,
  classBarHeight,
  className,
  noFullWidth,
}: Props) => {
  const percentileMark = getMarkByThreshold(percentile, ratingMarkThresholdByPr);

  return (
    <Flex noFullWidth={noFullWidth ?? true} className={clsx('gap-1', className)}>
      <Flex direction="row" noFullWidth className={clsx(
        'items-end justify-center gap-1',
        classOfValue,
        percentileMark && classOfMarkStyle[percentileMark],
      )}>
        {isNaN(percentile) ? '-' : <><span className={classOfMark}>PR</span>{formatInt(percentile)}</>}
      </Flex>
      <ProgressBarSingle percent={percentile} classBarHeight={classBarHeight}/>
    </Flex>
  );
};
