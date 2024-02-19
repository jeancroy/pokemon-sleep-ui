import {SnorlaxFavorite} from '@/types/game/snorlax';
import {CalculatedConfigBundle} from '@/types/userData/config/bundle';
import {toCalculatedCookingConfig, ToCalculatedCookingConfigOpts} from '@/utils/user/config/cooking/main';
import {toCalculatedUserConfig, ToCalculatedUserConfigOpts} from '@/utils/user/config/user/main';


type ToCalculatedConfigBundleOpts =
  Omit<ToCalculatedUserConfigOpts, 'snorlaxFavorite'> &
  ToCalculatedCookingConfigOpts & {
    snorlaxFavorite?: SnorlaxFavorite,
  };

export const toCalculatedConfigBundle = (opts: ToCalculatedConfigBundleOpts): CalculatedConfigBundle => {
  const {userConfig} = opts;

  const snorlaxFavorite = opts.snorlaxFavorite ?? userConfig.snorlaxFavorite;

  return {
    snorlaxFavorite,
    // `opts` might have explicit `undefined`, therefore `snorlaxFavorite` goes after `opts` to force override
    calculatedSettings: toCalculatedUserConfig({...opts, snorlaxFavorite}),
    calculatedCookingSettings: toCalculatedCookingConfig(opts),
  };
};
