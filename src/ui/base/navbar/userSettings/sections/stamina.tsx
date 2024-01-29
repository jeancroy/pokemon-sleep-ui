import React from 'react';

import {useTranslations} from 'next-intl';

import {GenericIcon} from '@/components/shared/icon/common/main';
import {StaminaEfficiencyUI} from '@/components/shared/stamina/efficiency/main';
import {StaminaConfig} from '@/components/shared/stamina/input/main';
import {StaminaConfigProps} from '@/components/shared/stamina/input/type';
import {UserSettingsSection} from '@/ui/base/navbar/userSettings/sections/base';
import {getSleepSessionInfo} from '@/utils/game/sleep';
import {getStaminaEfficiency} from '@/utils/game/stamina/main';


export const UserSettingsStamina = (props: StaminaConfigProps) => {
  const {config, trigger, cookingRecoveryData} = props;
  const {sleepSession, recoveryRate} = config;

  const t = useTranslations('UI.Stamina');

  const sessionInfo = getSleepSessionInfo({
    session: sleepSession,
    recoveryRate,
  });

  return (
    <UserSettingsSection titleIcon={
      <GenericIcon src="/images/generic/mood.png" noWrap alt={t('Title')}/>
    }>
      <StaminaConfig {...props}/>
      <StaminaEfficiencyUI efficiency={getStaminaEfficiency({
        config,
        sessionInfo,
        skillTriggers: [trigger],
        cookingRecoveryData,
      })}/>
    </UserSettingsSection>
  );
};
