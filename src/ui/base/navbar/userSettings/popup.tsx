import React from 'react';

import {useTranslations} from 'next-intl';

import {Flex} from '@/components/layout/flex/common';
import {PopupCommon} from '@/components/popup/common/main';
import {defaultCookingPreset} from '@/const/user/cooking';
import {defaultUserSettings} from '@/const/user/settings';
import {useUserDataActor} from '@/hooks/userData/actor/main';
import {ReactStateUpdaterFromOriginal} from '@/types/react';
import {UserSettingsBundle} from '@/types/userData/settings/main';
import {UserSettingsAccountInfo} from '@/ui/base/navbar/userSettings/sections/account';
import {UserSettingsAppInfo} from '@/ui/base/navbar/userSettings/sections/app/main';
import {UserCalculationBehaviorUI} from '@/ui/base/navbar/userSettings/sections/behavior';
import {UserSettingsBonusUI} from '@/ui/base/navbar/userSettings/sections/bonus/main';
import {UserSettingsCooking} from '@/ui/base/navbar/userSettings/sections/cooking/main';
import {UserSettingsLanguage} from '@/ui/base/navbar/userSettings/sections/language';
import {UserSettingsStamina} from '@/ui/base/navbar/userSettings/sections/stamina';
import {UserSettingsProps} from '@/ui/base/navbar/userSettings/type';
import {migrate} from '@/utils/migrate/main';
import {userSettingsMigrators} from '@/utils/migrate/userSettings/migrators';
import {cloneMerge} from '@/utils/object/cloneMerge';


type Props = UserSettingsProps & {
  show: boolean,
  setShow: React.Dispatch<React.SetStateAction<boolean>>,
};

export const UserSettingsPopup = ({
  session,
  show,
  setShow,
  ...props
}: Props) => {
  const t = useTranslations('UI.UserSettings');
  const {act} = useUserDataActor({statusToast: true});
  const [bundle, setBundleInternal] = React.useState<UserSettingsBundle>({
    settings: migrate({
      original: defaultUserSettings,
      override: session?.user.preloaded.settings ?? null,
      migrators: userSettingsMigrators,
      migrateParams: {},
    }),
    cooking: {
      ...defaultCookingPreset,
      ...session?.user.preloaded.cooking,
    },
  });

  const {settings, cooking} = bundle;
  const setBundle: ReactStateUpdaterFromOriginal<UserSettingsBundle> = (getUpdated) => {
    // Only really update the state if the user is logged in
    if (!session) {
      return;
    }

    setBundleInternal(getUpdated);
  };

  return (
    <PopupCommon show={show} setShow={(show) => {
      if (act) {
        act({action: 'upload', options: {type: 'settings', data: bundle}});
      }

      setShow(show);
    }}>
      <Flex className="gap-1.5 sm:w-[70vw]">
        {session && <UserSettingsAccountInfo session={session}/>}
        {!session && (
          <div className="rounded-lg bg-rose-300 p-2 text-lg dark:bg-rose-700">
            {t('Message.SettingsNotStored')}
          </div>
        )}
        <UserSettingsStamina
          {...props}
          config={settings.stamina}
          setConfig={(stamina) => setBundle(({settings, ...original}) => ({
            ...original,
            settings: {...settings, stamina},
          } satisfies UserSettingsBundle))}
          setTrigger={(recovery) => setBundle(({settings, ...original}) => ({
            ...original,
            settings: cloneMerge(settings, {stamina: {skillRecovery: {recovery}}}),
          } satisfies UserSettingsBundle))}
        />
        <UserCalculationBehaviorUI
          behavior={settings.behavior}
          setBehavior={(behavior) => setBundle(({settings, ...original}) => ({
            ...original,
            settings: {...settings, behavior},
          } satisfies UserSettingsBundle))}
        />
        <UserSettingsCooking
          cookingPreset={cooking}
          setCookingPreset={(updated) => setBundle(({cooking, ...original}) => ({
            ...original,
            cooking: cloneMerge(cooking, updated),
          } satisfies UserSettingsBundle))}
          {...props}
        />
        <UserSettingsBonusUI
          bonus={settings.bonus}
          setBonus={(bonus) => setBundle(({settings, ...original}) => ({
            ...original,
            settings: {...settings, bonus},
          } satisfies UserSettingsBundle))}
          settings={settings}
          setSettings={(getUpdated) => setBundle(({settings, ...original}) => ({
            ...original,
            settings: getUpdated(settings),
          }))}
          {...props}
        />
        <UserSettingsLanguage/>
        <UserSettingsAppInfo/>
      </Flex>
    </PopupCommon>
  );
};
