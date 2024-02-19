import {ReactStateUpdaterFromOriginal} from '@/types/react';
import {UserMultiplierConfigRequiredData} from '@/types/userData/config/data';
import {UserConfig} from '@/types/userData/config/user/main';


export type UserConfigMultiplierDataProps = UserMultiplierConfigRequiredData;

export type UserConfigMultiplierCommonProps = UserConfigMultiplierDataProps & {
  config: UserConfig,
  setConfig: ReactStateUpdaterFromOriginal<UserConfig>,
};
