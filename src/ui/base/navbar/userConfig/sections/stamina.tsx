import React from 'react';

import {useTranslations} from 'next-intl';

import {EnergyIcon} from '@/components/shared/icon/energy';
import {StaminaEfficiencyUI} from '@/components/shared/stamina/efficiency/main';
import {StaminaConfig} from '@/components/shared/stamina/input/main';
import {StaminaConfigProps} from '@/components/shared/stamina/input/type';
import {UserConfigSection} from '@/ui/base/navbar/userConfig/sections/base';
import {getStaminaEfficiency} from '@/utils/game/stamina/main';


export const UserConfigStamina = (props: StaminaConfigProps) => {
  const {bundle, cookingRecoveryData} = props;

  const t = useTranslations('UI.Stamina');
  const t2 = useTranslations('UI.UserConfig');

  return (
    <UserConfigSection
      titleIcon={<EnergyIcon noWrap alt={t('Title')}/>}
      title={t2('Section.Stamina')}
    >
      <StaminaConfig {...props}/>
      <StaminaEfficiencyUI efficiency={getStaminaEfficiency({
        config: bundle.userConfig.stamina,
        cookingRecoveryData,
      })}/>
    </UserConfigSection>
  );
};
