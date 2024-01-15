import React from 'react';

import {clsx} from 'clsx';


type Props = Omit<React.InputHTMLAttributes<HTMLInputElement>, 'id' | 'value'> & {
  value: number,
  setValue: (newValue: number) => void,
};

export const Slider = ({value, setValue, ...props}: Props) => {
  const {max} = props;

  return (
    <input
      type="range"
      value={value}
      onChange={({target}) => {
        const level = parseInt(target.value || '0');

        if (isNaN(level)) {
          return;
        }

        setValue(max ? Math.min(level, typeof max === 'string' ? parseInt(max) : max) : level);
      }}
      className={clsx(
        'transform-smooth h-2 w-full cursor-pointer appearance-none rounded-lg',
        'bg-slate-500/50 accent-slate-700/50 disabled:bg-slate-400/50',
        'dark:bg-slate-400/60 dark:accent-slate-200/50 dark:disabled:bg-slate-600/50',
      )}
      {...props}
    />
  );
};
