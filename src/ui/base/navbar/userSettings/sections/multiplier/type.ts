import {ReactStateUpdaterFromOriginal} from '@/types/react';
import {UserSettings} from '@/types/userData/settings/main';


export type UserSettingsMultiplierCommonProps = {
  settings: UserSettings,
  setSettings: ReactStateUpdaterFromOriginal<UserSettings>,
};
