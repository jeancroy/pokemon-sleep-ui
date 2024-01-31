import {Session} from 'next-auth';

import {UserSettingsBonusDataProps} from '@/ui/base/navbar/userSettings/sections/bonus/type';
import {UserSettingsCookingDataProps} from '@/ui/base/navbar/userSettings/sections/cooking/type';


export type UserSettingsProps = UserSettingsCookingDataProps & UserSettingsBonusDataProps & {
  session: Session | null,
};
