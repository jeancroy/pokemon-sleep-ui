import React from 'react';

import {clsx} from 'clsx';

import {Flex} from '@/components/layout/flex/common';
import {defaultProgressBarMultiColors} from '@/components/progressBar/multi/const';
import {ProgressBarMultiData, ProgressBarMultiRenderSummaryOpts} from '@/components/progressBar/multi/type';
import {toAccumulated, toNormalized} from '@/utils/array';


type Props<TData> = {
  data: ProgressBarMultiData<TData>[],
  summaryWrap?: boolean,
  classBarHeight?: `h-${number}`,
  classColors?: `bg-${string}`[],
  renderSummary: (opts: ProgressBarMultiRenderSummaryOpts<TData>) => React.ReactNode,
};

export const ProgressBarMulti = <TData, >({
  data,
  summaryWrap = true,
  classBarHeight = 'h-2.5',
  classColors = defaultProgressBarMultiColors,
  renderSummary,
}: Props<TData>) => {
  const normalized = toNormalized({
    arr: data.map(({value}) => value),
    targetSum: 100,
  });

  return (
    <Flex className="gap-1">
      <Flex direction="row" noFullWidth wrap={summaryWrap} className="items-center justify-between gap-1.5">
        {data.map(({data}, idx) => (
          <React.Fragment key={idx}>
            {renderSummary({data, percent: normalized[idx]})}
          </React.Fragment>
        ))}
      </Flex>
      <div className={clsx(
        'transform-smooth relative w-full rounded-full bg-gray-400/50 dark:bg-gray-700/50',
        classBarHeight,
      )}>
        {[...toAccumulated(normalized)].map((num, idx) => {
          const entry = data.at(idx);

          if (!entry || !entry.value) {
            return null;
          }

          return (
            <div
              key={idx}
              className={clsx(
                'transform-smooth absolute left-0 top-0 rounded-l-xl last:rounded-r-xl',
                classColors[idx % classColors.length],
                classBarHeight,
              )}
              style={{width: `${num}%`, zIndex: data.length - idx + 1}}
            />
          );
        })}
      </div>
    </Flex>
  );
};
