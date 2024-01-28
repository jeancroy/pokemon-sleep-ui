import {SleepSessions, SleepSessionTimes} from '@/types/game/sleep';
import {StaminaCookingRecoveryConfig, StaminaRecoveryRateConfig} from '@/types/game/stamina/recovery';
import {StaminaSkillRecoveryConfig} from '@/types/game/stamina/skill';


export type StaminaSleepSessionConfig = SleepSessions<SleepSessionTimes>;

export type StaminaCalcConfig = {
  sleepSession: StaminaSleepSessionConfig,
  cookRecovery: StaminaCookingRecoveryConfig,
  skillRecovery: StaminaSkillRecoveryConfig,
  recoveryRate: StaminaRecoveryRateConfig,
};
