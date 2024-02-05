import {Session} from 'next-auth';

import {UserSettingsCookingDataProps} from '@/ui/base/navbar/userSettings/sections/cooking/type';
import {UserSettingsMapBonusDataProps} from '@/ui/base/navbar/userSettings/sections/mapBonus/type';


export type UserSettingsProps = UserSettingsCookingDataProps & UserSettingsMapBonusDataProps & {
  session: Session | null,
};
