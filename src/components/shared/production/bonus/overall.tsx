import React from 'react';

import ChevronDoubleUpIcon from '@heroicons/react/24/solid/ChevronDoubleUpIcon';

import {BonusSlider} from '@/components/shared/production/bonus/base';
import {BonusSliderProps} from '@/components/shared/production/bonus/type';


export const OverallBonusSlider = (props: BonusSliderProps) => {
  return (
    <BonusSlider min={0} max={150} {...props}>
      <ChevronDoubleUpIcon className="size-6"/>
    </BonusSlider>
  );
};
