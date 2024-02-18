import {SleepSessionData, SleepSessionTimes} from '@/types/game/sleep';
import {StaminaGeneralRecoveryConfig} from '@/types/game/stamina/general';
import {StaminaCookingRecoveryConfig, StaminaRecoveryRateConfig} from '@/types/game/stamina/recovery';
import {StaminaSkillRecoveryConfig} from '@/types/game/stamina/skill';


export type StaminaSleepSessionConfig = SleepSessionData<SleepSessionTimes>;

export type StaminaCalcConfig = {
  sleepSession: StaminaSleepSessionConfig,
  general: StaminaGeneralRecoveryConfig,
  skillRecovery: StaminaSkillRecoveryConfig,
  cookingRecovery: StaminaCookingRecoveryConfig,
  recoveryRate: StaminaRecoveryRateConfig,
};
