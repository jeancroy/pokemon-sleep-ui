import isEqual from 'lodash/isEqual';
import {useCustomCompareMemo} from 'use-custom-compare';

import {CalculatedCookingSettings} from '@/types/userData/settings/cooking';
import {toCalculatedCookingSettings, ToCalculatedCookingSettingsOpts} from '@/utils/user/settings/cooking/main';


export const useCalculatedCookingSettings = ({
  settings,
  cooking,
  mealMap,
}: ToCalculatedCookingSettingsOpts): CalculatedCookingSettings => {
  return useCustomCompareMemo(
    () => toCalculatedCookingSettings({
      settings,
      cooking,
      mealMap,
    }),
    [cooking, mealMap],
    (prev, next) => isEqual(prev, next),
  );
};
