import React from 'react';

import {Flex} from '@/components/layout/flex/common';
import {StaminaConfigSkillRecovery} from '@/components/shared/stamina/input/skillRecovery/main';
import {StaminaConfigSleepSession} from '@/components/shared/stamina/input/sleep/session';
import {StaminaConfigProps} from '@/components/shared/stamina/input/type';
import {defaultStaminaCalcConfig} from '@/const/user/settings';


export const StaminaConfig = (props: StaminaConfigProps) => {
  const {config, setConfig} = props;
  const {sleepSession} = config;

  return (
    <Flex className="items-center gap-1.5 lg:flex-row">
      <Flex className="gap-1.5">
        <StaminaConfigSleepSession {...props} session="primary" num={1}/>
        <StaminaConfigSleepSession
          {...props}
          session="secondary"
          num={2}
          isActive={!!sleepSession.secondary}
          onClick={() => setConfig({
            ...config,
            sleepSession: {
              ...sleepSession,
              secondary: sleepSession.secondary ? null : defaultStaminaCalcConfig.sleepSession.secondary,
            },
          })}
        />
      </Flex>
      <StaminaConfigSkillRecovery {...props}/>
    </Flex>
  );
};
