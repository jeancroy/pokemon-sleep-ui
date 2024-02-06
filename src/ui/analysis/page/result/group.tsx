import React from 'react';

import {Flex} from '@/components/layout/flex/common';
import {TextMarkThreshold} from '@/styles/text/mark/type';
import {getMarkByThreshold} from '@/styles/text/mark/utils';
import {AnalysisStatsGrouped} from '@/ui/analysis/page/calc/type';
import {AnalysisLayout} from '@/ui/analysis/page/result/layout';
import {AnalysisLayoutProps} from '@/ui/analysis/page/result/type';
import {formatFloat} from '@/utils/number/format/regular';


type Props<TData> = Pick<AnalysisLayoutProps<TData>, 'title'> & {
  stats: AnalysisStatsGrouped<TData>,
  threshold?: TextMarkThreshold,
};

export const AnalysisStatsGroupedUI = <TData, >({
  stats,
  threshold,
  children,
  ...props
}: React.PropsWithChildren<Props<TData>>) => {
  const {totalCount, sharedCount} = stats;

  const isAvailable = sharedCount > 0;

  const ratio = sharedCount / totalCount;
  const rarity = 1 / ratio;

  return (
    <AnalysisLayout
      linked={stats.linked}
      linkedIconKey={({pokemonId}) => pokemonId}
      mark={isAvailable ? getMarkByThreshold(rarity, threshold) : 'ordinary'}
      footer={
        <Flex className="text-sm md:w-2/3">
          <Flex direction="row" noFullWidth className="justify-end gap-1">
            <div>{sharedCount}</div>
            <div>/</div>
            <div>{totalCount}</div>
          </Flex>
          <Flex direction="row" noFullWidth className="justify-end gap-1">
            {isAvailable ?
              <>
                <div>{(ratio * 100).toFixed(2)}%</div>
                <div>/</div>
                <div>1 in {formatFloat(rarity)}</div>
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
