import React from 'react';

import {clsx} from 'clsx';


type Props = React.InputHTMLAttributes<HTMLInputElement>;

export const InputBox = ({className, ...props}: Props) => (
  <input
    autoFocus={false}
    className={clsx(
      'border-b border-gray-700/50 bg-transparent focus:outline-none dark:border-gray-300/50',
      className,
    )}
    {...props}
  />
);
