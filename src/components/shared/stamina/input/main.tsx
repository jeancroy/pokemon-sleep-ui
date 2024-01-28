import React from 'react';

import {Flex} from '@/components/layout/flex/common';
import {StaminaConfigCookRecovery} from '@/components/shared/stamina/input/cookRecovery/main';
import {StaminaConfigSkillRecovery} from '@/components/shared/stamina/input/skillRecovery/main';
import {StaminaConfigSleepSchedule} from '@/components/shared/stamina/input/sleep/main';
import {StaminaConfigProps} from '@/components/shared/stamina/input/type';


export const StaminaConfig = (props: StaminaConfigProps) => {
  return (
    <Flex className="gap-1.5">
      <Flex className="items-center gap-1.5 lg:flex-row">
        <StaminaConfigSleepSchedule {...props}/>
        <StaminaConfigSkillRecovery {...props}/>
      </Flex>
      <StaminaConfigCookRecovery {...props}/>
    </Flex>
  );
};
