import React from 'react';

import {useCookingConfig} from '@/hooks/userData/config/cooking';
import {useUserConfig} from '@/hooks/userData/config/user';
import {UseUserDataOpts} from '@/hooks/userData/type';
import {ConfigBundle} from '@/types/userData/config/bundle';


type UseConfigBundleOpts = {
  bundle: UseUserDataOpts<ConfigBundle>,
};

export const useConfigBundle = ({bundle}: UseConfigBundleOpts): ConfigBundle => {
  const {server, client} = bundle;

  const userConfig = useUserConfig({
    server: server.userConfig,
    client: client?.userConfig,
  });
  const cookingConfig = useCookingConfig({
    server: server.cookingConfig,
    client: client?.cookingConfig,
  });

  // This `useMemo()` is required, otherwise this could trigger infinite re-render
  return React.useMemo(() => ({
    userConfig,
    cookingConfig,
  }), [userConfig, cookingConfig]);
};
