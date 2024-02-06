import React from 'react';

import ChevronUpIcon from '@heroicons/react/24/solid/ChevronUpIcon';
import {useTranslations} from 'next-intl';

import {OverallBonusSlider} from '@/components/shared/production/bonus/overall';
import {strengthMultiplierType} from '@/types/game/bonus/strength';
import {UserSettings} from '@/types/userData/settings/main';
import {UserSettingsSection} from '@/ui/base/navbar/userSettings/sections/base';
import {UserSettingsStrengthMultiplierUI} from '@/ui/base/navbar/userSettings/sections/multiplier/strength';
import {UserSettingsMultiplierCommonProps} from '@/ui/base/navbar/userSettings/sections/multiplier/type';


export const UserSettingsMultiplierUI = (props: UserSettingsMultiplierCommonProps) => {
  const {
    settings,
    setSettings,
  } = props;
  const {bonus} = settings;

  const t = useTranslations('UI.UserSettings');

  return (
    <UserSettingsSection titleIcon={<ChevronUpIcon/>} title={t('Section.Multiplier')}>
      <OverallBonusSlider
        title={t('Multiplier.Overall')}
        value={bonus.overall}
        setValue={(overall) => setSettings(({bonus, ...original}) => ({
          ...original,
          bonus: {...bonus, overall},
        } satisfies UserSettings))}
      />
      {strengthMultiplierType.map((type) => (
        <UserSettingsStrengthMultiplierUI key={type} type={type} {...props}/>
      ))}
    </UserSettingsSection>
  );
};
