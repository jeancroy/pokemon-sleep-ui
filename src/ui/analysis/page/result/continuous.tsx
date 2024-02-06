import React from 'react';

import {Flex} from '@/components/layout/flex/common';
import {TextMarkThreshold} from '@/styles/text/mark/type';
import {getMarkByThreshold} from '@/styles/text/mark/utils';
import {AnalysisStatsContinuous} from '@/ui/analysis/page/calc/type';
import {AnalysisLayout} from '@/ui/analysis/page/result/layout';
import {AnalysisLayoutProps} from '@/ui/analysis/page/result/type';
import {formatFloat, formatInt} from '@/utils/number/format/regular';
import {Optional, RequireKeys} from '@/utils/type';


type Props<TData> = Optional<
  RequireKeys<
    Pick<AnalysisLayoutProps<TData>, 'title' | 'renderData' | 'linkedIconKey'>,
    'renderData'
  >,
  'linkedIconKey'
> & {
  stats: AnalysisStatsContinuous<TData>,
  threshold?: TextMarkThreshold,
};

export const AnalysisStatsContinuousUI = <TData, >({
  stats,
  threshold,
  children,
  linkedIconKey,
  ...props
}: React.PropsWithChildren<Props<TData>>) => {
  const {percentage, percentile, rank, totalCount} = stats;

  const isAvailable = rank !== null;

  return (
    <AnalysisLayout
      linked={stats.linked}
      linkedIconKey={(data) => linkedIconKey ? linkedIconKey(data) : data.pokemonId}
      mark={percentile ? getMarkByThreshold(percentile, threshold) : 'ordinary'}
      footer={
        <Flex className="text-sm md:w-2/3">
          <Flex direction="row" noFullWidth className="justify-end gap-1">
            <div>{isAvailable ? `#${rank}` : '-'}</div>
            <div>/</div>
            <div>{totalCount}</div>
          </Flex>
          <Flex direction="row" noFullWidth className="justify-end gap-1">
            {isAvailable ?
              <>
                <div>{formatInt(percentile)}<sub>PR</sub></div>
                <div>/</div>
                <div>{formatFloat(percentage)}%</div>
              </> :
              '-'}
          </Flex>
        </Flex>
      }
      {...props}
    >
      {children}
    </AnalysisLayout>
  );
};
