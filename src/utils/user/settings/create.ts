import {Session} from 'next-auth';

import {defaultCookingPreset} from '@/const/user/cooking';
import {defaultUserSettings} from '@/const/user/settings';
import {UserCookingPreset} from '@/types/userData/cooking';
import {UserSettings, UserSettingsBundle} from '@/types/userData/settings/main';
import {cloneMerge} from '@/utils/object/cloneMerge';
import {DeepPartial} from '@/utils/type';


export const createUserSettings = (settings: DeepPartial<UserSettings> | undefined): UserSettings => {
  return cloneMerge(defaultUserSettings, settings);
};

export const createUserCookingPreset = (cooking: DeepPartial<UserCookingPreset> | undefined): UserCookingPreset => {
  return cloneMerge(defaultCookingPreset, cooking);
};

export const createUserSettingsBundle = (session: Session | null): UserSettingsBundle => ({
  settings: createUserSettings(session?.user.preloaded.settings),
  cooking: createUserCookingPreset(session?.user.preloaded.cooking),
});
