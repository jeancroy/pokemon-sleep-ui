import React from 'react';

import ChevronUpIcon from '@heroicons/react/24/solid/ChevronUpIcon';
import {useTranslations} from 'next-intl';

import {OverallBonusSlider} from '@/components/shared/production/bonus/overall';
import {strengthMultiplierType} from '@/types/game/bonus/strength';
import {UserConfig} from '@/types/userData/config/user/main';
import {UserSettingsSection} from '@/ui/base/navbar/userSettings/sections/base';
import {UserSettingsStrengthMultiplierUI} from '@/ui/base/navbar/userSettings/sections/multiplier/strength';
import {UserConfigMultiplierCommonProps} from '@/ui/base/navbar/userSettings/sections/multiplier/type';


export const UserSettingsMultiplierUI = (props: UserConfigMultiplierCommonProps) => {
  const {
    config,
    setConfig,
  } = props;
  const {bonus} = config;

  const t = useTranslations('UI.UserConfig');

  return (
    <UserSettingsSection titleIcon={<ChevronUpIcon/>} title={t('Section.Multiplier')}>
      <OverallBonusSlider
        title={t('Multiplier.Overall')}
        value={bonus.overall}
        setValue={(overall) => setConfig(({bonus, ...original}) => ({
          ...original,
          bonus: {...bonus, overall},
        } satisfies UserConfig))}
      />
      {strengthMultiplierType.map((type) => (
        <UserSettingsStrengthMultiplierUI key={type} type={type} {...props}/>
      ))}
    </UserSettingsSection>
  );
};
