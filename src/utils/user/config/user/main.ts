import {StaminaRecoveryRateConfig} from '@/types/game/stamina/recovery';
import {UserCalculationBehavior} from '@/types/userData/config/user/behavior';
import {CalculatedUserConfig, UserConfig} from '@/types/userData/config/user/main';
import {cloneMerge} from '@/utils/object/cloneMerge';
import {toEffectiveBonus, ToEffectiveBonusOpts} from '@/utils/user/config/user/bonus';


type OverrideRecoveryRateOpts = {
  userConfig: UserConfig,
  recoveryRate: StaminaRecoveryRateConfig,
};

const overrideRecoveryRate = ({
  userConfig,
  recoveryRate,
}: OverrideRecoveryRateOpts): UserConfig => {
  return {
    ...userConfig,
    stamina: {
      ...userConfig.stamina,
      recoveryRate,
    },
  };
};

export type ToCalculatedUserConfigOpts = ToEffectiveBonusOpts & {
  recoveryRate?: StaminaRecoveryRateConfig,
  behaviorOverride?: Partial<UserCalculationBehavior>,
};

export const toCalculatedUserConfig = ({
  recoveryRate,
  behaviorOverride,
  ...opts
}: ToCalculatedUserConfigOpts): CalculatedUserConfig => {
  let {userConfig} = opts;

  if (recoveryRate) {
    userConfig = overrideRecoveryRate({userConfig, recoveryRate});
  }

  return {
    origin: cloneMerge(userConfig, {behavior: behaviorOverride}),
    bonus: toEffectiveBonus({
      ...opts,
      userConfig: userConfig,
    }),
  };
};
