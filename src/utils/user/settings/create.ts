import {Session} from 'next-auth';

import {defaultUserCookingSettings} from '@/const/user/cooking';
import {defaultUserSettings} from '@/const/user/settings';
import {UserCookingSettings} from '@/types/userData/settings/cooking/settings';
import {UserSettings, UserSettingsBundle} from '@/types/userData/settings/main';
import {cloneMerge} from '@/utils/object/cloneMerge';
import {DeepPartial} from '@/utils/type';


export const createUserSettings = (settings: DeepPartial<UserSettings> | undefined): UserSettings => {
  return cloneMerge(defaultUserSettings, settings);
};

export const createUserCookingSettings = (
  cooking: DeepPartial<UserCookingSettings> | undefined,
): UserCookingSettings => {
  return cloneMerge(defaultUserCookingSettings, cooking);
};

export const createUserSettingsBundle = (session: Session | null): UserSettingsBundle => ({
  settings: createUserSettings(session?.user.preloaded.settings),
  cooking: createUserCookingSettings(session?.user.preloaded.cooking),
});
