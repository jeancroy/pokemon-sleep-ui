import React from 'react';

import {InputBox} from '@/components/input/box';
import {Flex} from '@/components/layout/flex/common';
import {toSeconds, toTimeString} from '@/utils/time';


type Props = {
  timeValue: number | null,
  onUpdate: (time: number) => void,
  disabled?: boolean,
  icon?: React.ReactNode,
};

export const StaminaConfigTimeInput = ({timeValue, onUpdate, disabled, icon}: Props) => {
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
      </Flex>
    </Flex>
  );
};
