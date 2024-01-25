import React from 'react';

import CheckIcon from '@heroicons/react/24/outline/CheckIcon';
import XMarkIcon from '@heroicons/react/24/outline/XMarkIcon';
import {clsx} from 'clsx';

import {Dimension} from '@/types/style';


type Props = {
  onClick: () => void,
  disabled?: boolean,
};

export const OcrImporterConfirm = ({onClick, disabled}: Props) => {
  const dimension: Dimension = 'size-6';

  return (
    <button disabled={disabled} onClick={onClick} className={clsx(
      'enabled:button-clickable-border disabled:button-disabled self-end p-1',
    )}>
      {disabled ? <XMarkIcon className={dimension}/> : <CheckIcon className={dimension}/>}
    </button>
  );
};
