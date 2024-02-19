import isEqual from 'lodash/isEqual';
import {useCustomCompareMemo} from 'use-custom-compare';

import {UseUserDataOpts} from '@/hooks/userData/type';
import {UserCookingSettings} from '@/types/userData/settings/cooking/settings';
import {cloneMerge} from '@/utils/object/cloneMerge';


export const useUserCookingSettings = ({
  server,
  client,
}: UseUserDataOpts<UserCookingSettings>): UserCookingSettings => {
  return useCustomCompareMemo(
    () => cloneMerge(server, client),
    [server, client],
    (prev, next) => isEqual(prev, next),
  );
};
