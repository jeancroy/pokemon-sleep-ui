import React from 'react';

import {useTranslations} from 'next-intl';

import {Flex} from '@/components/layout/flex/common';
import {PopupCommon} from '@/components/popup/common/main';
import {defaultCookingConfig} from '@/const/user/config/cooking';
import {defaultUserConfig} from '@/const/user/config/user';
import {useUserDataActor} from '@/hooks/userData/actor/main';
import {ReactStateUpdaterFromOriginal} from '@/types/react';
import {ConfigBundle} from '@/types/userData/config/bundle';
import {UserSettingsAccountInfo} from '@/ui/base/navbar/userSettings/sections/account';
import {UserSettingsAppInfo} from '@/ui/base/navbar/userSettings/sections/app/main';
import {UserCalculationBehaviorUI} from '@/ui/base/navbar/userSettings/sections/behavior';
import {UserSettingsCooking} from '@/ui/base/navbar/userSettings/sections/cooking/main';
import {UserSettingsLanguage} from '@/ui/base/navbar/userSettings/sections/language';
import {UserSettingsMapBonusUI} from '@/ui/base/navbar/userSettings/sections/mapBonus/main';
import {UserSettingsMultiplierUI} from '@/ui/base/navbar/userSettings/sections/multiplier/main';
import {UserSettingsStamina} from '@/ui/base/navbar/userSettings/sections/stamina';
import {UserSettingsProps} from '@/ui/base/navbar/userSettings/type';
import {migrate} from '@/utils/migrate/main';
import {userConfigMigrators} from '@/utils/migrate/userConfig/migrators';
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
  const t = useTranslations('UI.UserConfig');
  const {act} = useUserDataActor({statusToast: true});
  const [bundle, setBundleInternal] = React.useState<ConfigBundle>({
    userConfig: migrate({
      original: defaultUserConfig,
      override: session?.user.preloaded.userConfig ?? null,
      migrators: userConfigMigrators,
      migrateParams: {},
    }),
    cookingConfig: {
      ...defaultCookingConfig,
      ...session?.user.preloaded.cookingConfig,
    },
  });

  const {userConfig, cookingConfig} = bundle;
  const setBundle: ReactStateUpdaterFromOriginal<ConfigBundle> = (getUpdated) => {
    // Only really update the state if the user is logged in
    if (!session) {
      return;
    }

    setBundleInternal(getUpdated);
  };

  return (
    <PopupCommon show={show} setShow={(show) => {
      if (act) {
        act({action: 'upload', options: {type: 'config.bundle', data: bundle}});
      }

      setShow(show);
    }}>
      <Flex className="gap-1.5 sm:w-[70vw]">
        {session && <UserSettingsAccountInfo session={session}/>}
        {!session && (
          <div className="rounded-lg bg-rose-300 p-2 text-lg dark:bg-rose-700">
            {t('Message.ConfigNotStored')}
          </div>
        )}
        <UserSettingsStamina
          {...props}
          config={userConfig.stamina}
          setConfig={(stamina) => setBundle(({userConfig, ...original}) => ({
            ...original,
            userConfig: {...userConfig, stamina},
          } satisfies ConfigBundle))}
          setTrigger={(recovery) => setBundle(({userConfig, ...original}) => ({
            ...original,
            userConfig: cloneMerge(userConfig, {stamina: {skillRecovery: {recovery}}}),
          } satisfies ConfigBundle))}
        />
        <UserCalculationBehaviorUI
          behavior={userConfig.behavior}
          setBehavior={(behavior) => setBundle(({userConfig, ...original}) => ({
            ...original,
            userConfig: {...userConfig, behavior},
          } satisfies ConfigBundle))}
        />
        <UserSettingsCooking
          cookingSettings={cookingConfig}
          setCookingSettings={(updated) => setBundle(({cookingConfig, ...original}) => ({
            ...original,
            cookingConfig: cloneMerge(cookingConfig, updated),
          } satisfies ConfigBundle))}
          {...props}
        />
        <UserSettingsMapBonusUI
          bonus={userConfig.bonus}
          setBonus={(bonus) => setBundle(({userConfig, ...original}) => ({
            ...original,
            userConfig: {...userConfig, bonus},
          } satisfies ConfigBundle))}
          config={userConfig}
          setConfig={(getUpdated) => setBundle(({userConfig, ...original}) => ({
            ...original,
            userConfig: getUpdated(userConfig),
          } satisfies ConfigBundle))}
          {...props}
        />
        <UserSettingsMultiplierUI
          config={userConfig}
          setConfig={(getUpdated) => setBundle(({userConfig, ...original}) => ({
            ...original,
            userConfig: getUpdated(userConfig),
          } satisfies ConfigBundle))}
          {...props}
        />
        <UserSettingsLanguage/>
        <UserSettingsAppInfo/>
      </Flex>
    </PopupCommon>
  );
};
