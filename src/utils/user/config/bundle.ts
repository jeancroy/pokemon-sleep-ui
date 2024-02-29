import {CalculatedConfigBundle, ConfigOverride} from '@/types/userData/config/bundle';
import {cloneMerge} from '@/utils/object/cloneMerge';
import {toCalculatedCookingConfig, ToCalculatedCookingConfigOpts} from '@/utils/user/config/cooking/main';
import {toCalculatedUserConfig, ToCalculatedUserConfigOpts} from '@/utils/user/config/user/main';


type ToCalculatedConfigBundleOpts =
  Omit<ToCalculatedUserConfigOpts, 'snorlaxFavorite'> &
  ToCalculatedCookingConfigOpts & {
    override?: Partial<ConfigOverride>,
  };

export const toCalculatedConfigBundle = ({
  mealMap,
  userConfig,
  override,
  ...opts
}: ToCalculatedConfigBundleOpts): CalculatedConfigBundle => {
  if (override?.stamina) {
    userConfig = cloneMerge(userConfig, {stamina: override.stamina});
  }

  const cookingConfig = override?.cooking ?? opts.cookingConfig;
  const snorlaxFavorite = override?.snorlaxFavorite ?? userConfig.snorlaxFavorite;

  return {
    bundle: {userConfig, cookingConfig},
    snorlaxFavorite,
    // `opts` might have explicit `undefined`, therefore `snorlaxFavorite` goes after `opts` to force override
    calculatedUserConfig: toCalculatedUserConfig({
      ...opts,
      userConfig,
      snorlaxFavorite,
    }),
    calculatedCookingConfig: toCalculatedCookingConfig({
      userConfig,
      cookingConfig,
      mealMap,
    }),
  };
};
