import {Session} from 'next-auth';

import {UserConfigCookingDataProps} from '@/ui/base/navbar/userConfig/sections/cooking/type';
import {UserConfigMapBonusDataProps} from '@/ui/base/navbar/userConfig/sections/mapBonus/type';
import {UserConfigMultiplierDataProps} from '@/ui/base/navbar/userConfig/sections/multiplier/type';


export type UserConfigProps =
  UserConfigCookingDataProps &
  UserConfigMapBonusDataProps &
  UserConfigMultiplierDataProps & {
    session: Session | null,
  };
