import isEqual from 'lodash/isEqual';
import {useCustomCompareMemo} from 'use-custom-compare';

import {useUserSettingsBundle} from '@/hooks/userData/bundle';
import {UseUserDataOpts} from '@/hooks/userData/type';
import {SnorlaxFavorite} from '@/types/game/snorlax';
import {UserSettingsBundle, UserSettingsRequiredData} from '@/types/userData/settings/main';
import {TranslatedUserSettings} from '@/types/userData/settings/transformed';
import {toTranslatedSettings} from '@/utils/user/settings/translated';


type UseTranslatedUserSettingsOpts = UserSettingsRequiredData & {
  bundle: UseUserDataOpts<UserSettingsBundle>,
  snorlaxFavorite?: SnorlaxFavorite,
};

type UseTranslatedUserSettingsReturn = {
  bundle: UserSettingsBundle,
  translatedSettings: TranslatedUserSettings,
};

export const useTranslatedUserSettings = ({
  mealMap,
  cookingRecoveryData,
  eventStrengthMultiplierData,
  bundle,
  snorlaxFavorite,
}: UseTranslatedUserSettingsOpts): UseTranslatedUserSettingsReturn => {
  const {settings, cooking} = useUserSettingsBundle({bundle});

  return useCustomCompareMemo(
    () => ({
      bundle: {settings, cooking},
      translatedSettings: toTranslatedSettings({
        mealMap,
        cookingRecoveryData,
        eventStrengthMultiplierData,
        settings,
        cooking,
        snorlaxFavorite,
      }),
    }),
    [settings, cooking, snorlaxFavorite],
    (prev, next) => isEqual(prev, next),
  );
};
