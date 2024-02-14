import isEqual from 'lodash/isEqual';
import {useCustomCompareMemo} from 'use-custom-compare';

import {CookingUserSettings} from '@/types/userData/settings/cooking';
import {toCookingUserSettings, ToCookingUserSettingsOpts} from '@/utils/user/settings/cooking/main';


export const useCookingUserSettings = ({
  settings,
  cooking,
  mealMap,
}: ToCookingUserSettingsOpts): CookingUserSettings => {
  return useCustomCompareMemo(
    () => toCookingUserSettings({
      settings,
      cooking,
      mealMap,
    }),
    [cooking, mealMap],
    (prev, next) => isEqual(prev, next),
  );
};
