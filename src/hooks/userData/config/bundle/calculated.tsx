import isEqual from 'lodash/isEqual';
import {useCustomCompareMemo} from 'use-custom-compare';

import {useConfigBundle} from '@/hooks/userData/config/bundle/main';
import {UseUserDataOpts} from '@/hooks/userData/type';
import {CalculatedConfigBundle, ConfigBundle, ConfigOverride} from '@/types/userData/config/bundle';
import {ConfigRequiredData} from '@/types/userData/config/data';
import {toCalculatedConfigBundle} from '@/utils/user/config/bundle';


type UseCalculatedConfigBundleOpts = ConfigRequiredData & {
  bundle: UseUserDataOpts<ConfigBundle>,
  override?: Partial<ConfigOverride>,
};

export const useCalculatedConfigBundle = ({
  mealMap,
  cookingRecoveryData,
  eventStrengthMultiplierData,
  bundle,
  override,
}: UseCalculatedConfigBundleOpts): CalculatedConfigBundle => {
  const {userConfig, cookingConfig} = useConfigBundle({bundle});

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
