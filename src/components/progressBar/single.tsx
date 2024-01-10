import React from 'react';

import {clsx} from 'clsx';


type Props = {
  percent: number,
  className?: string,
  classBarHeight?: `h-${number}`,
};

export const ProgressBarSingle = ({percent, className, classBarHeight = 'h-2.5'}: Props) => {
  return (
    <div className={clsx(
      'transform-smooth w-full rounded-full bg-gray-400/50 dark:bg-gray-700/50',
      classBarHeight,
      className,
    )}>
      <div
        className={clsx('transform-smooth rounded-full bg-slate-500', classBarHeight)}
        style={{width: `${percent}%`}}
      />
    </div>
  );
};
