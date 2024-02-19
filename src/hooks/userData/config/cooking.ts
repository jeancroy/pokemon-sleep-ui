import isEqual from 'lodash/isEqual';
import {useCustomCompareMemo} from 'use-custom-compare';

import {UseUserDataOpts} from '@/hooks/userData/type';
import {CookingConfig} from '@/types/userData/config/cooking/main';
import {cloneMerge} from '@/utils/object/cloneMerge';


export const useCookingConfig = ({
  server,
  client,
}: UseUserDataOpts<CookingConfig>): CookingConfig => {
  return useCustomCompareMemo(
    () => cloneMerge(server, client),
    [server, client],
    (prev, next) => isEqual(prev, next),
  );
};
