import React from 'react';

import {clsx} from 'clsx';


type Props = {
  percent: number,
  className?: string,
  classBarHeight?: `h-${number}`,
  classRounding?: `rounded-${string}`,
  classRoundingOfBar?: `rounded-${string}`,
};

export const ProgressBarSingle = ({
  percent,
  className,
  classBarHeight = 'h-2.5',
  classRounding = 'rounded-full',
  classRoundingOfBar = 'rounded-full',
}: Props) => {
  return (
    <div className={clsx(
      'transform-smooth w-full bg-gray-400/50 dark:bg-gray-700/50',
      classBarHeight,
      classRounding,
      className,
    )}>
      <div style={{width: `${percent}%`}} className={clsx(
        'transform-smooth bg-slate-500',
        classBarHeight,
        classRoundingOfBar,
      )}/>
    </div>
  );
};
