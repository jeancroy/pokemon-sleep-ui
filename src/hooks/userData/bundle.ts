import React from 'react';

import {useUserSettings} from '@/hooks/userData/settings';
import {useUserCookingSettings} from '@/hooks/userData/settings/cooking';
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
  const cooking = useUserCookingSettings({
    server: server.cooking,
    client: client?.cooking,
  });

  // This `useMemo()` is required, otherwise this could trigger infinite re-render
  return React.useMemo(() => ({
    settings,
    cooking,
  }), [settings, cooking]);
};
