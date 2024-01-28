import React from 'react';

import {useTranslations} from 'next-intl';

import {Flex} from '@/components/layout/flex/common';
import {SleepIcon} from '@/components/shared/icon/sleep';
import {staminaConfigSectionStyling} from '@/components/shared/stamina/input/const';
import {StaminaConfigSleepSession} from '@/components/shared/stamina/input/sleep/session';
import {StaminaConfigProps} from '@/components/shared/stamina/input/type';
import {defaultStaminaCalcConfig} from '@/const/user/settings';


export const StaminaConfigSleepSchedule = (props: StaminaConfigProps) => {
  const {config, setConfig} = props;
  const {sleepSession} = config;

  const t = useTranslations('UI.Stamina');
  const title = t('SleepSchedule');

  return (
    <Flex className={staminaConfigSectionStyling}>
      <Flex direction="row" className="gap-1">
        <SleepIcon alt={title} dimension="size-6" noShrink/>
        <span>{title}</span>
      </Flex>
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
  );
};
