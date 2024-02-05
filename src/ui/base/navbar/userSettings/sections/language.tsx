import React from 'react';

import LanguageIcon from '@heroicons/react/24/outline/LanguageIcon';
import {clsx} from 'clsx';
import {useTranslations} from 'next-intl';

import {Grid} from '@/components/layout/grid';
import {localeName} from '@/const/website';
import {useLanguageSwitch} from '@/ui/base/navbar/languageSwitch/hook';
import {UserSettingsSection} from '@/ui/base/navbar/userSettings/sections/base';


export const UserSettingsLanguage = () => {
  const t = useTranslations('UI.UserSettings');
  const {currentLocale, isPending, onLocaleSwitch} = useLanguageSwitch();

  return (
    <UserSettingsSection titleIcon={<LanguageIcon/>} title={t('Section.Language')}>
      <Grid className="auto-cols-fr grid-cols-3 gap-2 lg:grid-flow-col lg:grid-cols-none lg:grid-rows-1">
        {Object.entries(localeName).map(([locale, name]) => (
          <button
            key={locale}
            disabled={isPending || currentLocale === locale}
            onClick={() => onLocaleSwitch(locale)}
            className={clsx(
              'button-common-lg p-3',
              'enabled:button-clickable-bg disabled:button-disabled-border',
            )}
          >
            {name}
          </button>
        ))}
      </Grid>
    </UserSettingsSection>
  );
};
