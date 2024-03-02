import React from 'react';

import LanguageIcon from '@heroicons/react/24/outline/LanguageIcon';
import {clsx} from 'clsx';
import {useTranslations} from 'next-intl';

import {Grid} from '@/components/layout/grid';
import {localeName} from '@/const/website';
import {useLanguageSwitch} from '@/ui/base/navbar/languageSwitch/hook';
import {UserConfigSection} from '@/ui/base/navbar/userConfig/sections/base';


export const UserConfigLanguage = () => {
  const t = useTranslations('UI.UserConfig');
  const {currentLocale, isPending, onLocaleSwitch} = useLanguageSwitch();

  return (
    <UserConfigSection titleIcon={<LanguageIcon/>} title={t('Section.Language')}>
      <Grid className={clsx(
        'auto-cols-fr grid-cols-3 gap-2 lg:grid-flow-col lg:grid-cols-none lg:grid-rows-2 2xl:grid-rows-1',
      )}>
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
    </UserConfigSection>
  );
};
