import React from 'react';

import {useUserCookingPreset} from '@/hooks/userData/cookingPreset';
import {useUserSettings} from '@/hooks/userData/settings';
import {UseUserDataOpts} from '@/hooks/userData/type';
import {UserSettingsBundle} from '@/types/userData/settings/main';


type UseTranslatedUserSettingsOpts = {
  bundle: UseUserDataOpts<UserSettingsBundle>,
};

export const useUserSettingsBundle = ({bundle}: UseTranslatedUserSettingsOpts): UserSettingsBundle => {
  const {server, client} = bundle;

  const settings = useUserSettings({
    server: server.settings,
    client: client?.settings,
  });
  const cooking = useUserCookingPreset({
    server: server.cooking,
    client: client?.cooking,
  });

  // This `useMemo()` is required, otherwise this could trigger infinite re-render
  return React.useMemo(() => ({
    settings,
    cooking,
  }), [settings, cooking]);
};
