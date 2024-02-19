import isEqual from 'lodash/isEqual';
import {useCustomCompareMemo} from 'use-custom-compare';

import {useConfigBundle} from '@/hooks/userData/config/bundle/main';
import {UseUserDataOpts} from '@/hooks/userData/type';
import {SnorlaxFavorite} from '@/types/game/snorlax';
import {CalculatedConfigBundle, ConfigBundle} from '@/types/userData/config/bundle';
import {ConfigRequiredData} from '@/types/userData/config/data';
import {toCalculatedConfigBundle} from '@/utils/user/config/bundle';


type UseCalculatedConfigBundleOpts = ConfigRequiredData & {
  bundle: UseUserDataOpts<ConfigBundle>,
  snorlaxFavorite?: SnorlaxFavorite,
};

type UseCalculatedConfigBundleReturn = {
  bundle: ConfigBundle,
  calculatedConfigBundle: CalculatedConfigBundle,
};

export const useCalculatedConfigBundle = ({
  mealMap,
  cookingRecoveryData,
  eventStrengthMultiplierData,
  bundle,
  snorlaxFavorite,
}: UseCalculatedConfigBundleOpts): UseCalculatedConfigBundleReturn => {
  const {userConfig, cookingConfig} = useConfigBundle({bundle});

  return useCustomCompareMemo(
    () => ({
      bundle: {userConfig, cookingConfig},
      calculatedConfigBundle: toCalculatedConfigBundle({
        mealMap,
        cookingRecoveryData,
        eventStrengthMultiplierData,
        userConfig,
        cookingConfig,
        snorlaxFavorite,
      }),
    }),
    [userConfig, cookingConfig, snorlaxFavorite],
    (prev, next) => isEqual(prev, next),
  );
};
