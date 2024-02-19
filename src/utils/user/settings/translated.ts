import {SnorlaxFavorite} from '@/types/game/snorlax';
import {TranslatedUserSettings} from '@/types/userData/settings/transformed';
import {toCalculatedUserSettings, ToCalculatedUserSettingsOpts} from '@/utils/user/settings/calculated';
import {toCalculatedCookingSettings, ToCalculatedCookingSettingsOpts} from '@/utils/user/settings/cooking/main';


type ToTranslatedSettingsOpts =
  Omit<ToCalculatedUserSettingsOpts, 'snorlaxFavorite'> &
  ToCalculatedCookingSettingsOpts & {
    snorlaxFavorite?: SnorlaxFavorite,
  };

export const toTranslatedSettings = (opts: ToTranslatedSettingsOpts): TranslatedUserSettings => {
  const {settings} = opts;

  const snorlaxFavorite = opts.snorlaxFavorite ?? settings.snorlaxFavorite;

  return {
    snorlaxFavorite,
    // `opts` might have explicit `undefined`, therefore `snorlaxFavorite` goes after `opts` to force override
    calculatedSettings: toCalculatedUserSettings({...opts, snorlaxFavorite}),
    calculatedCookingSettings: toCalculatedCookingSettings(opts),
  };
};
