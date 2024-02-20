import {Session} from 'next-auth';

import {defaultCookingConfig} from '@/const/user/config/cooking';
import {defaultUserConfig} from '@/const/user/config/user';
import {ConfigBundle} from '@/types/userData/config/bundle';
import {CookingConfig} from '@/types/userData/config/cooking/main';
import {UserConfig} from '@/types/userData/config/user/main';
import {cloneMerge} from '@/utils/object/cloneMerge';
import {DeepPartial} from '@/utils/type';


export const createUserConfig = (userConfig: DeepPartial<UserConfig> | undefined): UserConfig => {
  return cloneMerge(defaultUserConfig, userConfig);
};

export const createCookingConfig = (cookingConfig: DeepPartial<CookingConfig> | undefined): CookingConfig => {
  // Needs to explicitly type because the base `defaultCookingConfig` has all of its values non-nullable by default
  return cloneMerge<CookingConfig>(defaultCookingConfig, cookingConfig);
};

export const createConfigBundle = (session: Session | null): ConfigBundle => ({
  userConfig: createUserConfig(session?.user.preloaded.userConfig),
  cookingConfig: createCookingConfig(session?.user.preloaded.cookingConfig),
});
