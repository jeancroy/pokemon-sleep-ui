import React from 'react';

import LockClosedIcon from '@heroicons/react/24/solid/LockClosedIcon';
import {clsx} from 'clsx';

import {Dimension} from '@/types/style';


type Props = {
  isPremium?: boolean,
  dimension?: Dimension,
};

export const PremiumIcon = ({isPremium, dimension}: Props) => {
  if (isPremium) {
    return null;
  }

  return <LockClosedIcon className={clsx('shrink-0', dimension ?? 'size-5')}/>;
};
