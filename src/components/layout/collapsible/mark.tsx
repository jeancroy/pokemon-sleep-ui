import React from 'react';

import ChevronDownIcon from '@heroicons/react/24/solid/ChevronDownIcon';
import ChevronUpIcon from '@heroicons/react/24/solid/ChevronUpIcon';
import {clsx} from 'clsx';


type Props = {
  show: boolean,
};

export const CollapsibleMark = ({show}: Props) => {
  return (
    <div className={clsx(
      'transform-smooth absolute bottom-1 right-1 size-3.5',
      'stroke-black stroke-1 group-hover:stroke-white dark:stroke-white dark:group-hover:stroke-black',
    )}>
      {show ? <ChevronUpIcon/> : <ChevronDownIcon/>}
    </div>
  );
};
