import isEqual from 'lodash/isEqual';
import {useCustomCompareMemo} from 'use-custom-compare';

import {useCommonServerData} from '@/contexts/data/common/hook';
import {useConfigBundle} from '@/hooks/userData/config/bundle/main';
import {UseUserDataOpts} from '@/hooks/userData/type';
import {CalculatedConfigBundle, ConfigBundle, ConfigOverride} from '@/types/userData/config/bundle';
import {toCalculatedConfigBundle} from '@/utils/user/config/bundle';


type UseCalculatedConfigBundleOpts = {
  bundle: UseUserDataOpts<ConfigBundle>,
  override?: Partial<ConfigOverride>,
};

export const useCalculatedConfigBundle = ({
  bundle,
  override,
}: UseCalculatedConfigBundleOpts): CalculatedConfigBundle => {
  const {userConfig, cookingConfig} = useConfigBundle({bundle});

  const {
    mealMap,
    cookingRecoveryData,
    eventStrengthMultiplierData,
  } = useCommonServerData();

  return useCustomCompareMemo(
    () => toCalculatedConfigBundle({
      mealMap,
      cookingRecoveryData,
      eventStrengthMultiplierData,
      userConfig,
      cookingConfig,
      override,
    }),
    [userConfig, cookingConfig, override],
    (prev, next) => isEqual(prev, next),
  );
};
