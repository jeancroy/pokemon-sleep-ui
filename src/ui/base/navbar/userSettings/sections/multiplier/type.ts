import {ReactStateUpdaterFromOriginal} from '@/types/react';
import {UserSettings} from '@/types/userData/settings/main';
import {UserMultiplierSettingsRequiredData} from '@/types/userData/settings/multiplier';


export type UserSettingsMultiplierDataProps = UserMultiplierSettingsRequiredData;

export type UserSettingsMultiplierCommonProps = UserSettingsMultiplierDataProps & {
  settings: UserSettings,
  setSettings: ReactStateUpdaterFromOriginal<UserSettings>,
};
