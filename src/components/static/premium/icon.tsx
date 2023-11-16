import React from 'react';

import LockClosedIcon from '@heroicons/react/24/solid/LockClosedIcon';

import {Dimension} from '@/types/style';


type Props = {
  dimension?: Dimension,
};

export const PremiumIcon = ({dimension}: Props) => {
  return <LockClosedIcon className={dimension ?? 'h-5 w-5'}/>;
};
