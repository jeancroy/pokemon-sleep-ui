import React from 'react';

import {clsx} from 'clsx';

import {Flex} from '@/components/layout/flex/common';
import {progressBarMultiColors} from '@/components/progressBar/multi/const';
import {ProgressBarMultiData} from '@/components/progressBar/multi/type';
import {toAccumulated, toNormalized} from '@/utils/array';
import {formatFloat1} from '@/utils/number/format';


type Props = {
  data: ProgressBarMultiData[],
  className?: string,
  classBarHeight?: `h-${number}`,
};

export const ProgressBarMulti = ({data, className, classBarHeight = 'h-2.5'}: Props) => {
  const normalized = toNormalized({
    arr: data.map(({value}) => value),
    targetSum: 100,
  });

  return (
    <Flex className="gap-1">
      <Flex direction="row" noFullWidth wrap className="items-center justify-between gap-1.5">
        {data.map(({icon}, idx) => (
          <Flex key={idx} direction="row" noFullWidth center className="gap-1.5">
            {icon}
            <span className="text-sm">{formatFloat1(normalized[idx])}%</span>
          </Flex>
        ))}
      </Flex>
      <div className={clsx(
        'transform-smooth relative w-full rounded-full bg-gray-400/50 dark:bg-gray-700/50',
        classBarHeight,
        className,
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
                progressBarMultiColors[idx % progressBarMultiColors.length],
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
