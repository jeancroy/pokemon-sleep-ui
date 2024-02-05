import React from 'react';

import ChevronUpIcon from '@heroicons/react/24/solid/ChevronUpIcon';
import {useTranslations} from 'next-intl';

import {OverallBonusSlider} from '@/components/shared/production/bonus/overall';
import {ReactStateUpdaterFromOriginal} from '@/types/react';
import {UserSettings} from '@/types/userData/settings/main';
import {UserSettingsSection} from '@/ui/base/navbar/userSettings/sections/base';


type Props = {
  settings: UserSettings,
  setSettings: ReactStateUpdaterFromOriginal<UserSettings>,
};

export const UserSettingsMultiplierUI = ({
  settings,
  setSettings,
}: Props) => {
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
        }))}
      />
    </UserSettingsSection>
  );
};
