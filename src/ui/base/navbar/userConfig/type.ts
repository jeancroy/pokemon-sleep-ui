import {Session} from 'next-auth';

import {CookingConfigDataProps} from '@/components/shared/cooking/config/type';
import {UserConfigMapBonusDataProps} from '@/ui/base/navbar/userConfig/sections/mapBonus/type';
import {UserConfigMultiplierDataProps} from '@/ui/base/navbar/userConfig/sections/multiplier/type';


export type UserConfigProps =
  CookingConfigDataProps &
  UserConfigMapBonusDataProps &
  UserConfigMultiplierDataProps & {
    session: Session | null,
  };
