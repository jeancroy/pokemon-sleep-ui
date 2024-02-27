import {defaultSnorlaxFavorite} from '@/const/game/snorlax';
import {UserBonus} from '@/types/game/bonus/main';
import {StaminaCalcConfig} from '@/types/game/stamina/config';
import {StaminaGeneralRecoveryConfig} from '@/types/game/stamina/general';
import {StaminaCookingRecoveryConfig, StaminaRecoveryRateConfig} from '@/types/game/stamina/recovery';
import {StaminaSkillRecoveryConfig} from '@/types/game/stamina/skill';
import {UserCalculationBehavior} from '@/types/userData/config/user/behavior';
import {UserConfig} from '@/types/userData/config/user/main';
import {UserMultiplierConfig, UserStrengthMultiplierConfigEntry} from '@/types/userData/config/user/multiplier';
import {userConfigMigrators} from '@/utils/migrate/userConfig/migrators';


export const defaultMapBonus = 0;

export const defaultUserBonus: UserBonus = {
  overall: 0,
  map: {},
};

export const defaultRecoveryRate: StaminaRecoveryRateConfig = {
  general: 1,
  sleep: 1,
};

export const defaultStaminaGeneralConfig: StaminaGeneralRecoveryConfig = {
  strategy: 'optimistic',
};

export const defaultSkillRecovery: StaminaSkillRecoveryConfig = {
  recovery: {
    dailyCount: 3,
    amount: 18,
  },
};

export const defaultCookingRecovery: StaminaCookingRecoveryConfig = {
  breakfast: 28800, // 08:00
  lunch: 45000, // 12:30
  dinner: 68400, // 19:00
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
  general: defaultStaminaGeneralConfig,
  skillRecovery: defaultSkillRecovery,
  cookingRecovery: defaultCookingRecovery,
  recoveryRate: defaultRecoveryRate,
};

export const defaultUserCalculationBehavior: UserCalculationBehavior = {
  alwaysFullPack: 'disable',
  goodCampTicket: false,
};

export const defaultUserMultiplierConfigEntry: UserStrengthMultiplierConfigEntry = {
  behavior: 'default',
  value: 1,
};

export const defaultUserMultiplierConfig: UserMultiplierConfig = {
  strength: {
    berry: defaultUserMultiplierConfigEntry,
    cooking: defaultUserMultiplierConfigEntry,
    skill: defaultUserMultiplierConfigEntry,
  },
};

export const defaultUserConfig: UserConfig = {
  version: userConfigMigrators.length,
  bonus: defaultUserBonus,
  stamina: defaultStaminaCalcConfig,
  behavior: defaultUserCalculationBehavior,
  snorlaxFavorite: defaultSnorlaxFavorite,
  multiplier: defaultUserMultiplierConfig,
};
