import React from 'react';

import {StaminaConfigTimeInput} from '@/components/shared/stamina/input/time';
import {StaminaConfigProps} from '@/components/shared/stamina/input/type';
import {SleepSession, SleepSessionTimes} from '@/types/game/sleep';


type Props = Pick<StaminaConfigProps, 'config' | 'setConfig'> & {
  session: SleepSession,
  times: SleepSessionTimes | null,
  timing: keyof SleepSessionTimes,
  isActive: boolean,
  icon?: React.ReactNode,
};

export const StaminaConfigSleepTime = ({config, setConfig, session, times, timing, isActive, icon}: Props) => {
  return (
    <StaminaConfigTimeInput
      timeValue={times ? times[timing] : null}
      disabled={!times || !isActive}
      onUpdate={(time) => setConfig({
        ...config,
        sleepSession: {
          ...config.sleepSession,
          [session]: {
            ...times,
            [timing]: time,
          },
        },
      })}
      icon={icon}
    />
  );
};
