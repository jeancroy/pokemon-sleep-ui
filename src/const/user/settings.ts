import {UserBonus} from '@/types/game/bonus';
import {StaminaCalcConfig} from '@/types/game/producing/stamina';
import {UserSettings} from '@/types/userData/settings';


export const defaultMapBonus = 0;

export const defaultUserBonus: UserBonus = {
  overall: 125,
  map: {},
  ingredient: 20,
};

export const defaultStaminaCalcConfig: StaminaCalcConfig = {
  sleepSession: {
    primary: {
      start: 82800, // 23:00
      end: 21600, // 06:00 (7 hrs)
    },
    secondary: {
      start: 46800, // 13:00
      end: 52200, // 14:30 (1.5 hrs)
    },
  },
  skillRecovery: {
    strategy: 'optimistic',
    dailyCount: 3,
    amount: 18,
  },
};

export const defaultUserSettings: UserSettings = {
  bonus: defaultUserBonus,
  stamina: defaultStaminaCalcConfig,
  currentMap: 1,
  version: 2,
};
