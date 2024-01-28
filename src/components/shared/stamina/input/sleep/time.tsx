import React from 'react';

import {StaminaConfigTimeInput} from '@/components/shared/stamina/input/time';
import {StaminaConfigProps} from '@/components/shared/stamina/input/type';
import {SleepSessions, SleepSessionTimes} from '@/types/game/sleep';


type Props = Pick<StaminaConfigProps, 'config' | 'setConfig'> & {
  session: keyof SleepSessions<never>,
  times: SleepSessionTimes | null,
  timing: keyof SleepSessionTimes,
  isActive: boolean,
  icon?: React.ReactNode,
};

export const StaminaConfigSleepTime = ({config, setConfig, session, times, timing, isActive, icon}: Props) => {
  return (
    <StaminaConfigTimeInput
      timeValue={times ? times[timing] : null}
      isActive={isActive}
      disabled={!times}
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
