import isEqual from 'lodash/isEqual';
import {useCustomCompareMemo} from 'use-custom-compare';

import {useUserSettingsBundle} from '@/hooks/userData/bundle';
import {UseUserDataOpts} from '@/hooks/userData/type';
import {SnorlaxFavorite} from '@/types/game/snorlax';
import {UserCookingPreset} from '@/types/userData/cooking';
import {CookingUserSettingsRequiredData} from '@/types/userData/settings/cooking';
import {
  UserSettings,
  UserSettingsBundle,
} from '@/types/userData/settings/main';
import {TranslatedUserSettings} from '@/types/userData/settings/transformed';
import {toTranslatedSettings} from '@/utils/user/settings/translated';


type UseTranslatedUserSettingsOpts = CookingUserSettingsRequiredData & {
  bundle: UseUserDataOpts<UserSettingsBundle>,
  snorlaxFavorite?: SnorlaxFavorite,
};

type UseTranslatedUserSettingsReturn = {
  settings: UserSettings,
  cooking: UserCookingPreset,
  translatedSettings: TranslatedUserSettings,
};

export const useTranslatedUserSettings = ({
  mealMap,
  cookingRecoveryData,
  bundle,
  snorlaxFavorite,
}: UseTranslatedUserSettingsOpts): UseTranslatedUserSettingsReturn => {
  const {settings, cooking} = useUserSettingsBundle({bundle});

  return useCustomCompareMemo(
    () => ({
      settings,
      cooking,
      translatedSettings: toTranslatedSettings({
        mealMap,
        cookingRecoveryData,
        settings,
        cooking,
        snorlaxFavorite,
      }),
    }),
    [settings, cooking, snorlaxFavorite],
    (prev, next) => isEqual(prev, next),
  );
};
