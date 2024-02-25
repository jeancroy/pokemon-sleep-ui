import {StaminaRecoveryRateConfig} from '@/types/game/stamina/recovery';
import {StaminaSkillTriggerOverride} from '@/types/game/stamina/skill';
import {UserCalculationBehavior} from '@/types/userData/config/user/behavior';
import {CalculatedUserConfig} from '@/types/userData/config/user/main';
import {cloneMerge} from '@/utils/object/cloneMerge';
import {Nullable} from '@/utils/type';
import {toEffectiveBonus, ToEffectiveBonusOpts} from '@/utils/user/config/user/bonus';
import {userConfigOverrideRecoveryRate} from '@/utils/user/config/user/override/recoveryRate';


export type ToCalculatedUserConfigOpts = ToEffectiveBonusOpts & {
  recoveryRate?: StaminaRecoveryRateConfig,
  behaviorOverride?: Partial<UserCalculationBehavior>,
  skillTriggerOverride?: Nullable<StaminaSkillTriggerOverride>,
};

export const toCalculatedUserConfig = ({
  recoveryRate,
  behaviorOverride,
  skillTriggerOverride,
  ...opts
}: ToCalculatedUserConfigOpts): CalculatedUserConfig => {
  let {userConfig} = opts;

  if (recoveryRate) {
    userConfig = userConfigOverrideRecoveryRate({userConfig, recoveryRate});
  }

  return {
    origin: cloneMerge(userConfig, {behavior: behaviorOverride}),
    bonus: toEffectiveBonus({
      ...opts,
      userConfig,
      skillTriggerOverride,
    }),
  };
};
