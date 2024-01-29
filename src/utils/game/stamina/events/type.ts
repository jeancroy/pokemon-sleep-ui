import {SleepSessionInfo} from '@/types/game/sleep';
import {StaminaEventLog} from '@/types/game/stamina/event';
import {StaminaGeneralRecoveryConfig} from '@/types/game/stamina/general';
import {StaminaRecoveryRateConfig} from '@/types/game/stamina/recovery';
import {StaminaSkillTriggerData} from '@/types/game/stamina/skill';


// Better not passing in the whole `StaminaCalcConfig` for easier testing config
export type GetLogsCommonOpts = {
  logs: StaminaEventLog[],
  sleepSessionInfo: SleepSessionInfo,
  general: StaminaGeneralRecoveryConfig,
  recoveryRate: StaminaRecoveryRateConfig,
  skillTriggers: StaminaSkillTriggerData[],
};
