import {
  defaultCookingRecovery,
  defaultRecoveryRate,
  defaultStaminaCalcConfig,
  defaultStaminaGeneralConfig,
  defaultUserCalculationBehavior,
} from '@/const/user/settings';
import {Migrator} from '@/types/migrate';
import {UserSettings} from '@/types/userData/settings';
import {UserSettingsMigrateParams} from '@/utils/migrate/userSettings/type';


export const userSettingsMigrators: Migrator<UserSettings, UserSettingsMigrateParams>[] = [
  {
    toVersion: 1,
    // no-op, simply add a version number
    migrate: (old) => old,
  },
  {
    toVersion: 2,
    // Added stamina config
    migrate: (old) => ({...old, stamina: defaultStaminaCalcConfig}),
  },
  {
    toVersion: 3,
    // Added `recoveryRate` in `StaminaCalcConfig`
    migrate: (old) => ({
      ...old,
      stamina: {
        ...old.stamina,
        recoveryRate: defaultRecoveryRate,
      },
    }),
  },
  {
    toVersion: 4,
    // Added `staminaSkillTrigger` in the config
    migrate: (old) => ({
      ...old,
      staminaSkillTrigger: {
        dailyCount: 3,
        amount: 18,
      },
    }),
  },
  {
    toVersion: 5,
    // Added `staminaSkillTrigger` in the config
    migrate: (old) => ({
      ...old,
      behavior: defaultUserCalculationBehavior,
    }),
  },
  {
    toVersion: 6,
    // Added `staminaSkillTrigger` in the config
    migrate: ({behavior, ...old}) => ({
      ...old,
      behavior: {
        ...defaultUserCalculationBehavior,
        ...behavior,
        // @ts-ignore
        alwaysFullPack: behavior.berryPokemonAlwaysFullPack ? 'berryOnly' : 'disable',
      },
    }),
  },
  {
    toVersion: 7,
    // Added `includeMainSkill` in calculation behavior
    migrate: ({behavior, ...old}) => ({
      ...old,
      behavior: {
        ...defaultUserCalculationBehavior,
        ...behavior,
      },
    }),
  },
  {
    toVersion: 8,
    // Added `cookingRecovery` in stamina config
    migrate: ({stamina, ...old}) => ({
      ...old,
      stamina: {
        ...stamina,
        cookingRecovery: defaultCookingRecovery,
      },
    }),
  },
  {
    toVersion: 9,
    // Moved `staminaSkillTrigger` to `stamina.skillRecovery.recovery` & Add general config
    // @ts-ignore
    migrate: ({stamina, staminaSkillTrigger, ...old}) => ({
      ...old,
      stamina: {
        ...stamina,
        general: defaultStaminaGeneralConfig,
        skillRecovery: {recovery: staminaSkillTrigger},
      },
    }),
  },
];
