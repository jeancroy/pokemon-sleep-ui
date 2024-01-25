import React from 'react';

import XMarkIcon from '@heroicons/react/24/outline/XMarkIcon';
import {clsx} from 'clsx';


type Props = {
  onClick?: () => void,
  disabled?: boolean,
};

export const PopupClose = ({onClick, disabled}: Props) => {
  return (
    <button onClick={onClick} disabled={disabled} className={clsx(
      'enabled:button-clickable-bg disabled:button-disabled size-6',
    )}>
      <XMarkIcon/>
    </button>
  );
};
