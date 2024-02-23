import React from 'react';

import {clsx} from 'clsx';

import {Loading, LoadingIcon} from '@/components/icons/loading';
import {Flex} from '@/components/layout/flex/common';
import {HorizontalSplitter} from '@/components/shared/common/splitter';
import {AnalysisStats} from '@/ui/analysis/page/calc/type';
import {AnalysisStatsOfPokemonMeta} from '@/ui/analysis/page/stats/pokemon';
import {AnalysisStatsOfProduction} from '@/ui/analysis/page/stats/production';
import {AnalysisStatsOfSleepStyle} from '@/ui/analysis/page/stats/sleepStyle';
import {AnalysisStatsUiProps} from '@/ui/analysis/page/stats/type';


type Props = Omit<AnalysisStatsUiProps, 'stats'> & {
  stats: AnalysisStats | null,
  loading: boolean,
};

export const AnalysisStatsUI = ({stats, loading, ...rest}: Props) => {
  if (!stats) {
    return (
      <Flex center className="rounded-lg bg-slate-100/80 p-10 dark:bg-slate-800/80">
        <LoadingIcon/>
      </Flex>
    );
  }

  const props: AnalysisStatsUiProps = {stats, ...rest};

  return (
    <div className="relative">
      {
        loading &&
        <Flex className={clsx(
          'absolute z-10 h-full rounded-lg bg-slate-100/80 p-10 dark:bg-slate-800/80',
        )}>
          <Loading/>
        </Flex>
      }
      <AnalysisStatsOfProduction {...props}/>
      <HorizontalSplitter/>
      <AnalysisStatsOfSleepStyle {...props}/>
      <HorizontalSplitter/>
      <AnalysisStatsOfPokemonMeta {...props}/>
    </div>
  );
};
