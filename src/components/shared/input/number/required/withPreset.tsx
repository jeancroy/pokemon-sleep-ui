import React from 'react';

import {clsx} from 'clsx';

import {FilterTextInput} from '@/components/input/filter/preset/text';
import {Flex} from '@/components/layout/flex/common';
import {NumberSliderRequiredProps} from '@/components/shared/input/number/required/type';
import {NumberSliderRequired} from '@/components/shared/input/number/required/withSlider';
import {iconFilterButtonStyle} from '@/styles/input';


type Props = Omit<NumberSliderRequiredProps, 'text'> & {
  sliderTitle: React.ReactNode,
  presetTitle: React.ReactNode,
  presetValues: number[],
};

export const NumberPresetRequired = ({sliderTitle, presetTitle, presetValues, ...props}: Props) => {
  const {setValue} = props;

  return (
    <Flex className="gap-1.5">
      <NumberSliderRequired
        text={sliderTitle}
        {...props}
      />
      <FilterTextInput
        title={presetTitle}
        ids={presetValues}
        idToText={(level) => level.toString()}
        onClick={setValue}
        isActive={() => false}
        className={clsx(iconFilterButtonStyle, 'text-sm')}
      />
    </Flex>
  );
};
