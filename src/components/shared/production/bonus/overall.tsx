import React from 'react';

import ChevronDoubleUpIcon from '@heroicons/react/24/solid/ChevronDoubleUpIcon';

import {BonusSlider} from '@/components/shared/production/bonus/base';
import {BonusSliderProps} from '@/components/shared/production/bonus/type';


type Props = BonusSliderProps & {
  title: string,
};

export const OverallBonusSlider = ({title, ...props}: Props) => {
  return (
    <BonusSlider min={0} max={100} {...props}>
      <ChevronDoubleUpIcon className="size-6 p-0.5"/>
      <span>{title}</span>
    </BonusSlider>
  );
};
