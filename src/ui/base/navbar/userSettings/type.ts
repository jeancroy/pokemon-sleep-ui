import {Session} from 'next-auth';

import {UserSettingsCookingDataProps} from '@/ui/base/navbar/userSettings/sections/cooking/type';
import {UserSettingsMapBonusDataProps} from '@/ui/base/navbar/userSettings/sections/mapBonus/type';
import {UserSettingsMultiplierDataProps} from '@/ui/base/navbar/userSettings/sections/multiplier/type';


export type UserSettingsProps =
  UserSettingsCookingDataProps &
  UserSettingsMapBonusDataProps &
  UserSettingsMultiplierDataProps & {
    session: Session | null,
  };
