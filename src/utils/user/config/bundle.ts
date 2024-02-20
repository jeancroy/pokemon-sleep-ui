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
  const {userConfig, cookingConfig} = opts;

  const snorlaxFavorite = opts.snorlaxFavorite ?? userConfig.snorlaxFavorite;

  return {
    bundle: {userConfig, cookingConfig},
    snorlaxFavorite,
    // `opts` might have explicit `undefined`, therefore `snorlaxFavorite` goes after `opts` to force override
    calculatedUserConfig: toCalculatedUserConfig({...opts, snorlaxFavorite}),
    calculatedCookingConfig: toCalculatedCookingConfig(opts),
  };
};
