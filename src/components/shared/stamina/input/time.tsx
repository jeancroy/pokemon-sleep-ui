import React from 'react';

import {InputBox} from '@/components/input/box';
import {Slider} from '@/components/input/slider';
import {Flex} from '@/components/layout/flex/common';
import {durationOfDay} from '@/const/common';
import {toSeconds, toTimeString} from '@/utils/time';


type Props = {
  timeValue: number | null,
  disabled: boolean,
  onUpdate: (time: number) => void,
  icon?: React.ReactNode,
};

export const StaminaConfigTimeInput = ({timeValue, disabled, onUpdate, icon}: Props) => {
  return (
    <Flex direction="row" className="items-center gap-1">
      {icon}
      <Flex className="gap-1">
        <InputBox
          type="time"
          disabled={disabled}
          value={timeValue !== null ? toTimeString(timeValue) : ''}
          onChange={({target}) => onUpdate(toSeconds(target.value))}
          className="text-center"
        />
        <Slider
          value={timeValue ?? 0}
          setValue={onUpdate}
          min={0}
          max={durationOfDay - 1}
          disabled={disabled}
        />
      </Flex>
    </Flex>
  );
};
