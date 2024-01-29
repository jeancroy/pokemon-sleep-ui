import {StaminaRecoveryRateConfig} from '@/types/game/stamina/recovery';
import {CalculatedUserSettings, UserCalculationBehavior, UserSettings} from '@/types/userData/settings';
import {toEffectiveBonus, ToEffectiveBonusOpts} from '@/utils/user/bonus';


type OverrideRecoveryRateOpts = {
  settings: UserSettings,
  recoveryRate: StaminaRecoveryRateConfig,
};

const overrideRecoveryRate = ({
  settings,
  recoveryRate,
}: OverrideRecoveryRateOpts): UserSettings => {
  return {
    ...settings,
    stamina: {
      ...settings.stamina,
      recoveryRate,
    },
  };
};

export type ToCalculatedUserSettingsOpts = ToEffectiveBonusOpts & {
  recoveryRate?: StaminaRecoveryRateConfig,
  behaviorOverride?: Partial<UserCalculationBehavior>,
};

export const toCalculatedUserSettings = ({
  recoveryRate,
  behaviorOverride,
  ...opts
}: ToCalculatedUserSettingsOpts): CalculatedUserSettings => {
  let {settings} = opts;

  if (recoveryRate) {
    settings = overrideRecoveryRate({settings, recoveryRate});
  }

  return {
    origin: settings,
    bonus: toEffectiveBonus({
      ...opts,
      settings,
    }),
    behavior: {
      ...settings.behavior,
      ...behaviorOverride,
    },
  };
};
