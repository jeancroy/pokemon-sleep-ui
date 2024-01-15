import {Session} from 'next-auth';

import {SleepMapId} from '@/types/game/sleepStyle';
import {UserSettingsCookingDataProps} from '@/ui/base/navbar/userSettings/sections/cooking/type';


export type UserSettingsProps = UserSettingsCookingDataProps & {
  session: Session | null,
  mapIds: SleepMapId[],
  maxMapBonusPercent: number,
};
