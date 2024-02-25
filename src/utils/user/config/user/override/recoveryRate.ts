import {StaminaRecoveryRateConfig} from '@/types/game/stamina/recovery';
import {UserConfig} from '@/types/userData/config/user/main';
import {cloneMerge} from '@/utils/object/cloneMerge';


type UserConfigOverrideRecoveryRateOpts = {
  userConfig: UserConfig,
  recoveryRate: StaminaRecoveryRateConfig,
};

export const userConfigOverrideRecoveryRate = ({
  userConfig,
  recoveryRate,
}: UserConfigOverrideRecoveryRateOpts): UserConfig => {
  return cloneMerge(userConfig, {stamina: {recoveryRate}});
};
