import React from 'react';

import {defaultUserConfig} from '@/const/user/config/user';
import {UseUserDataOpts} from '@/hooks/userData/type';
import {UserConfig} from '@/types/userData/config/user/main';
import {migrate} from '@/utils/migrate/main';
import {userConfigMigrators} from '@/utils/migrate/userConfig/migrators';
import {cloneMerge} from '@/utils/object/cloneMerge';


export const useUserConfig = ({server, client}: UseUserDataOpts<UserConfig>): UserConfig => {
  return React.useMemo(() => migrate({
    original: defaultUserConfig,
    override: cloneMerge(server, client),
    migrators: userConfigMigrators,
    migrateParams: {},
  }), [client, server]);
};
