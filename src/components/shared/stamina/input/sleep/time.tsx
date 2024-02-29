import React from 'react';

import {StaminaConfigTimeInput} from '@/components/shared/stamina/input/time';
import {StaminaConfigProps} from '@/components/shared/stamina/input/type';
import {SleepSession, SleepSessionTimes} from '@/types/game/sleep';


type Props = Pick<StaminaConfigProps, 'bundle' | 'setStaminaConfig'> & {
  session: SleepSession,
  times: SleepSessionTimes | null,
  timing: keyof SleepSessionTimes,
  isActive: boolean,
  icon?: React.ReactNode,
};

export const StaminaConfigSleepTime = ({
  bundle,
  setStaminaConfig,
  session,
  times,
  timing,
  isActive,
  icon,
}: Props) => {
  const {stamina} = bundle.userConfig;

  return (
    <StaminaConfigTimeInput
      timeValue={times ? times[timing] : null}
      disabled={!times || !isActive}
      onUpdate={(time) => setStaminaConfig({
        ...stamina,
        sleepSession: {
          ...stamina.sleepSession,
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
